/**
 * @fileoverview RuntimeMetricsPanel — Runtime metrics overview panel.
 * Shows all key metrics as gauges with sparklines and alerts.
 *
 * @module @torafirma/design-system/runtime-trace-console/RuntimeMetricsPanel
 */

import React from "react";
import type { BaseComponentProps, MetricGauge, MetricAlert } from "./types";

/** Props for RuntimeMetricsPanel. */
export interface RuntimeMetricsPanelProps extends BaseComponentProps {
  /** Metric gauges to display. */
  gauges: MetricGauge[];
  /** Active alerts. */
  alerts?: MetricAlert[];
  /** Callback when an alert is acknowledged. */
  onAckAlert?: (alertId: string) => void;
  /** Title for the panel. */
  title?: string;
}

/**
 * RuntimeMetricsPanel — Overview of all runtime metrics.
 *
 * @example
 * ```tsx
 * <RuntimeMetricsPanel
 *   gauges={metricGauges}
 *   alerts={activeAlerts}
 *   onAckAlert={(id) => acknowledgeAlert(id)}
 * />
 * ```
 */
export const RuntimeMetricsPanel: React.FC<RuntimeMetricsPanelProps> = ({
  gauges,
  alerts = [],
  onAckAlert,
  title = "Runtime Metrics",
  className = "",
  "data-testid": dataTestId = "runtime-metrics-panel",
}) => {
  return (
    <div
      className={`tf-runtime-metrics-panel ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-runtime-metrics-panel__header">
        <h4 className="tf-runtime-metrics-panel__title">{title}</h4>
        {alerts.length > 0 && (
          <span className="tf-badge tf-badge--error">
            {alerts.length} alert{alerts.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="tf-runtime-metrics-panel__alerts">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`tf-runtime-metrics-panel__alert tf-runtime-metrics-panel__alert--${alert.severity}`}
            >
              <span className="tf-runtime-metrics-panel__alert-metric">
                {alert.metricId}
              </span>
              <span className="tf-runtime-metrics-panel__alert-condition">
                {alert.condition} {alert.threshold}
              </span>
              {onAckAlert && (
                <button
                  className="tf-btn tf-btn--xs tf-btn--ghost"
                  onClick={() => onAckAlert(alert.id)}
                  type="button"
                >
                  Ack
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Gauges */}
      <div className="tf-runtime-metrics-panel__gauges">
        {gauges.map((gauge) => (
          <RuntimeMetricGaugeComponent
            key={gauge.id}
            gauge={gauge}
          />
        ))}
      </div>
    </div>
  );
};

/** Inline gauge sub-component. */
const RuntimeMetricGaugeComponent: React.FC<{ gauge: MetricGauge }> = ({
  gauge,
}) => {
  const pct =
    gauge.maxValue && gauge.maxValue > 0
      ? (gauge.currentValue / gauge.maxValue) * 100
      : 0;

  return (
    <div
      className={`tf-runtime-metric-gauge tf-runtime-metric-gauge--${gauge.state}`}
    >
      <div className="tf-runtime-metric-gauge__header">
        <span className="tf-runtime-metric-gauge__label">{gauge.label}</span>
        <span className="tf-runtime-metric-gauge__value">
          {gauge.currentValue.toFixed(1)}
          {gauge.unit}
        </span>
      </div>
      <div className="tf-runtime-metric-gauge__bar">
        <div
          className={`tf-runtime-metric-gauge__fill tf-runtime-metric-gauge__fill--${gauge.state}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      {gauge.history.length > 1 && (
        <RuntimeMetricSparkline data={gauge.history} />
      )}
    </div>
  );
};

/** Inline sparkline sub-component. */
const RuntimeMetricSparkline: React.FC<{
  data: { timestamp: number; value: number }[];
}> = ({ data }) => {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      className="tf-runtime-metric-sparkline"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
    >
      <polyline
        className="tf-runtime-metric-sparkline__line"
        points={points}
        fill="none"
        strokeWidth={2}
      />
    </svg>
  );
};

RuntimeMetricsPanel.displayName = "RuntimeMetricsPanel";

export default RuntimeMetricsPanel;
