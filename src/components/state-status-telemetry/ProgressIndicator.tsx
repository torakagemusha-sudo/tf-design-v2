/**
 * ============================================================
 * ProgressIndicator — Torafirma Design System
 * ============================================================
 *
 * Thin progress bar for showing operation progress. Supports
 * determinate and indeterminate modes with semantic variants.
 *
 * From 03.2 State, Status & Telemetry — Section 3.2 State Components
 * ============================================================
 */

import React from 'react';
import type { SemanticVariant, ComponentDensity } from '../../../torafirma-design-system/src/types';

/**
 * Props for the ProgressIndicator component.
 */
export interface ProgressIndicatorProps {
  /** Progress value from 0 to 100. Use undefined for indeterminate. */
  value?: number;
  /** Optional label describing the operation. */
  label?: string;
  /** Semantic visual variant. */
  variant?: SemanticVariant;
  /** Layout density. */
  density?: ComponentDensity;
  /** Whether to show the percentage text. */
  showPercentage?: boolean;
  /** Size (height) of the progress bar. */
  size?: 'xs' | 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ProgressIndicator renders a thin progress bar.
 *
 * @example
 * ```tsx
 * <ProgressIndicator value={45} label="Uploading..." />
 * <ProgressIndicator variant="stream" showPercentage />
 * ```
 */
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  label,
  variant = 'stream',
  density = 'standard',
  showPercentage = false,
  size = 'sm',
  className = '',
  testId,
}) => {
  const isIndeterminate = value === undefined;
  const clampedValue = isIndeterminate ? 0 : Math.max(0, Math.min(100, value));

  return (
    <div
      className={`tf-progress-indicator tf-progress-indicator--${variant} tf-progress-indicator--${size} tf-density-${density} ${isIndeterminate ? 'tf-progress-indicator--indeterminate' : ''} ${className}`}
      data-testid={testId}
      role="progressbar"
      aria-label={label || 'Progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      aria-indeterminate={isIndeterminate || undefined}
    >
      {label && <span className="tf-progress-indicator__label">{label}</span>}
      <div className="tf-progress-indicator__track">
        <div
          className={`tf-progress-indicator__fill tf-progress-indicator__fill--${variant}`}
          style={{ width: isIndeterminate ? undefined : `${clampedValue}%` }}
        />
      </div>
      {showPercentage && !isIndeterminate && (
        <span className="tf-progress-indicator__percentage">{Math.round(clampedValue)}%</span>
      )}
    </div>
  );
};

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
