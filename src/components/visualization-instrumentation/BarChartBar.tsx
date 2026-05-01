import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { BarDataPoint } from './types';

/**
 * Props for BarChartBar component.
 *
 * @public
 */
export interface BarChartBarProps {
  value: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  showValue?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Individual bar element within a bar chart with optional label and value display.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BarChartBar />
 * ```
 */
const BarChartBar: React.FC<BarChartBarProps> = ({
  value, label, x, y, width, height, color?, showValue?, onClick?, className?
}}) => {
  return (
    <g className={`tf-bar-chart-bar ${className || ''}`} onClick={onClick}>
      <rect x={x} y={y} width={width} height={height} className="tf-bar-chart-bar__rect" style={{ fill: color || '#0ea5e9' }} />
      {showValue && <text x={x + width / 2} y={y - 5} className="tf-bar-chart-bar__value" textAnchor="middle">{value.toFixed(1)}</text>}
      <text x={x + width / 2} y={y + height + 15} className="tf-bar-chart-bar__label" textAnchor="middle">{label}</text>
    </g>
  );
};

export default BarChartBar;
