/**
 * @fileoverview ExecutionTimelineSelection — Selection range highlight.
 * Shows a highlighted time range on the timeline with duration info.
 *
 * @module @torafirma/design-system/runtime-trace-console/ExecutionTimelineSelection
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for ExecutionTimelineSelection. */
export interface ExecutionTimelineSelectionProps extends BaseComponentProps {
  /** Start position as percentage. */
  start: number;
  /** End position as percentage. */
  end: number;
  /** Duration in ms. */
  durationMs?: number;
  /** Callback to clear selection. */
  onClear?: () => void;
  /** Selection color. */
  color?: string;
}

/**
 * ExecutionTimelineSelection — Time range selection overlay.
 *
 * @example
 * ```tsx
 * <ExecutionTimelineSelection
 *   start={20}
 *   end={60}
 *   durationMs={4000}
 *   onClear={() => setSelection(null)}
 * />
 * ```
 */
export const ExecutionTimelineSelection: React.FC<ExecutionTimelineSelectionProps> = ({
  start,
  end,
  durationMs,
  onClear,
  color,
  className = "",
  "data-testid": dataTestId = "execution-timeline-selection",
}) => {
  const left = Math.min(start, end);
  const width = Math.abs(end - start);

  return (
    <div
      className={`tf-execution-timeline-selection ${className}`}
      data-testid={dataTestId}
      style={{
        left: `${left}%`,
        width: `${width}%`,
        backgroundColor: color,
      }}
    >
      {durationMs !== undefined && (
        <span className="tf-execution-timeline-selection__duration">
          {durationMs >= 1000
            ? `${(durationMs / 1000).toFixed(2)}s`
            : `${durationMs.toFixed(0)}ms`}
        </span>
      )}
      {onClear && (
        <button
          className="tf-execution-timeline-selection__clear"
          onClick={onClear}
          type="button"
          aria-label="Clear selection"
        >
          {"✕"}
        </button>
      )}
    </div>
  );
};

ExecutionTimelineSelection.displayName = "ExecutionTimelineSelection";

export default ExecutionTimelineSelection;
