/**
 * ============================================================
 * RateLimitStatus — Torafirma Design System
 * ============================================================
 *
 * Rate limit usage display. Shows current usage against the
 * limit with reset time and remaining quota.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the RateLimitStatus component.
 */
export interface RateLimitStatusProps {
  /** Current usage count. */
  used: number;
  /** Rate limit cap. */
  limit: number;
  /** Remaining count. */
  remaining?: number;
  /** Reset time string. */
  resetAt?: string;
  /** Rate limit window (e.g., "1 minute"). */
  window?: string;
  /** Label. */
  label?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * RateLimitStatus renders a rate limit usage display.
 *
 * @example
 * ```tsx
 * <RateLimitStatus used={850} limit={1000} remaining={150} resetAt="12:34:56" window="1 minute" label="API Rate Limit" />
 * ```
 */
export const RateLimitStatus: React.FC<RateLimitStatusProps> = ({
  used,
  limit,
  remaining,
  resetAt,
  window,
  label = 'Rate Limit',
  className = '',
  testId,
}) => {
  const percent = limit > 0 ? (used / limit) * 100 : 0;
  const variant = percent >= 95 ? 'danger' : percent >= 80 ? 'warning' : 'run';

  return (
    <div
      className={`tf-rate-limit-status tf-rate-limit-status--${variant} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${used} of ${limit} used`}
      aria-valuemin={0}
      aria-valuemax={limit}
      aria-valuenow={used}
    >
      <span className="tf-rate-limit-status__label">{label}</span>
      <div className="tf-rate-limit-status__values">
        <span className={`tf-rate-limit-status__used tf-rate-limit-status__used--${variant}`}>{used}</span>
        <span className="tf-rate-limit-status__limit">/ {limit}</span>
        {remaining !== undefined && (
          <span className="tf-rate-limit-status__remaining">({remaining} left)</span>
        )}
      </div>
      <div className="tf-rate-limit-status__bar">
        <div
          className={`tf-rate-limit-status__fill tf-rate-limit-status__fill--${variant}`}
          style={{ width: `${Math.min(100, percent)}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="tf-rate-limit-status__meta">
        {window && <span className="tf-rate-limit-status__window">{window}</span>}
        {resetAt && <span className="tf-rate-limit-status__reset">Resets: {resetAt}</span>}
      </div>
    </div>
  );
};

RateLimitStatus.displayName = 'RateLimitStatus';

export default RateLimitStatus;
