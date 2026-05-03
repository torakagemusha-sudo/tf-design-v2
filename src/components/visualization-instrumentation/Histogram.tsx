import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { HistogramBin } from './types';

/**
 * Props for Histogram component.
 *
 * @public
 */
export interface HistogramProps {
  bins: HistogramBin[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  normalized?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Histogram chart for showing frequency distribution of continuous data.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <Histogram />
 * ```
 */
const Histogram: React.FC<HistogramProps> = ({
  bins, xAxisLabel, yAxisLabel, showGrid, normalized, width, height, className
}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 50;
  const maxCount = Math.max(...bins.map((b) => normalized ? b.density || b.count : b.count));

  return (
    <div className={`tf-histogram ${className || ''}`}>
      <svg className="tf-histogram__svg" viewBox={`0 0 ${w} ${h}`}>
        {showGrid && [...Array(6)].map((_, i) => (
          <line key={i} x1={padding} y1={padding + (i / 5) * (h - padding * 2)} x2={w - padding} y2={padding + (i / 5) * (h - padding * 2)} className="tf-histogram__grid" />
        ))}
        {bins.map((bin, i) => {
          const barW = (w - padding * 2) / bins.length * 0.9;
          const barH = ((normalized ? bin.density || bin.count : bin.count) / maxCount) * (h - padding * 2);
          return (
            <g key={i}>
              <rect x={padding + i * ((w - padding * 2) / bins.length) + ((w - padding * 2) / bins.length - barW) / 2} y={h - padding - barH} width={barW} height={barH} className="tf-histogram__bar" style={{ fill: bin.color || '#0ea5e9' }} />
              <text x={padding + i * ((w - padding * 2) / bins.length) + ((w - padding * 2) / bins.length) / 2} y={h - padding + 15} className="tf-histogram__label" textAnchor="middle">{bin.label || `${bin.min.toFixed(1)}`}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Histogram;
