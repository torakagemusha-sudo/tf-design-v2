/**
 * ============================================================
 * SyncIndicator — Torafirma Design System
 * ============================================================
 *
 * Minimal sync state indicator. Single icon showing sync status
 * for compact layouts like tables and lists.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { SyncState } from './SyncStatus';

/**
 * Props for the SyncIndicator component.
 */
export interface SyncIndicatorProps {
  /** Current sync state. */
  state: SyncState;
  /** Size variant. */
  size?: 'xs' | 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const syncVariants: Record<SyncState, string> = {
  syncing: 'stream',
  synced: 'run',
  conflict: 'danger',
  pending: 'warning',
  error: 'danger',
  offline: 'neutral',
};

/**
 * SyncIndicator renders a minimal sync state icon.
 *
 * @example
 * ```tsx
 * <SyncIndicator state="synced" />
 * <SyncIndicator state="syncing" size="sm" />
 * ```
 */
export const SyncIndicator: React.FC<SyncIndicatorProps> = ({
  state,
  size = 'sm',
  className = '',
  testId,
}) => {
  return (
    <span
      className={`tf-sync-indicator tf-sync-indicator--${syncVariants[state]} tf-sync-indicator--${size} ${className}`}
      data-testid={testId}
      data-sync-state={state}
      role="status"
      aria-label={`Sync: ${state}`}
      title={`Sync: ${state}`}
    >
      <span className={`tf-sync-indicator__icon tf-sync-indicator__icon--${syncVariants[state]}`} aria-hidden="true" />
    </span>
  );
};

SyncIndicator.displayName = 'SyncIndicator';

export default SyncIndicator;
