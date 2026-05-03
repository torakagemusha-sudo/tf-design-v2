/**
 * @fileoverview TraceFlameBar — Individual flame graph bar.
 * SVG rect representing one node in the flame graph.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceFlameBar
 */

import React from "react";
import type { BaseComponentProps, FlameNode } from "./types";

/** Props for TraceFlameBar. */
export interface TraceFlameBarProps extends BaseComponentProps {
  /** Flame node data. */
  node: FlameNode;
  /** X position. */
  x: number;
  /** Y position. */
  y: number;
  /** Bar width. */
  width: number;
  /** Bar height. */
  height: number;
  /** Click handler. */
  onClick: () => void;
  /** Mouse enter handler. */
  onMouseEnter: (e: React.MouseEvent) => void;
  /** Mouse move handler. */
  onMouseMove: (e: React.MouseEvent) => void;
  /** Mouse leave handler. */
  onMouseLeave: () => void;
}

/**
 * TraceFlameBar — SVG bar for flame graph.
 *
 * @example
 * ```tsx
 * <svg>
 *   <TraceFlameBar node={node} x={0} y={0} width={200} height={20} ... />
 * </svg>
 * ```
 */
export const TraceFlameBar: React.FC<TraceFlameBarProps> = ({
  node,
  x,
  y,
  width,
  height,
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  className = "",
}) => {
  const color = node.color || `hsl(${(x + y) % 360}, 60%, 50%)`;

  return (
    <g
      className={`tf-trace-flame-bar ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={x}
        y={y}
        width={Math.max(width, 1)}
        height={height}
        fill={color}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth={0.5}
        rx={1}
      />
      {width > 40 && (
        <text
          x={x + 4}
          y={y + height / 2}
          dominantBaseline="middle"
          fontSize={10}
          fill="white"
          style={{ pointerEvents: "none" }}
        >
          {node.name.length > width / 6
            ? `${node.name.slice(0, Math.floor(width / 6))}...`
            : node.name}
        </text>
      )}
    </g>
  );
};

TraceFlameBar.displayName = "TraceFlameBar";

export default TraceFlameBar;
