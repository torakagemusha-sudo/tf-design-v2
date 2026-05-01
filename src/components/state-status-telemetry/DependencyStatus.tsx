/**
 * ============================================================
 * DependencyStatus — Torafirma Design System
 * ============================================================
 *
 * External dependency health indicator. Shows the status of
 * external services and dependencies with health and latency.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { HealthLevel } from './HealthIndicator';

/**
 * Single dependency descriptor.
 */
export interface Dependency {
  /** Dependency name. */
  name: string;
  /** Dependency health. */
  health: HealthLevel;
  /** Latency in milliseconds. */
  latencyMs?: number;
  /** Dependency type. */
  type?: string;
  /** Optional endpoint or URL. */
  endpoint?: string;
}

/**
 * Props for the DependencyStatus component.
 */
export interface DependencyStatusProps {
  /** Array of dependencies to display. */
  dependencies: Dependency[];
  /** Label. */
  label?: string;
  /** Maximum items to show. */
  maxVisible?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const healthVariants: Record<HealthLevel, string> = {
  healthy: 'run',
  degraded: 'warning',
  unhealthy: 'danger',
  unknown: 'neutral',
};

/**
 * DependencyStatus renders external dependency health info.
 *
 * @example
 * ```tsx
 * <DependencyStatus
 *   dependencies={[
 *     { name: 'PostgreSQL', health: 'healthy', latencyMs: 2, type: 'database' },
 *     { name: 'Redis', health: 'degraded', latencyMs: 45, type: 'cache' },
 *     { name: 'Kafka', health: 'healthy', latencyMs: 8, type: 'messaging' },
 *   ]}
 * />
 * ```
 */
export const DependencyStatus: React.FC<DependencyStatusProps> = ({
  dependencies,
  label = 'Dependencies',
  maxVisible = 5,
  className = '',
  testId,
}) => {
  const visible = dependencies.slice(0, maxVisible);

  return (
    <div
      className={`tf-dependency-status ${className}`}
      data-testid={testId}
      role="region"
      aria-label={label}
    >
      <span className="tf-dependency-status__label">{label}</span>
      <div className="tf-dependency-status__list">
        {visible.map((dep) => (
          <div
            key={dep.name}
            className={`tf-dependency-status__item tf-dependency-status__item--${healthVariants[dep.health]}`}
          >
            <span className={`tf-dependency-status__dot tf-dependency-status__dot--${healthVariants[dep.health]}`} aria-hidden="true" />
            <span className="tf-dependency-status__name">{dep.name}</span>
            {dep.type && <span className="tf-dependency-status__type">{dep.type}</span>}
            {dep.latencyMs !== undefined && (
              <span className="tf-dependency-status__latency">{dep.latencyMs}ms</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

DependencyStatus.displayName = 'DependencyStatus';

export default DependencyStatus;
