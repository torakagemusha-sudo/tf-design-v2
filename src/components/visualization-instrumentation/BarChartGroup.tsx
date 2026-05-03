import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { BarSeries } from './types';

/**
 * Props for BarChartGroup component.
 *
 * @public
 */
export interface BarChartGroupProps {
  categories: string[];
  series: BarSeries[];
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Grouped bars for comparing multiple series across categories side by side.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BarChartGroup />
 * ```
 */
const BarChartGroup: React.FC<BarChartGroupProps> = ({
  categories, series, width, height, className
}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 60;
  const groupW = (w - padding * 2) / categories.length;
  const maxVal = Math.max(...series.flatMap((s) => s.data));

  return (
    <svg className={`tf-bar-chart-group ${className || ''}`} viewBox={`0 0 ${w} ${h}`}>
      {categories.map((cat, i) => (
        <g key={i} className="tf-bar-chart-group__category">
          <text x={padding + i * groupW + groupW / 2} y={h - 10} className="tf-bar-chart-group__cat-label" textAnchor="middle">{cat}</text>
          {series.map((s, j) => {
            const barW = groupW / series.length * 0.7;
            const barH = (s.data[i] / maxVal) * (h - padding * 2);
            return (
              <rect key={j} x={padding + i * groupW + j * barW + (groupW - series.length * barW) / 2} y={h - padding - barH} width={barW} height={barH} className="tf-bar-chart-group__bar" style={{ fill: s.color || '#0ea5e9' }} />
            );
          })}
        </g>
      ))}
    </svg>
  );
};

export default BarChartGroup;
