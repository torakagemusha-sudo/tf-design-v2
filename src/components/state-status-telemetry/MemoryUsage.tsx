/**
 * ============================================================
 * MemoryUsage — Torafirma Design System
 * ============================================================
 *
 * Memory usage display. Shows used/total memory with percentage
 * bar and optional breakdown (heap, stack, cache).
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the MemoryUsage component.
 */
export interface MemoryUsageProps {
  /** Used memory in megabytes. */
  usedMb: number;
  /** Total memory in megabytes. */
  totalMb: number;
  /** Cached memory in megabytes. */
  cachedMb?: number;
  /** Buffer memory in megabytes. */
  bufferMb?: number;
  /** Label for the display. */
  label?: string;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * MemoryUsage renders a memory usage display.
 *
 * @example
 * ```tsx
 * <MemoryUsage usedMb={4096} totalMb={16384} cachedMb={2048} label="System Memory" />
 * ```
 */
export const MemoryUsage: React.FC<MemoryUsageProps> = ({
  usedMb,
  totalMb,
  cachedMb,
  bufferMb,
  label = 'Memory',
  size = 'md',
  className = '',
  testId,
}) => {
  const percent = Math.min(100, (usedMb / totalMb) * 100);
  const variant = percent >= 90 ? 'danger' : percent >= 75 ? 'warning' : 'run';

  const format = (mb: number) => mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : `${mb.toFixed(0)} MB`;

  return (
    <div
      className={`tf-memory-usage tf-memory-usage--${variant} tf-memory-usage--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label}: ${format(usedMb)} used of ${format(totalMb)}`}
      aria-valuemin={0}
      aria-valuemax={totalMb}
      aria-valuenow={usedMb}
    >
      <div className="tf-memory-usage__header">
        <span className="tf-memory-usage__label">{label}</span>
        <span className="tf-memory-usage__values">
          {format(usedMb)} / {format(totalMb)} ({percent.toFixed(1)}%)
        </span>
      </div>
      <div className="tf-memory-usage__bar">
        <div
          className={`tf-memory-usage__fill tf-memory-usage__fill--${variant}`}
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
      {(cachedMb !== undefined || bufferMb !== undefined) && (
        <div className="tf-memory-usage__breakdown">
          {cachedMb !== undefined && <span className="tf-memory-usage__cached">Cache: {format(cachedMb)}</span>}
          {bufferMb !== undefined && <span className="tf-memory-usage__buffer">Buffer: {format(bufferMb)}</span>}
        </div>
      )}
    </div>
  );
};

MemoryUsage.displayName = 'MemoryUsage';

export default MemoryUsage;
