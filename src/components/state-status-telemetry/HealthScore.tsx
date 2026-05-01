/**
 * ============================================================
 * HealthScore — Torafirma Design System
 * ============================================================
 *
 * Numeric health score display with semantic color. Shows a
 * percentage or 0-100 score with appropriate color coding and
 * optional trend indicator.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the HealthScore component.
 */
export interface HealthScoreProps {
  /** Numeric health score (0-100). */
  score: number;
  /** Label describing what the score represents. */
  label?: string;
  /** Whether the score is improving, declining, or stable. */
  trend?: 'up' | 'down' | 'stable';
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the trend arrow. */
  showTrend?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * HealthScore renders a numeric health score with semantic styling.
 *
 * @example
 * ```tsx
 * <HealthScore score={94} label="API Health" trend="up" />
 * <HealthScore score={67} size="lg" showTrend />
 * ```
 */
export const HealthScore: React.FC<HealthScoreProps> = ({
  score,
  label,
  trend = 'stable',
  size = 'md',
  showTrend = true,
  className = '',
  testId,
}) => {
  const clampedScore = Math.max(0, Math.min(100, score));
  const variant = clampedScore >= 80 ? 'run' : clampedScore >= 50 ? 'warning' : 'danger';

  return (
    <div
      className={`tf-health-score tf-health-score--${variant} tf-health-score--${size} ${className}`}
      data-testid={testId}
      data-health-score={clampedScore}
      role="meter"
      aria-label={`${label || 'Health score'}: ${clampedScore}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedScore}
    >
      {label && <span className="tf-health-score__label">{label}</span>}
      <span className={`tf-health-score__value tf-health-score__value--${variant}`}>
        {clampedScore}
      </span>
      {showTrend && (
        <span className={`tf-health-score__trend tf-health-score__trend--${trend}`} aria-label={`Trend: ${trend}`}>
          {trend === 'up' ? '&#x2191;' : trend === 'down' ? '&#x2193;' : '&#x2192;'}
        </span>
      )}
    </div>
  );
};

HealthScore.displayName = 'HealthScore';

export default HealthScore;
