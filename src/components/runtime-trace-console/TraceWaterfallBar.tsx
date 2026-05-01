/**
 * @fileoverview TraceWaterfallBar — Duration bar in waterfall chart.
 * Colored horizontal bar positioned by start time.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceWaterfallBar
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceWaterfallBar. */
export interface TraceWaterfallBarProps extends BaseComponentProps {
  /** Left position as percentage. */
  left: number;
  /** Width as percentage. */
  width: number;
  /** Status for coloring. */
  status?: "ok" | "error" | "pending";
  /** Custom color. */
  color?: string;
  /** Height in pixels. */
  height?: number;
}

/**
 * TraceWaterfallBar — Waterfall duration bar.
 *
 * @example
 * ```tsx
 * <TraceWaterfallBar left={20} width={15} status="ok" />
 * ```
 */
export const TraceWaterfallBar: React.FC<TraceWaterfallBarProps> = ({
  left,
  width,
  status = "ok",
  color,
  height,
  className = "",
  "data-testid": dataTestId = "trace-waterfall-bar",
}) => {
  return (
    <div
      className={`tf-trace-waterfall-bar tf-trace-waterfall-bar--${status} ${className}`}
      data-testid={dataTestId}
      style={{
        left: `${left}%`,
        width: `${Math.max(width, 0.3)}%`,
        backgroundColor: color,
        height,
      }}
    />
  );
};

TraceWaterfallBar.displayName = "TraceWaterfallBar";

export default TraceWaterfallBar;
