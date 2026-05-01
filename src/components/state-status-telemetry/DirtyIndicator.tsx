/**
 * ============================================================
 * DirtyIndicator — Torafirma Design System
 * ============================================================
 *
 * Shows unsaved changes indicator. Communicates that the
 * current state has been modified and differs from the last
 * saved or committed state.
 *
 * From 03.2 State, Status & Telemetry — Section 3.6 Editor Components
 * ============================================================
 */

import React from 'react';

/**
 * Props for the DirtyIndicator component.
 */
export interface DirtyIndicatorProps {
  /** Whether unsaved changes exist. */
  isDirty: boolean;
  /** Number of unsaved changes. */
  changeCount?: number;
  /** Description of what changed. */
  changeDescription?: string;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Whether to show the change count. */
  showCount?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * DirtyIndicator renders an unsaved changes indicator.
 *
 * @example
 * ```tsx
 * <DirtyIndicator isDirty={true} changeCount={3} changeDescription="Field edits" />
 * <DirtyIndicator isDirty={false} />
 * ```
 */
export const DirtyIndicator: React.FC<DirtyIndicatorProps> = ({
  isDirty,
  changeCount,
  changeDescription,
  size = 'sm',
  showCount = true,
  className = '',
  testId,
}) => {
  return (
    <span
      className={`tf-dirty-indicator tf-dirty-indicator--${isDirty ? 'dirty' : 'clean'} tf-dirty-indicator--${size} ${className}`}
      data-testid={testId}
      data-dirty={isDirty}
      role="status"
      aria-label={isDirty ? `Unsaved changes${changeCount ? `: ${changeCount}` : ''}` : 'No unsaved changes'}
    >
      {isDirty && (
        <>
          <span className="tf-dirty-indicator__dot" aria-hidden="true" />
          <span className="tf-dirty-indicator__label">DIRTY</span>
          {showCount && changeCount !== undefined && (
            <span className="tf-dirty-indicator__count">{changeCount}</span>
          )}
          {changeDescription && (
            <span className="tf-dirty-indicator__description">{changeDescription}</span>
          )}
        </>
      )}
      {!isDirty && <span className="tf-dirty-indicator__label">SAVED</span>}
    </span>
  );
};

DirtyIndicator.displayName = 'DirtyIndicator';

export default DirtyIndicator;
