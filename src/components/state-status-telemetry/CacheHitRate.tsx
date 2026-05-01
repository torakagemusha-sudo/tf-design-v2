/**
 * ============================================================
 * CacheHitRate — Torafirma Design System
 * ============================================================
 *
 * Cache performance metric display. Shows hit rate percentage
 * with hit/miss counts and optional eviction info.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the CacheHitRate component.
 */
export interface CacheHitRateProps {
  /** Cache name. */
  name: string;
  /** Hit rate percentage (0-100). */
  hitRatePercent: number;
  /** Total hit count. */
  hits?: number;
  /** Total miss count. */
  misses?: number;
  /** Eviction count. */
  evictions?: number;
  /** Current cache size. */
  size?: number;
  /** Maximum cache size. */
  maxSize?: number;
  /** Size variant. */
  variant?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * CacheHitRate renders a cache performance display.
 *
 * @example
 * ```tsx
 * <CacheHitRate name="session-cache" hitRatePercent={94.5} hits={94500} misses={5500} evictions={120} size={8500} maxSize={10000} />
 * ```
 */
export const CacheHitRate: React.FC<CacheHitRateProps> = ({
  name,
  hitRatePercent,
  hits,
  misses,
  evictions,
  size,
  maxSize,
  variant: sizeVariant = 'md',
  className = '',
  testId,
}) => {
  const clampedRate = Math.max(0, Math.min(100, hitRatePercent));
  const colorVariant = clampedRate >= 90 ? 'run' : clampedRate >= 70 ? 'warning' : 'danger';

  return (
    <div
      className={`tf-cache-hit-rate tf-cache-hit-rate--${colorVariant} tf-cache-hit-rate--${sizeVariant} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`Cache ${name} hit rate: ${clampedRate.toFixed(1)}%`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedRate}
    >
      <span className="tf-cache-hit-rate__name">{name}</span>
      <span className={`tf-cache-hit-rate__value tf-cache-hit-rate__value--${colorVariant}`}>
        {clampedRate.toFixed(1)}%
      </span>
      {(hits !== undefined || misses !== undefined) && (
        <div className="tf-cache-hit-rate__counts">
          {hits !== undefined && <span className="tf-cache-hit-rate__hits">Hits: {hits.toLocaleString()}</span>}
          {misses !== undefined && <span className="tf-cache-hit-rate__misses">Misses: {misses.toLocaleString()}</span>}
        </div>
      )}
      {evictions !== undefined && (
        <span className="tf-cache-hit-rate__evictions">Evictions: {evictions.toLocaleString()}</span>
      )}
      {size !== undefined && maxSize !== undefined && (
        <span className="tf-cache-hit-rate__capacity">Size: {size.toLocaleString()} / {maxSize.toLocaleString()}</span>
      )}
    </div>
  );
};

CacheHitRate.displayName = 'CacheHitRate';

export default CacheHitRate;
