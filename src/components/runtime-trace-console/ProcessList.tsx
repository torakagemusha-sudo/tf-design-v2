/**
 * @fileoverview ProcessList — Tabular list of processes.
 * Displays processes with sortable columns for PID, name, CPU, memory, state.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ProcessList
 */

import React, { useMemo, useState } from "react";
import type { BaseComponentProps, ProcessInfo } from "./types";

/** Sortable columns. */
type SortColumn = "pid" | "name" | "state" | "cpuPercent" | "memoryMb" | "threads";
type SortDir = "asc" | "desc";

/** Props for ProcessList. */
export interface ProcessListProps extends BaseComponentProps {
  /** Processes to display. */
  processes: ProcessInfo[];
  /** Selected process PID. */
  selectedPid?: number;
  /** Callback on process selection. */
  onSelect?: (process: ProcessInfo) => void;
  /** Callback to kill a process. */
  onKill?: (pid: number) => void;
}

/**
 * ProcessList — Sortable table of processes.
 *
 * Supports column sorting by PID, name, CPU, memory, and state.
 *
 * @example
 * ```tsx
 * <ProcessList
 *   processes={procs}
 *   selectedPid={selected}
 *   onSelect={(p) => setSelected(p.pid)}
 *   onKill={(pid) => killProcess(pid)}
 * />
 * ```
 */
export const ProcessList: React.FC<ProcessListProps> = ({
  processes,
  selectedPid,
  onSelect,
  onKill,
  className = "",
  "data-testid": dataTestId = "process-list",
}) => {
  const [sortCol, setSortCol] = useState<SortColumn>("cpuPercent");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    return [...processes].sort((a, b) => {
      const av = a[sortCol];
      const bv = b[sortCol];
      if (typeof av === "string" && typeof bv === "string") {
        return av.localeCompare(bv) * dir;
      }
      return ((av as number) - (bv as number)) * dir;
    });
  }, [processes, sortCol, sortDir]);

  const toggleSort = (col: SortColumn) => {
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("desc");
    }
  };

  const SortIndicator: React.FC<{ col: SortColumn }> = ({ col }) => {
    if (sortCol !== col) return <span className="tf-sort-indicator">↕</span>;
    return (
      <span className="tf-sort-indicator tf-sort-indicator--active">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div
      className={`tf-process-list ${className}`}
      data-testid={dataTestId}
    >
      <table className="tf-process-list__table">
        <thead>
          <tr>
            <th onClick={() => toggleSort("pid")} className="tf-process-list__sortable">
              PID <SortIndicator col="pid" />
            </th>
            <th onClick={() => toggleSort("name")} className="tf-process-list__sortable">
              Name <SortIndicator col="name" />
            </th>
            <th onClick={() => toggleSort("state")} className="tf-process-list__sortable">
              State <SortIndicator col="state" />
            </th>
            <th onClick={() => toggleSort("cpuPercent")} className="tf-process-list__sortable">
              CPU % <SortIndicator col="cpuPercent" />
            </th>
            <th onClick={() => toggleSort("memoryMb")} className="tf-process-list__sortable">
              MEM MB <SortIndicator col="memoryMb" />
            </th>
            <th onClick={() => toggleSort("threads")} className="tf-process-list__sortable">
              Thr <SortIndicator col="threads" />
            </th>
            {onKill && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr
              key={p.pid}
              className={`tf-process-list__row ${
                selectedPid === p.pid ? "tf-process-list__row--selected" : ""
              }`}
              onClick={() => onSelect?.(p)}
            >
              <td className="tf-process-list__cell tf-process-list__cell--pid">
                {p.pid}
              </td>
              <td className="tf-process-list__cell tf-process-list__cell--name">
                {p.name}
                {p.command && (
                  <span className="tf-process-list__command">{p.command}</span>
                )}
              </td>
              <td className="tf-process-list__cell">
                <span className={`tf-badge tf-badge--${p.state}`}>{p.state}</span>
              </td>
              <td
                className={`tf-process-list__cell tf-process-list__cell--cpu ${
                  p.cpuPercent > 80 ? "tf-process-list__cell--high" : ""
                }`}
              >
                {p.cpuPercent.toFixed(1)}
              </td>
              <td className="tf-process-list__cell">{p.memoryMb.toFixed(1)}</td>
              <td className="tf-process-list__cell">{p.threads}</td>
              {onKill && (
                <td className="tf-process-list__cell">
                  <button
                    className="tf-btn tf-btn--xs tf-btn--danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onKill(p.pid);
                    }}
                    type="button"
                  >
                    Kill
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {sorted.length === 0 && (
        <div className="tf-process-list__empty">No processes</div>
      )}
    </div>
  );
};

ProcessList.displayName = "ProcessList";

export default ProcessList;
