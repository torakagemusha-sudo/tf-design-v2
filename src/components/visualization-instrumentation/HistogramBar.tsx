import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { HistogramBin } from './types';

/**
 * Props for HistogramBar component.
 *
 * @public
 */
export interface HistogramBarProps {
  count: number;
  density?: number;
  min: number;
  max: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  className?: string;
}

/**
 * Individual bar in a histogram representing a single bin's frequency.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <HistogramBar />
 * ```
 */
const HistogramBar: React.FC<HistogramBarProps> = ({
  count, density?, min, max, x, y, width, height, color?, className?
}}) => {
  return (
    <g className={`tf-histogram-bar ${className || ''}`}>
      <rect x={x} y={y} width={width} height={height} className="tf-histogram-bar__rect" style={{ fill: color || '#0ea5e9' }} />
      <text x={x + width / 2} y={y + height / 2} className="tf-histogram-bar__count" textAnchor="middle" dominantBaseline="middle">{count}</text>
    </g>
  );
};

export default HistogramBar;
