import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { TelemetrySeries, LegendSeries } from './types';

/**
 * Props for TelemetryChartLegend component.
 *
 * @public
 */
export interface TelemetryChartLegendProps {
  series: LegendSeries[];
  onToggleSeries?: (seriesId: string) => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

/**
 * Legend component for telemetry chart displaying series names, colors, and visibility toggles.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TelemetryChartLegend />
 * ```
 */
const TelemetryChartLegend: React.FC<TelemetryChartLegendProps> = ({
  series, onToggleSeries, position, className
}) => {
  return (
    <div className={`tf-telemetry-chart-legend tf-telemetry-chart-legend--${position || 'bottom'} ${className || ''}`}>
      {series.map((s) => (
        <button
          key={s.id}
          className={`tf-telemetry-chart-legend__item ${s.visible === false ? 'tf-telemetry-chart-legend__item--hidden' : ''}`}
          onClick={() => onToggleSeries?.(s.id)}
        >
          <span className="tf-telemetry-chart-legend__swatch" style={{ backgroundColor: s.color }} />
          <span className="tf-telemetry-chart-legend__label">{s.label}</span>
          {s.units && <span className="tf-telemetry-chart-legend__units">({s.units})</span>}
        </button>
      ))}
    </div>
  );
};

export default TelemetryChartLegend;
