/**
 * ============================================================
 * ProgressRing — Torafirma Design System
 * ============================================================
 *
 * Circular progress indicator. Renders an SVG ring that fills
 * proportionally to the progress value. Supports multiple sizes
 * and semantic variants.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';
import type { SemanticVariant } from '../../types';

/**
 * Props for the ProgressRing component.
 */
export interface ProgressRingProps {
  /** Progress value from 0 to 100. */
  value: number;
  /** Diameter of the ring in pixels. */
  diameter?: number;
  /** Stroke width of the ring. */
  strokeWidth?: number;
  /** Semantic visual variant. */
  variant?: SemanticVariant;
  /** Whether to display the percentage in the center. */
  showValue?: boolean;
  /** Label displayed below the ring. */
  label?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ProgressRing renders a circular progress indicator.
 *
 * @example
 * ```tsx
 * <ProgressRing value={75} diameter={48} showValue />
 * <ProgressRing value={30} variant="run" label="Upload" />
 * ```
 */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  diameter = 40,
  strokeWidth = 4,
  variant = 'stream',
  showValue = true,
  label,
  className = '',
  testId,
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className={`tf-progress-ring tf-progress-ring--${variant} ${className}`}
      data-testid={testId}
      role="progressbar"
      aria-label={label || 'Progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clampedValue)}
    >
      <svg
        width={diameter}
        height={diameter}
        className="tf-progress-ring__svg"
        aria-hidden="true"
      >
        <circle
          className="tf-progress-ring__track"
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <circle
          className={`tf-progress-ring__fill tf-progress-ring__fill--${variant}`}
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
      </svg>
      {showValue && (
        <span className="tf-progress-ring__value">{Math.round(clampedValue)}%</span>
      )}
      {label && <span className="tf-progress-ring__label">{label}</span>}
    </div>
  );
};

ProgressRing.displayName = 'ProgressRing';

export default ProgressRing;
