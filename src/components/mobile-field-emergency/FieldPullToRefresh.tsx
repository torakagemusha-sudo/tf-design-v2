import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldPullToRefresh.
 */
export interface FieldPullToRefreshProps {
  /** Content to wrap. */
  children: React.ReactNode;
  /** Refresh handler. */
  onRefresh: () => Promise<void> | void;
  /** Pull distance threshold in pixels. */
  threshold?: number;
  /** Refreshing state override. */
  refreshing?: boolean;
  /** Pull indicator label. */
  pullLabel?: string;
  /** Release label. */
  releaseLabel?: string;
  /** Refreshing label. */
  refreshingLabel?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldPullToRefresh — pull-to-refresh wrapper.
 *
 * Wraps scrollable content with a pull-to-refresh gesture handler.
 * Visual indicator appears during pull, transitions to spinner on release.
 * Threshold defaults to 80 px — sufficient distance to distinguish from
 * normal scroll intent.
 */
export const FieldPullToRefresh: React.FC<FieldPullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  refreshing: refreshingProp,
  pullLabel = 'Pull to refresh',
  releaseLabel = 'Release to refresh',
  refreshingLabel = 'Refreshing...',
  className = '',
  testId,
}) => {
  const [pullDistance, setPullDistance] = React.useState(0);
  const [internalRefreshing, setInternalRefreshing] = React.useState(false);
  const startY = React.useRef(0);
  const refreshing = refreshingProp ?? internalRefreshing;

  const progress = Math.min(pullDistance / threshold, 1);
  const canRelease = pullDistance >= threshold;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === 0 || window.scrollY > 0) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) {
      setPullDistance(delta);
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold) {
      setInternalRefreshing(true);
      setPullDistance(threshold);
      await onRefresh();
      setInternalRefreshing(false);
    }
    setPullDistance(0);
    startY.current = 0;
  };

  return (
    <div
      data-testid={testId}
      className={['tf-pull-refresh', className].join(' ')}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="tf-pull-refresh__indicator"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance > 10 ? 1 : 0,
        }}
        aria-live="polite"
      >
        {refreshing ? (
          <>
            <span className="tf-pull-refresh__spinner" aria-hidden="true">
              ⟳
            </span>
            <span className="tf-pull-refresh__label">{refreshingLabel}</span>
          </>
        ) : (
          <>
            <span
              className="tf-pull-refresh__arrow"
              style={{ transform: `rotate(${progress * 180}deg)` }}
              aria-hidden="true"
            >
              ↓
            </span>
            <span className="tf-pull-refresh__label">
              {canRelease ? releaseLabel : pullLabel}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <div className="tf-pull-refresh__content">{children}</div>
    </div>
  );
};

FieldPullToRefresh.displayName = 'FieldPullToRefresh';

export default FieldPullToRefresh;
