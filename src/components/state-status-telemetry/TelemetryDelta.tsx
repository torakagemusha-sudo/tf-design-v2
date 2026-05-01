/**
 * ============================================================
 * TelemetryDelta — Torafirma Design System
 * ============================================================
 *
 * Telemetry value with change indicator. Shows current value
 * alongside delta (change from previous) with directional arrow
 * and semantic color.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the TelemetryDelta component.
 */
export interface TelemetryDeltaProps {
  /** Metric label. */
  label: string;
  /** Current value. */
  value: number;
  /** Delta (change) from previous value. */
  delta: number;
  /** Optional unit suffix. */
  unit?: string;
  /** Whether positive delta is good (green) or bad (red). */
  positiveIsGood?: boolean;
  /** Number of decimal places. */
  precision?: number;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * TelemetryDelta renders a value with change indicator.
 *
 * @example
 * ```tsx
 * <TelemetryDelta label="Requests/sec" value={1240} delta={+120} unit="req/s" />
 * <TelemetryDelta label="Error Rate" value={2.1} delta={-0.5} unit="%" positiveIsGood={false} />
 * ```
 */
export const TelemetryDelta: React.FC<TelemetryDeltaProps> = ({
  label,
  value,
  delta,
  unit,
  positiveIsGood = true,
  precision = 1,
  size = 'md',
  className = '',
  testId,
}) => {
  const isPositive = delta >= 0;
  const isGood = positiveIsGood ? isPositive : !isPositive;
  const variant = isGood ? 'run' : 'danger';
  const arrow = isPositive ? '&#x2191;' : '&#x2193;';
  const deltaStr = `${isPositive ? '+' : ''}${delta.toFixed(precision)}`;

  return (
    <div
      className={`tf-telemetry-delta tf-telemetry-delta--${variant} tf-telemetry-delta--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${value}${unit || ''}, change ${deltaStr}${unit || ''}`}
    >
      <span className="tf-telemetry-delta__label">{label}</span>
      <div className="tf-telemetry-delta__values">
        <span className="tf-telemetry-delta__value">
          {value.toFixed(precision)}{unit && <span className="tf-telemetry-delta__unit">{unit}</span>}
        </span>
        <span className={`tf-telemetry-delta__change tf-telemetry-delta__change--${variant}`}>
          <span className="tf-telemetry-delta__arrow" aria-hidden="true">{arrow}</span>
          {deltaStr}{unit && <span className="tf-telemetry-delta__unit">{unit}</span>}
        </span>
      </div>
    </div>
  );
};

TelemetryDelta.displayName = 'TelemetryDelta';

export default TelemetryDelta;
