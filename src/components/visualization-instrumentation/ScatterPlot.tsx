import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { ScatterPoint } from './types';

/**
 * Props for ScatterPlot component.
 *
 * @public
 */
export interface ScatterPlotProps {
  data: ScatterPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  showTrendline?: boolean;
  onPointClick?: (point: ScatterPoint) => void;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Scatter plot for visualizing relationships between two numeric variables.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ScatterPlot />
 * ```
 */
const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data, xAxisLabel?, yAxisLabel?, showGrid?, showTrendline?, onPointClick?, width?, height?, className?
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

  return (
    <div className={`tf-scatter-plot ${className || ''}`}>
      <svg className="tf-scatter-plot__svg" viewBox={`0 0 ${w} ${h}`}>
        {showGrid && [...Array(6)].map((_, i) => (
          <g key={i}>
            <line x1={padding} y1={padding + (i / 5) * (h - padding * 2)} x2={w - padding} y2={padding + (i / 5) * (h - padding * 2)} className="tf-scatter-plot__grid" />
            <line x1={padding + (i / 5) * (w - padding * 2)} y1={padding} x2={padding + (i / 5) * (w - padding * 2)} y2={h - padding} className="tf-scatter-plot__grid" />
          </g>
        ))}
        {data.map((d, i) => (
          <circle key={i} cx={padding + ((d.x - minX) / (maxX - minX || 1)) * (w - padding * 2)} cy={h - padding - ((d.y - minY) / (maxY - minY || 1)) * (h - padding * 2)} r={d.size || 5} className="tf-scatter-plot__point" style={{ fill: d.color || '#0ea5e9', opacity: 0.7 }} onClick={() => onPointClick?.(d)} />
        ))}
        {showTrendline && <TrendLine data={data} width={w} height={h} padding={padding} minX={minX} maxX={maxX} minY={minY} maxY={maxY} />}
      </svg>
    </div>
  );
};

export default ScatterPlot;
