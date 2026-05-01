import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Alert severity tiers.
 */
export type EmergencyAlertSeverity =
  | 'emergency'
  | 'critical'
  | 'severe'
  | 'warning'
  | 'advisory';

/**
 * Props for EmergencyAlertBanner.
 */
export interface EmergencyAlertBannerProps {
  /** Alert headline. */
  headline: string;
  /** Detailed message. */
  message: string;
  /** Severity tier. */
  severity: EmergencyAlertSeverity;
  /** Issued at timestamp. */
  issuedAt?: string;
  /** Issuing authority. */
  issuedBy?: string;
  /** Expires at timestamp. */
  expiresAt?: string;
  /** Dismiss handler. */
  onDismiss?: () => void;
  /** View details handler. */
  onViewDetails?: () => void;
  /** Whether banner is sticky (fixed to viewport top). */
  sticky?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * EmergencyAlertBanner — emergency alert banner.
 *
 * Full-width banner with severity colour coding.
 * Sticky mode pins to viewport top for persistent visibility.
 * Emergency severity triggers screen-wide flash animation.
 * Displays issuing authority and expiry for trust verification.
 */
export const EmergencyAlertBanner: React.FC<EmergencyAlertBannerProps> = ({
  headline,
  message,
  severity,
  issuedAt,
  issuedBy,
  expiresAt,
  onDismiss,
  onViewDetails,
  sticky = true,
  className = '',
  testId,
}) => {
  const severityClass = `tf-emergency-banner--${severity}`;
  const stickyClass = sticky ? 'tf-emergency-banner--sticky' : '';

  return (
    <div
      data-testid={testId}
      data-severity={severity}
      className={[
        'tf-emergency-banner',
        severityClass,
        stickyClass,
        className,
      ].join(' ')}
      role="alert"
      aria-live="assertive"
    >
      {/* Siren stripe */}
      <div className="tf-emergency-banner__stripe" aria-hidden="true" />

      {/* Content */}
      <div className="tf-emergency-banner__content">
        {/* Severity badge */}
        <span className="tf-emergency-banner__badge">
          {severity.toUpperCase()}
        </span>

        {/* Headline */}
        <h3 className="tf-emergency-banner__headline">{headline}</h3>

        {/* Message */}
        <p className="tf-emergency-banner__message">{message}</p>

        {/* Meta */}
        <div className="tf-emergency-banner__meta">
          {issuedBy && (
            <span className="tf-emergency-banner__issuer">
              Issued by: {issuedBy}
            </span>
          )}
          {issuedAt && (
            <time dateTime={issuedAt}>{issuedAt}</time>
          )}
          {expiresAt && (
            <span className="tf-emergency-banner__expiry">
              Expires: {expiresAt}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="tf-emergency-banner__actions">
          {onViewDetails && (
            <button
              type="button"
              className="tf-emergency-banner__btn tf-emergency-banner__btn--details"
              onClick={onViewDetails}
            >
              View Details
            </button>
          )}
          {onDismiss && (
            <button
              type="button"
              className="tf-emergency-banner__btn tf-emergency-banner__btn--dismiss"
              onClick={onDismiss}
              aria-label="Dismiss alert"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

EmergencyAlertBanner.displayName = 'EmergencyAlertBanner';

export default EmergencyAlertBanner;
