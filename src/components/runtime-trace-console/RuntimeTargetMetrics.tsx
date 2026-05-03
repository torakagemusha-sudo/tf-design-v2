/**
 * @fileoverview RuntimeTargetMetrics — Target performance metrics display.
 * Shows CPU, memory, queue depth, latency, throughput, and error rate.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/RuntimeTargetMetrics
 */

import React, { useMemo } from "react";
import type { BaseComponentProps, RuntimeMetrics } from "./types";

/** Props for RuntimeTargetMetrics. */
export interface RuntimeTargetMetricsProps extends BaseComponentProps {
  /** Metrics data to display. */
  metrics: RuntimeMetrics;
  /** Whether to show sparkline history (if available). */
  showHistory?: boolean;
  /** Whether to use compact layout. */
  compact?: boolean;
}

/**
 * RuntimeTargetMetrics — Performance metrics panel for a runtime target.
 *
 * Displays key operational metrics: CPU, memory, processes, queue depth,
 * latency percentiles, throughput, error rate, and uptime.
 *
 * @example
 * ```tsx
 * <RuntimeTargetMetrics
 *   metrics={runtime.metrics}
 *   showHistory
 * />
 * ```
 */
export const RuntimeTargetMetrics: React.FC<RuntimeTargetMetricsProps> = ({
  metrics,
  showHistory = false,
  compact = false,
  className = "",
  "data-testid": dataTestId = "runtime-target-metrics",
}) => {
  const memPercent = useMemo(() => {
    if (!metrics.memoryLimitMb || metrics.memoryLimitMb === 0) return 0;
    return (metrics.memoryMb / metrics.memoryLimitMb) * 100;
  }, [metrics.memoryMb, metrics.memoryLimitMb]);

  const formatUptime = (seconds: number): string => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  if (compact) {
    return (
      <div
        className={`tf-runtime-target-metrics tf-runtime-target-metrics--compact ${className}`}
        data-testid={dataTestId}
      >
        <MetricCompact label="CPU" value={`${metrics.cpuPercent.toFixed(0)}%`} />
        <MetricCompact label="MEM" value={`${metrics.memoryMb}MB`} />
        <MetricCompact label="Q" value={`${metrics.queueDepth}`} />
        <MetricCompact label="P99" value={`${metrics.latencyP99Ms}ms`} />
      </div>
    );
  }

  return (
    <div
      className={`tf-runtime-target-metrics ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-runtime-target-metrics__grid">
        {/* CPU */}
        <div className="tf-runtime-target-metrics__item">
          <span className="tf-runtime-target-metrics__label">CPU</span>
          <span className="tf-runtime-target-metrics__value">
            {metrics.cpuPercent.toFixed(1)}%
          </span>
          <div className="tf-runtime-target-metrics__bar">
            <div
              className={`tf-runtime-target-metrics__fill ${
                metrics.cpuPercent > 80 ? "tf-runtime-target-metrics__fill--high" : ""
              }`}
              style={{ width: `${Math.min(metrics.cpuPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Memory */}
        <div className="tf-runtime-target-metrics__item">
          <span className="tf-runtime-target-metrics__label">Memory</span>
          <span className="tf-runtime-target-metrics__value">
            {metrics.memoryMb} MB
            {metrics.memoryLimitMb && ` / ${metrics.memoryLimitMb} MB`}
          </span>
          <div className="tf-runtime-target-metrics__bar">
            <div
              className={`tf-runtime-target-metrics__fill ${
                memPercent > 80 ? "tf-runtime-target-metrics__fill--high" : ""
              }`}
              style={{ width: `${Math.min(memPercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Active Processes */}
        <div className="tf-runtime-target-metrics__item">
          <span className="tf-runtime-target-metrics__label">Processes</span>
          <span className="tf-runtime-target-metrics__value">
            {metrics.activeProcesses}
          </span>
        </div>

        {/* Queue Depth */}
        <div className="tf-runtime-target-metrics__item">
          <span className="tf-runtime-target-metrics__label">Queue Depth</span>
          <span className="tf-runtime-target-metrics__value">
            {metrics.queueDepth}
          </span>
        </div>

        {/* Latency */}
        <div className="tf-runtime-target-metrics__item">
          <span className="tf-runtime-target-metrics__label">Latency</span>
          <span className="tf-runtime-target-metrics__value">
            P50: {metrics.latencyP50Ms}ms · P99: {metrics.latencyP99Ms}ms
          </span>
        </div>

        {/* Throughput */}
        <div className="tf-runtime-target-metrics__item">
          <span className="tf-runtime-target-metrics__label">Throughput</span>
          <span className="tf-runtime-target-metrics__value">
            {metrics.throughputRps} req/s
          </span>
        </div>

        {/* Error Rate */}
        <div className="tf-runtime-target-metrics__item">
          <span className="tf-runtime-target-metrics__label">Error Rate</span>
          <span
            className={`tf-runtime-target-metrics__value ${
              metrics.errorRate > 0.05
                ? "tf-runtime-target-metrics__value--high"
                : ""
            }`}
          >
            {(metrics.errorRate * 100).toFixed(2)}%
          </span>
        </div>

        {/* Uptime */}
        <div className="tf-runtime-target-metrics__item">
          <span className="tf-runtime-target-metrics__label">Uptime</span>
          <span className="tf-runtime-target-metrics__value">
            {formatUptime(metrics.uptimeSeconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

/** Compact metric sub-component. */
const MetricCompact: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <span className="tf-runtime-target-metrics__compact">
    <span className="tf-runtime-target-metrics__compact-label">{label}</span>
    <span className="tf-runtime-target-metrics__compact-value">{value}</span>
  </span>
);

RuntimeTargetMetrics.displayName = "RuntimeTargetMetrics";

export default RuntimeTargetMetrics;
