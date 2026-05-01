import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for MetricTileTrend component.
 *
 * @public
 */
export interface MetricTileTrendProps {
  direction: 'up' | 'down' | 'flat';
  value?: number;
  previousValue?: number;
  invertColors?: boolean;
  className?: string;
}

/**
 * Trend indicator showing directional change with percentage and color coding.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MetricTileTrend />
 * ```
 */
const MetricTileTrend: React.FC<MetricTileTrendProps> = ({
  direction, value?, previousValue?, invertColors?, className?
}}) => {
  const isPositive = invertColors ? direction === 'down' : direction === 'up';
  const pct = value !== undefined ? value : previousValue ? ((value || 0 - previousValue) / previousValue) * 100 : 0;

  return (
    <span className={`tf-metric-tile-trend tf-metric-tile-trend--${isPositive ? 'positive' : direction === 'flat' ? 'neutral' : 'negative'} ${className || ''}`}>
      <span className="tf-metric-tile-trend__arrow">
        {direction === 'up' ? '&#9650;' : direction === 'down' ? '&#9660;' : '&#9644;'}
      </span>
      <span className="tf-metric-tile-trend__value">{Math.abs(pct).toFixed(1)}%</span>
    </span>
  );
};

export default MetricTileTrend;
