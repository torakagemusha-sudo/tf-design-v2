/**
 * @fileoverview ProcessItem — Single process row/card display.
 * Detailed view for one process with expanded metrics.
 *
 * @module @torafirma/design-system/runtime-trace-console/ProcessItem
 */

import React from "react";
import type { BaseComponentProps, ProcessInfo } from "./types";

/** Props for ProcessItem. */
export interface ProcessItemProps extends BaseComponentProps {
  /** Process to display. */
  process: ProcessInfo;
  /** Whether this process is selected. */
  selected?: boolean;
  /** Click handler. */
  onClick?: (process: ProcessInfo) => void;
  /** Kill handler. */
  onKill?: (pid: number) => void;
  /** Whether to show expanded detail. */
  expanded?: boolean;
}

/**
 * ProcessItem — Single process display.
 *
 * Compact row or expanded card for a single process.
 *
 * @example
 * ```tsx
 * <ProcessItem
 *   process={proc}
 *   selected={proc.pid === selectedPid}
 *   onClick={(p) => setSelected(p.pid)}
 * />
 * ```
 */
export const ProcessItem: React.FC<ProcessItemProps> = ({
  process,
  selected = false,
  onClick,
  onKill,
  expanded = false,
  className = "",
  "data-testid": dataTestId = "process-item",
}) => {
  return (
    <div
      className={`tf-process-item ${selected ? "tf-process-item--selected" : ""} ${
        expanded ? "tf-process-item--expanded" : ""
      } tf-process-item--${process.state} ${className}`}
      data-testid={dataTestId}
      onClick={() => onClick?.(process)}
    >
      <div className="tf-process-item__main">
        <span
          className={`tf-process-item__state-indicator tf-process-item__state-indicator--${process.state}`}
        />
        <span className="tf-process-item__pid">{process.pid}</span>
        <span className="tf-process-item__name">{process.name}</span>
        {process.command && (
          <span className="tf-process-item__command">{process.command}</span>
        )}
        <span className={`tf-badge tf-badge--${process.state} tf-badge--sm`}>
          {process.state}
        </span>
      </div>

      <div className="tf-process-item__metrics">
        <div className="tf-process-item__metric">
          <span className="tf-process-item__metric-label">CPU</span>
          <span className="tf-process-item__metric-value">
            {process.cpuPercent.toFixed(1)}%
          </span>
          <div className="tf-process-item__metric-bar">
            <div
              className="tf-process-item__metric-fill"
              style={{ width: `${Math.min(process.cpuPercent, 100)}%` }}
            />
          </div>
        </div>
        <div className="tf-process-item__metric">
          <span className="tf-process-item__metric-label">MEM</span>
          <span className="tf-process-item__metric-value">
            {process.memoryMb.toFixed(1)}MB
          </span>
        </div>
        <div className="tf-process-item__metric">
          <span className="tf-process-item__metric-label">Threads</span>
          <span className="tf-process-item__metric-value">
            {process.threads}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="tf-process-item__detail">
          <div className="tf-process-item__detail-row">
            <span>Started</span>
            <span>{new Date(process.startedAt).toLocaleString()}</span>
          </div>
          <div className="tf-process-item__detail-row">
            <span>Runtime</span>
            <span>{process.runtimeTargetId}</span>
          </div>
          {process.ppid && (
            <div className="tf-process-item__detail-row">
              <span>Parent PID</span>
              <span>{process.ppid}</span>
            </div>
          )}
        </div>
      )}

      {onKill && (
        <div className="tf-process-item__actions">
          <button
            className="tf-btn tf-btn--xs tf-btn--danger"
            onClick={(e) => {
              e.stopPropagation();
              onKill(process.pid);
            }}
            type="button"
          >
            Kill Process
          </button>
        </div>
      )}
    </div>
  );
};

ProcessItem.displayName = "ProcessItem";

export default ProcessItem;
