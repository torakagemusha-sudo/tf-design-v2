/**
 * ============================================================
 * DirtyBadge — Torafirma Design System
 * ============================================================
 *
 * Compact dirty indicator showing only an amber dot and the
 * word "DIRTY" when there are unsaved changes. Minimal visual
 * footprint for dense layouts.
 *
 * From 03.2 State, Status & Telemetry — Section 3.6 Editor Components
 * ============================================================
 */

import React from 'react';

/**
 * Props for the DirtyBadge component.
 */
export interface DirtyBadgeProps {
  /** Whether unsaved changes exist. */
  isDirty: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * DirtyBadge renders a minimal dirty state badge.
 *
 * @example
 * ```tsx
 * <DirtyBadge isDirty={true} />
 * <DirtyBadge isDirty={false} />
 * ```
 */
export const DirtyBadge: React.FC<DirtyBadgeProps> = ({
  isDirty,
  className = '',
  testId,
}) => {
  return (
    <span
      className={`tf-dirty-badge tf-dirty-badge--${isDirty ? 'dirty' : 'clean'} ${className}`}
      data-testid={testId}
      data-dirty={isDirty}
      role="status"
      aria-label={isDirty ? 'Unsaved changes' : 'Saved'}
    >
      {isDirty && (
        <>
          <span className="tf-dirty-badge__dot" aria-hidden="true" />
          <span className="tf-dirty-badge__label">DIRTY</span>
        </>
      )}
    </span>
  );
};

DirtyBadge.displayName = 'DirtyBadge';

export default DirtyBadge;
