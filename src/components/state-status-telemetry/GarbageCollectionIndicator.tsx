/**
 * ============================================================
 * GarbageCollectionIndicator — Torafirma Design System
 * ============================================================
 *
 * GC activity indicator. Shows garbage collection frequency,
 * duration, and pause times with trend indication.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the GarbageCollectionIndicator component.
 */
export interface GarbageCollectionIndicatorProps {
  /** GC type (G1, CMS, ZGC, etc.). */
  gcType: string;
  /** Last GC duration in milliseconds. */
  lastGCDurationMs: number;
  /** GC count per minute. */
  gcRatePerMin?: number;
  /** Average pause time in milliseconds. */
  avgPauseMs?: number;
  /** Max pause time in milliseconds. */
  maxPauseMs?: number;
  /** Heap usage percentage. */
  heapUsagePercent?: number;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * GarbageCollectionIndicator renders a GC activity display.
 *
 * @example
 * ```tsx
 * <GarbageCollectionIndicator gcType="G1" lastGCDurationMs={12} gcRatePerMin={5} avgPauseMs={8} maxPauseMs={45} heapUsagePercent={62} />
 * ```
 */
export const GarbageCollectionIndicator: React.FC<GarbageCollectionIndicatorProps> = ({
  gcType,
  lastGCDurationMs,
  gcRatePerMin,
  avgPauseMs,
  maxPauseMs,
  heapUsagePercent,
  size = 'md',
  className = '',
  testId,
}) => {
  const isConcerning = (maxPauseMs !== undefined && maxPauseMs > 100) || (gcRatePerMin !== undefined && gcRatePerMin > 30);
  const variant = isConcerning ? 'warning' : 'run';

  return (
    <div
      className={`tf-gc-indicator tf-gc-indicator--${variant} tf-gc-indicator--${size} ${className}`}
      data-testid={testId}
      role="region"
      aria-label={`GC ${gcType}: last ${lastGCDurationMs}ms`}
    >
      <span className="tf-gc-indicator__type">{gcType}</span>
      <span className={`tf-gc-indicator__last tf-gc-indicator__last--${variant}`}>
        Last: {lastGCDurationMs}ms
      </span>
      {gcRatePerMin !== undefined && (
        <span className="tf-gc-indicator__rate">{gcRatePerMin}/min</span>
      )}
      {avgPauseMs !== undefined && (
        <span className="tf-gc-indicator__avg">Avg pause: {avgPauseMs}ms</span>
      )}
      {maxPauseMs !== undefined && (
        <span className={`tf-gc-indicator__max tf-gc-indicator__max--${maxPauseMs > 100 ? 'danger' : 'neutral'}`}>
          Max pause: {maxPauseMs}ms
        </span>
      )}
      {heapUsagePercent !== undefined && (
        <span className={`tf-gc-indicator__heap tf-gc-indicator__heap--${heapUsagePercent >= 80 ? 'warning' : 'neutral'}`}>
          Heap: {heapUsagePercent.toFixed(1)}%
        </span>
      )}
    </div>
  );
};

GarbageCollectionIndicator.displayName = 'GarbageCollectionIndicator';

export default GarbageCollectionIndicator;
