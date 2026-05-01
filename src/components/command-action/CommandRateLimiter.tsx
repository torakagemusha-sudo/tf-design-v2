import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandRateLimiter component.
 * Display rate limit status.
 */
export interface CommandRateLimiterProps extends TorafirmaComponentBaseProps {
  /** Maximum allowed requests */
  limit: number;
  /** Number of requests already used */
  used: number;
  /** ISO timestamp when the rate limit resets */
  resetTime: string;
  /** Optional warning threshold percentage (0-1) */
  warningThreshold?: number;
}

/**
 * CommandRateLimiter — display rate limit status.
 *
 * Shows the current rate limit consumption with a visual
 * progress indicator. Displays remaining quota and the reset
 * time. Changes appearance when approaching the limit based
 * on the warning threshold.
 *
 * @example
 * ```tsx
 * <CommandRateLimiter
 *   limit={100}
 *   used={73}
 *   resetTime="2024-01-01T11:00:00Z"
 *   warningThreshold={0.8}
 * />
 * ```
 */
const CommandRateLimiter: React.FC<CommandRateLimiterProps> = ({
  limit,
  used,
  resetTime,
  warningThreshold = 0.8,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const remaining = Math.max(0, limit - used);
  const percentage = Math.min(100, (used / limit) * 100);
  const isWarning = percentage >= warningThreshold * 100;
  const isExceeded = used >= limit;

  return (
    <div
      className={`tf-command-rate-limiter ${isExceeded ? 'tf-command-rate-limiter--exceeded' : ''} ${isWarning ? 'tf-command-rate-limiter--warning' : ''} ${className}`}
      data-testid={testId}
      {...rest}
    >
      <div className="tf-command-rate-limiter__header">
        <span className="tf-command-rate-limiter__label">Rate Limit</span>
        <span className="tf-command-rate-limiter__value">
          {used}/{limit}
        </span>
      </div>
      <progress
        className="tf-command-rate-limiter__bar"
        value={used}
        max={limit}
        aria-label={`${used} of ${limit} requests used`}
      />
      <div className="tf-command-rate-limiter__footer">
        <span className="tf-command-rate-limiter__remaining">{remaining} remaining</span>
        <time className="tf-command-rate-limiter__reset" dateTime={resetTime}>
          Resets {new Date(resetTime).toLocaleTimeString()}
        </time>
      </div>
      {isExceeded && (
        <span className="tf-command-rate-limiter__exceeded-message">Rate limit exceeded. Wait for reset.</span>
      )}
    </div>
  );
};

export default CommandRateLimiter;
