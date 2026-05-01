/**
 * ============================================================
 * ErrorRateIndicator — Torafirma Design System
 * ============================================================
 *
 * Error rate display. Shows error percentage with count and
 * comparison to threshold. Used for API error rates, failure
 * rates, and rejection rates.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the ErrorRateIndicator component.
 */
export interface ErrorRateIndicatorProps {
  /** Error percentage (0-100). */
  errorPercent: number;
  /** Total request count. */
  totalRequests?: number;
  /** Error count. */
  errorCount?: number;
  /** Warning threshold percentage. */
  warningThreshold?: number;
  /** Critical threshold percentage. */
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
 * ErrorRateIndicator renders an error rate display.
 *
 * @example
 * ```tsx
 * <ErrorRateIndicator errorPercent={2.5} totalRequests={10000} errorCount={250} warningThreshold={1} criticalThreshold={5} />
 * ```
 */
export const ErrorRateIndicator: React.FC<ErrorRateIndicatorProps> = ({
  errorPercent,
  totalRequests,
  errorCount,
  warningThreshold = 1,
  criticalThreshold = 5,
  label = 'Error Rate',
  size = 'md',
  className = '',
  testId,
}) => {
  const variant = errorPercent >= criticalThreshold ? 'danger' : errorPercent >= warningThreshold ? 'warning' : 'run';

  return (
    <div
      className={`tf-error-rate-indicator tf-error-rate-indicator--${variant} tf-error-rate-indicator--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${errorPercent.toFixed(2)}%`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={errorPercent}
    >
      <span className="tf-error-rate-indicator__label">{label}</span>
      <span className={`tf-error-rate-indicator__value tf-error-rate-indicator__value--${variant}`}>
        {errorPercent.toFixed(2)}%
      </span>
      {errorCount !== undefined && totalRequests !== undefined && (
        <span className="tf-error-rate-indicator__count">
          {errorCount.toLocaleString()} / {totalRequests.toLocaleString()}
        </span>
      )}
    </div>
  );
};

ErrorRateIndicator.displayName = 'ErrorRateIndicator';

export default ErrorRateIndicator;
