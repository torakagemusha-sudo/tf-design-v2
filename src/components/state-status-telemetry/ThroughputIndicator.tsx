/**
 * ============================================================
 * ThroughputIndicator — Torafirma Design System
 * ============================================================
 *
 * Throughput metric display. Shows operations per second or
 * requests per second with optional peak and trend.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the ThroughputIndicator component.
 */
export interface ThroughputIndicatorProps {
  /** Current throughput value. */
  value: number;
  /** Unit label (ops/s, req/s, msg/s, etc.). */
  unit: string;
  /** Peak throughput observed. */
  peak?: number;
  /** Average throughput. */
  average?: number;
  /** Trend direction. */
  trend?: 'up' | 'down' | 'stable';
  /** Label. */
  label?: string;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ThroughputIndicator renders a throughput metric display.
 *
 * @example
 * ```tsx
 * <ThroughputIndicator value={12500} unit="req/s" peak={18000} average={11000} trend="up" label="API Throughput" />
 * ```
 */
export const ThroughputIndicator: React.FC<ThroughputIndicatorProps> = ({
  value,
  unit,
  peak,
  average,
  trend = 'stable',
  label = 'Throughput',
  size = 'md',
  className = '',
  testId,
}) => {
  const variant = peak && value > peak * 0.9 ? 'warning' : 'run';
  const arrow = trend === 'up' ? '&#x2191;' : trend === 'down' ? '&#x2193;' : '&#x2192;';

  return (
    <div
      className={`tf-throughput-indicator tf-throughput-indicator--${variant} tf-throughput-indicator--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${value.toLocaleString()} ${unit}`}
    >
      <span className="tf-throughput-indicator__label">{label}</span>
      <span className={`tf-throughput-indicator__value tf-throughput-indicator__value--${variant}`}>
        {value.toLocaleString()}
        <span className="tf-throughput-indicator__unit">{unit}</span>
      </span>
      {trend && (
        <span className={`tf-throughput-indicator__trend tf-throughput-indicator__trend--${trend}`} aria-label={`Trend: ${trend}`}>
          {arrow}
        </span>
      )}
      {peak !== undefined && (
        <span className="tf-throughput-indicator__peak">Peak: {peak.toLocaleString()} {unit}</span>
      )}
      {average !== undefined && (
        <span className="tf-throughput-indicator__avg">Avg: {average.toLocaleString()} {unit}</span>
      )}
    </div>
  );
};

ThroughputIndicator.displayName = 'ThroughputIndicator';

export default ThroughputIndicator;
