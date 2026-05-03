/**
 * @fileoverview TraceSummaryPanel — Trace summary statistics.
 * Shows aggregate counts, durations, error rates, and service breakdown.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceSummaryPanel
 */

import React, { useMemo } from "react";
import type { BaseComponentProps, TraceSpan } from "./types";

/** Props for TraceSummaryPanel. */
export interface TraceSummaryPanelProps extends BaseComponentProps {
  /** Spans to summarize. */
  spans: TraceSpan[];
  /** Trace name/ID. */
  traceName?: string;
  /** Total trace duration. */
  totalDurationMs?: number;
}

/**
 * TraceSummaryPanel — Trace execution summary.
 *
 * @example
 * ```tsx
 * <TraceSummaryPanel
 *   spans={spans}
 *   traceName="api-request-123"
 *   totalDurationMs={5000}
 * />
 * ```
 */
export const TraceSummaryPanel: React.FC<TraceSummaryPanelProps> = ({
  spans,
  traceName,
  totalDurationMs,
  className = "",
  "data-testid": dataTestId = "trace-summary-panel",
}) => {
  const stats = useMemo(() => {
    const total = spans.length;
    const errors = spans.filter((s) => s.status === "error").length;
    const byService: Record<string, { count: number; duration: number; errors: number }> = {};
    let totalDur = 0;

    for (const s of spans) {
      totalDur += s.durationMs;
      if (!byService[s.service]) {
        byService[s.service] = { count: 0, duration: 0, errors: 0 };
      }
      byService[s.service].count += 1;
      byService[s.service].duration += s.durationMs;
      if (s.status === "error") byService[s.service].errors += 1;
    }

    return { total, errors, errorRate: total > 0 ? errors / total : 0, byService, totalDur };
  }, [spans]);

  return (
    <div
      className={`tf-trace-summary-panel ${className}`}
      data-testid={dataTestId}
    >
      {traceName && (
        <h4 className="tf-trace-summary-panel__title">{traceName}</h4>
      )}

      <div className="tf-trace-summary-panel__stats">
        <div className="tf-trace-summary-panel__stat">
          <span className="tf-trace-summary-panel__label">Spans</span>
          <span className="tf-trace-summary-panel__value">{stats.total}</span>
        </div>
        <div className="tf-trace-summary-panel__stat">
          <span className="tf-trace-summary-panel__label">Duration</span>
          <span className="tf-trace-summary-panel__value">
            {(totalDurationMs || stats.totalDur) >= 1000
              ? `${((totalDurationMs || stats.totalDur) / 1000).toFixed(2)}s`
              : `${totalDurationMs || stats.totalDur}ms`}
          </span>
        </div>
        <div className="tf-trace-summary-panel__stat">
          <span className="tf-trace-summary-panel__label">Errors</span>
          <span
            className={`tf-trace-summary-panel__value ${
              stats.errors > 0 ? "tf-trace-summary-panel__value--error" : ""
            }`}
          >
            {stats.errors}
          </span>
        </div>
        <div className="tf-trace-summary-panel__stat">
          <span className="tf-trace-summary-panel__label">Error Rate</span>
          <span
            className={`tf-trace-summary-panel__value ${
              stats.errorRate > 0.05 ? "tf-trace-summary-panel__value--error" : ""
            }`}
          >
            {(stats.errorRate * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="tf-trace-summary-panel__services">
        <h5>By Service</h5>
        {Object.entries(stats.byService)
          .sort((a, b) => b[1].duration - a[1].duration)
          .map(([service, data]) => (
            <div key={service} className="tf-trace-summary-panel__service">
              <span className="tf-trace-summary-panel__service-name">
                {service}
              </span>
              <span className="tf-trace-summary-panel__service-count">
                {data.count} spans
              </span>
              <span className="tf-trace-summary-panel__service-duration">
                {data.duration >= 1000
                  ? `${(data.duration / 1000).toFixed(2)}s`
                  : `${data.duration}ms`}
              </span>
              {data.errors > 0 && (
                <span className="tf-trace-summary-panel__service-errors">
                  {data.errors} errors
                </span>
              )}
              <div className="tf-trace-summary-panel__service-bar">
                <div
                  className="tf-trace-summary-panel__service-fill"
                  style={{
                    width: `${Math.min((data.duration / (totalDurationMs || stats.totalDur || 1)) * 100, 100)}%`,
                    backgroundColor: data.errors > 0 ? "#ef4444" : "#06b6d4",
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

TraceSummaryPanel.displayName = "TraceSummaryPanel";

export default TraceSummaryPanel;
