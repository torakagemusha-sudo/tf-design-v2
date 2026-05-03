import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { BulletRange } from './types';

/**
 * Props for BulletChart component.
 *
 * @public
 */
export interface BulletChartProps {
  title: string;
  value: number;
  target: number;
  ranges: BulletRange[];
  unit?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Bullet chart for comparing a primary measure against targets and qualitative ranges.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BulletChart />
 * ```
 */
const BulletChart: React.FC<BulletChartProps> = ({
  title, value, target, ranges, unit, width, height, className
}) => {
  const w = width || 400;
  const h = height || 60;
  const maxRange = Math.max(...ranges.map((r) => r.max), target * 1.2);

  return (
    <div className={`tf-bullet-chart ${className || ''}`}>
      <span className="tf-bullet-chart__title">{title}</span>
      <svg className="tf-bullet-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {ranges.map((r, i) => (
          <rect key={i} x={0} y={10} width={(r.max / maxRange) * w} height={h - 20} className={`tf-bullet-chart__range tf-bullet-chart__range--${r.qualitative}`} />
        ))}
        <rect x={0} y={h / 2 - 6} width={(value / maxRange) * w} height={12} className="tf-bullet-chart__bar" />
        <line x1={(target / maxRange) * w} y1={5} x2={(target / maxRange) * w} y2={h - 5} className="tf-bullet-chart__target" />
      </svg>
      <span className="tf-bullet-chart__value">{value.toFixed(1)} {unit}</span>
    </div>
  );
};

export default BulletChart;
