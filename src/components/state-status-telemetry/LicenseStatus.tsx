/**
 * ============================================================
 * LicenseStatus — Torafirma Design System
 * ============================================================
 *
 * License validity indicator. Shows license state, expiry,
 * type, and days remaining.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * License states.
 */
export type LicenseState = 'active' | 'expiring' | 'expired' | 'trial' | 'invalid' | 'revoked';

/**
 * Props for the LicenseStatus component.
 */
export interface LicenseStatusProps {
  /** Current license state. */
  state: LicenseState;
  /** License type or tier. */
  type?: string;
  /** Expiry date string. */
  expiresAt?: string;
  /** Days until expiry. */
  daysRemaining?: number;
  /** Licensed features. */
  features?: string[];
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const licenseMeta: Record<LicenseState, { label: string; variant: string }> = {
  active: { label: 'LICENSE ACTIVE', variant: 'run' },
  expiring: { label: 'LICENSE EXPIRING', variant: 'warning' },
  expired: { label: 'LICENSE EXPIRED', variant: 'danger' },
  trial: { label: 'TRIAL', variant: 'inspect' },
  invalid: { label: 'INVALID LICENSE', variant: 'danger' },
  revoked: { label: 'LICENSE REVOKED', variant: 'danger' },
};

/**
 * LicenseStatus renders a license validity indicator.
 *
 * @example
 * ```tsx
 * <LicenseStatus state="expiring" type="Enterprise" expiresAt="2024-03-15" daysRemaining={45} features={["Feature A", "Feature B"]} />
 * ```
 */
export const LicenseStatus: React.FC<LicenseStatusProps> = ({
  state,
  type,
  expiresAt,
  daysRemaining,
  features,
  className = '',
  testId,
}) => {
  const meta = licenseMeta[state];

  return (
    <div
      className={`tf-license-status tf-license-status--${meta.variant} tf-license-status--${state} ${className}`}
      data-testid={testId}
      data-license-state={state}
      role="status"
      aria-label={meta.label}
    >
      <span className="tf-license-status__icon" aria-hidden="true">&#x1F4DD;</span>
      <span className={`tf-license-status__badge tf-license-status__badge--${meta.variant}`}>{meta.label}</span>
      {type && <span className="tf-license-status__type">{type}</span>}
      {expiresAt && <span className="tf-license-status__expires">Expires: {expiresAt}</span>}
      {daysRemaining !== undefined && (
        <span className={`tf-license-status__days tf-license-status__days--${state === 'expiring' ? 'warning' : 'neutral'}`}>
          {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
        </span>
      )}
      {features && features.length > 0 && (
        <span className="tf-license-status__features">{features.join(', ')}</span>
      )}
    </div>
  );
};

LicenseStatus.displayName = 'LicenseStatus';

export default LicenseStatus;
