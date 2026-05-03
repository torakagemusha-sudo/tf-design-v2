/**
 * @fileoverview TraceSpanItem — Single span item display.
 * Shows span name, service, timing, and status in a compact row.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceSpanItem
 */

import React from "react";
import type { BaseComponentProps, TraceSpan } from "./types";

/** Props for TraceSpanItem. */
export interface TraceSpanItemProps extends BaseComponentProps {
  /** Span data. */
  span: TraceSpan;
  /** Whether selected. */
  selected?: boolean;
  /** Maximum duration for bar scaling. */
  maxDuration: number;
  /** Click handler. */
  onClick?: (span: TraceSpan) => void;
}

/**
 * TraceSpanItem — Single span display row.
 *
 * @example
 * ```tsx
 * <TraceSpanItem
 *   span={span}
 *   maxDuration={5000}
 *   onClick={(s) => inspect(s)}
 * />
 * ```
 */
export const TraceSpanItem: React.FC<TraceSpanItemProps> = ({
  span,
  selected = false,
  maxDuration,
  onClick,
  className = "",
  "data-testid": dataTestId = "trace-span-item",
}) => {
  return (
    <div
      className={`tf-trace-span-item tf-trace-span-item--${span.status} ${
        selected ? "tf-trace-span-item--selected" : ""
      } ${className}`}
      data-testid={dataTestId}
      onClick={() => onClick?.(span)}
    >
      <div className="tf-trace-span-item__indent" style={{ width: `${span.depth * 1.5}rem` }} />
      <span className="tf-trace-span-item__name">{span.name}</span>
      <span className="tf-trace-span-item__service">{span.service}</span>
      <div className="tf-trace-span-item__bar">
        <div
          className={`tf-trace-span-item__fill tf-trace-span-item__fill--${span.status}`}
          style={{
            width: `${Math.min((span.durationMs / maxDuration) * 100, 100)}%`,
          }}
        />
      </div>
      <span className="tf-trace-span-item__duration">
        {span.durationMs >= 1000
          ? `${(span.durationMs / 1000).toFixed(2)}s`
          : `${span.durationMs}ms`}
      </span>
      <span className={`tf-badge tf-badge--${span.status} tf-badge--sm`}>
        {span.status}
      </span>
    </div>
  );
};

TraceSpanItem.displayName = "TraceSpanItem";

export default TraceSpanItem;
