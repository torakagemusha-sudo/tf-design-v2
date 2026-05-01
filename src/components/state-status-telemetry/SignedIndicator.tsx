/**
 * ============================================================
 * SignedIndicator — Torafirma Design System
 * ============================================================
 *
 * Digital signature status indicator. Shows whether an artifact,
 * transaction, or operation has been digitally signed, including
 * signer identity and timestamp.
 *
 * From 03.2 State, Status & Telemetry — Section 3.7 Governance
 * ============================================================
 */

import React from 'react';

/**
 * Signature states.
 */
export type SignatureState = 'signed' | 'unsigned' | 'pending' | 'expired' | 'revoked' | 'invalid';

/**
 * Props for the SignedIndicator component.
 */
export interface SignedIndicatorProps {
  /** Current signature state. */
  state: SignatureState;
  /** Signer identity. */
  signer?: string;
  /** ISO timestamp of signature. */
  signedAt?: string;
  /** Signature algorithm or method. */
  algorithm?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const signatureMeta: Record<SignatureState, { label: string; variant: string }> = {
  signed: { label: 'SIGNED', variant: 'authority' },
  unsigned: { label: 'UNSIGNED', variant: 'neutral' },
  pending: { label: 'SIGNATURE PENDING', variant: 'warning' },
  expired: { label: 'SIGNATURE EXPIRED', variant: 'danger' },
  revoked: { label: 'SIGNATURE REVOKED', variant: 'danger' },
  invalid: { label: 'SIGNATURE INVALID', variant: 'danger' },
};

/**
 * SignedIndicator renders a digital signature status.
 *
 * @example
 * ```tsx
 * <SignedIndicator state="signed" signer="admin@corp" signedAt="2024-01-15T10:00:00Z" />
 * <SignedIndicator state="unsigned" />
 * ```
 */
export const SignedIndicator: React.FC<SignedIndicatorProps> = ({
  state,
  signer,
  signedAt,
  algorithm,
  className = '',
  testId,
}) => {
  const meta = signatureMeta[state];

  return (
    <div
      className={`tf-signed-indicator tf-signed-indicator--${meta.variant} tf-signed-indicator--${state} ${className}`}
      data-testid={testId}
      data-signature-state={state}
      role="status"
      aria-label={`Signature: ${meta.label}`}
    >
      <span className={`tf-signed-indicator__icon tf-signed-indicator__icon--${meta.variant}`} aria-hidden="true">&#x2713;</span>
      <span className="tf-signed-indicator__label">{meta.label}</span>
      {state === 'signed' && (
        <div className="tf-signed-indicator__details">
          {signer && <span className="tf-signed-indicator__signer">{signer}</span>}
          {signedAt && <span className="tf-signed-indicator__time">{signedAt}</span>}
          {algorithm && <span className="tf-signed-indicator__algo">{algorithm}</span>}
        </div>
      )}
    </div>
  );
};

SignedIndicator.displayName = 'SignedIndicator';

export default SignedIndicator;
