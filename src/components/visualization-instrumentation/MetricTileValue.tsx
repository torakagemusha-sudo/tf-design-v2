import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for MetricTileValue component.
 *
 * @public
 */
export interface MetricTileValueProps {
  value: number;
  decimals?: number;
  unit?: string;
  prefix?: string;
  formatter?: (value: number) => string;
  animate?: boolean;
  className?: string;
}

/**
 * Large formatted metric value display with optional unit and decimal configuration.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MetricTileValue />
 * ```
 */
const MetricTileValue: React.FC<MetricTileValueProps> = ({
  value, decimals?, unit?, prefix?, formatter?, animate?, className?
}}) => {
  const formatted = formatter ? formatter(value) : value.toFixed(decimals !== undefined ? decimals : 2);

  return (
    <span className={`tf-metric-tile-value ${animate ? 'tf-metric-tile-value--animate' : ''} ${className || ''}`}>
      {prefix && <span className="tf-metric-tile-value__prefix">{prefix}</span>}
      <span className="tf-metric-tile-value__number">{formatted}</span>
      {unit && <span className="tf-metric-tile-value__unit">{unit}</span>}
    </span>
  );
};

export default MetricTileValue;
