/**
 * @fileoverview ProcessTree — Hierarchical tree view of processes.
 * Shows parent-child relationships with expand/collapse controls.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ProcessTree
 */

import React, { useState } from "react";
import type { BaseComponentProps, ProcessInfo } from "./types";

/** Props for ProcessTree. */
export interface ProcessTreeProps extends BaseComponentProps {
  /** All processes to build tree from. */
  processes: ProcessInfo[];
  /** Selected PID. */
  selectedPid?: number;
  /** Callback on node selection. */
  onSelect?: (process: ProcessInfo) => void;
  /** Initially expanded PIDs. */
  defaultExpanded?: number[];
}

/** Tree node with hierarchy. */
interface TreeNode {
  process: ProcessInfo;
  children: TreeNode[];
  depth: number;
}

/**
 * ProcessTree — Hierarchical process tree visualization.
 *
 * Builds a parent-child tree from flat process list with expand/collapse.
 *
 * @example
 * ```tsx
 * <ProcessTree
 *   processes={allProcs}
 *   selectedPid={activePid}
 *   onSelect={(p) => setActivePid(p.pid)}
 * />
 * ```
 */
export const ProcessTree: React.FC<ProcessTreeProps> = ({
  processes,
  selectedPid,
  onSelect,
  defaultExpanded,
  className = "",
  "data-testid": dataTestId = "process-tree",
}) => {
  const [expanded, setExpanded] = useState<Set<number>>(
    new Set(defaultExpanded || processes.map((p) => p.pid))
  );

  const toggleExpand = (pid: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(pid)) {
        next.delete(pid);
      } else {
        next.add(pid);
      }
      return next;
    });
  };

  // Build tree structure
  const buildTree = (): TreeNode[] => {
    const pidMap = new Map<number, ProcessInfo>();
    for (const p of processes) {
      pidMap.set(p.pid, p);
    }

    const childrenMap = new Map<number, ProcessInfo[]>();
    for (const p of processes) {
      if (p.ppid) {
        const siblings = childrenMap.get(p.ppid) || [];
        siblings.push(p);
        childrenMap.set(p.ppid, siblings);
      }
    }

    const buildNode = (process: ProcessInfo, depth: number): TreeNode => ({
      process,
      depth,
      children: (childrenMap.get(process.pid) || []).map((c) =>
        buildNode(c, depth + 1)
      ),
    });

    // Find roots (processes whose parent is not in the list)
    const roots = processes.filter(
      (p) => !p.ppid || !pidMap.has(p.ppid)
    );
    return roots.map((r) => buildNode(r, 0));
  };

  const tree = buildTree();

  const renderNode = (node: TreeNode): React.ReactNode => {
    const { process, depth, children } = node;
    const isExpanded = expanded.has(process.pid);
    const hasChildren = children.length > 0;
    const isSelected = selectedPid === process.pid;

    return (
      <div key={process.pid}>
        <div
          className={`tf-process-tree__node ${
            isSelected ? "tf-process-tree__node--selected" : ""
          }`}
          style={{ paddingLeft: `${depth * 1.5}rem` }}
          onClick={() => onSelect?.(process)}
        >
          <button
            className={`tf-process-tree__toggle ${
              !hasChildren ? "tf-process-tree__toggle--leaf" : ""
            } ${isExpanded ? "tf-process-tree__toggle--expanded" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(process.pid);
            }}
            type="button"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {hasChildren ? (isExpanded ? "▼" : "▶") : "·"}
          </button>
          <span className="tf-process-tree__name">{process.name}</span>
          <span className="tf-process-tree__pid">{process.pid}</span>
          <span className={`tf-badge tf-badge--${process.state} tf-badge--sm`}>
            {process.state}
          </span>
          <span className="tf-process-tree__cpu">
            {process.cpuPercent.toFixed(1)}%
          </span>
        </div>
        {isExpanded &&
          children.map((child) => renderNode(child))}
      </div>
    );
  };

  return (
    <div
      className={`tf-process-tree ${className}`}
      data-testid={dataTestId}
    >
      {tree.map((node) => renderNode(node))}
      {tree.length === 0 && (
        <div className="tf-process-tree__empty">No processes</div>
      )}
    </div>
  );
};

ProcessTree.displayName = "ProcessTree";

export default ProcessTree;
