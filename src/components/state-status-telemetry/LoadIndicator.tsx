/**
 * ============================================================
 * LoadIndicator — Torafirma Design System
 * ============================================================
 *
 * System load indicator. Displays current load as a numeric
 * value with label and optional peak indicator.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the LoadIndicator component.
 */
export interface LoadIndicatorProps {
  /** Current load value. */
  value: number;
  /** Load scale (1m, 5m, 15m for Unix load, or custom). */
  scale?: string;
  /** Number of CPU cores (for context). */
  cores?: number;
  /** Peak load observed. */
  peak?: number;
  /** Whether load is critical. */
  critical?: boolean;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * LoadIndicator renders a system load metric.
 *
 * @example
 * ```tsx
 * <LoadIndicator value={2.4} scale="1m" cores={8} peak={5.1} />
 * <LoadIndicator value={8.5} scale="5m" cores={4} critical />
 * ```
 */
export const LoadIndicator: React.FC<LoadIndicatorProps> = ({
  value,
  scale = '1m',
  cores,
  peak,
  critical = false,
  size = 'md',
  className = '',
  testId,
}) => {
  const variant = critical ? 'danger' : value > (cores || 1) * 0.8 ? 'warning' : 'run';

  return (
    <div
      className={`tf-load-indicator tf-load-indicator--${variant} tf-load-indicator--${size} ${className}`}
      data-testid={testId}
      data-load-value={value}
      role="meter"
      aria-label={`Load ${scale}: ${value}`}
      aria-valuemin={0}
      aria-valuemax={cores || 1}
      aria-valuenow={value}
    >
      <span className="tf-load-indicator__label">Load ({scale})</span>
      <span className={`tf-load-indicator__value tf-load-indicator__value--${variant}`}>
        {value.toFixed(2)}
      </span>
      {cores && <span className="tf-load-indicator__cores">/ {cores} cores</span>}
      {peak !== undefined && <span className="tf-load-indicator__peak">Peak: {peak.toFixed(2)}</span>}
    </div>
  );
};

LoadIndicator.displayName = 'LoadIndicator';

export default LoadIndicator;
