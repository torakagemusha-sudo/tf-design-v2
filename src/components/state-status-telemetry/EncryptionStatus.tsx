/**
 * ============================================================
 * EncryptionStatus — Torafirma Design System
 * ============================================================
 *
 * Encryption state indicator. Shows whether data is encrypted
 * at rest and in transit with algorithm details.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Encryption states.
 */
export type EncryptionState = 'encrypted' | 'partial' | 'unencrypted' | 'rotating';

/**
 * Props for the EncryptionStatus component.
 */
export interface EncryptionStatusProps {
  /** At-rest encryption state. */
  atRest: EncryptionState;
  /** In-transit encryption state. */
  inTransit: EncryptionState;
  /** Encryption algorithm. */
  algorithm?: string;
  /** Key identifier. */
  keyId?: string;
  /** Key rotation timestamp. */
  lastRotatedAt?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const stateMeta: Record<EncryptionState, { label: string; variant: string }> = {
  encrypted: { label: 'ENCRYPTED', variant: 'run' },
  partial: { label: 'PARTIAL', variant: 'warning' },
  unencrypted: { label: 'UNENCRYPTED', variant: 'danger' },
  rotating: { label: 'ROTATING', variant: 'stream' },
};

/**
 * EncryptionStatus renders an encryption state indicator.
 *
 * @example
 * ```tsx
 * <EncryptionStatus atRest="encrypted" inTransit="encrypted" algorithm="AES-256-GCM" keyId="key-42" lastRotatedAt="2024-01-01T00:00:00Z" />
 * ```
 */
export const EncryptionStatus: React.FC<EncryptionStatusProps> = ({
  atRest,
  inTransit,
  algorithm,
  keyId,
  lastRotatedAt,
  className = '',
  testId,
}) => {
  const overall = atRest === 'encrypted' && inTransit === 'encrypted' ? 'encrypted'
    : atRest === 'unencrypted' || inTransit === 'unencrypted' ? 'partial'
    : 'partial';

  return (
    <div
      className={`tf-encryption-status ${className}`}
      data-testid={testId}
      role="status"
      aria-label={`Encryption: at rest ${atRest}, in transit ${inTransit}`}
    >
      <div className="tf-encryption-status__states">
        <span className={`tf-encryption-status__state tf-encryption-status__state--${stateMeta[atRest].variant}`}>
          At Rest: {stateMeta[atRest].label}
        </span>
        <span className={`tf-encryption-status__state tf-encryption-status__state--${stateMeta[inTransit].variant}`}>
          In Transit: {stateMeta[inTransit].label}
        </span>
      </div>
      {algorithm && <span className="tf-encryption-status__algo">{algorithm}</span>}
      {keyId && <span className="tf-encryption-status__key">Key: {keyId}</span>}
      {lastRotatedAt && <span className="tf-encryption-status__rotated">Rotated: {lastRotatedAt}</span>}
    </div>
  );
};

EncryptionStatus.displayName = 'EncryptionStatus';

export default EncryptionStatus;
