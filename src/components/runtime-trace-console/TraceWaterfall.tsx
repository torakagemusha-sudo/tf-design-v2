/**
 * @fileoverview TraceWaterfall — Waterfall chart for trace spans.
 * Shows spans as horizontal bars positioned by start time.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceWaterfall
 */

import React from "react";
import type { BaseComponentProps, WaterfallRow } from "./types";

/** Props for TraceWaterfall. */
export interface TraceWaterfallProps extends BaseComponentProps {
  /** Waterfall rows. */
  rows: WaterfallRow[];
  /** Total duration in ms. */
  totalDurationMs: number;
  /** Selected row ID. */
  selectedId?: string;
  /** Callback when a row is clicked. */
  onRowClick?: (row: WaterfallRow) => void;
  /** Row height in pixels. */
  rowHeight?: number;
}

/**
 * TraceWaterfall — Waterfall visualization of trace data.
 *
 * @example
 * ```tsx
 * <TraceWaterfall
 *   rows={waterfallRows}
 *   totalDurationMs={5000}
 *   onRowClick={(r) => inspect(r)}
 * />
 * ```
 */
export const TraceWaterfall: React.FC<TraceWaterfallProps> = ({
  rows,
  totalDurationMs,
  selectedId,
  onRowClick,
  rowHeight = 24,
  className = "",
  "data-testid": dataTestId = "trace-waterfall",
}) => {
  return (
    <div
      className={`tf-trace-waterfall ${className}`}
      data-testid={dataTestId}
    >
      {/* Time ruler */}
      <div className="tf-trace-waterfall__ruler">
        {Array.from({ length: 11 }).map((_, i) => {
          const ms = (i / 10) * totalDurationMs;
          return (
            <div
              key={i}
              className="tf-trace-waterfall__ruler-tick"
              style={{ left: `${i * 10}%` }}
            >
              <span className="tf-trace-waterfall__ruler-label">
                {ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms.toFixed(0)}ms`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rows */}
      <div className="tf-trace-waterfall__rows">
        {rows.map((row) => (
          <TraceWaterfallRow
            key={row.id}
            row={row}
            totalDurationMs={totalDurationMs}
            selected={selectedId === row.id}
            height={rowHeight}
            onClick={() => onRowClick?.(row)}
          />
        ))}
      </div>
    </div>
  );
};

/** Inline waterfall row sub-component. */
const TraceWaterfallRow: React.FC<{
  row: WaterfallRow;
  totalDurationMs: number;
  selected: boolean;
  height: number;
  onClick: () => void;
}> = ({ row, totalDurationMs, selected, height, onClick }) => {
  const left = (row.startMs / totalDurationMs) * 100;
  const width = (row.durationMs / totalDurationMs) * 100;

  return (
    <div
      className={`tf-trace-waterfall-row ${
        selected ? "tf-trace-waterfall-row--selected" : ""
      } tf-trace-waterfall-row--${row.status}`}
      style={{ height, paddingLeft: `${row.depth * 1.5}rem` }}
      onClick={onClick}
    >
      <span className="tf-trace-waterfall-row__label">{row.label}</span>
      <div className="tf-trace-waterfall-row__track">
        <TraceWaterfallBar
          left={left}
          width={Math.max(width, 0.5)}
          status={row.status}
          color={row.color}
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

/** Inline waterfall bar sub-component. */
const TraceWaterfallBar: React.FC<{
  left: number;
  width: number;
  status: string;
  color?: string;
}> = ({ left, width, status, color }) => (
  <div
    className={`tf-trace-waterfall-bar tf-trace-waterfall-bar--${status}`}
    style={{
      left: `${left}%`,
      width: `${width}%`,
      backgroundColor: color,
    }}
  />
);

TraceWaterfall.displayName = "TraceWaterfall";

export default TraceWaterfall;
