/**
 * @fileoverview GraphCanvasGrid — Grid background overlay for the graph canvas.
 * Renders configurable dot, line, or cross grid patterns behind graph content.
 */

import React, { useMemo } from 'react';
import type { GridConfig, GraphComponentProps } from './types';

export interface GraphCanvasGridProps extends GraphComponentProps {
  /** Grid configuration */
  grid: GridConfig;
  /** Canvas width in world units */
  canvasWidth?: number;
  /** Canvas height in world units */
  canvasHeight?: number;
  /** Grid color override */
  color?: string;
  /** Opacity override (0-1) */
  opacity?: number;
}

/**
 * GraphCanvasGrid — Grid background overlay for the graph canvas.
 *
 * Supports three grid types (dot, line, cross), configurable size,
 * color, and opacity. Renders as a repeating SVG pattern for crisp
 * scaling at any zoom level.
 *
 * @example
 * <GraphCanvasGrid grid={{ enabled: true, size: 20, snap: true, type: 'dot' }} />
 */
export const GraphCanvasGrid: React.FC<GraphCanvasGridProps> = ({
  className = '',
  style,
  grid,
  canvasWidth = 5000,
  canvasHeight = 5000,
  color = '#1e2d4a',
  opacity = 0.6,
  ...rest
}) => {
  const effectiveColor = grid.color ?? color;
  const effectiveOpacity = grid.opacity ?? opacity;

  const patternId = useMemo(
    () => `tf-grid-pattern-${grid.type}-${grid.size}`,
    [grid.type, grid.size]
  );

  const renderPattern = () => {
    const half = grid.size / 2;
    switch (grid.type) {
      case 'dot':
        return (
          <circle
            cx={half}
            cy={half}
            r={1}
            fill={effectiveColor}
            opacity={effectiveOpacity}
          />
        );
      case 'line':
        return (
          <g opacity={effectiveOpacity}>
            <line
              x1={half}
              y1={0}
              x2={half}
              y2={grid.size}
              stroke={effectiveColor}
              strokeWidth={0.5}
            />
            <line
              x1={0}
              y1={half}
              x2={grid.size}
              y2={half}
              stroke={effectiveColor}
              strokeWidth={0.5}
            />
          </g>
        );
      case 'cross':
        return (
          <g opacity={effectiveOpacity}>
            <line
              x1={half - 3}
              y1={half}
              x2={half + 3}
              y2={half}
              stroke={effectiveColor}
              strokeWidth={0.5}
            />
            <line
              x1={half}
              y1={half - 3}
              x2={half}
              y2={half + 3}
              stroke={effectiveColor}
              strokeWidth={0.5}
            />
          </g>
        );
      default:
        return null;
    }
  };

  if (!grid.enabled) return null;

  return (
    <svg
      className={`tf-graph-grid ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: canvasWidth,
        height: canvasHeight,
        pointerEvents: 'none',
        ...style,
      }}
      width={canvasWidth}
      height={canvasHeight}
      {...rest}
    >
      <defs>
        <pattern
          id={patternId}
          width={grid.size}
          height={grid.size}
          patternUnits="userSpaceOnUse"
        >
          {renderPattern()}
        </pattern>
      </defs>
      <rect
        width={canvasWidth}
        height={canvasHeight}
        fill={`url(#${patternId})`}
      />
    </svg>
  );
};

GraphCanvasGrid.displayName = 'GraphCanvasGrid';

export default GraphCanvasGrid;
