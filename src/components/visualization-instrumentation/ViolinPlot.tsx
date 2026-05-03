import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { ViolinData } from './types';

/**
 * Props for ViolinPlot component.
 *
 * @public
 */
export interface ViolinPlotProps {
  data: ViolinData[];
  width?: number;
  height?: number;
  showBox?: boolean;
  bandwidth?: number;
  className?: string;
}

/**
 * Violin plot showing distribution density of data with embedded box plot.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ViolinPlot />
 * ```
 */
const ViolinPlot: React.FC<ViolinPlotProps> = ({
  data, width, height, showBox, bandwidth, className
}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 50;

  return (
    <div className={`tf-violin-plot ${className || ''}`}>
      <svg className="tf-violin-plot__svg" viewBox={`0 0 ${w} ${h}`}>
        {data.map((d, i) => {
          const x = padding + (i / data.length) * (w - padding * 2) + (w - padding * 2) / data.length / 2;
          const violinW = (w - padding * 2) / data.length * 0.7;
          return (
            <g key={i}>
              <path d={`M ${x} ${padding} Q ${x + violinW / 2} ${padding + (h - padding * 2) / 4} ${x} ${padding + (h - padding * 2) / 2} Q ${x - violinW / 2} ${padding + 3 * (h - padding * 2) / 4} ${x} ${h - padding}`} className="tf-violin-plot__violin" style={{ fill: d.color || '#0ea5e9', opacity: 0.4 }} />
              {showBox && (
                <g>
                  <rect x={x - 3} y={h - padding - ((d.q3 - d.min) / (d.max - d.min || 1)) * (h - padding * 2)} width={6} height={((d.q3 - d.q1) / (d.max - d.min || 1)) * (h - padding * 2)} className="tf-violin-plot__box" />
                  <line x1={x - 5} y1={h - padding - ((d.median - d.min) / (d.max - d.min || 1)) * (h - padding * 2)} x2={x + 5} y2={h - padding - ((d.median - d.min) / (d.max - d.min || 1)) * (h - padding * 2)} className="tf-violin-plot__median" />
                </g>
              )}
              <text x={x} y={h - padding + 20} className="tf-violin-plot__label" textAnchor="middle">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ViolinPlot;
