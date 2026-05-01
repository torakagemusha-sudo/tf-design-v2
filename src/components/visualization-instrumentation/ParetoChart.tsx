import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { ParetoItem } from './types';

/**
 * Props for ParetoChart component.
 *
 * @public
 */
export interface ParetoChartProps {
  data: ParetoItem[];
  threshold?: number;
  width?: number;
  height?: number;
  showLine?: boolean;
  showValues?: boolean;
  onBarClick?: (item: ParetoItem) => void;
  className?: string;
}

/**
 * Pareto chart combining sorted bars with cumulative percentage line for identifying vital few.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <ParetoChart />
 * ```
 */
const ParetoChart: React.FC<ParetoChartProps> = ({
  data, threshold?, width?, height?, showLine?, showValues?, onBarClick?, className?
}}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 50;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumul = 0;
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div className={`tf-pareto-chart ${className || ''}`}>
      <svg className="tf-pareto-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {data.map((d, i) => {
          const barW = (w - padding * 2) / data.length * 0.7;
          const barH = (d.value / maxVal) * (h - padding * 2);
          const x = padding + i * ((w - padding * 2) / data.length) + ((w - padding * 2) / data.length - barW) / 2;
          return (
            <g key={i} className="tf-pareto-chart__bar-group" onClick={() => onBarClick?.(d)}>
              <rect x={x} y={h - padding - barH} width={barW} height={barH} className="tf-pareto-chart__bar" style={{ fill: d.color || '#0ea5e9' }} />
              {showValues && <text x={x + barW / 2} y={h - padding - barH - 5} className="tf-pareto-chart__value" textAnchor="middle">{d.value.toFixed(0)}</text>}
              <text x={x + barW / 2} y={h - padding + 20} className="tf-pareto-chart__label" textAnchor="middle" transform={`rotate(-30, ${x + barW / 2}, ${h - padding + 20})`}>{d.label}</text>
            </g>
          );
        })}
        {showLine && (() => {
          cumul = 0;
          const points = data.map((d, i) => {
            cumul += d.value;
            return `${padding + i * ((w - padding * 2) / data.length) + ((w - padding * 2) / data.length) / 2},${h - padding - (cumul / total) * (h - padding * 2)}`;
          }).join(' ');
          return <polyline fill="none" points={points} className="tf-pareto-chart__line" />;
        })()}
        {threshold && (
          <line x1={padding} y1={h - padding - (threshold / 100) * (h - padding * 2)} x2={w - padding} y2={h - padding - (threshold / 100) * (h - padding * 2)} className="tf-pareto-chart__threshold" />
        )}
      </svg>
    </div>
  );
};

export default ParetoChart;
