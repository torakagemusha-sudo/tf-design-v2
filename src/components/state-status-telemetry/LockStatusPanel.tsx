/**
 * ============================================================
 * LockStatusPanel — Torafirma Design System
 * ============================================================
 *
 * Detailed lock status panel showing lock owner, timestamp,
 * reason, and authority level required to unlock.
 *
 * From 03.2 State, Status & Telemetry — Section 3.7 Governance
 * ============================================================
 */

import React from 'react';
import type { AuthorityLevel, ComponentDensity } from '../../types';

/**
 * Props for the LockStatusPanel component.
 */
export interface LockStatusPanelProps {
  /** Whether the target is locked. */
  locked: boolean;
  /** Lock owner identifier. */
  lockedBy?: string;
  /** ISO timestamp when lock was acquired. */
  lockedAt?: string;
  /** Reason for the lock. */
  reason?: string;
  /** Authority required to release the lock. */
  requiredAuthority?: AuthorityLevel;
  /** Identifier of the locked object. */
  targetId?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * LockStatusPanel renders detailed lock information.
 *
 * @example
 * ```tsx
 * <LockStatusPanel
 *   locked={true}
 *   lockedBy="operator-1"
 *   lockedAt="2024-01-15T10:30:00Z"
 *   reason="Prevent concurrent edits during validation"
 *   requiredAuthority="AUTH_4_COMMIT"
 *   targetId="workflow-42"
 * />
 * ```
 */
export const LockStatusPanel: React.FC<LockStatusPanelProps> = ({
  locked,
  lockedBy,
  lockedAt,
  reason,
  requiredAuthority,
  targetId,
  density = 'standard',
  className = '',
  testId,
}) => {
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-lock-status-panel tf-lock-status-panel--${locked ? 'locked' : 'unlocked'} ${densityClass} ${className}`}
      data-testid={testId}
      data-locked={locked}
      role="region"
      aria-label={`Lock status${targetId ? ` for ${targetId}` : ''}`}
    >
      <div className="tf-lock-status-panel__header">
        <span className="tf-lock-status-panel__icon" aria-hidden="true">
          {locked ? '&#x1F512;' : '&#x1F513;'}
        </span>
        <span className="tf-lock-status-panel__status">{locked ? 'LOCKED' : 'UNLOCKED'}</span>
        {targetId && <span className="tf-lock-status-panel__target">{targetId}</span>}
      </div>
      {locked && (
        <div className="tf-lock-status-panel__details">
          {lockedBy && <div className="tf-lock-status-panel__detail"><span className="tf-lock-status-panel__detail-label">Locked by:</span> {lockedBy}</div>}
          {lockedAt && <div className="tf-lock-status-panel__detail"><span className="tf-lock-status-panel__detail-label">Locked at:</span> {lockedAt}</div>}
          {reason && <div className="tf-lock-status-panel__detail"><span className="tf-lock-status-panel__detail-label">Reason:</span> {reason}</div>}
          {requiredAuthority && (
            <div className="tf-lock-status-panel__detail">
              <span className="tf-lock-status-panel__detail-label">Required authority:</span> {requiredAuthority}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

LockStatusPanel.displayName = 'LockStatusPanel';

export default LockStatusPanel;
