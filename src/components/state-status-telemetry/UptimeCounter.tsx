/**
 * ============================================================
 * UptimeCounter — Torafirma Design System
 * ============================================================
 *
 * System uptime display. Shows elapsed time since last restart
 * or boot with optional start timestamp.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the UptimeCounter component.
 */
export interface UptimeCounterProps {
  /** Uptime string (e.g., "15d 4h 32m"). */
  uptime: string;
  /** ISO timestamp of system start. */
  startedAt?: string;
  /** Whether the uptime is considered stable. */
  stable?: boolean;
  /** Label. */
  label?: string;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * UptimeCounter renders a system uptime display.
 *
 * @example
 * ```tsx
 * <UptimeCounter uptime="45d 12h 30m" startedAt="2024-12-01T00:00:00Z" stable={true} />
 * ```
 */
export const UptimeCounter: React.FC<UptimeCounterProps> = ({
  uptime,
  startedAt,
  stable = true,
  label = 'Uptime',
  size = 'md',
  className = '',
  testId,
}) => {
  return (
    <div
      className={`tf-uptime-counter tf-uptime-counter--${stable ? 'stable' : 'unstable'} tf-uptime-counter--${size} ${className}`}
      data-testid={testId}
      role="timer"
      aria-label={`${label}: ${uptime}`}
    >
      <span className="tf-uptime-counter__label">{label}</span>
      <span className="tf-uptime-counter__value">{uptime}</span>
      {startedAt && <span className="tf-uptime-counter__started">Since: {startedAt}</span>}
      {!stable && <span className="tf-uptime-counter__warning">Recent restart detected</span>}
    </div>
  );
};

UptimeCounter.displayName = 'UptimeCounter';

export default UptimeCounter;
