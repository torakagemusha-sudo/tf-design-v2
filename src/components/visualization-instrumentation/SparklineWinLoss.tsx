import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for SparklineWinLoss component.
 *
 * @public
 */
export interface SparklineWinLossProps {
  data: number[];
  width?: number;
  height?: number;
  winColor?: string;
  lossColor?: string;
  className?: string;
}

/**
 * Win/loss sparkline showing positive values above axis and negative below.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <SparklineWinLoss />
 * ```
 */
const SparklineWinLoss: React.FC<SparklineWinLossProps> = ({
  data, width?, height?, winColor?, lossColor?, className?
}}) => {
  if (data.length === 0) return null;
  const w = width || 120;
  const h = height || 30;

  return (
    <svg className={`tf-sparkline-win-loss ${className || ''}`} viewBox={`0 0 ${w} ${h}`}>
      <line x1={0} y1={h / 2} x2={w} y2={h / 2} className="tf-sparkline-win-loss__axis" />
      {data.map((v, i) => (
        <rect
          key={i}
          x={i * (w / data.length) + 1}
          y={v >= 0 ? h / 2 - (h / 2) : h / 2}
          width={(w / data.length) - 2}
          height={h / 2}
          className={`tf-sparkline-win-loss__bar ${v >= 0 ? 'tf-sparkline-win-loss__bar--win' : 'tf-sparkline-win-loss__bar--loss'}`}
          style={{ fill: v >= 0 ? (winColor || '#22c55e') : (lossColor || '#ef4444') }}
        />
      ))}
    </svg>
  );
};

export default SparklineWinLoss;
