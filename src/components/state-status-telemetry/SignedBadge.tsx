/**
 * ============================================================
 * SignedBadge — Torafirma Design System
 * ============================================================
 *
 * Compact signed state badge. Minimal indicator showing only
 * signature status for tables and dense lists.
 *
 * From 03.2 State, Status & Telemetry — Section 3.7 Governance
 * ============================================================
 */

import React from 'react';
import type { SignatureState } from './SignedIndicator';

/**
 * Props for the SignedBadge component.
 */
export interface SignedBadgeProps {
  /** Signature state. */
  state: SignatureState;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const badgeMeta: Record<SignatureState, { label: string; variant: string }> = {
  signed: { label: 'SIGNED', variant: 'authority' },
  unsigned: { label: 'UNSIGNED', variant: 'neutral' },
  pending: { label: 'PENDING', variant: 'warning' },
  expired: { label: 'EXPIRED', variant: 'danger' },
  revoked: { label: 'REVOKED', variant: 'danger' },
  invalid: { label: 'INVALID', variant: 'danger' },
};

/**
 * SignedBadge renders a compact signature status badge.
 *
 * @example
 * ```tsx
 * <SignedBadge state="signed" />
 * <SignedBadge state="pending" size="sm" />
 * ```
 */
export const SignedBadge: React.FC<SignedBadgeProps> = ({
  state,
  size = 'sm',
  className = '',
  testId,
}) => {
  const meta = badgeMeta[state];

  return (
    <span
      className={`tf-signed-badge tf-signed-badge--${meta.variant} tf-signed-badge--${size} ${className}`}
      data-testid={testId}
      data-signature-state={state}
      role="status"
      aria-label={`Signature: ${meta.label}`}
      title={`Signature: ${meta.label}`}
    >
      {meta.label}
    </span>
  );
};

SignedBadge.displayName = 'SignedBadge';

export default SignedBadge;
