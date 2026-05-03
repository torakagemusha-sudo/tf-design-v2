import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for Sparkline component.
 *
 * @public
 */
export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  showDots?: boolean;
  className?: string;
}

/**
 * Single sparkline chart for compact data trend visualization.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <Sparkline />
 * ```
 */
const Sparkline: React.FC<SparklineProps> = ({
  data, width, height, color, strokeWidth, showDots, className
}) => {
  if (data.length < 2) return null;
  const w = width || 120;
  const h = height || 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <svg className={`tf-sparkline ${className || ''}`} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        fill="none"
        points={data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')}
        className="tf-sparkline__line"
        style={{ stroke: color || '#38bdf8', strokeWidth: strokeWidth || 1.5 }}
      />
      {showDots && data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / range) * h} r={2} className="tf-sparkline__dot" style={{ fill: color || '#38bdf8' }} />
      ))}
    </svg>
  );
};

export default Sparkline;
