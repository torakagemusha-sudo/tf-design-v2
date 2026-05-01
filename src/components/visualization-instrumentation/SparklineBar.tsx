import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for SparklineBar component.
 *
 * @public
 */
export interface SparklineBarProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  barWidth?: number;
  className?: string;
}

/**
 * Bar sparkline using vertical bars instead of a continuous line.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SparklineBar />
 * ```
 */
const SparklineBar: React.FC<SparklineBarProps> = ({
  data, width?, height?, color?, barWidth?, className?
}}) => {
  if (data.length === 0) return null;
  const w = width || 120;
  const h = height || 30;
  const max = Math.max(...data.map(Math.abs));
  const barW = barWidth || (w / data.length) * 0.7;

  return (
    <svg className={`tf-sparkline-bar ${className || ''}`} viewBox={`0 0 ${w} ${h}`}>
      {data.map((v, i) => (
        <rect
          key={i}
          x={i * (w / data.length) + ((w / data.length) - barW) / 2}
          y={v >= 0 ? h - (Math.abs(v) / max) * h : h / 2}
          width={barW}
          height={(Math.abs(v) / max) * (h / 2)}
          className={`tf-sparkline-bar__bar ${v >= 0 ? 'tf-sparkline-bar__bar--positive' : 'tf-sparkline-bar__bar--negative'}`}
          style={{ fill: color || '#38bdf8' }}
        />
      ))}
    </svg>
  );
};

export default SparklineBar;
