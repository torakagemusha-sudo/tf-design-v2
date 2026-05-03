/**
 * ============================================================
 * LockIndicator — Torafirma Design System
 * ============================================================
 *
 * Shows locked/unlocked state with icon and label. Indicates
 * whether an object, field, or operation is protected by
 * authority or policy.
 *
 * From 03.2 State, Status & Telemetry — Section 3.7 Governance
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../types';

/**
 * Props for the LockIndicator component.
 */
export interface LockIndicatorProps {
  /** Whether the target is locked. */
  locked: boolean;
  /** Optional label override. */
  label?: string;
  /** Who or what has the lock. */
  lockedBy?: string;
  /** Reason for the lock. */
  reason?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * LockIndicator renders a lock state indicator.
 *
 * @example
 * ```tsx
 * <LockIndicator locked={true} lockedBy="admin@corp" reason="Commit in progress" />
 * <LockIndicator locked={false} />
 * ```
 */
export const LockIndicator: React.FC<LockIndicatorProps> = ({
  locked,
  label,
  lockedBy,
  reason,
  density = 'standard',
  className = '',
  testId,
}) => {
  const densityClass = `tf-density-${density}`;

  return (
    <span
      className={`tf-lock-indicator tf-lock-indicator--${locked ? 'locked' : 'unlocked'} ${densityClass} ${className}`}
      data-testid={testId}
      data-locked={locked}
      role="status"
      aria-label={locked ? `Locked${lockedBy ? ` by ${lockedBy}` : ''}` : 'Unlocked'}
      title={reason || (locked ? 'Locked' : 'Unlocked')}
    >
      <span className="tf-lock-indicator__icon" aria-hidden="true">
        {locked ? '&#x1F512;' : '&#x1F513;'}
      </span>
      <span className="tf-lock-indicator__label">{label || (locked ? 'LOCKED' : 'UNLOCKED')}</span>
      {locked && lockedBy && (
        <span className="tf-lock-indicator__by">{lockedBy}</span>
      )}
    </span>
  );
};

LockIndicator.displayName = 'LockIndicator';

export default LockIndicator;
