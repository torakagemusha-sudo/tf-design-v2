import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Offline severity — controls urgency of the banner presentation.
 */
export type OfflineSeverity = 'info' | 'warning' | 'critical';

/**
 * Props for OfflineBanner.
 */
export interface OfflineBannerProps {
  /** Whether the device is currently offline. */
  isOffline: boolean;
  /** Number of queued items waiting to sync. */
  pendingSyncCount?: number;
  /** Last successful sync timestamp. */
  lastSyncAt?: string;
  /** Severity tier. */
  severity?: OfflineSeverity;
  /** Custom message override. */
  message?: string;
  /** Children — typically OfflineBannerIcon + OfflineBannerActions. */
  children?: React.ReactNode;
  /** Dismiss handler (only shown if provided). */
  onDismiss?: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * OfflineBanner — offline mode banner.
 *
 * Appears at the top of the viewport when connectivity is lost.
 * Displays sync queue status and provides manual sync trigger.
 * Critical severity for emergency operatives who require live comms.
 */
export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOffline,
  pendingSyncCount = 0,
  lastSyncAt,
  severity = 'warning',
  message,
  children,
  onDismiss,
  className = '',
  testId,
}) => {
  if (!isOffline) return null;

  const severityClass = `tf-offline-banner--${severity}`;

  const defaultMessage =
    message ||
    (pendingSyncCount > 0
      ? `Offline — ${pendingSyncCount} item${pendingSyncCount !== 1 ? 's' : ''} queued`
      : 'Offline — working in local mode');

  return (
    <div
      data-testid={testId}
      className={['tf-offline-banner', severityClass, className].join(' ')}
      role="alert"
      aria-live="polite"
    >
      <div className="tf-offline-banner__content">
        {/* Pulse indicator */}
        <span className="tf-offline-banner__pulse" aria-hidden="true" />

        {/* Message */}
        <span className="tf-offline-banner__message">{defaultMessage}</span>

        {/* Last sync */}
        {lastSyncAt && (
          <span className="tf-offline-banner__last-sync">
            Last sync: {lastSyncAt}
          </span>
        )}

        {/* Composed children */}
        {children}
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          type="button"
          className="tf-offline-banner__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss offline banner"
        >
          ✕
        </button>
      )}
    </div>
  );
};

OfflineBanner.displayName = 'OfflineBanner';

export default OfflineBanner;
