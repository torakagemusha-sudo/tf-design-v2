import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { AreaDataPoint } from './types';

/**
 * Props for AreaChart component.
 *
 * @public
 */
export interface AreaChartProps {
  data: AreaDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  color?: string;
  opacity?: number;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Area chart for displaying quantitative data with filled regions between line and axis.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <AreaChart />
 * ```
 */
const AreaChart: React.FC<AreaChartProps> = ({
  data, xAxisLabel?, yAxisLabel?, showGrid?, color?, opacity?, width?, height?, className?
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
  const areaPoints = `${padding},${h - padding} ${data.map((d) => `${padding + ((d.x - minX) / (maxX - minX || 1)) * (w - padding * 2)},${h - padding - ((d.y - minY) / (maxY - minY || 1)) * (h - padding * 2)}`).join(' ')} ${w - padding},${h - padding}`;

  return (
    <div className={`tf-area-chart ${className || ''}`}>
      <svg className="tf-area-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {showGrid && [...Array(6)].map((_, i) => (
          <line key={i} x1={padding} y1={padding + (i / 5) * (h - padding * 2)} x2={w - padding} y2={padding + (i / 5) * (h - padding * 2)} className="tf-area-chart__grid" />
        ))}
        <polygon points={areaPoints} className="tf-area-chart__area" style={{ fill: color || '#0ea5e9', opacity: opacity || 0.3 }} />
        <polyline fill="none" points={data.map((d) => `${padding + ((d.x - minX) / (maxX - minX || 1)) * (w - padding * 2)},${h - padding - ((d.y - minY) / (maxY - minY || 1)) * (h - padding * 2)}`).join(' ')} className="tf-area-chart__line" style={{ stroke: color || '#0ea5e9' }} />
      </svg>
    </div>
  );
};

export default AreaChart;
