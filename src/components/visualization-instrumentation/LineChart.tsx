import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { LineDataPoint } from './types';

/**
 * Props for LineChart component.
 *
 * @public
 */
export interface LineChartProps {
  data: LineDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  showArea?: boolean;
  curve?: 'linear' | 'monotone';
  onPointClick?: (point: LineDataPoint) => void;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Line chart for visualizing continuous data trends over a domain.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <LineChart />
 * ```
 */
const LineChart: React.FC<LineChartProps> = ({
  data, xAxisLabel?, yAxisLabel?, showGrid?, showArea?, curve?, onPointClick?, width?, height?, className?
}}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 50;
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const points = data.map((d) => `${padding + ((d.x - minX) / (maxX - minX || 1)) * (w - padding * 2)},${h - padding - ((d.y - minY) / (maxY - minY || 1)) * (h - padding * 2)}`).join(' ');

  return (
    <div className={`tf-line-chart ${className || ''}`}>
      <svg className="tf-line-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {showGrid && [...Array(6)].map((_, i) => (
          <g key={i}>
            <line x1={padding} y1={padding + (i / 5) * (h - padding * 2)} x2={w - padding} y2={padding + (i / 5) * (h - padding * 2)} className="tf-line-chart__grid" />
            <line x1={padding + (i / 5) * (w - padding * 2)} y1={padding} x2={padding + (i / 5) * (w - padding * 2)} y2={h - padding} className="tf-line-chart__grid" />
          </g>
        ))}
        {showArea && <polygon points={`${padding},${h - padding} ${points} ${w - padding},${h - padding}`} className="tf-line-chart__area" />}
        <polyline fill="none" points={points} className="tf-line-chart__line" />
        {data.map((d, i) => (
          <circle key={i} cx={padding + ((d.x - minX) / (maxX - minX || 1)) * (w - padding * 2)} cy={h - padding - ((d.y - minY) / (maxY - minY || 1)) * (h - padding * 2)} r={4} className="tf-line-chart__point" onClick={() => onPointClick?.(d)} />
        ))}
      </svg>
    </div>
  );
};

export default LineChart;
