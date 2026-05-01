import React, { useState, useCallback, useEffect, useMemo } from 'react';


/**
 * Props for MetricTileLabel component.
 *
 * @public
 */
export interface MetricTileLabelProps {
  label: string;
  subtitle?: string;
  info?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Metric label with optional info tooltip and subtitle for dashboard metric tiles.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <MetricTileLabel />
 * ```
 */
const MetricTileLabel: React.FC<MetricTileLabelProps> = ({
  label, subtitle?, info?, icon?, className?
}}) => {
  return (
    <div className={`tf-metric-tile-label ${className || ''}`}>
      {icon && <span className="tf-metric-tile-label__icon">{icon}</span>}
      <span className="tf-metric-tile-label__text">{label}</span>
      {subtitle && <span className="tf-metric-tile-label__subtitle">{subtitle}</span>}
      {info && <span className="tf-metric-tile-label__info" title={info}>?</span>}
    </div>
  );
};

export default MetricTileLabel;
