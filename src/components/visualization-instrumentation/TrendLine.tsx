import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for TrendLine component.
 *
 * @public
 */
export interface TrendLineProps {
  data: { x: number;
  y: number }[];
  width: number;
  height: number;
  padding: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  color?: string;
  className?: string;
}

/**
 * Trend line overlay calculated using linear regression on scatter or line data.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TrendLine />
 * ```
 */
const TrendLine: React.FC<TrendLineProps> = ({
  data, width, height, padding, minX, maxX, minY, maxY, color, className
}) => {
  const n = data.length;
  const sumX = data.reduce((s, d) => s + d.x, 0);
  const sumY = data.reduce((s, d) => s + d.y, 0);
  const sumXY = data.reduce((s, d) => s + d.x * d.y, 0);
  const sumX2 = data.reduce((s, d) => s + d.x * d.x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const x1 = minX;
  const y1 = slope * x1 + intercept;
  const x2 = maxX;
  const y2 = slope * x2 + intercept;

  const sx1 = padding + ((x1 - minX) / (maxX - minX || 1)) * (width - padding * 2);
  const sy1 = height - padding - ((y1 - minY) / (maxY - minY || 1)) * (height - padding * 2);
  const sx2 = padding + ((x2 - minX) / (maxX - minX || 1)) * (width - padding * 2);
  const sy2 = height - padding - ((y2 - minY) / (maxY - minY || 1)) * (height - padding * 2);

  return (
    <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} className={`tf-trend-line ${className || ''}`} style={{ stroke: color || '#f59e0b', strokeDasharray: '6,4' }} />
  );
};

export default TrendLine;
