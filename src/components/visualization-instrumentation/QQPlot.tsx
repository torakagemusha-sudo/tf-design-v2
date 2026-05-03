import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for QQPlot component.
 *
 * @public
 */
export interface QQPlotProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Q-Q plot for assessing whether data follows a theoretical distribution.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <QQPlot />
 * ```
 */
const QQPlot: React.FC<QQPlotProps> = ({
  data, width, height, className
}) => {
  const w = width || 400;
  const h = height || 400;
  const padding = 40;
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const theoreticalQuantiles = sorted.map((_, i) => {
    const p = (i + 0.5) / n;
    return Math.sqrt(2) * ((p < 0.5 ? -1 : 1) * Math.sqrt(-Math.log(1 - (2 * p - 1) ** 2)));
  });
  const minT = Math.min(...theoreticalQuantiles);
  const maxT = Math.max(...theoreticalQuantiles);
  const minS = sorted[0];
  const maxS = sorted[sorted.length - 1];

  return (
    <div className={`tf-qq-plot ${className || ''}`}>
      <svg className="tf-qq-plot__svg" viewBox={`0 0 ${w} ${h}`}>
        <line x1={padding} y1={h - padding} x2={w - padding} y2={padding} className="tf-qq-plot__reference" />
        {sorted.map((v, i) => (
          <circle key={i} cx={padding + ((theoreticalQuantiles[i] - minT) / (maxT - minT || 1)) * (w - padding * 2)} cy={h - padding - ((v - minS) / (maxS - minS || 1)) * (h - padding * 2)} r={3} className="tf-qq-plot__point" />
        ))}
      </svg>
    </div>
  );
};

export default QQPlot;
