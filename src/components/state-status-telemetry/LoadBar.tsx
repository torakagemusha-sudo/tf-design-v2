/**
 * ============================================================
 * LoadBar — Torafirma Design System
 * ============================================================
 *
 * Load bar visualization. Horizontal bar showing system load
 * with color segments for low/medium/high load regions.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the LoadBar component.
 */
export interface LoadBarProps {
  /** Current load value. */
  value: number;
  /** Maximum load value. */
  max: number;
  /** Label for the bar. */
  label?: string;
  /** Warning threshold. */
  warningThreshold?: number;
  /** Critical threshold. */
  criticalThreshold?: number;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * LoadBar renders a system load visualization bar.
 *
 * @example
 * ```tsx
 * <LoadBar value={6.5} max={10} label="System Load" warningThreshold={7} criticalThreshold={9} />
 * ```
 */
export const LoadBar: React.FC<LoadBarProps> = ({
  value,
  max,
  label,
  warningThreshold = max * 0.7,
  criticalThreshold = max * 0.9,
  size = 'md',
  className = '',
  testId,
}) => {
  const clampedValue = Math.max(0, Math.min(max, value));
  const percent = (clampedValue / max) * 100;
  const variant = clampedValue >= criticalThreshold ? 'danger' : clampedValue >= warningThreshold ? 'warning' : 'run';

  return (
    <div
      className={`tf-load-bar tf-load-bar--${variant} tf-load-bar--${size} ${className}`}
      data-testid={testId}
      role="meter"
      aria-label={`${label || 'Load'}: ${clampedValue.toFixed(1)} / ${max}`}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clampedValue}
    >
      {label && <span className="tf-load-bar__label">{label}</span>}
      <div className="tf-load-bar__track">
        <div
          className={`tf-load-bar__fill tf-load-bar__fill--${variant}`}
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="tf-load-bar__value">{clampedValue.toFixed(1)} / {max}</span>
    </div>
  );
};

LoadBar.displayName = 'LoadBar';

export default LoadBar;
