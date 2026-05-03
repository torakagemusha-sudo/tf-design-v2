import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for LineChartArea component.
 *
 * @public
 */
export interface LineChartAreaProps {
  points: { x: number;
  y: number }[];
  baseline?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

/**
 * Filled area under a line chart line for emphasizing magnitude.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <LineChartArea />
 * ```
 */
const LineChartArea: React.FC<LineChartAreaProps> = ({
  points, baseline, color, opacity, className
}) => {
  const minY = baseline !== undefined ? baseline : Math.max(...points.map((p) => p.y));
  const areaPoints = `${points[0].x},${minY} ${points.map((p) => `${p.x},${p.y}`).join(' ')} ${points[points.length - 1].x},${minY}`;

  return (
    <polygon
      points={areaPoints}
      className={`tf-line-chart-area ${className || ''}`}
      style={{ fill: color || '#0ea5e9', opacity: opacity || 0.2 }}
    />
  );
};

export default LineChartArea;
