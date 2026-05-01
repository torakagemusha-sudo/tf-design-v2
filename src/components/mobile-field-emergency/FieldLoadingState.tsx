import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldLoadingState.
 */
export interface FieldLoadingStateProps {
  /** Number of skeleton rows. */
  rows?: number;
  /** Whether to show a title skeleton. */
  showTitle?: boolean;
  /** Whether to show avatar circles. */
  showAvatars?: boolean;
  /** Row height in pixels. */
  rowHeight?: number;
  /** Label for screen readers. */
  ariaLabel?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldLoadingState — loading skeleton for mobile.
 *
 * Animated shimmer skeleton that mimics the structure of loading content.
 * Configurable row count, title block, and avatar placeholders.
 * Reduced motion support respects prefers-reduced-motion.
 */
export const FieldLoadingState: React.FC<FieldLoadingStateProps> = ({
  rows = 4,
  showTitle = true,
  showAvatars = true,
  rowHeight = 64,
  ariaLabel = 'Loading content...',
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-loading-state', className].join(' ')}
      role="status"
      aria-label={ariaLabel}
      aria-busy="true"
    >
      {/* Title skeleton */}
      {showTitle && (
        <div className="tf-loading-state__title">
          <div className="tf-loading-state__shimmer tf-loading-state__shimmer--long" />
        </div>
      )}

      {/* Row skeletons */}
      <div className="tf-loading-state__rows">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="tf-loading-state__row"
            style={{ height: `${rowHeight}px` }}
          >
            {/* Avatar */}
            {showAvatars && (
              <div
                className="tf-loading-state__shimmer tf-loading-state__shimmer--circle"
                aria-hidden="true"
              />
            )}

            {/* Text lines */}
            <div className="tf-loading-state__lines">
              <div className="tf-loading-state__shimmer tf-loading-state__shimmer--medium" />
              <div className="tf-loading-state__shimmer tf-loading-state__shimmer--short" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FieldLoadingState.displayName = 'FieldLoadingState';

export default FieldLoadingState;
