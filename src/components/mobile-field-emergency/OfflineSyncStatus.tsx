import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Sync state machine states.
 */
export type OfflineSyncState =
  | 'idle'
  | 'syncing'
  | 'success'
  | 'error'
  | 'queued';

/**
 * Props for OfflineSyncStatus.
 */
export interface OfflineSyncStatusProps {
  /** Current sync state. */
  state: OfflineSyncState;
  /** Number of items in queue. */
  queueCount?: number;
  /** Items successfully synced. */
  syncedCount?: number;
  /** Error message if sync failed. */
  errorMessage?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * OfflineSyncStatus — sync status indicator.
 *
 * A compact inline indicator showing current sync state:
 * idle → syncing → success/error.
 * Displays queue count and animated spinner during active sync.
 */
export const OfflineSyncStatus: React.FC<OfflineSyncStatusProps> = ({
  state,
  queueCount = 0,
  syncedCount,
  errorMessage,
  className = '',
  testId,
}) => {
  const stateClass = `tf-offline-sync-status--${state}`;

  const statusText: Record<OfflineSyncState, string> = {
    idle: 'All changes saved',
    syncing: 'Syncing...',
    success: `Synced${syncedCount !== undefined ? ` ${syncedCount} items` : ''}`,
    error: errorMessage || 'Sync failed',
    queued: `${queueCount} item${queueCount !== 1 ? 's' : ''} queued`,
  };

  return (
    <div
      data-testid={testId}
      className={['tf-offline-sync-status', stateClass, className].join(' ')}
      role="status"
      aria-live="polite"
    >
      {/* State dot */}
      <span
        className="tf-offline-sync-status__dot"
        aria-hidden="true"
      />

      {/* Label */}
      <span className="tf-offline-sync-status__label">
        {statusText[state]}
      </span>

      {/* Spinner during sync */}
      {state === 'syncing' && (
        <span className="tf-offline-sync-status__spinner" aria-hidden="true">
          ⟳
        </span>
      )}
    </div>
  );
};

OfflineSyncStatus.displayName = 'OfflineSyncStatus';

export default OfflineSyncStatus;
