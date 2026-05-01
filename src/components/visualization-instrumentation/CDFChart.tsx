import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for CDFChart component.
 *
 * @public
 */
export interface CDFChartProps {
  data: number[];
  width?: number;
  height?: number;
  showMarkers?: boolean;
  className?: string;
}

/**
 * Cumulative distribution function chart showing probability accumulation.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <CDFChart />
 * ```
 */
const CDFChart: React.FC<CDFChartProps> = ({
  data, width?, height?, showMarkers?, className?
}}) => {
  const w = width || 600;
  const h = height || 300;
  const padding = 40;
  const sorted = [...data].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min || 1;

  return (
    <div className={`tf-cdf-chart ${className || ''}`}>
      <svg className="tf-cdf-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {[0.25, 0.5, 0.75].map((q) => (
          <line key={q} x1={padding} y1={h - padding - q * (h - padding * 2)} x2={w - padding} y2={h - padding - q * (h - padding * 2)} className="tf-cdf-chart__quantile-line" />
        ))}
        <polyline
          fill="none"
          points={sorted.map((v, i) => `${padding + ((v - min) / range) * (w - padding * 2)},${h - padding - (i / (sorted.length - 1)) * (h - padding * 2)}`).join(' ')}
          className="tf-cdf-chart__line"
        />
        {showMarkers && [0.25, 0.5, 0.75].map((q) => {
          const idx = Math.floor(q * (sorted.length - 1));
          return <circle key={q} cx={padding + ((sorted[idx] - min) / range) * (w - padding * 2)} cy={h - padding - q * (h - padding * 2)} r={4} className="tf-cdf-chart__marker" />;
        })}
      </svg>
    </div>
  );
};

export default CDFChart;
