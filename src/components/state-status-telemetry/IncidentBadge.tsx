/**
 * ============================================================
 * IncidentBadge — Torafirma Design System
 * ============================================================
 *
 * Active incident indicator badge. Shows the count of active
 * incidents with severity coloring for overview panels.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { FaultSeverity } from './FaultIndicator';

/**
 * Props for the IncidentBadge component.
 */
export interface IncidentBadgeProps {
  /** Number of active incidents. */
  count: number;
  /** Highest severity among active incidents. */
  highestSeverity?: FaultSeverity;
  /** Whether incidents are acknowledged. */
  acknowledged?: boolean;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const severityVariantMap: Record<FaultSeverity, string> = {
  critical: 'danger',
  major: 'danger',
  minor: 'warning',
  warning: 'warning',
  info: 'neutral',
};

/**
 * IncidentBadge renders an active incident count badge.
 *
 * @example
 * ```tsx
 * <IncidentBadge count={3} highestSeverity="major" acknowledged={false} />
 * <IncidentBadge count={0} />
 * ```
 */
export const IncidentBadge: React.FC<IncidentBadgeProps> = ({
  count,
  highestSeverity = 'warning',
  acknowledged = false,
  size = 'md',
  className = '',
  testId,
}) => {
  const hasIncidents = count > 0;
  const variant = hasIncidents ? severityVariantMap[highestSeverity] : 'run';

  return (
    <span
      className={`tf-incident-badge tf-incident-badge--${variant} tf-incident-badge--${hasIncidents ? 'active' : 'clear'} tf-incident-badge--${size} ${acknowledged ? 'tf-incident-badge--acknowledged' : ''} ${className}`}
      data-testid={testId}
      data-incident-count={count}
      data-severity={highestSeverity}
      role="status"
      aria-label={`${count} active incident${count !== 1 ? 's' : ''}${hasIncidents ? `, highest severity: ${highestSeverity}` : ''}`}
    >
      <span className="tf-incident-badge__icon" aria-hidden="true">!</span>
      <span className="tf-incident-badge__count">{count}</span>
      {hasIncidents && <span className="tf-incident-badge__label">INCIDENT{count !== 1 ? 'S' : ''}</span>}
      {!hasIncidents && <span className="tf-incident-badge__label">ALL CLEAR</span>}
    </span>
  );
};

IncidentBadge.displayName = 'IncidentBadge';

export default IncidentBadge;
