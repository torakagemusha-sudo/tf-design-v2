/**
 * @fileoverview TraceFlameTooltip — Tooltip for flame graph bars.
 * Shows node name, value, and custom tooltip text on hover.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceFlameTooltip
 */

import React from "react";
import type { BaseComponentProps, FlameNode } from "./types";

/** Props for TraceFlameTooltip. */
export interface TraceFlameTooltipProps extends BaseComponentProps {
  /** Flame node being hovered. */
  node: FlameNode;
  /** Screen X position. */
  x: number;
  /** Screen Y position. */
  y: number;
}

/**
 * TraceFlameTooltip — Flame graph hover tooltip.
 *
 * @example
 * ```tsx
 * {hoveredNode && (
 *   <TraceFlameTooltip node={hoveredNode} x={mouseX} y={mouseY} />
 * )}
 * ```
 */
export const TraceFlameTooltip: React.FC<TraceFlameTooltipProps> = ({
  node,
  x,
  y,
  className = "",
  "data-testid": dataTestId = "trace-flame-tooltip",
}) => {
  return (
    <div
      className={`tf-trace-flame-tooltip ${className}`}
      data-testid={dataTestId}
      style={{
        position: "fixed",
        left: x + 12,
        top: y - 12,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <div className="tf-trace-flame-tooltip__name">{node.name}</div>
      <div className="tf-trace-flame-tooltip__value">
        {node.value >= 1000
          ? `${(node.value / 1000).toFixed(2)}s`
          : `${node.value}ms`}
      </div>
      {node.tooltip && (
        <div className="tf-trace-flame-tooltip__detail">{node.tooltip}</div>
      )}
      {node.children && (
        <div className="tf-trace-flame-tooltip__children">
          {node.children.length} children
        </div>
      )}
    </div>
  );
};

TraceFlameTooltip.displayName = "TraceFlameTooltip";

export default TraceFlameTooltip;
