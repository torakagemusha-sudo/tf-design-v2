/**
 * ============================================================
 * HealthIndicator — Torafirma Design System
 * ============================================================
 *
 * Displays a green/amber/red health dot with optional label.
 * The canonical three-state health indicator for system health,
 * component health, and dependency health.
 *
 * From 03.2 State, Status & Telemetry — Section 3.2 State Components
 * ============================================================
 */

import React from 'react';

/**
 * Health status levels.
 */
export type HealthLevel = 'healthy' | 'degraded' | 'unhealthy' | 'unknown';

/**
 * Props for the HealthIndicator component.
 */
export interface HealthIndicatorProps {
  /** Current health level. */
  health: HealthLevel;
  /** Optional label override (defaults to health name). */
  label?: string;
  /** Whether to pulse the indicator when unhealthy. */
  pulse?: boolean;
  /** Size of the indicator dot. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Whether to show the label text. */
  showLabel?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const healthMeta: Record<HealthLevel, { label: string; variant: string }> = {
  healthy: { label: 'HEALTHY', variant: 'run' },
  degraded: { label: 'DEGRADED', variant: 'warning' },
  unhealthy: { label: 'UNHEALTHY', variant: 'danger' },
  unknown: { label: 'UNKNOWN', variant: 'neutral' },
};

/**
 * HealthIndicator renders a colored health dot with optional label.
 *
 * @example
 * ```tsx
 * <HealthIndicator health="healthy" />
 * <HealthIndicator health="degraded" pulse showLabel />
 * ```
 */
export const HealthIndicator: React.FC<HealthIndicatorProps> = ({
  health,
  label,
  pulse = true,
  size = 'sm',
  showLabel = true,
  className = '',
  testId,
}) => {
  const meta = healthMeta[health];

  return (
    <span
      className={`tf-health-indicator tf-health-indicator--${meta.variant} tf-health-indicator--${health} tf-health-indicator--${size} ${pulse && health === 'unhealthy' ? 'tf-health-indicator--pulse' : ''} ${className}`}
      data-testid={testId}
      data-health={health}
      role="status"
      aria-label={`Health: ${meta.label}`}
    >
      <span className={`tf-health-indicator__dot tf-health-indicator__dot--${meta.variant}`} aria-hidden="true" />
      {showLabel && (
        <span className="tf-health-indicator__label">{label || meta.label}</span>
      )}
    </span>
  );
};

HealthIndicator.displayName = 'HealthIndicator';

export default HealthIndicator;
