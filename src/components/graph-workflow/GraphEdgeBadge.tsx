/**
 * @fileoverview GraphEdgeBadge — Badge/annotation on a graph edge.
 * A small indicator badge showing counts, warnings, or status on edges.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphEdgeBadgeProps extends GraphComponentProps {
  /** Badge text content */
  text: string;
  /** Position along the edge (0-1) */
  position?: number;
  /** Badge background color */
  color?: string;
  /** Badge text color */
  textColor?: string;
  /** Screen coordinates for placement */
  screenPos?: { x: number; y: number };
  /** Callback when the badge is clicked */
  onClick?: () => void;
}

/**
 * GraphEdgeBadge — Edge badge/annotation.
 *
 * A small circular or pill-shaped badge displayed on a graph edge,
 * typically used to show counts, warnings, or condition indicators.
 *
 * @example
 * <GraphEdgeBadge
 *   text="3"
 *   color="#e74c3c"
 *   screenPos={{ x: 250, y: 180 }}
 *   onClick={() => showEdgeDetails()}
 * />
 */
export const GraphEdgeBadge: React.FC<GraphEdgeBadgeProps> = ({
  className = '',
  style,
  text,
  position = 0.5,
  color = '#e74c3c',
  textColor = '#fff',
  screenPos,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-edge-badge ${className}`}
      style={{
        position: 'absolute',
        ...(screenPos ? { left: screenPos.x - 10, top: screenPos.y - 10 } : {}),
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 9,
        fontWeight: 700,
        color: textColor,
        cursor: onClick ? 'pointer' : 'default',
        zIndex: 15,
        padding: '0 4px',
        boxShadow: `0 0 4px ${color}66`,
        ...style,
      }}
      onClick={onClick}
      {...rest}
    >
      {text}
    </div>
  );
};

GraphEdgeBadge.displayName = 'GraphEdgeBadge';
export default GraphEdgeBadge;
