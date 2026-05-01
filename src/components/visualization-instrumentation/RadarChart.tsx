import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { RadarAxis, RadarSeries } from './types';

/**
 * Props for RadarChart component.
 *
 * @public
 */
export interface RadarChartProps {
  axes: RadarAxis[];
  data: RadarSeries[];
  maxValue: number;
  showGrid?: boolean;
  showLegend?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Radar (spider) chart for comparing multiple variables across dimensions.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <RadarChart />
 * ```
 */
const RadarChart: React.FC<RadarChartProps> = ({
  axes, data, maxValue, showGrid?, showLegend?, width?, height?, className?
}}) => {
  const w = width || 400;
  const h = height || 400;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(cx, cy) - 40;
  const angleStep = (2 * Math.PI) / axes.length;

  return (
    <div className={`tf-radar-chart ${className || ''}`}>
      <svg className="tf-radar-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {showGrid && [...Array(5)].map((_, ring) => (
          <polygon key={ring} points={axes.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const dist = ((ring + 1) / 5) * r;
            return `${cx + dist * Math.cos(angle)},${cy + dist * Math.sin(angle)}`;
          }).join(' ')} className="tf-radar-chart__grid" />
        ))}
        {axes.map((axis, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} className="tf-radar-chart__axis-line" />
              <text x={cx + (r + 20) * Math.cos(angle)} y={cy + (r + 20) * Math.sin(angle)} className="tf-radar-chart__axis-label" textAnchor="middle" dominantBaseline="middle">{axis.label}</text>
            </g>
          );
        })}
        {data.map((series, si) => {
          const pts = series.values.map((v, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const dist = (v / maxValue) * r;
            return `${cx + dist * Math.cos(angle)},${cy + dist * Math.sin(angle)}`;
          }).join(' ');
          return <polygon key={si} points={pts} className="tf-radar-chart__series" style={{ fill: series.color || '#0ea5e9', opacity: 0.3, stroke: series.color || '#0ea5e9' }} />;
        })}
      </svg>
    </div>
  );
};

export default RadarChart;
