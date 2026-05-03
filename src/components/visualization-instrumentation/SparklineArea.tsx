import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for SparklineArea component.
 *
 * @public
 */
export interface SparklineAreaProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  className?: string;
}

/**
 * Area sparkline with filled region under the line for emphasis.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SparklineArea />
 * ```
 */
const SparklineArea: React.FC<SparklineAreaProps> = ({
  data, width, height, color, fillOpacity, className
}) => {
  if (data.length < 2) return null;
  const w = width || 120;
  const h = height || 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg className={`tf-sparkline-area ${className || ''}`} viewBox={`0 0 ${w} ${h}`}>
      <polygon points={`0,${h} ${points} ${w},${h}`} className="tf-sparkline-area__fill" style={{ fill: color || '#38bdf8', opacity: fillOpacity || 0.25 }} />
      <polyline fill="none" points={points} className="tf-sparkline-area__line" style={{ stroke: color || '#38bdf8', strokeWidth: 1.5 }} />
    </svg>
  );
};

export default SparklineArea;
