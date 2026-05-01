/**
 * @fileoverview ProcessPanel — Process/thread monitoring panel.
 * Displays process list, tree view, and aggregate statistics.
 *
 * @module @torafirma/design-system/runtime-trace-console/ProcessPanel
 */

import React, { useState } from "react";
import type { BaseComponentProps, ProcessInfo } from "./types";

/** Props for ProcessPanel. */
export interface ProcessPanelProps extends BaseComponentProps {
  /** Process list. */
  processes: ProcessInfo[];
  /** Currently selected process ID. */
  selectedPid?: number;
  /** Callback when a process is selected. */
  onSelectProcess?: (process: ProcessInfo) => void;
  /** Callback to kill a process. */
  onKillProcess?: (pid: number) => void;
  /** Whether data is loading. */
  loading?: boolean;
  /** View mode. */
  viewMode?: "list" | "tree" | "stats";
}

/**
 * ProcessPanel — Process and thread monitoring panel.
 *
 * Shows process list with CPU/memory usage, supports list/tree/stats views.
 * Per Section 9, process state changes produce trace events.
 *
 * @example
 * ```tsx
 * <ProcessPanel
 *   processes={processList}
 *   viewMode="tree"
 *   onSelectProcess={(p) => inspectProcess(p.pid)}
 * />
 * ```
 */
export const ProcessPanel: React.FC<ProcessPanelProps> = ({
  processes,
  selectedPid,
  onSelectProcess,
  onKillProcess,
  loading = false,
  viewMode: initialView = "list",
  className = "",
  "data-testid": dataTestId = "process-panel",
}) => {
  const [viewMode, setViewMode] = useState<"list" | "tree" | "stats">(initialView);
  const [search, setSearch] = useState("");

  const filtered = processes.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.command?.toLowerCase().includes(search.toLowerCase()) ||
      String(p.pid).includes(search)
  );

  const totalCpu = processes.reduce((sum, p) => sum + p.cpuPercent, 0);
  const totalMem = processes.reduce((sum, p) => sum + p.memoryMb, 0);

  return (
    <div
      className={`tf-process-panel ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-process-panel__header">
        <h3 className="tf-process-panel__title">Processes</h3>
        <div className="tf-process-panel__view-toggle">
          {(["list", "tree", "stats"] as const).map((mode) => (
            <button
              key={mode}
              className={`tf-btn tf-btn--sm ${
                viewMode === mode ? "tf-btn--active" : "tf-btn--ghost"
              }`}
              onClick={() => setViewMode(mode)}
              type="button"
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="tf-process-panel__toolbar">
        <input
          className="tf-input tf-input--sm"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter processes..."
        />
        <span className="tf-process-panel__summary">
          {processes.length} processes · {totalCpu.toFixed(1)}% CPU ·{" "}
          {totalMem.toFixed(0)}MB MEM
        </span>
      </div>

      <div className="tf-process-panel__body">
        {loading ? (
          <div className="tf-process-panel__loading">Loading processes...</div>
        ) : viewMode === "stats" ? (
          <ProcessStats processes={processes} />
        ) : viewMode === "tree" ? (
          <ProcessTree
            processes={filtered}
            selectedPid={selectedPid}
            onSelect={onSelectProcess}
          />
        ) : (
          <ProcessList
            processes={filtered}
            selectedPid={selectedPid}
            onSelect={onSelectProcess}
            onKill={onKillProcess}
          />
        )}
      </div>
    </div>
  );
};

/** Inline list sub-component. */
const ProcessList: React.FC<{
  processes: ProcessInfo[];
  selectedPid?: number;
  onSelect?: (p: ProcessInfo) => void;
  onKill?: (pid: number) => void;
}> = ({ processes, selectedPid, onSelect, onKill }) => (
  <table className="tf-process-list">
    <thead>
      <tr>
        <th>PID</th>
        <th>Name</th>
        <th>State</th>
        <th>CPU %</th>
        <th>MEM (MB)</th>
        <th>Threads</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {processes.map((p) => (
        <tr
          key={p.pid}
          className={`tf-process-list__row ${
            selectedPid === p.pid ? "tf-process-list__row--selected" : ""
          }`}
          onClick={() => onSelect?.(p)}
        >
          <td className="tf-process-list__pid">{p.pid}</td>
          <td className="tf-process-list__name">{p.name}</td>
          <td>
            <span className={`tf-badge tf-badge--${p.state}`}>{p.state}</span>
          </td>
          <td className="tf-process-list__cpu">{p.cpuPercent.toFixed(1)}%</td>
          <td className="tf-process-list__mem">{p.memoryMb.toFixed(1)}</td>
          <td className="tf-process-list__threads">{p.threads}</td>
          <td>
            {onKill && (
              <button
                className="tf-btn tf-btn--sm tf-btn--danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onKill(p.pid);
                }}
                type="button"
              >
                Kill
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

/** Inline tree sub-component. */
const ProcessTree: React.FC<{
  processes: ProcessInfo[];
  selectedPid?: number;
  onSelect?: (p: ProcessInfo) => void;
}> = ({ processes, selectedPid, onSelect }) => {
  const roots = processes.filter((p) => !p.ppid || !processes.find((x) => x.pid === p.ppid));

  const renderNode = (node: ProcessInfo, depth: number): React.ReactNode => (
    <div
      key={node.pid}
      className={`tf-process-tree__node ${
        selectedPid === node.pid ? "tf-process-tree__node--selected" : ""
      }`}
      style={{ paddingLeft: `${depth * 1.5}rem` }}
      onClick={() => onSelect?.(node)}
    >
      <span className="tf-process-tree__toggle">
        {processes.some((p) => p.ppid === node.pid) ? "▼" : "·"}
      </span>
      <span className="tf-process-tree__name">{node.name}</span>
      <span className="tf-process-tree__pid">({node.pid})</span>
      <span className={`tf-badge tf-badge--${node.state} tf-badge--sm`}>
        {node.state}
      </span>
      <span className="tf-process-tree__cpu">{node.cpuPercent.toFixed(1)}%</span>
    </div>
  );

  const renderTree = (node: ProcessInfo, depth: number): React.ReactNode[] => {
    const result: React.ReactNode[] = [renderNode(node, depth)];
    const children = processes.filter((p) => p.ppid === node.pid);
    for (const child of children) {
      result.push(...renderTree(child, depth + 1));
    }
    return result;
  };

  return (
    <div className="tf-process-tree">
      {roots.map((root) => renderTree(root, 0))}
    </div>
  );
};

/** Inline stats sub-component. */
const ProcessStats: React.FC<{ processes: ProcessInfo[] }> = ({ processes }) => {
  const byState = processes.reduce<Record<string, number>>((acc, p) => {
    acc[p.state] = (acc[p.state] || 0) + 1;
    return acc;
  }, {});

  const topCpu = [...processes].sort((a, b) => b.cpuPercent - a.cpuPercent).slice(0, 5);
  const topMem = [...processes].sort((a, b) => b.memoryMb - a.memoryMb).slice(0, 5);

  return (
    <div className="tf-process-stats">
      <div className="tf-process-stats__section">
        <h4 className="tf-process-stats__title">By State</h4>
        <div className="tf-process-stats__bars">
          {Object.entries(byState).map(([state, count]) => (
            <div key={state} className="tf-process-stats__bar">
              <span className="tf-process-stats__bar-label">{state}</span>
              <div className="tf-process-stats__bar-track">
                <div
                  className="tf-process-stats__bar-fill"
                  style={{
                    width: `${(count / processes.length) * 100}%`,
                  }}
                />
              </div>
              <span className="tf-process-stats__bar-value">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tf-process-stats__section">
        <h4 className="tf-process-stats__title">Top CPU</h4>
        <ol className="tf-process-stats__list">
          {topCpu.map((p) => (
            <li key={p.pid}>
              {p.name} — {p.cpuPercent.toFixed(1)}%
            </li>
          ))}
        </ol>
      </div>

      <div className="tf-process-stats__section">
        <h4 className="tf-process-stats__title">Top Memory</h4>
        <ol className="tf-process-stats__list">
          {topMem.map((p) => (
            <li key={p.pid}>
              {p.name} — {p.memoryMb.toFixed(1)}MB
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

ProcessPanel.displayName = "ProcessPanel";

export default ProcessPanel;
