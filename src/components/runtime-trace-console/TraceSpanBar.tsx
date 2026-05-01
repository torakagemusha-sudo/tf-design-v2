/**
 * @fileoverview TraceSpanBar — Span duration bar visualization.
 * Horizontal bar proportional to span duration with status-based coloring.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceSpanBar
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceSpanBar. */
export interface TraceSpanBarProps extends BaseComponentProps {
  /** Duration in ms. */
  duration: number;
  /** Maximum duration for scaling. */
  maxDuration: number;
  /** Span status for color. */
  status?: "ok" | "error" | "unknown";
  /** Bar height. */
  height?: number;
  /** Show duration label. */
  showLabel?: boolean;
}

/**
 * TraceSpanBar — Duration bar for spans.
 *
 * @example
 * ```tsx
 * <TraceSpanBar duration={450} maxDuration={2000} status="ok" showLabel />
 * ```
 */
export const TraceSpanBar: React.FC<TraceSpanBarProps> = ({
  duration,
  maxDuration,
  status = "ok",
  height = 12,
  showLabel = false,
  className = "",
  "data-testid": dataTestId = "trace-span-bar",
}) => {
  const pct = Math.min((duration / maxDuration) * 100, 100);

  return (
    <div
      className={`tf-trace-span-bar ${className}`}
      data-testid={dataTestId}
      style={{ height }}
    >
      <div
        className={`tf-trace-span-bar__fill tf-trace-span-bar__fill--${status}`}
        style={{ width: `${pct}%` }}
      />
      {showLabel && (
        <span className="tf-trace-span-bar__label">
          {duration >= 1000
            ? `${(duration / 1000).toFixed(2)}s`
            : `${duration}ms`}
        </span>
      )}
    </div>
  );
};

TraceSpanBar.displayName = "TraceSpanBar";

export default TraceSpanBar;
