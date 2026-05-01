import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for LineChartPoints component.
 *
 * @public
 */
export interface LineChartPointsProps {
  points: { x: number;
  y: number;
  value?: number;
  label?: string }[];
  color?: string;
  size?: number;
  onPointClick?: (point: any) => void;
  className?: string;
}

/**
 * Data points rendered on a line chart with hover and click interaction.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <LineChartPoints />
 * ```
 */
const LineChartPoints: React.FC<LineChartPointsProps> = ({
  points, y, value?, label?, color?, size?, onPointClick?, className?
}}) => {
  return (
    <g className={`tf-line-chart-points ${className || ''}`}>
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x} cy={p.y} r={size || 4}
          className="tf-line-chart-points__point"
          style={{ fill: color || '#0ea5e9' }}
          onClick={() => onPointClick?.(p)}
        />
      ))}
    </g>
  );
};

export default LineChartPoints;
