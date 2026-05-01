/**
 * ============================================================
 * RegimeTimeline — Torafirma Design System
 * ============================================================
 *
 * Timeline showing regime history with transitions. Displays
 * a sequence of regime changes with timestamps and durations.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';
import type { RegimeType } from './RegimeIndicator';

/**
 * Single regime history entry.
 */
export interface RegimeEntry {
  /** Regime that was active. */
  regime: RegimeType;
  /** Timestamp when the regime started (ISO 8601). */
  startedAt: string;
  /** Duration in the regime. */
  duration?: string;
  /** Reason for regime entry. */
  reason?: string;
}

/**
 * Props for the RegimeTimeline component.
 */
export interface RegimeTimelineProps {
  /** Array of regime history entries, newest first. */
  entries: RegimeEntry[];
  /** Maximum number of entries to show. */
  maxEntries?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const regimeVariants: Record<RegimeType, string> = {
  normal: 'run',
  degraded: 'instability',
  emergency: 'danger',
  maintenance: 'inspect',
  simulation: 'model',
  lockdown: 'authority',
  startup: 'stream',
  shutdown: 'warning',
};

/**
 * RegimeTimeline renders a regime change history.
 *
 * @example
 * ```tsx
 * <RegimeTimeline
 *   entries={[
 *     { regime: 'normal', startedAt: '2024-01-15T10:00:00Z', duration: '2h 30m' },
 *     { regime: 'startup', startedAt: '2024-01-15T09:58:00Z', duration: '2m' },
 *   ]}
 * />
 * ```
 */
export const RegimeTimeline: React.FC<RegimeTimelineProps> = ({
  entries,
  maxEntries = 10,
  className = '',
  testId,
}) => {
  const visibleEntries = entries.slice(0, maxEntries);

  return (
    <div
      className={`tf-regime-timeline ${className}`}
      data-testid={testId}
      role="list"
      aria-label="Regime history"
    >
      {visibleEntries.map((entry, index) => (
        <div
          key={index}
          className={`tf-regime-timeline__entry tf-regime-timeline__entry--${regimeVariants[entry.regime]}`}
          role="listitem"
        >
          <span className={`tf-regime-timeline__dot tf-regime-timeline__dot--${regimeVariants[entry.regime]}`} aria-hidden="true" />
          <div className="tf-regime-timeline__content">
            <span className="tf-regime-timeline__regime">{entry.regime.toUpperCase()}</span>
            <span className="tf-regime-timeline__time">{entry.startedAt}</span>
            {entry.duration && <span className="tf-regime-timeline__duration">({entry.duration})</span>}
            {entry.reason && <span className="tf-regime-timeline__reason">{entry.reason}</span>}
          </div>
          {index < visibleEntries.length - 1 && (
            <span className="tf-regime-timeline__connector" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
};

RegimeTimeline.displayName = 'RegimeTimeline';

export default RegimeTimeline;
