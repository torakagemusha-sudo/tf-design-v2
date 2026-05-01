/**
 * ============================================================
 * TelemetryValue — Torafirma Design System
 * ============================================================
 *
 * Single telemetry value with label. Displays one metric in
 * a compact, scannable format with semantic color coding.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the TelemetryValue component.
 */
export interface TelemetryValueProps {
  /** Metric label. */
  label: string;
  /** Metric value. */
  value: string | number;
  /** Optional unit suffix. */
  unit?: string;
  /** Semantic variant for value color. */
  variant?: 'neutral' | 'run' | 'warning' | 'instability' | 'danger' | 'stream';
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the value is loading/unknown. */
  loading?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * TelemetryValue renders a single labeled telemetry metric.
 *
 * @example
 * ```tsx
 * <TelemetryValue label="CPU Usage" value={72} unit="%" variant="warning" />
 * <TelemetryValue label="Latency" value={12} unit="ms" variant="run" size="lg" />
 * ```
 */
export const TelemetryValue: React.FC<TelemetryValueProps> = ({
  label,
  value,
  unit,
  variant = 'neutral',
  size = 'md',
  loading = false,
  className = '',
  testId,
}) => {
  return (
    <div
      className={`tf-telemetry-value tf-telemetry-value--${variant} tf-telemetry-value--${size} ${loading ? 'tf-telemetry-value--loading' : ''} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${value}${unit || ''}`}
    >
      <span className="tf-telemetry-value__label">{label}</span>
      <span className={`tf-telemetry-value__value tf-telemetry-value__value--${variant}`}>
        {loading ? '—' : <>{value}{unit && <span className="tf-telemetry-value__unit">{unit}</span>}</>}
      </span>
    </div>
  );
};

TelemetryValue.displayName = 'TelemetryValue';

export default TelemetryValue;
