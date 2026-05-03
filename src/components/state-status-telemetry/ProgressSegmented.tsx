/**
 * ============================================================
 * ProgressSegmented — Torafirma Design System
 * ============================================================
 *
 * Segmented progress bar that fills discrete segments rather
 * than a continuous bar. Useful for stepped operations where
 * each segment represents a discrete unit of work.
 *
 * From 03.2 State, Status & Telemetry — Section 3.2 State Components
 * ============================================================
 */

import React from 'react';
import type { SemanticVariant } from '../../types';

/**
 * Props for the ProgressSegmented component.
 */
export interface ProgressSegmentedProps {
  /** Total number of segments. */
  totalSegments: number;
  /** Number of filled segments. */
  filledSegments: number;
  /** Number of segments in error state. */
  errorSegments?: number;
  /** Semantic visual variant for filled segments. */
  variant?: SemanticVariant;
  /** Label describing the operation. */
  label?: string;
  /** Whether to show segment count text. */
  showCount?: boolean;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ProgressSegmented renders a discrete segmented progress bar.
 *
 * @example
 * ```tsx
 * <ProgressSegmented totalSegments={10} filledSegments={7} label="Shards" />
 * <ProgressSegmented totalSegments={20} filledSegments={18} errorSegments={1} showCount />
 * ```
 */
export const ProgressSegmented: React.FC<ProgressSegmentedProps> = ({
  totalSegments,
  filledSegments,
  errorSegments = 0,
  variant = 'stream',
  label,
  showCount = true,
  size = 'md',
  className = '',
  testId,
}) => {
  const clampedFilled = Math.max(0, Math.min(totalSegments, filledSegments));
  const clampedError = Math.max(0, Math.min(totalSegments - clampedFilled, errorSegments));

  return (
    <div
      className={`tf-progress-segmented tf-progress-segmented--${variant} tf-progress-segmented--${size} ${className}`}
      data-testid={testId}
      role="progressbar"
      aria-label={label || 'Segmented progress'}
      aria-valuemin={0}
      aria-valuemax={totalSegments}
      aria-valuenow={clampedFilled}
    >
      {label && <span className="tf-progress-segmented__label">{label}</span>}
      <div className="tf-progress-segmented__track">
        {Array.from({ length: totalSegments }).map((_, index) => {
          let segmentState = 'empty';
          if (index < clampedFilled) segmentState = 'filled';
          else if (index < clampedFilled + clampedError) segmentState = 'error';

          return (
            <span
              key={index}
              className={`tf-progress-segmented__segment tf-progress-segmented__segment--${segmentState} tf-progress-segmented__segment--${variant}`}
              aria-hidden="true"
            />
          );
        })}
      </div>
      {showCount && (
        <span className="tf-progress-segmented__count">
          {clampedFilled}/{totalSegments}
          {clampedError > 0 && <span className="tf-progress-segmented__error-count"> ({clampedError} error)</span>}
        </span>
      )}
    </div>
  );
};

ProgressSegmented.displayName = 'ProgressSegmented';

export default ProgressSegmented;
