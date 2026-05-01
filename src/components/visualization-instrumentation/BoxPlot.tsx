import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { BoxPlotData } from './types';

/**
 * Props for BoxPlot component.
 *
 * @public
 */
export interface BoxPlotProps {
  data: BoxPlotData[];
  orientation?: 'vertical' | 'horizontal';
  showOutliers?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Box and whisker plot for displaying statistical distribution of data.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BoxPlot />
 * ```
 */
const BoxPlot: React.FC<BoxPlotProps> = ({
  data, orientation?, showOutliers?, width?, height?, className?
}}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 50;
  const groupCount = data.length;

  return (
    <div className={`tf-box-plot ${className || ''}`}>
      <svg className="tf-box-plot__svg" viewBox={`0 0 ${w} ${h}`}>
        {[...Array(6)].map((_, i) => (
          <line key={i} x1={padding} y1={padding + (i / 5) * (h - padding * 2)} x2={w - padding} y2={padding + (i / 5) * (h - padding * 2)} className="tf-box-plot__grid" />
        ))}
        {data.map((d, i) => {
          const x = padding + (i / groupCount) * (w - padding * 2) + (w - padding * 2) / groupCount / 2;
          const boxW = Math.min(40, (w - padding * 2) / groupCount * 0.4);
          const yMin = h - padding - ((d.min - d.whiskerMin) / (d.whiskerMax - d.whiskerMin || 1)) * (h - padding * 2);
          const yQ1 = h - padding - ((d.q1 - d.whiskerMin) / (d.whiskerMax - d.whiskerMin || 1)) * (h - padding * 2);
          const yMed = h - padding - ((d.median - d.whiskerMin) / (d.whiskerMax - d.whiskerMin || 1)) * (h - padding * 2);
          const yQ3 = h - padding - ((d.q3 - d.whiskerMin) / (d.whiskerMax - d.whiskerMin || 1)) * (h - padding * 2);
          const yMax = h - padding - ((d.max - d.whiskerMin) / (d.whiskerMax - d.whiskerMin || 1)) * (h - padding * 2);
          return (
            <g key={i}>
              <line x1={x} y1={yMin} x2={x} y2={yMax} className="tf-box-plot__whisker" />
              <line x1={x - boxW / 4} y1={yMin} x2={x + boxW / 4} y2={yMin} className="tf-box-plot__whisker-cap" />
              <line x1={x - boxW / 4} y1={yMax} x2={x + boxW / 4} y2={yMax} className="tf-box-plot__whisker-cap" />
              <rect x={x - boxW / 2} y={Math.min(yQ1, yQ3)} width={boxW} height={Math.abs(yQ3 - yQ1)} className="tf-box-plot__box" style={{ fill: d.color || '#0ea5e9' }} />
              <line x1={x - boxW / 2} y1={yMed} x2={x + boxW / 2} y2={yMed} className="tf-box-plot__median" />
              <text x={x} y={h - padding + 20} className="tf-box-plot__label" textAnchor="middle">{d.label}</text>
              {showOutliers && d.outliers?.map((o, j) => {
                const oy = h - padding - ((o - d.whiskerMin) / (d.whiskerMax - d.whiskerMin || 1)) * (h - padding * 2);
                return <circle key={j} cx={x + (Math.random() - 0.5) * boxW / 2} cy={oy} r={3} className="tf-box-plot__outlier" />;
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BoxPlot;
