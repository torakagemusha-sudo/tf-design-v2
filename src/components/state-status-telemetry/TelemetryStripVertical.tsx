/**
 * ============================================================
 * TelemetryStripVertical — Torafirma Design System
 * ============================================================
 *
 * Vertical arrangement of telemetry values. Stacked display
 * for sidebar panels and inspector regions where horizontal
 * space is limited.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../../torafirma-design-system/src/types';
import type { TelemetryItem } from './TelemetryStrip';

/**
 * Props for the TelemetryStripVertical component.
 */
export interface TelemetryStripVerticalProps {
  /** Array of telemetry items to display. */
  items: TelemetryItem[];
  /** Strip label or heading. */
  label?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * TelemetryStripVertical renders a stacked vertical list of telemetry.
 *
 * @example
 * ```tsx
 * <TelemetryStripVertical
 *   label="Node Metrics"
 *   items={[
 *     { label: 'CPU', value: 45, unit: '%' },
 *     { label: 'Memory', value: 2.1, unit: 'GB' },
 *   ]}
 * />
 * ```
 */
export const TelemetryStripVertical: React.FC<TelemetryStripVerticalProps> = ({
  items,
  label,
  density = 'compact',
  className = '',
  testId,
}) => {
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-telemetry-strip-vertical ${densityClass} ${className}`}
      data-testid={testId}
      role="region"
      aria-label={label || 'Telemetry'}
    >
      {label && <span className="tf-telemetry-strip-vertical__heading">{label}</span>}
      <div className="tf-telemetry-strip-vertical__items">
        {items.map((item, index) => (
          <div
            key={index}
            className={`tf-telemetry-strip-vertical__item tf-telemetry-strip-vertical__item--${item.variant || 'neutral'}`}
          >
            <span className="tf-telemetry-strip-vertical__item-label">{item.label}</span>
            <span className={`tf-telemetry-strip-vertical__item-value tf-telemetry-strip-vertical__item-value--${item.variant || 'neutral'}`}>
              {item.value}{item.unit ? <span className="tf-telemetry-strip-vertical__item-unit">{item.unit}</span> : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

TelemetryStripVertical.displayName = 'TelemetryStripVertical';

export default TelemetryStripVertical;
