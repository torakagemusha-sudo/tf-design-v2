/**
 * @fileoverview RuntimeMetricGauge — Individual metric gauge.
 * Shows current value, threshold bar, and state indicator.
 *
 * @module @torafirma/design-system/runtime-trace-console/RuntimeMetricGauge
 */

import React from "react";
import type { BaseComponentProps, MetricGauge } from "./types";

/** Props for RuntimeMetricGauge. */
export interface RuntimeMetricGaugeProps extends BaseComponentProps {
  /** Gauge data. */
  gauge: MetricGauge;
  /** Bar height in pixels. */
  barHeight?: number;
  /** Whether compact mode. */
  compact?: boolean;
}

/**
 * RuntimeMetricGauge — Single metric gauge display.
 *
 * @example
 * ```tsx
 * <RuntimeMetricGauge gauge={cpuGauge} barHeight={8} />
 * ```
 */
export const RuntimeMetricGauge: React.FC<RuntimeMetricGaugeProps> = ({
  gauge,
  barHeight = 6,
  compact = false,
  className = "",
  "data-testid": dataTestId = "runtime-metric-gauge",
}) => {
  const pct =
    gauge.maxValue && gauge.maxValue > 0
      ? (gauge.currentValue / gauge.maxValue) * 100
      : 0;

  if (compact) {
    return (
      <div
        className={`tf-runtime-metric-gauge tf-runtime-metric-gauge--compact tf-runtime-metric-gauge--${gauge.state} ${className}`}
        data-testid={dataTestId}
      >
        <span className="tf-runtime-metric-gauge__label">{gauge.label}</span>
        <span className="tf-runtime-metric-gauge__value">
          {gauge.currentValue.toFixed(1)}
          {gauge.unit}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`tf-runtime-metric-gauge tf-runtime-metric-gauge--${gauge.state} ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-runtime-metric-gauge__header">
        <span className="tf-runtime-metric-gauge__label">{gauge.label}</span>
        <span className="tf-runtime-metric-gauge__value">
          {gauge.currentValue.toFixed(1)}
          {gauge.unit}
        </span>
      </div>
      <div
        className="tf-runtime-metric-gauge__bar"
        style={{ height: barHeight }}
      >
        <div
          className={`tf-runtime-metric-gauge__fill tf-runtime-metric-gauge__fill--${gauge.state}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
        {gauge.thresholdWarning && (
          <div
            className="tf-runtime-metric-gauge__threshold tf-runtime-metric-gauge__threshold--warning"
            style={{
              left: `${(gauge.thresholdWarning / (gauge.maxValue || 1)) * 100}%`,
            }}
          />
        )}
        {gauge.thresholdCritical && (
          <div
            className="tf-runtime-metric-gauge__threshold tf-runtime-metric-gauge__threshold--critical"
            style={{
              left: `${(gauge.thresholdCritical / (gauge.maxValue || 1)) * 100}%`,
            }}
          />
        )}
      </div>
      {(gauge.minValue !== undefined || gauge.maxValue !== undefined) && (
        <div className="tf-runtime-metric-gauge__range">
          <span>{gauge.minValue ?? 0}{gauge.unit}</span>
          <span>{gauge.maxValue ?? "∞"}{gauge.unit}</span>
        </div>
      )}
    </div>
  );
};

RuntimeMetricGauge.displayName = "RuntimeMetricGauge";

export default RuntimeMetricGauge;
