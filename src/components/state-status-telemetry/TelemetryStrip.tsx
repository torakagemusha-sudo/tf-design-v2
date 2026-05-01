/**
 * ============================================================
 * TelemetryStrip — Torafirma Design System
 * ============================================================
 *
 * Horizontal strip of telemetry values. Displays multiple
 * key-value metrics in a compact row, typical for dashboards
 * and status bars.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../../torafirma-design-system/src/types';

/**
 * Individual telemetry item.
 */
export interface TelemetryItem {
  /** Metric label. */
  label: string;
  /** Metric value (can be string or number). */
  value: string | number;
  /** Optional unit suffix. */
  unit?: string;
  /** Semantic variant for the value display. */
  variant?: 'neutral' | 'run' | 'warning' | 'instability' | 'danger' | 'stream';
}

/**
 * Props for the TelemetryStrip component.
 */
export interface TelemetryStripProps {
  /** Array of telemetry items to display. */
  items: TelemetryItem[];
  /** Strip label or heading. */
  label?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Maximum number of items to show before overflow. */
  maxVisible?: number;
  /** Whether to show item separators. */
  showSeparators?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * TelemetryStrip renders a horizontal row of telemetry values.
 *
 * @example
 * ```tsx
 * <TelemetryStrip
 *   items={[
 *     { label: 'CPU', value: 45, unit: '%', variant: 'run' },
 *     { label: 'MEM', value: 2.1, unit: 'GB', variant: 'warning' },
 *   ]}
 * />
 * ```
 */
export const TelemetryStrip: React.FC<TelemetryStripProps> = ({
  items,
  label,
  density = 'compact',
  maxVisible,
  showSeparators = true,
  className = '',
  testId,
}) => {
  const visibleItems = maxVisible ? items.slice(0, maxVisible) : items;
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-telemetry-strip ${densityClass} ${className}`}
      data-testid={testId}
      role="region"
      aria-label={label || 'Telemetry'}
    >
      {label && <span className="tf-telemetry-strip__heading">{label}</span>}
      <div className="tf-telemetry-strip__items">
        {visibleItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className={`tf-telemetry-strip__item tf-telemetry-strip__item--${item.variant || 'neutral'}`}>
              <span className="tf-telemetry-strip__item-label">{item.label}</span>
              <span className={`tf-telemetry-strip__item-value tf-telemetry-strip__item-value--${item.variant || 'neutral'}`}>
                {item.value}{item.unit ? <span className="tf-telemetry-strip__item-unit">{item.unit}</span> : null}
              </span>
            </div>
            {showSeparators && index < visibleItems.length - 1 && (
              <span className="tf-telemetry-strip__separator" aria-hidden="true">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

TelemetryStrip.displayName = 'TelemetryStrip';

export default TelemetryStrip;
