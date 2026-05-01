/**
 * ============================================================
 * BackupStatus — Torafirma Design System
 * ============================================================
 *
 * Backup state indicator. Shows the status of backup operations
 * with last backup time, size, and next scheduled backup.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Backup states.
 */
export type BackupState = 'idle' | 'scheduled' | 'running' | 'verifying' | 'complete' | 'failed' | 'overdue';

/**
 * Props for the BackupStatus component.
 */
export interface BackupStatusProps {
  /** Current backup state. */
  state: BackupState;
  /** Last successful backup timestamp. */
  lastBackupAt?: string;
  /** Last backup size. */
  lastBackupSize?: string;
  /** Next scheduled backup timestamp. */
  nextBackupAt?: string;
  /** Backup target name. */
  target?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const backupMeta: Record<BackupState, { label: string; variant: string }> = {
  idle: { label: 'IDLE', variant: 'neutral' },
  scheduled: { label: 'SCHEDULED', variant: 'neutral' },
  running: { label: 'BACKING UP', variant: 'stream' },
  verifying: { label: 'VERIFYING', variant: 'stream' },
  complete: { label: 'BACKUP OK', variant: 'run' },
  failed: { label: 'BACKUP FAILED', variant: 'danger' },
  overdue: { label: 'BACKUP OVERDUE', variant: 'warning' },
};

/**
 * BackupStatus renders a backup operation state indicator.
 *
 * @example
 * ```tsx
 * <BackupStatus state="complete" lastBackupAt="2024-01-15T02:00:00Z" lastBackupSize="2.4 GB" nextBackupAt="2024-01-16T02:00:00Z" />
 * ```
 */
export const BackupStatus: React.FC<BackupStatusProps> = ({
  state,
  lastBackupAt,
  lastBackupSize,
  nextBackupAt,
  target,
  className = '',
  testId,
}) => {
  const meta = backupMeta[state];

  return (
    <div
      className={`tf-backup-status tf-backup-status--${meta.variant} tf-backup-status--${state} ${className}`}
      data-testid={testId}
      data-backup-state={state}
      role="status"
      aria-label={`Backup: ${meta.label}`}
    >
      <span className={`tf-backup-status__icon tf-backup-status__icon--${meta.variant}`} aria-hidden="true" />
      <span className="tf-backup-status__label">{meta.label}</span>
      {target && <span className="tf-backup-status__target">{target}</span>}
      {lastBackupAt && <span className="tf-backup-status__last">Last: {lastBackupAt}</span>}
      {lastBackupSize && <span className="tf-backup-status__size">{lastBackupSize}</span>}
      {nextBackupAt && <span className="tf-backup-status__next">Next: {nextBackupAt}</span>}
    </div>
  );
};

BackupStatus.displayName = 'BackupStatus';

export default BackupStatus;
