import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { BoxPlotData } from './types';

/**
 * Props for BoxPlotBox component.
 *
 * @public
 */
export interface BoxPlotBoxProps {
  q1: number;
  q3: number;
  median: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  className?: string;
}

/**
 * Box element of a box plot showing interquartile range (IQR).
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <BoxPlotBox />
 * ```
 */
const BoxPlotBox: React.FC<BoxPlotBoxProps> = ({
  q1, q3, median, x, y, width, height, color, className
}) => {
  return (
    <g className={`tf-box-plot-box ${className || ''}`}>
      <rect x={x} y={y} width={width} height={height} className="tf-box-plot-box__rect" style={{ fill: color || '#0ea5e9', opacity: 0.5 }} />
      <line x1={x} y1={y + height / 2} x2={x + width} y2={y + height / 2} className="tf-box-plot-box__median" />
    </g>
  );
};

export default BoxPlotBox;
