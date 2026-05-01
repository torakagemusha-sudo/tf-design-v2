/**
 * ============================================================
 * LatencyIndicator — Torafirma Design System
 * ============================================================
 *
 * Latency metric display. Shows response time with percentile
 * breakdown (p50, p95, p99) and threshold indicators.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the LatencyIndicator component.
 */
export interface LatencyIndicatorProps {
  /** Current latency in milliseconds. */
  currentMs: number;
  /** p50 latency. */
  p50?: number;
  /** p95 latency. */
  p95?: number;
  /** p99 latency. */
  p99?: number;
  /** Warning threshold in ms. */
  warningThreshold?: number;
  /** Critical threshold in ms. */
  criticalThreshold?: number;
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
 * LatencyIndicator renders a latency metric display.
 *
 * @example
 * ```tsx
 * <LatencyIndicator currentMs={24} p50={18} p95={45} p99={120} warningThreshold={50} criticalThreshold={200} label="API Latency" />
 * ```
 */
export const LatencyIndicator: React.FC<LatencyIndicatorProps> = ({
  currentMs,
  p50,
  p95,
  p99,
  warningThreshold = 100,
  criticalThreshold = 500,
  label = 'Latency',
  size = 'md',
  className = '',
  testId,
}) => {
  const variant = currentMs >= criticalThreshold ? 'danger' : currentMs >= warningThreshold ? 'warning' : 'run';

  return (
    <div
      className={`tf-latency-indicator tf-latency-indicator--${variant} tf-latency-indicator--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${currentMs}ms`}
    >
      <span className="tf-latency-indicator__label">{label}</span>
      <span className={`tf-latency-indicator__value tf-latency-indicator__value--${variant}`}>
        {currentMs} <span className="tf-latency-indicator__unit">ms</span>
      </span>
      <div className="tf-latency-indicator__percentiles">
        {p50 !== undefined && <span className="tf-latency-indicator__p50">p50: {p50}ms</span>}
        {p95 !== undefined && <span className="tf-latency-indicator__p95">p95: {p95}ms</span>}
        {p99 !== undefined && <span className="tf-latency-indicator__p99">p99: {p99}ms</span>}
      </div>
    </div>
  );
};

LatencyIndicator.displayName = 'LatencyIndicator';

export default LatencyIndicator;
