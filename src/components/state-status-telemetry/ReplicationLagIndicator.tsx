/**
 * ============================================================
 * ReplicationLagIndicator — Torafirma Design System
 * ============================================================
 *
 * Replication lag display. Shows the lag between primary and
 * replica with bytes behind and estimated catch-up time.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the ReplicationLagIndicator component.
 */
export interface ReplicationLagIndicatorProps {
  /** Lag in seconds. */
  lagSeconds: number;
  /** Bytes behind the primary. */
  bytesBehind?: number;
  /** Replica name or identifier. */
  replica?: string;
  /** Primary name. */
  primary?: string;
  /** Warning threshold in seconds. */
  warningThreshold?: number;
  /** Critical threshold in seconds. */
  criticalThreshold?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ReplicationLagIndicator renders a replication lag display.
 *
 * @example
 * ```tsx
 * <ReplicationLagIndicator lagSeconds={12} bytesBehind={5242880} replica="replica-02" primary="primary-01" warningThreshold={10} criticalThreshold={60} />
 * ```
 */
export const ReplicationLagIndicator: React.FC<ReplicationLagIndicatorProps> = ({
  lagSeconds,
  bytesBehind,
  replica,
  primary,
  warningThreshold = 10,
  criticalThreshold = 60,
  className = '',
  testId,
}) => {
  const variant = lagSeconds >= criticalThreshold ? 'danger' : lagSeconds >= warningThreshold ? 'warning' : 'run';

  const formatBytes = (bytes: number) => {
    if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(2)} GB`;
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(2)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${bytes} B`;
  };

  const formatLag = (seconds: number) => {
    if (seconds >= 3600) return `${(seconds / 3600).toFixed(1)}h`;
    if (seconds >= 60) return `${(seconds / 60).toFixed(0)}m`;
    return `${seconds}s`;
  };

  return (
    <div
      className={`tf-replication-lag-indicator tf-replication-lag-indicator--${variant} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`Replication lag: ${formatLag(lagSeconds)}`}
    >
      <div className="tf-replication-lag-indicator__header">
        {primary && <span className="tf-replication-lag-indicator__primary">{primary}</span>}
        <span className="tf-replication-lag-indicator__arrow" aria-hidden="true">&#x2192;</span>
        {replica && <span className="tf-replication-lag-indicator__replica">{replica}</span>}
      </div>
      <span className={`tf-replication-lag-indicator__lag tf-replication-lag-indicator__lag--${variant}`}>
        Lag: {formatLag(lagSeconds)}
      </span>
      {bytesBehind !== undefined && (
        <span className="tf-replication-lag-indicator__bytes">{formatBytes(bytesBehind)} behind</span>
      )}
    </div>
  );
};

ReplicationLagIndicator.displayName = 'ReplicationLagIndicator';

export default ReplicationLagIndicator;
