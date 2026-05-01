/**
 * ============================================================
 * TelemetrySparkline — Torafirma Design System
 * ============================================================
 *
 * Mini sparkline chart for displaying time-series telemetry.
 * Renders an SVG line chart from a series of numeric values.
 * Supports color coding based on threshold crossings.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the TelemetrySparkline component.
 */
export interface TelemetrySparklineProps {
  /** Time-series data points. */
  data: number[];
  /** Width of the sparkline in pixels. */
  width?: number;
  /** Height of the sparkline in pixels. */
  height?: number;
  /** Label for the sparkline. */
  label?: string;
  /** Current value displayed alongside. */
  currentValue?: number;
  /** Unit suffix. */
  unit?: string;
  /** Warning threshold (values above trigger warning color). */
  warningThreshold?: number;
  /** Danger threshold (values above trigger danger color). */
  dangerThreshold?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * TelemetrySparkline renders a mini sparkline chart.
 *
 * @example
 * ```tsx
 * <TelemetrySparkline data={[10, 15, 13, 20, 25, 22, 30]} currentValue={30} unit="ms" />
 * <TelemetrySparkline data={[45, 50, 55, 60, 70, 85]} warningThreshold={60} dangerThreshold={80} />
 * ```
 */
export const TelemetrySparkline: React.FC<TelemetrySparklineProps> = ({
  data,
  width = 120,
  height = 32,
  label,
  currentValue,
  unit,
  warningThreshold,
  dangerThreshold,
  className = '',
  testId,
}) => {
  if (data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const lastValue = data[data.length - 1];
  let variant = 'neutral';
  if (dangerThreshold !== undefined && lastValue >= dangerThreshold) variant = 'danger';
  else if (warningThreshold !== undefined && lastValue >= warningThreshold) variant = 'warning';

  return (
    <div
      className={`tf-telemetry-sparkline ${className}`}
      data-testid={testId}
      role="img"
      aria-label={`${label || 'Sparkline'}: ${data.length} data points, last value ${lastValue}${unit || ''}`}
    >
      {label && <span className="tf-telemetry-sparkline__label">{label}</span>}
      <svg width={width} height={height} className={`tf-telemetry-sparkline__svg tf-telemetry-sparkline__svg--${variant}`} aria-hidden="true">
        <polyline
          className={`tf-telemetry-sparkline__line tf-telemetry-sparkline__line--${variant}`}
          fill="none"
          strokeWidth={1.5}
          points={points}
        />
      </svg>
      {currentValue !== undefined && (
        <span className={`tf-telemetry-sparkline__value tf-telemetry-sparkline__value--${variant}`}>
          {currentValue}{unit && <span className="tf-telemetry-sparkline__unit">{unit}</span>}
        </span>
      )}
    </div>
  );
};

TelemetrySparkline.displayName = 'TelemetrySparkline';

export default TelemetrySparkline;
