/**
 * @fileoverview TraceWaterfallRow — Single row in the waterfall chart.
 * Contains label, duration bar, and timing text.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceWaterfallRow
 */

import React from "react";
import type { BaseComponentProps, WaterfallRow } from "./types";

/** Props for TraceWaterfallRow. */
export interface TraceWaterfallRowProps extends BaseComponentProps {
  /** Row data. */
  row: WaterfallRow;
  /** Total duration for positioning. */
  totalDurationMs: number;
  /** Whether selected. */
  selected?: boolean;
  /** Click handler. */
  onClick?: (row: WaterfallRow) => void;
  /** Row height. */
  height?: number;
}

/**
 * TraceWaterfallRow — Individual waterfall row.
 *
 * @example
 * ```tsx
 * <TraceWaterfallRow
 *   row={row}
 *   totalDurationMs={5000}
 *   onClick={(r) => inspect(r)}
 * />
 * ```
 */
export const TraceWaterfallRow: React.FC<TraceWaterfallRowProps> = ({
  row,
  totalDurationMs,
  selected = false,
  onClick,
  height = 24,
  className = "",
  "data-testid": dataTestId = "trace-waterfall-row",
}) => {
  const left = (row.startMs / totalDurationMs) * 100;
  const width = (row.durationMs / totalDurationMs) * 100;

  return (
    <div
      className={`tf-trace-waterfall-row tf-trace-waterfall-row--${row.status} ${
        selected ? "tf-trace-waterfall-row--selected" : ""
      } ${className}`}
      data-testid={dataTestId}
      style={{
        height,
        paddingLeft: `${row.depth * 1.5}rem`,
      }}
      onClick={() => onClick?.(row)}
    >
      <span className="tf-trace-waterfall-row__label">{row.label}</span>
      <div className="tf-trace-waterfall-row__track">
        <div
          className={`tf-trace-waterfall-bar tf-trace-waterfall-bar--${row.status}`}
          style={{
            left: `${left}%`,
            width: `${Math.max(width, 0.3)}%`,
            backgroundColor: row.color,
          }}
        />
      </div>
      <span className="tf-trace-waterfall-row__duration">
        {row.durationMs >= 1000
          ? `${(row.durationMs / 1000).toFixed(2)}s`
          : `${row.durationMs}ms`}
      </span>
    </div>
  );
};

TraceWaterfallRow.displayName = "TraceWaterfallRow";

export default TraceWaterfallRow;
