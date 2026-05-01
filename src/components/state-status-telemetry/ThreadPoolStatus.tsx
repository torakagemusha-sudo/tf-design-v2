/**
 * ============================================================
 * ThreadPoolStatus — Torafirma Design System
 * ============================================================
 *
 * Thread pool usage display. Shows active, idle, and max
 * threads with queue size and pool name.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the ThreadPoolStatus component.
 */
export interface ThreadPoolStatusProps {
  /** Pool name. */
  name: string;
  /** Active thread count. */
  active: number;
  /** Idle thread count. */
  idle: number;
  /** Maximum thread count. */
  max: number;
  /** Queue size. */
  queueSize?: number;
  /** Completed task count. */
  completed?: number;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ThreadPoolStatus renders a thread pool usage display.
 *
 * @example
 * ```tsx
 * <ThreadPoolStatus name="worker-pool" active={8} idle={4} max={16} queueSize={12} completed={15234} />
 * ```
 */
export const ThreadPoolStatus: React.FC<ThreadPoolStatusProps> = ({
  name,
  active,
  idle,
  max,
  queueSize,
  completed,
  size = 'md',
  className = '',
  testId,
}) => {
  const totalUsed = active + idle;
  const percent = max > 0 ? (totalUsed / max) * 100 : 0;
  const variant = percent >= 90 ? 'danger' : percent >= 70 ? 'warning' : 'run';

  return (
    <div
      className={`tf-thread-pool-status tf-thread-pool-status--${variant} tf-thread-pool-status--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`Thread pool ${name}: ${active} active, ${idle} idle of ${max}`}
    >
      <span className="tf-thread-pool-status__name">{name}</span>
      <div className="tf-thread-pool-status__counts">
        <span className="tf-thread-pool-status__active">Active: {active}</span>
        <span className="tf-thread-pool-status__idle">Idle: {idle}</span>
        <span className="tf-thread-pool-status__max">Max: {max}</span>
      </div>
      <div className="tf-thread-pool-status__bar">
        <div
          className={`tf-thread-pool-status__fill tf-thread-pool-status__fill--${variant}`}
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
      {queueSize !== undefined && (
        <span className="tf-thread-pool-status__queue">Queue: {queueSize}</span>
      )}
      {completed !== undefined && (
        <span className="tf-thread-pool-status__completed">Done: {completed.toLocaleString()}</span>
      )}
    </div>
  );
};

ThreadPoolStatus.displayName = 'ThreadPoolStatus';

export default ThreadPoolStatus;
