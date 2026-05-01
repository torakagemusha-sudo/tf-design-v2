/**
 * ============================================================
 * DatabaseConnectionPool — Torafirma Design System
 * ============================================================
 *
 * DB connection pool status display. Shows active, idle, and
 * waiting connections with pool utilization percentage.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the DatabaseConnectionPool component.
 */
export interface DatabaseConnectionPoolProps {
  /** Pool name or database name. */
  name: string;
  /** Active connections. */
  active: number;
  /** Idle connections. */
  idle: number;
  /** Maximum pool size. */
  max: number;
  /** Waiting threads. */
  waiting?: number;
  /** Total connections. */
  total?: number;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * DatabaseConnectionPool renders a DB pool status display.
 *
 * @example
 * ```tsx
 * <DatabaseConnectionPool name="primary-db" active={8} idle={4} max={20} waiting={2} total={12} />
 * ```
 */
export const DatabaseConnectionPool: React.FC<DatabaseConnectionPoolProps> = ({
  name,
  active,
  idle,
  max,
  waiting,
  total,
  size = 'md',
  className = '',
  testId,
}) => {
  const used = total || active + idle;
  const percent = max > 0 ? (used / max) * 100 : 0;
  const variant = waiting !== undefined && waiting > 0 ? 'danger' : percent >= 80 ? 'warning' : 'run';

  return (
    <div
      className={`tf-db-pool tf-db-pool--${variant} tf-db-pool--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`DB pool ${name}: ${active} active of ${max}`}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={active}
    >
      <span className="tf-db-pool__name">{name}</span>
      <div className="tf-db-pool__counts">
        <span className="tf-db-pool__active">Active: {active}</span>
        <span className="tf-db-pool__idle">Idle: {idle}</span>
        <span className="tf-db-pool__max">Max: {max}</span>
      </div>
      <div className="tf-db-pool__bar">
        <div
          className={`tf-db-pool__fill tf-db-pool__fill--${variant}`}
          style={{ width: `${Math.min(100, percent)}%` }}
          aria-hidden="true"
        />
      </div>
      {waiting !== undefined && waiting > 0 && (
        <span className="tf-db-pool__waiting tf-db-pool__waiting--danger">{waiting} waiting</span>
      )}
    </div>
  );
};

DatabaseConnectionPool.displayName = 'DatabaseConnectionPool';

export default DatabaseConnectionPool;
