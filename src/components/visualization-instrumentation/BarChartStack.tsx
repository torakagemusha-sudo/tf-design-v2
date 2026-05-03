import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { BarSeries } from './types';

/**
 * Props for BarChartStack component.
 *
 * @public
 */
export interface BarChartStackProps {
  categories: string[];
  series: BarSeries[];
  width?: number;
  height?: number;
  showTotal?: boolean;
  className?: string;
}

/**
 * Stacked bars showing composition of total value across multiple series.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BarChartStack />
 * ```
 */
const BarChartStack: React.FC<BarChartStackProps> = ({
  categories, series, width, height, showTotal, className
}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 60;
  const barW = (w - padding * 2) / categories.length * 0.7;
  const totals = categories.map((_, i) => series.reduce((sum, s) => sum + s.data[i], 0));
  const maxTotal = Math.max(...totals);

  return (
    <svg className={`tf-bar-chart-stack ${className || ''}`} viewBox={`0 0 ${w} ${h}`}>
      {categories.map((cat, i) => {
        let yAccum = 0;
        return (
          <g key={i}>
            {series.map((s, j) => {
              const barH = (s.data[i] / maxTotal) * (h - padding * 2);
              const y = h - padding - yAccum - barH;
              yAccum += barH;
              return <rect key={j} x={padding + i * ((w - padding * 2) / categories.length) + ((w - padding * 2) / categories.length - barW) / 2} y={y} width={barW} height={barH} className="tf-bar-chart-stack__bar" style={{ fill: s.color || '#0ea5e9' }} />;
            })}
            <text x={padding + i * ((w - padding * 2) / categories.length) + ((w - padding * 2) / categories.length) / 2} y={h - 10} className="tf-bar-chart-stack__label" textAnchor="middle">{cat}</text>
            {showTotal && <text x={padding + i * ((w - padding * 2) / categories.length) + ((w - padding * 2) / categories.length) / 2} y={h - padding - yAccum - 5} className="tf-bar-chart-stack__total" textAnchor="middle">{totals[i].toFixed(0)}</text>}
          </g>
        );
      })}
    </svg>
  );
};

export default BarChartStack;
