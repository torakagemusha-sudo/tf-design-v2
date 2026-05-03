import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for MetricTileDelta component.
 *
 * @public
 */
export interface MetricTileDeltaProps {
  current: number;
  previous: number;
  formatter?: (value: number) => string;
  showPercentage?: boolean;
  className?: string;
}

/**
 * Delta indicator showing change from a previous value with sign and formatting.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MetricTileDelta />
 * ```
 */
const MetricTileDelta: React.FC<MetricTileDeltaProps> = ({
  current, previous, formatter, showPercentage, className
}) => {
  const delta = current - previous;
  const pct = previous !== 0 ? (delta / previous) * 100 : 0;
  const isPositive = delta >= 0;

  return (
    <span className={`tf-metric-tile-delta tf-metric-tile-delta--${isPositive ? 'positive' : 'negative'} ${className || ''}`}>
      <span className="tf-metric-tile-delta__sign">{isPositive ? '+' : ''}</span>
      <span className="tf-metric-tile-delta__value">
        {formatter ? formatter(delta) : delta.toFixed(2)}
      </span>
      {showPercentage && (
        <span className="tf-metric-tile-delta__pct">({isPositive ? '+' : ''}{pct.toFixed(1)}%)</span>
      )}
    </span>
  );
};

export default MetricTileDelta;
