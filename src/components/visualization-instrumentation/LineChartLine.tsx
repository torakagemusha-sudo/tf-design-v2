import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for LineChartLine component.
 *
 * @public
 */
export interface LineChartLineProps {
  points: { x: number;
  y: number }[];
  color?: string;
  width?: number;
  dashed?: boolean;
  className?: string;
}

/**
 * Single data line within a line chart with configurable styling and curve.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <LineChartLine />
 * ```
 */
const LineChartLine: React.FC<LineChartLineProps> = ({
  points, y, color?, width?, dashed?, className?
}}) => {
  const pts = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <polyline
      fill="none"
      points={pts}
      className={`tf-line-chart-line ${className || ''}`}
      style={{ stroke: color || '#0ea5e9', strokeWidth: width || 2, strokeDasharray: dashed ? '5,5' : 'none' }}
    />
  );
};

export default LineChartLine;
