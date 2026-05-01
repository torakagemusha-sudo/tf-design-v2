import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for OfflineBannerActions.
 */
export interface OfflineBannerActionsProps {
  /** Manual sync trigger. */
  onSync?: () => void;
  /** Sync in progress. */
  syncing?: boolean;
  /** View queued items. */
  onViewQueue?: () => void;
  /** Number of queued items. */
  queueCount?: number;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * OfflineBannerActions — action buttons within the offline banner.
 *
 * Provides manual sync and queue inspection controls.
 * Buttons are 36 px minimum for the constrained banner height.
 */
export const OfflineBannerActions: React.FC<OfflineBannerActionsProps> = ({
  onSync,
  syncing = false,
  onViewQueue,
  queueCount,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-offline-banner-actions', className].join(' ')}
    >
      {onViewQueue && (
        <button
          type="button"
          className="tf-offline-banner-actions__btn tf-offline-banner-actions__btn--queue"
          onClick={onViewQueue}
        >
          Queue{queueCount !== undefined ? ` (${queueCount})` : ''}
        </button>
      )}
      {onSync && (
        <button
          type="button"
          className={[
            'tf-offline-banner-actions__btn',
            'tf-offline-banner-actions__btn--sync',
            syncing ? 'tf-offline-banner-actions__btn--syncing' : '',
          ].join(' ')}
          onClick={onSync}
          disabled={syncing}
        >
          {syncing ? '⟳ Syncing...' : '↻ Sync Now'}
        </button>
      )}
    </div>
  );
};

OfflineBannerActions.displayName = 'OfflineBannerActions';

export default OfflineBannerActions;
