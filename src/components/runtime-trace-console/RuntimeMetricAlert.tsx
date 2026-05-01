/**
 * @fileoverview RuntimeMetricAlert — Metric alert threshold display.
 * Shows active alerts with severity, condition, and acknowledgment.
 *
 * @module @torafirma/design-system/runtime-trace-console/RuntimeMetricAlert
 */

import React from "react";
import type { BaseComponentProps, MetricAlert } from "./types";

/** Props for RuntimeMetricAlert. */
export interface RuntimeMetricAlertProps extends BaseComponentProps {
  /** Alert data. */
  alert: MetricAlert;
  /** Callback to acknowledge. */
  onAcknowledge?: (alertId: string) => void;
  /** Whether to show metric name. */
  showMetricName?: boolean;
}

/**
 * RuntimeMetricAlert — Individual metric alert card.
 *
 * @example
 * ```tsx
 * <RuntimeMetricAlert
 *   alert={alert}
 *   onAcknowledge={(id) => ackAlert(id)}
 *   showMetricName
 * />
 * ```
 */
export const RuntimeMetricAlert: React.FC<RuntimeMetricAlertProps> = ({
  alert,
  onAcknowledge,
  showMetricName = true,
  className = "",
  "data-testid": dataTestId = "runtime-metric-alert",
}) => {
  return (
    <div
      className={`tf-runtime-metric-alert tf-runtime-metric-alert--${alert.severity} ${className}`}
      data-testid={dataTestId}
      role="alert"
    >
      <div className="tf-runtime-metric-alert__header">
        <span
          className={`tf-runtime-metric-alert__indicator tf-runtime-metric-alert__indicator--${alert.severity}`}
        />
        {showMetricName && (
          <span className="tf-runtime-metric-alert__metric">
            {alert.metricId}
          </span>
        )}
        <span className="tf-runtime-metric-alert__condition">
          {alert.condition} {alert.threshold}
        </span>
        <span className={`tf-badge tf-badge--${alert.severity} tf-badge--sm`}>
          {alert.severity}
        </span>
      </div>
      {alert.triggeredAt && (
        <time className="tf-runtime-metric-alert__time">
          Triggered: {new Date(alert.triggeredAt).toLocaleString()}
        </time>
      )}
      {onAcknowledge && (
        <button
          className="tf-btn tf-btn--xs tf-btn--ghost"
          onClick={() => onAcknowledge(alert.id)}
          type="button"
        >
          Acknowledge
        </button>
      )}
    </div>
  );
};

RuntimeMetricAlert.displayName = "RuntimeMetricAlert";

export default RuntimeMetricAlert;
