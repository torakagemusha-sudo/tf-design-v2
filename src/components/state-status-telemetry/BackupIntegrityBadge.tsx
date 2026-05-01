/**
 * ============================================================
 * BackupIntegrityBadge — Torafirma Design System
 * ============================================================
 *
 * Backup integrity status badge. Indicates whether the latest
 * backup passed integrity verification.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Backup integrity states.
 */
export type BackupIntegrityState = 'verified' | 'pending' | 'failed' | 'unknown';

/**
 * Props for the BackupIntegrityBadge component.
 */
export interface BackupIntegrityBadgeProps {
  /** Current integrity state. */
  state: BackupIntegrityState;
  /** Last verification timestamp. */
  lastVerifiedAt?: string;
  /** Backup identifier. */
  backupId?: string;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const integrityMeta: Record<BackupIntegrityState, { label: string; variant: string }> = {
  verified: { label: 'INTEGRITY OK', variant: 'run' },
  pending: { label: 'VERIFYING', variant: 'stream' },
  failed: { label: 'INTEGRITY FAIL', variant: 'danger' },
  unknown: { label: 'UNKNOWN', variant: 'neutral' },
};

/**
 * BackupIntegrityBadge renders a backup integrity status badge.
 *
 * @example
 * ```tsx
 * <BackupIntegrityBadge state="verified" lastVerifiedAt="2024-01-15T02:30:00Z" backupId="backup-20240115" />
 * ```
 */
export const BackupIntegrityBadge: React.FC<BackupIntegrityBadgeProps> = ({
  state,
  lastVerifiedAt,
  backupId,
  size = 'md',
  className = '',
  testId,
}) => {
  const meta = integrityMeta[state];

  return (
    <span
      className={`tf-backup-integrity-badge tf-backup-integrity-badge--${meta.variant} tf-backup-integrity-badge--${size} ${className}`}
      data-testid={testId}
      data-integrity-state={state}
      role="status"
      aria-label={`Backup integrity: ${meta.label}`}
      title={`${backupId || 'Backup'}: ${meta.label}${lastVerifiedAt ? `, last verified: ${lastVerifiedAt}` : ''}`}
    >
      {meta.label}
      {lastVerifiedAt && <span className="tf-backup-integrity-badge__time">{lastVerifiedAt}</span>}
    </span>
  );
};

BackupIntegrityBadge.displayName = 'BackupIntegrityBadge';

export default BackupIntegrityBadge;
