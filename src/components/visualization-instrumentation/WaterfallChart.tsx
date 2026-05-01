import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { WaterfallBar } from './types';

/**
 * Props for WaterfallChart component.
 *
 * @public
 */
export interface WaterfallChartProps {
  data: WaterfallBar[];
  width?: number;
  height?: number;
  showConnector?: boolean;
  showValues?: boolean;
  onBarClick?: (bar: WaterfallBar) => void;
  className?: string;
}

/**
 * Waterfall chart showing cumulative effect of sequential positive and negative values.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <WaterfallChart />
 * ```
 */
const WaterfallChart: React.FC<WaterfallChartProps> = ({
  data, width?, height?, showConnector?, showValues?, onBarClick?, className?
}}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 50;
  let cumulative = 0;
  const barW = (w - padding * 2) / data.length * 0.6;
  const maxVal = Math.max(...data.map((d) => Math.abs(d.value)));

  return (
    <div className={`tf-waterfall-chart ${className || ''}`}>
      <svg className="tf-waterfall-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        <line x1={padding} y1={h / 2} x2={w - padding} y2={h / 2} className="tf-waterfall-chart__baseline" />
        {data.map((d, i) => {
          const prevCum = cumulative;
          cumulative += d.value;
          const barH = (Math.abs(d.value) / maxVal) * (h - padding * 2) / 2;
          const x = padding + i * ((w - padding * 2) / data.length) + ((w - padding * 2) / data.length - barW) / 2;
          const y = d.value >= 0 ? h / 2 - barH : h / 2;
          return (
            <g key={i} className="tf-waterfall-chart__bar-group" onClick={() => onBarClick?.(d)}>
              {showConnector && i > 0 && (
                <line x1={padding + (i - 1) * ((w - padding * 2) / data.length) + ((w - padding * 2) / data.length) / 2} y1={h / 2 - (prevCum / maxVal) * ((h - padding * 2) / 2)} x2={x + barW / 2} y2={h / 2 - (prevCum / maxVal) * ((h - padding * 2) / 2)} className="tf-waterfall-chart__connector" />
              )}
              <rect x={x} y={y} width={barW} height={barH} className={`tf-waterfall-chart__bar ${d.value >= 0 ? 'tf-waterfall-chart__bar--positive' : 'tf-waterfall-chart__bar--negative'}`} style={{ fill: d.color || (d.value >= 0 ? '#22c55e' : '#ef4444') }} />
              {showValues && <text x={x + barW / 2} y={d.value >= 0 ? y - 5 : y + barH + 15} className="tf-waterfall-chart__value" textAnchor="middle">{d.value >= 0 ? '+' : ''}{d.value.toFixed(1)}</text>}
              <text x={x + barW / 2} y={h - padding + 20} className="tf-waterfall-chart__label" textAnchor="middle">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default WaterfallChart;
