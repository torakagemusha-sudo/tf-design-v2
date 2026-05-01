import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { BarDataPoint } from './types';

/**
 * Props for BarChart component.
 *
 * @public
 */
export interface BarChartProps {
  data: BarDataPoint[];
  orientation?: 'horizontal' | 'vertical';
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  showValues?: boolean;
  onBarClick?: (item: BarDataPoint) => void;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Horizontal or vertical bar chart for comparing categorical data values.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BarChart />
 * ```
 */
const BarChart: React.FC<BarChartProps> = ({
  data, orientation?, xAxisLabel?, yAxisLabel?, showGrid?, showValues?, onBarClick?, width?, height?, className?
}}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 60;
  const chartW = w - padding * 2;
  const chartH = h - padding * 2;
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div className={`tf-bar-chart ${className || ''}`}>
      <svg className="tf-bar-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {showGrid && [...Array(6)].map((_, i) => (
          <line key={i} x1={padding} y1={padding + (i / 5) * chartH} x2={w - padding} y2={padding + (i / 5) * chartH} className="tf-bar-chart__grid" />
        ))}
        {data.map((d, i) => {
          const barH = (d.value / maxVal) * chartH;
          const barW = chartW / data.length * 0.7;
          const x = padding + i * (chartW / data.length) + (chartW / data.length - barW) / 2;
          const y = padding + chartH - barH;
          return (
            <g key={i} className="tf-bar-chart__bar-group" onClick={() => onBarClick?.(d)}>
              <rect x={x} y={y} width={barW} height={barH} className="tf-bar-chart__bar" style={{ fill: d.color || '#0ea5e9' }} />
              {showValues && <text x={x + barW / 2} y={y - 5} className="tf-bar-chart__value" textAnchor="middle">{d.value.toFixed(1)}</text>}
              <text x={x + barW / 2} y={h - padding + 20} className="tf-bar-chart__label" textAnchor="middle">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;
