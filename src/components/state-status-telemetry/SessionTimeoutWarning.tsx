/**
 * ============================================================
 * SessionTimeoutWarning — Torafirma Design System
 * ============================================================
 *
 * Session expiry warning banner. Displayed when the user
 * session is approaching expiration with options to extend.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Props for the SessionTimeoutWarning component.
 */
export interface SessionTimeoutWarningProps {
  /** Whether the warning is visible. */
  visible: boolean;
  /** Time remaining until expiry. */
  timeRemaining: string;
  /** Seconds remaining (for progress). */
  secondsRemaining?: number;
  /** Total warning threshold in seconds. */
  warningThresholdSeconds?: number;
  /** Handler to extend the session. */
  onExtendSession?: () => void;
  /** Handler to logout. */
  onLogout?: () => void;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * SessionTimeoutWarning renders a session expiry warning.
 *
 * @example
 * ```tsx
 * <SessionTimeoutWarning
 *   visible={true}
 *   timeRemaining="5 minutes"
 *   secondsRemaining={300}
 *   warningThresholdSeconds={600}
 *   onExtendSession={() => extendSession()}
 *   onLogout={() => logout()}
 * />
 * ```
 */
export const SessionTimeoutWarning: React.FC<SessionTimeoutWarningProps> = ({
  visible,
  timeRemaining,
  secondsRemaining,
  warningThresholdSeconds = 600,
  onExtendSession,
  onLogout,
  className = '',
  testId,
}) => {
  if (!visible) return null;

  const progressPercent = secondsRemaining !== undefined && warningThresholdSeconds > 0
    ? (secondsRemaining / warningThresholdSeconds) * 100
    : 50;

  return (
    <div
      className={`tf-session-timeout-warning ${className}`}
      data-testid={testId}
      role="alert"
      aria-label={`Session expires in ${timeRemaining}`}
    >
      <span className="tf-session-timeout-warning__icon" aria-hidden="true">&#x23F1;</span>
      <div className="tf-session-timeout-warning__content">
        <span className="tf-session-timeout-warning__title">Session Expiring</span>
        <span className="tf-session-timeout-warning__message">
          Your session expires in {timeRemaining}.
        </span>
        <div className="tf-session-timeout-warning__bar">
          <div
            className="tf-session-timeout-warning__fill"
            style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="tf-session-timeout-warning__actions">
        {onExtendSession && (
          <button
            className="tf-session-timeout-warning__extend"
            onClick={onExtendSession}
            type="button"
          >
            Extend Session
          </button>
        )}
        {onLogout && (
          <button
            className="tf-session-timeout-warning__logout"
            onClick={onLogout}
            type="button"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

SessionTimeoutWarning.displayName = 'SessionTimeoutWarning';

export default SessionTimeoutWarning;
