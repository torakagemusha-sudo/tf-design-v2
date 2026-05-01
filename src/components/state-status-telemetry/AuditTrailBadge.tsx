/**
 * ============================================================
 * AuditTrailBadge — Torafirma Design System
 * ============================================================
 *
 * Compact audit trail indicator. Shows audit state as a small
 * badge with optional event count for dense layouts.
 *
 * From 03.2 State, Status & Telemetry — Section 3.7 Governance
 * ============================================================
 */

import React from 'react';
import type { AuditState } from './AuditStatus';

/**
 * Props for the AuditTrailBadge component.
 */
export interface AuditTrailBadgeProps {
  /** Audit trail state. */
  state: AuditState;
  /** Number of audit events. */
  eventCount?: number;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const badgeMeta: Record<AuditState, { label: string; variant: string }> = {
  active: { label: 'AUDIT', variant: 'run' },
  paused: { label: 'PAUSED', variant: 'warning' },
  error: { label: 'ERR', variant: 'danger' },
  disabled: { label: 'OFF', variant: 'neutral' },
  overflow: { label: 'FULL', variant: 'danger' },
};

/**
 * AuditTrailBadge renders a compact audit trail indicator.
 *
 * @example
 * ```tsx
 * <AuditTrailBadge state="active" eventCount={15234} />
 * <AuditTrailBadge state="error" size="sm" />
 * ```
 */
export const AuditTrailBadge: React.FC<AuditTrailBadgeProps> = ({
  state,
  eventCount,
  size = 'sm',
  className = '',
  testId,
}) => {
  const meta = badgeMeta[state];

  return (
    <span
      className={`tf-audit-trail-badge tf-audit-trail-badge--${meta.variant} tf-audit-trail-badge--${size} ${className}`}
      data-testid={testId}
      data-audit-state={state}
      role="status"
      aria-label={`Audit: ${meta.label}${eventCount !== undefined ? `, ${eventCount} events` : ''}`}
      title={`Audit: ${state}`}
    >
      {meta.label}
      {eventCount !== undefined && (
        <span className="tf-audit-trail-badge__count">{eventCount >= 1000 ? `${(eventCount / 1000).toFixed(1)}k` : eventCount}</span>
      )}
    </span>
  );
};

AuditTrailBadge.displayName = 'AuditTrailBadge';

export default AuditTrailBadge;
