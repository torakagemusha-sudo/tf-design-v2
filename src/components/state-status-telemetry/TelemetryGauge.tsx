/**
 * ============================================================
 * TelemetryGauge — Torafirma Design System
 * ============================================================
 *
 * Arc gauge for displaying a single metric on a semicircular
 * scale. Shows the current value, unit, and label with
 * threshold-based color coding.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the TelemetryGauge component.
 */
export interface TelemetryGaugeProps {
  /** Current value to display. */
  value: number;
  /** Minimum scale value. */
  min: number;
  /** Maximum scale value. */
  max: number;
  /** Metric label. */
  label: string;
  /** Unit suffix. */
  unit?: string;
  /** Warning threshold. */
  warningThreshold?: number;
  /** Danger threshold. */
  dangerThreshold?: number;
  /** Gauge diameter in pixels. */
  diameter?: number;
  /** Stroke width. */
  strokeWidth?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * TelemetryGauge renders an arc gauge for a single metric.
 *
 * @example
 * ```tsx
 * <TelemetryGauge value={72} min={0} max={100} label="CPU" unit="%" warningThreshold={70} dangerThreshold={90} />
 * ```
 */
export const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({
  value,
  min,
  max,
  label,
  unit,
  warningThreshold,
  dangerThreshold,
  diameter = 80,
  strokeWidth = 6,
  className = '',
  testId,
}) => {
  const clampedValue = Math.max(min, Math.min(max, value));
  const percentage = (clampedValue - min) / (max - min);
  const radius = (diameter - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - percentage);

  let variant = 'run';
  if (dangerThreshold !== undefined && clampedValue >= dangerThreshold) variant = 'danger';
  else if (warningThreshold !== undefined && clampedValue >= warningThreshold) variant = 'warning';

  return (
    <div
      className={`tf-telemetry-gauge ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${clampedValue}${unit || ''}`}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clampedValue}
    >
      <svg
        width={diameter}
        height={diameter / 2 + strokeWidth}
        className={`tf-telemetry-gauge__svg tf-telemetry-gauge__svg--${variant}`}
        aria-hidden="true"
      >
        <path
          className="tf-telemetry-gauge__track"
          d={`M ${strokeWidth / 2} ${diameter / 2} A ${radius} ${radius} 0 0 1 ${diameter - strokeWidth / 2} ${diameter / 2}`}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <path
          className={`tf-telemetry-gauge__fill tf-telemetry-gauge__fill--${variant}`}
          d={`M ${strokeWidth / 2} ${diameter / 2} A ${radius} ${radius} 0 0 1 ${diameter - strokeWidth / 2} ${diameter / 2}`}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="tf-telemetry-gauge__value-container">
        <span className={`tf-telemetry-gauge__value tf-telemetry-gauge__value--${variant}`}>
          {clampedValue}{unit && <span className="tf-telemetry-gauge__unit">{unit}</span>}
        </span>
        <span className="tf-telemetry-gauge__label">{label}</span>
      </div>
    </div>
  );
};

TelemetryGauge.displayName = 'TelemetryGauge';

export default TelemetryGauge;
