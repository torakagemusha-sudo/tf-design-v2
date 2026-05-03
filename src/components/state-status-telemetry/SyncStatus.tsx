/**
 * ============================================================
 * SyncStatus — Torafirma Design System
 * ============================================================
 *
 * Shows sync state: syncing, synced, or conflict. Indicates
 * whether local state matches remote state and if there are
 * pending synchronization operations.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../types';

/**
 * Synchronization states.
 */
export type SyncState = 'syncing' | 'synced' | 'conflict' | 'pending' | 'error' | 'offline';

/**
 * Props for the SyncStatus component.
 */
export interface SyncStatusProps {
  /** Current sync state. */
  state: SyncState;
  /** Number of pending changes. */
  pendingCount?: number;
  /** Last sync timestamp. */
  lastSync?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const syncMeta: Record<SyncState, { label: string; variant: string }> = {
  syncing: { label: 'SYNCING', variant: 'stream' },
  synced: { label: 'SYNCED', variant: 'run' },
  conflict: { label: 'CONFLICT', variant: 'danger' },
  pending: { label: 'PENDING', variant: 'warning' },
  error: { label: 'SYNC ERROR', variant: 'danger' },
  offline: { label: 'OFFLINE', variant: 'neutral' },
};

/**
 * SyncStatus renders a synchronization state indicator.
 *
 * @example
 * ```tsx
 * <SyncStatus state="syncing" pendingCount={5} />
 * <SyncStatus state="conflict" lastSync="2024-01-15T10:00:00Z" />
 * ```
 */
export const SyncStatus: React.FC<SyncStatusProps> = ({
  state,
  pendingCount,
  lastSync,
  density = 'standard',
  className = '',
  testId,
}) => {
  const meta = syncMeta[state];
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-sync-status tf-sync-status--${meta.variant} tf-sync-status--${state} ${densityClass} ${className}`}
      data-testid={testId}
      data-sync-state={state}
      role="status"
      aria-label={`Sync: ${meta.label}`}
    >
      <span className={`tf-sync-status__icon tf-sync-status__icon--${meta.variant}`} aria-hidden="true" />
      <span className="tf-sync-status__label">{meta.label}</span>
      {pendingCount !== undefined && pendingCount > 0 && (
        <span className="tf-sync-status__pending">{pendingCount} pending</span>
      )}
      {lastSync && <span className="tf-sync-status__last">{lastSync}</span>}
    </div>
  );
};

SyncStatus.displayName = 'SyncStatus';

export default SyncStatus;
