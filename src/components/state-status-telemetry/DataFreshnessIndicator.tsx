/**
 * ============================================================
 * DataFreshnessIndicator — Torafirma Design System
 * ============================================================
 *
 * Data age indicator. Shows how current the displayed data is
 * with color coding for stale data.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the DataFreshnessIndicator component.
 */
export interface DataFreshnessIndicatorProps {
  /** Last update timestamp (ISO 8601). */
  lastUpdate: string;
  /** Age string (e.g., "2m ago", "1h ago"). */
  age: string;
  /** Whether the data is considered stale. */
  isStale?: boolean;
  /** Staleness threshold description. */
  threshold?: string;
  /** Data source name. */
  source?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * DataFreshnessIndicator renders a data age indicator.
 *
 * @example
 * ```tsx
 * <DataFreshnessIndicator lastUpdate="2024-01-15T10:28:00Z" age="2m ago" isStale={false} threshold="5m" source="market-data" />
 * ```
 */
export const DataFreshnessIndicator: React.FC<DataFreshnessIndicatorProps> = ({
  lastUpdate,
  age,
  isStale = false,
  threshold,
  source,
  className = '',
  testId,
}) => {
  const variant = isStale ? 'warning' : 'run';

  return (
    <span
      className={`tf-data-freshness-indicator tf-data-freshness-indicator--${variant} ${className}`}
      data-testid={testId}
      data-is-stale={isStale}
      role="status"
      aria-label={`Data ${age}${isStale ? ', stale' : ', fresh'}`}
      title={`Last update: ${lastUpdate}`}
    >
      <span className={`tf-data-freshness-indicator__dot tf-data-freshness-indicator__dot--${variant}`} aria-hidden="true" />
      <span className="tf-data-freshness-indicator__age">{age}</span>
      {source && <span className="tf-data-freshness-indicator__source">{source}</span>}
      {isStale && threshold && (
        <span className="tf-data-freshness-indicator__stale">Stale (threshold: {threshold})</span>
      )}
    </span>
  );
};

DataFreshnessIndicator.displayName = 'DataFreshnessIndicator';

export default DataFreshnessIndicator;
