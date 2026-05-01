import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for MetricTileSparkline component.
 *
 * @public
 */
export interface MetricTileSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
  strokeWidth?: number;
  className?: string;
}

/**
 * Inline sparkline chart embedded within a metric tile for visual trend context.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MetricTileSparkline />
 * ```
 */
const MetricTileSparkline: React.FC<MetricTileSparklineProps> = ({
  data, width?, height?, color?, fill?, strokeWidth?, className?
}}) => {
  if (data.length < 2) return null;
  const w = width || 120;
  const h = height || 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg className={`tf-metric-tile-sparkline ${className || ''}`} viewBox={`0 0 ${w} ${h}`}>
      {fill && <polygon points={`0,${h} ${points} ${w},${h}`} className="tf-metric-tile-sparkline__fill" style={{ fill: color || '#3b82f6', opacity: 0.2 }} />}
      <polyline fill="none" points={points} className="tf-metric-tile-sparkline__line" style={{ stroke: color || '#3b82f6', strokeWidth: strokeWidth || 1.5 }} />
    </svg>
  );
};

export default MetricTileSparkline;
