import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { TelemetrySeries, DataPoint, TooltipSeries } from './types';

/**
 * Props for TelemetryChartTooltip component.
 *
 * @public
 */
export interface TelemetryChartTooltipProps {
  point: DataPoint | null;
  series: TooltipSeries[];
  visible: boolean;
  x: number;
  y: number;
  formatter?: (value: number) => string;
  className?: string;
}

/**
 * Tooltip component for displaying data point details on telemetry chart hover.
 *
 * @remarks
 * Part of the Torafirma Visualization & Instrumentation component family.
 * Uses semantic CSS class names with the `tf-` prefix.
 *
 * @example
 * ```tsx
 * <TelemetryChartTooltip />
 * ```
 */
const TelemetryChartTooltip: React.FC<TelemetryChartTooltipProps> = ({
  point, series, visible, x, y, formatter?, className?
}}) => {
  if (!visible || !point) return null;

  return (
    <div className={`tf-telemetry-chart-tooltip ${className || ''}`} style={{ left: x, top: y }}>
      <div className="tf-telemetry-chart-tooltip__timestamp">
        {new Date(point.timestamp).toLocaleString()}
      </div>
      <div className="tf-telemetry-chart-tooltip__values">
        {series.map((s) => (
          <div key={s.id} className="tf-telemetry-chart-tooltip__row">
            <span className="tf-telemetry-chart-tooltip__swatch" style={{ backgroundColor: s.color }} />
            <span className="tf-telemetry-chart-tooltip__label">{s.label}:</span>
            <span className="tf-telemetry-chart-tooltip__value">
              {formatter ? formatter(s.value) : s.value.toFixed(2)} {s.units}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TelemetryChartTooltip;
