import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { PieSlice } from './types';

/**
 * Props for PieChart component.
 *
 * @public
 */
export interface PieChartProps {
  data: PieSlice[];
  donut?: boolean;
  donutSize?: number;
  showLabels?: boolean;
  showLegend?: boolean;
  onSliceClick?: (slice: PieSlice) => void;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Pie or donut chart for showing proportional composition of a whole.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <PieChart />
 * ```
 */
const PieChart: React.FC<PieChartProps> = ({
  data, donut, donutSize, showLabels, showLegend, onSliceClick, width, height, className
}) => {
  const w = width || 300;
  const h = height || 300;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(cx, cy) - 20;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;

  return (
    <div className={`tf-pie-chart ${donut ? 'tf-pie-chart--donut' : ''} ${className || ''}`}>
      <svg className="tf-pie-chart__svg" viewBox={`0 0 ${w} ${h}`}>
        {data.map((slice, i) => {
          const sliceAngle = (slice.value / total) * 360;
          const startRad = (currentAngle * Math.PI) / 180;
          const endRad = ((currentAngle + sliceAngle) * Math.PI) / 180;
          const x1 = cx + r * Math.cos(startRad);
          const y1 = cy + r * Math.sin(startRad);
          const x2 = cx + r * Math.cos(endRad);
          const y2 = cy + r * Math.sin(endRad);
          const largeArc = sliceAngle > 180 ? 1 : 0;
          const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
          const midAngle = currentAngle + sliceAngle / 2;
          const labelX = cx + (r * 0.65) * Math.cos((midAngle * Math.PI) / 180);
          const labelY = cy + (r * 0.65) * Math.sin((midAngle * Math.PI) / 180);
          currentAngle += sliceAngle;
          return (
            <g key={i} className="tf-pie-chart__slice-group" onClick={() => onSliceClick?.(slice)}>
              <path d={d} className="tf-pie-chart__slice" style={{ fill: slice.color }} />
              {showLabels && sliceAngle > 20 && (
                <text x={labelX} y={labelY} className="tf-pie-chart__label" textAnchor="middle" dominantBaseline="middle">{slice.label}</text>
              )}
            </g>
          );
        })}
        {donut && <circle cx={cx} cy={cy} r={r * (donutSize || 0.55)} className="tf-pie-chart__donut-hole" />}
      </svg>
    </div>
  );
};

export default PieChart;
