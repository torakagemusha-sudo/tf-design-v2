/**
 * ============================================================
 * ComplianceBadge — Torafirma Design System
 * ============================================================
 *
 * Compliance status indicator. Shows compliance with regulatory
 * standards (SOC2, ISO 27001, GDPR, etc.).
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Compliance states.
 */
export type ComplianceState = 'compliant' | 'at_risk' | 'non_compliant' | 'pending_audit' | 'exempt';

/**
 * Props for the ComplianceBadge component.
 */
export interface ComplianceBadgeProps {
  /** Compliance standard name. */
  standard: string;
  /** Compliance state. */
  state: ComplianceState;
  /** Last audit date. */
  lastAudit?: string;
  /** Next audit date. */
  nextAudit?: string;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const complianceMeta: Record<ComplianceState, { label: string; variant: string }> = {
  compliant: { label: 'COMPLIANT', variant: 'run' },
  at_risk: { label: 'AT RISK', variant: 'warning' },
  non_compliant: { label: 'NON-COMPLIANT', variant: 'danger' },
  pending_audit: { label: 'PENDING AUDIT', variant: 'inspect' },
  exempt: { label: 'EXEMPT', variant: 'neutral' },
};

/**
 * ComplianceBadge renders a compliance status indicator.
 *
 * @example
 * ```tsx
 * <ComplianceBadge standard="SOC2" state="compliant" lastAudit="2024-01-01" nextAudit="2024-07-01" />
 * ```
 */
export const ComplianceBadge: React.FC<ComplianceBadgeProps> = ({
  standard,
  state,
  lastAudit,
  nextAudit,
  size = 'md',
  className = '',
  testId,
}) => {
  const meta = complianceMeta[state];

  return (
    <span
      className={`tf-compliance-badge tf-compliance-badge--${meta.variant} tf-compliance-badge--${state} tf-compliance-badge--${size} ${className}`}
      data-testid={testId}
      data-compliance-state={state}
      role="status"
      aria-label={`${standard}: ${meta.label}`}
      title={`${standard}: ${state}`}
    >
      <span className="tf-compliance-badge__standard">{standard}</span>
      <span className={`tf-compliance-badge__state tf-compliance-badge__state--${meta.variant}`}>{meta.label}</span>
      {lastAudit && <span className="tf-compliance-badge__last">Last: {lastAudit}</span>}
      {nextAudit && <span className="tf-compliance-badge__next">Next: {nextAudit}</span>}
    </span>
  );
};

ComplianceBadge.displayName = 'ComplianceBadge';

export default ComplianceBadge;
