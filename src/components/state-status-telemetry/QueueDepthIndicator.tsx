/**
 * ============================================================
 * QueueDepthIndicator — Torafirma Design System
 * ============================================================
 *
 * Queue depth metric display. Shows current queue size with
 * max capacity and fill percentage.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the QueueDepthIndicator component.
 */
export interface QueueDepthIndicatorProps {
  /** Current queue depth. */
  current: number;
  /** Maximum queue depth. */
  max: number;
  /** Queue name. */
  name?: string;
  /** Messages per second throughput. */
  throughput?: number;
  /** Average wait time. */
  avgWaitMs?: number;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * QueueDepthIndicator renders a queue depth display.
 *
 * @example
 * ```tsx
 * <QueueDepthIndicator current={850} max={10000} name="order-queue" throughput={125} avgWaitMs={12} />
 * ```
 */
export const QueueDepthIndicator: React.FC<QueueDepthIndicatorProps> = ({
  current,
  max,
  name,
  throughput,
  avgWaitMs,
  size = 'md',
  className = '',
  testId,
}) => {
  const percent = max > 0 ? (current / max) * 100 : 0;
  const variant = percent >= 90 ? 'danger' : percent >= 70 ? 'warning' : 'run';

  return (
    <div
      className={`tf-queue-depth-indicator tf-queue-depth-indicator--${variant} tf-queue-depth-indicator--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${name || 'Queue'}: ${current} of ${max}`}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={current}
    >
      {name && <span className="tf-queue-depth-indicator__name">{name}</span>}
      <div className="tf-queue-depth-indicator__values">
        <span className={`tf-queue-depth-indicator__current tf-queue-depth-indicator__current--${variant}`}>
          {current.toLocaleString()}
        </span>
        <span className="tf-queue-depth-indicator__max">/ {max.toLocaleString()}</span>
        <span className="tf-queue-depth-indicator__percent">({percent.toFixed(1)}%)</span>
      </div>
      <div className="tf-queue-depth-indicator__bar">
        <div
          className={`tf-queue-depth-indicator__fill tf-queue-depth-indicator__fill--${variant}`}
          style={{ width: `${Math.min(100, percent)}%` }}
          aria-hidden="true"
        />
      </div>
      {throughput !== undefined && (
        <span className="tf-queue-depth-indicator__throughput">{throughput}/s</span>
      )}
      {avgWaitMs !== undefined && (
        <span className="tf-queue-depth-indicator__wait">Wait: {avgWaitMs}ms</span>
      )}
    </div>
  );
};

QueueDepthIndicator.displayName = 'QueueDepthIndicator';

export default QueueDepthIndicator;
