import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldInfiniteScroll.
 */
export interface FieldInfiniteScrollProps {
  /** Content to wrap. */
  children: React.ReactNode;
  /** Load more handler. */
  onLoadMore: () => void;
  /** Whether more items are available. */
  hasMore: boolean;
  /** Currently loading. */
  loading?: boolean;
  /** Loading label. */
  loadingLabel?: string;
  /** End-of-list label. */
  endLabel?: string;
  /** Intersection observer root margin. */
  rootMargin?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldInfiniteScroll — infinite scroll loader.
 *
 * Uses IntersectionObserver to trigger onLoadMore when the sentinel
 * element enters the viewport. Efficiently loads paginated data
 * without explicit pagination controls.
 */
export const FieldInfiniteScroll: React.FC<FieldInfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  loading = false,
  loadingLabel = 'Loading more...',
  endLabel = 'End of list',
  rootMargin = '100px',
  className = '',
  testId,
}) => {
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { rootMargin }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore, rootMargin]);

  return (
    <div
      data-testid={testId}
      className={['tf-infinite-scroll', className].join(' ')}
    >
      {/* Content */}
      <div className="tf-infinite-scroll__content">{children}</div>

      {/* Sentinel + loading state */}
      <div ref={sentinelRef} className="tf-infinite-scroll__sentinel">
        {loading && (
          <div className="tf-infinite-scroll__loading" role="status">
            <span className="tf-infinite-scroll__spinner" aria-hidden="true">
              ⟳
            </span>
            <span className="tf-infinite-scroll__label">{loadingLabel}</span>
          </div>
        )}
        {!hasMore && !loading && (
          <div className="tf-infinite-scroll__end" role="status">
            {endLabel}
          </div>
        )}
      </div>
    </div>
  );
};

FieldInfiniteScroll.displayName = 'FieldInfiniteScroll';

export default FieldInfiniteScroll;
