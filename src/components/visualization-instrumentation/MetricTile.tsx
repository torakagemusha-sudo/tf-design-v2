import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for MetricTile component.
 *
 * @public
 */
export interface MetricTileProps {
  value: number | string;
  label: string;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: number;
  sparklineData?: number[];
  status?: 'normal' | 'warning' | 'critical' | 'success';
  onClick?: () => void;
  className?: string;
}

/**
 * Dashboard metric tile displaying a key measurement with value, label, trend, and sparkline.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MetricTile />
 * ```
 */
const MetricTile: React.FC<MetricTileProps> = ({
  value, label, unit?, trend?, trendValue?, sparklineData?, status?, onClick?, className?
}}) => {
  return (
    <div className={`tf-metric-tile tf-metric-tile--${status || 'normal'} ${className || ''}`} onClick={onClick} role="button">
      <div className="tf-metric-tile__header">
        <span className="tf-metric-tile__label">{label}</span>
        {trend && <span className={`tf-metric-tile__trend tf-metric-tile__trend--${trend}`}>{trend === 'up' ? '&#8593;' : trend === 'down' ? '&#8595;' : '&#8594;'} {trendValue?.toFixed(1)}%</span>}
      </div>
      <div className="tf-metric-tile__value-wrap">
        <span className="tf-metric-tile__value">{typeof value === 'number' ? value.toLocaleString() : value}</span>
        {unit && <span className="tf-metric-tile__unit">{unit}</span>}
      </div>
      {sparklineData && (
        <svg className="tf-metric-tile__sparkline" viewBox="0 0 120 30">
          <polyline
            fill="none"
            className="tf-metric-tile__sparkline-path"
            points={sparklineData.map((v, i) => `${(i / (sparklineData.length - 1)) * 120},${30 - (v / Math.max(...sparklineData)) * 30}`).join(' ')}
          />
        </svg>
      )}
    </div>
  );
};

export default MetricTile;
