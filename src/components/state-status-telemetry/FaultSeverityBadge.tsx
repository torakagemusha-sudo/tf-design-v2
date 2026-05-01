/**
 * ============================================================
 * FaultSeverityBadge — Torafirma Design System
 * ============================================================
 *
 * Fault severity level badge. Compact display of fault severity
 * for use in fault lists, tables, and overview panels.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { FaultSeverity } from './FaultIndicator';

/**
 * Props for the FaultSeverityBadge component.
 */
export interface FaultSeverityBadgeProps {
  /** Fault severity level. */
  severity: FaultSeverity;
  /** Count of faults at this severity. */
  count?: number;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const severityMeta: Record<FaultSeverity, { label: string; variant: string }> = {
  critical: { label: 'CRIT', variant: 'danger' },
  major: { label: 'MAJOR', variant: 'danger' },
  minor: { label: 'MINOR', variant: 'warning' },
  warning: { label: 'WARN', variant: 'warning' },
  info: { label: 'INFO', variant: 'neutral' },
};

/**
 * FaultSeverityBadge renders a compact fault severity badge.
 *
 * @example
 * ```tsx
 * <FaultSeverityBadge severity="critical" count={2} />
 * <FaultSeverityBadge severity="warning" />
 * ```
 */
export const FaultSeverityBadge: React.FC<FaultSeverityBadgeProps> = ({
  severity,
  count,
  size = 'sm',
  className = '',
  testId,
}) => {
  const meta = severityMeta[severity];

  return (
    <span
      className={`tf-fault-severity-badge tf-fault-severity-badge--${meta.variant} tf-fault-severity-badge--${severity} tf-fault-severity-badge--${size} ${className}`}
      data-testid={testId}
      data-fault-severity={severity}
      role="status"
      aria-label={`Severity: ${severity}${count !== undefined ? `, count: ${count}` : ''}`}
      title={`Fault severity: ${severity}`}
    >
      {meta.label}
      {count !== undefined && <span className="tf-fault-severity-badge__count">{count}</span>}
    </span>
  );
};

FaultSeverityBadge.displayName = 'FaultSeverityBadge';

export default FaultSeverityBadge;
