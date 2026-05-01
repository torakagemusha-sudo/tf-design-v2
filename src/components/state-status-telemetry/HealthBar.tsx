/**
 * ============================================================
 * HealthBar — Torafirma Design System
 * ============================================================
 *
 * Segmented health bar that visualizes health as a series of
 * colored segments. Supports custom segment counts and thresholds.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the HealthBar component.
 */
export interface HealthBarProps {
  /** Health percentage from 0 to 100. */
  healthPercent: number;
  /** Number of segments to display. */
  segments?: number;
  /** Label displayed alongside the bar. */
  label?: string;
  /** Whether to show the percentage text. */
  showPercentage?: boolean;
  /** Threshold for healthy state (default: 80). */
  healthyThreshold?: number;
  /** Threshold for degraded state (default: 50). */
  degradedThreshold?: number;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * HealthBar renders a segmented health visualization.
 *
 * @example
 * ```tsx
 * <HealthBar healthPercent={85} segments={10} label="System Health" />
 * <HealthBar healthPercent={42} segments={20} showPercentage />
 * ```
 */
export const HealthBar: React.FC<HealthBarProps> = ({
  healthPercent,
  segments = 10,
  label,
  showPercentage = true,
  healthyThreshold = 80,
  degradedThreshold = 50,
  size = 'md',
  className = '',
  testId,
}) => {
  const clampedPercent = Math.max(0, Math.min(100, healthPercent));
  const filledSegments = Math.round((clampedPercent / 100) * segments);

  const getSegmentVariant = (index: number): string => {
    const segmentPercent = (index / segments) * 100;
    if (segmentPercent >= healthyThreshold) return 'run';
    if (segmentPercent >= degradedThreshold) return 'warning';
    return 'danger';
  };

  return (
    <div
      className={`tf-health-bar tf-health-bar--${size} ${className}`}
      data-testid={testId}
      data-health-percent={clampedPercent}
      role="meter"
      aria-label={label || 'Health'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedPercent}
    >
      {label && <span className="tf-health-bar__label">{label}</span>}
      <div className="tf-health-bar__track">
        {Array.from({ length: segments }).map((_, index) => (
          <span
            key={index}
            className={`tf-health-bar__segment
              ${index < filledSegments ? `tf-health-bar__segment--filled tf-health-bar__segment--${getSegmentVariant(index)}` : 'tf-health-bar__segment--empty'}
            `}
            aria-hidden="true"
          />
        ))}
      </div>
      {showPercentage && (
        <span className="tf-health-bar__percentage">{clampedPercent}%</span>
      )}
    </div>
  );
};

HealthBar.displayName = 'HealthBar';

export default HealthBar;
