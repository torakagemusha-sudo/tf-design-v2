import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { AreaSeries } from './types';

/**
 * Props for AreaChartStack component.
 *
 * @public
 */
export interface AreaChartStackProps {
  categories: number[];
  series: AreaSeries[];
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Stacked area chart showing cumulative contribution of multiple series over time.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <AreaChartStack />
 * ```
 */
const AreaChartStack: React.FC<AreaChartStackProps> = ({
  categories, series, width?, height?, className?
}}) => {
  const w = width || 600;
  const h = height || 400;
  const padding = 50;
  const maxTotal = Math.max(...categories.map((_, i) => series.reduce((sum, s) => sum + s.data[i], 0)));

  return (
    <svg className={`tf-area-chart-stack ${className || ''}`} viewBox={`0 0 ${w} ${h}`}>
      {series.map((s, si) => {
        const prevSeries = series.slice(0, si);
        const points = categories.map((_, i) => {
          const x = padding + (i / (categories.length - 1)) * (w - padding * 2);
          const baseY = prevSeries.reduce((sum, ps) => sum + (ps.data[i] / maxTotal) * (h - padding * 2), 0);
          const y = baseY + (s.data[i] / maxTotal) * (h - padding * 2);
          return { x, y: h - padding - y, baseY: h - padding - baseY };
        });
        const areaPts = `${points[0].x},${points[0].baseY} ${points.map((p) => `${p.x},${p.y}`).join(' ')} ${points[points.length - 1].x},${points[points.length - 1].baseY}`;
        return <polygon key={si} points={areaPts} className="tf-area-chart-stack__layer" style={{ fill: s.color || '#0ea5e9' }} />;
      })}
    </svg>
  );
};

export default AreaChartStack;
