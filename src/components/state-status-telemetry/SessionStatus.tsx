/**
 * ============================================================
 * SessionStatus — Torafirma Design System
 * ============================================================
 *
 * Current user session info display. Shows session identity,
 * authority level, duration, and expiry time.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { AuthorityLevel, ComponentDensity } from '../../types';

/**
 * Props for the SessionStatus component.
 */
export interface SessionStatusProps {
  /** User identifier. */
  userId: string;
  /** Display name. */
  displayName?: string;
  /** Current authority level. */
  authority: AuthorityLevel;
  /** Session start timestamp. */
  startedAt: string;
  /** Session expiry timestamp. */
  expiresAt?: string;
  /** Time remaining in session. */
  timeRemaining?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * SessionStatus renders current user session information.
 *
 * @example
 * ```tsx
 * <SessionStatus
 *   userId="op-42"
 *   displayName="Operator Smith"
 *   authority="AUTH_3_EXECUTE"
 *   startedAt="2024-01-15T08:00:00Z"
 *   expiresAt="2024-01-15T20:00:00Z"
 *   timeRemaining="4h 30m"
 * />
 * ```
 */
export const SessionStatus: React.FC<SessionStatusProps> = ({
  userId,
  displayName,
  authority,
  startedAt,
  expiresAt,
  timeRemaining,
  density = 'standard',
  className = '',
  testId,
}) => {
  const densityClass = `tf-density-${density}`;
  const authorityLevel = parseInt(authority.split('_')[1], 10);

  return (
    <div
      className={`tf-session-status ${densityClass} ${className}`}
      data-testid={testId}
      data-user-id={userId}
      data-authority={authority}
      role="status"
      aria-label={`Session for ${displayName || userId}`}
    >
      <span className="tf-session-status__user">{displayName || userId}</span>
      <span className={`tf-session-status__authority tf-session-status__authority--level-${authorityLevel}`}>
        AUTH {authorityLevel}
      </span>
      <span className="tf-session-status__started">Started: {startedAt}</span>
      {expiresAt && <span className="tf-session-status__expires">Expires: {expiresAt}</span>}
      {timeRemaining && <span className="tf-session-status__remaining">{timeRemaining} remaining</span>}
    </div>
  );
};

SessionStatus.displayName = 'SessionStatus';

export default SessionStatus;
