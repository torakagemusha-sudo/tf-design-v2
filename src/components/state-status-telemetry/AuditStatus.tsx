/**
 * ============================================================
 * AuditStatus — Torafirma Design System
 * ============================================================
 *
 * Audit trail status indicator. Shows whether the audit trail
 * is active, current, and intact with last audit event info.
 *
 * From 03.2 State, Status & Telemetry — Section 3.7 Governance
 * ============================================================
 */

import React from 'react';

/**
 * Audit trail states.
 */
export type AuditState = 'active' | 'paused' | 'error' | 'disabled' | 'overflow';

/**
 * Props for the AuditStatus component.
 */
export interface AuditStatusProps {
  /** Current audit trail state. */
  state: AuditState;
  /** Last audit event timestamp. */
  lastEventAt?: string;
  /** Total number of audit events. */
  eventCount?: number;
  /** Retention period. */
  retention?: string;
  /** Whether tamper detection is active. */
  tamperDetection?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const auditMeta: Record<AuditState, { label: string; variant: string }> = {
  active: { label: 'AUDIT ACTIVE', variant: 'run' },
  paused: { label: 'AUDIT PAUSED', variant: 'warning' },
  error: { label: 'AUDIT ERROR', variant: 'danger' },
  disabled: { label: 'AUDIT DISABLED', variant: 'neutral' },
  overflow: { label: 'AUDIT OVERFLOW', variant: 'danger' },
};

/**
 * AuditStatus renders an audit trail state indicator.
 *
 * @example
 * ```tsx
 * <AuditStatus state="active" lastEventAt="2024-01-15T10:30:00Z" eventCount={15234} retention="90 days" tamperDetection={true} />
 * ```
 */
export const AuditStatus: React.FC<AuditStatusProps> = ({
  state,
  lastEventAt,
  eventCount,
  retention,
  tamperDetection,
  className = '',
  testId,
}) => {
  const meta = auditMeta[state];

  return (
    <div
      className={`tf-audit-status tf-audit-status--${meta.variant} tf-audit-status--${state} ${className}`}
      data-testid={testId}
      data-audit-state={state}
      role="status"
      aria-label={`Audit: ${meta.label}`}
    >
      <span className={`tf-audit-status__icon tf-audit-status__icon--${meta.variant}`} aria-hidden="true" />
      <span className="tf-audit-status__label">{meta.label}</span>
      {eventCount !== undefined && (
        <span className="tf-audit-status__count">{eventCount.toLocaleString()} events</span>
      )}
      {lastEventAt && <span className="tf-audit-status__last">Last: {lastEventAt}</span>}
      {retention && <span className="tf-audit-status__retention">{retention}</span>}
      {tamperDetection !== undefined && (
        <span className={`tf-audit-status__tamper tf-audit-status__tamper--${tamperDetection ? 'active' : 'inactive'}`}>
          {tamperDetection ? 'Tamper detection on' : 'Tamper detection off'}
        </span>
      )}
    </div>
  );
};

AuditStatus.displayName = 'AuditStatus';

export default AuditStatus;
