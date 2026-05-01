import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { PieSlice } from './types';

/**
 * Props for PieChartSlice component.
 *
 * @public
 */
export interface PieChartSliceProps {
  value: number;
  total: number;
  startAngle: number;
  color: string;
  label?: string;
  exploded?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Individual slice of a pie chart with path geometry and interaction handling.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <PieChartSlice />
 * ```
 */
const PieChartSlice: React.FC<PieChartSliceProps> = ({
  value, total, startAngle, color, label?, exploded?, onClick?, className?
}}) => {
  const sliceAngle = (value / total) * 360;
  const r = 40;
  const cx = 50;
  const cy = 50;
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = ((startAngle + sliceAngle) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = sliceAngle > 180 ? 1 : 0;
  const midAngle = startAngle + sliceAngle / 2;
  const offset = exploded ? 3 : 0;
  const ox = offset * Math.cos((midAngle * Math.PI) / 180);
  const oy = offset * Math.sin((midAngle * Math.PI) / 180);

  return (
    <path
      d={`M ${cx + ox} ${cy + oy} L ${x1 + ox} ${y1 + oy} A ${r} ${r} 0 ${largeArc} 1 ${x2 + ox} ${y2 + oy} Z`}
      className={`tf-pie-chart-slice ${exploded ? 'tf-pie-chart-slice--exploded' : ''} ${className || ''}`}
      style={{ fill: color }}
      onClick={onClick}
    />
  );
};

export default PieChartSlice;
