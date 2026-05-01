/**
 * @fileoverview TraceLatencyPercentile — Percentile latency table.
 * Shows P50, P75, P90, P95, P99 latency values.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceLatencyPercentile
 */

import React, { useMemo } from "react";
import type { BaseComponentProps, TraceSpan } from "./types";

/** Props for TraceLatencyPercentile. */
export interface TraceLatencyPercentileProps extends BaseComponentProps {
  /** Spans to analyze. */
  spans: TraceSpan[];
  /** Percentiles to compute. */
  percentiles?: number[];
  /** Group by service. */
  byService?: boolean;
}

/** Percentile result. */
interface PercentileResult {
  label: string;
  value: number;
}

/**
 * TraceLatencyPercentile — Latency percentile table.
 *
 * @example
 * ```tsx
 * <TraceLatencyPercentile
 *   spans={spans}
 *   percentiles={[50, 90, 95, 99]}
 *   byService
 * />
 * ```
 */
export const TraceLatencyPercentile: React.FC<TraceLatencyPercentileProps> = ({
  spans,
  percentiles = [50, 75, 90, 95, 99],
  byService = false,
  className = "",
  "data-testid": dataTestId = "trace-latency-percentile",
}) => {
  const data = useMemo(() => {
    const compute = (values: number[]): PercentileResult[] => {
      const sorted = [...values].sort((a, b) => a - b);
      return percentiles.map((p) => {
        const idx = Math.ceil((p / 100) * sorted.length) - 1;
        return {
          label: `P${p}`,
          value: sorted[Math.max(0, idx)] || 0,
        };
      });
    };

    if (!byService) {
      return {
        overall: compute(spans.map((s) => s.durationMs)),
      };
    }

    const bySvc: Record<string, number[]> = {};
    for (const s of spans) {
      if (!bySvc[s.service]) bySvc[s.service] = [];
      bySvc[s.service].push(s.durationMs);
    }

    const result: Record<string, PercentileResult[]> = {};
    for (const [svc, vals] of Object.entries(bySvc)) {
      result[svc] = compute(vals);
    }
    return { byService: result };
  }, [spans, percentiles, byService]);

  const formatMs = (ms: number): string =>
    ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${ms.toFixed(0)}ms`;

  return (
    <div
      className={`tf-trace-latency-percentile ${className}`}
      data-testid={dataTestId}
    >
      <h5 className="tf-trace-latency-percentile__title">Latency Percentiles</h5>

      {data.overall && (
        <div className="tf-trace-latency-percentile__row">
          {data.overall.map((p) => (
            <div
              key={p.label}
              className="tf-trace-latency-percentile__cell"
            >
              <span className="tf-trace-latency-percentile__label">
                {p.label}
              </span>
              <span className="tf-trace-latency-percentile__value">
                {formatMs(p.value)}
              </span>
            </div>
          ))}
        </div>
      )}

      {data.byService &&
        Object.entries(data.byService).map(([svc, pcts]) => (
          <div key={svc} className="tf-trace-latency-percentile__service">
            <span className="tf-trace-latency-percentile__service-name">
              {svc}
            </span>
            <div className="tf-trace-latency-percentile__row">
              {pcts.map((p) => (
                <div
                  key={p.label}
                  className="tf-trace-latency-percentile__cell"
                >
                  <span className="tf-trace-latency-percentile__label">
                    {p.label}
                  </span>
                  <span className="tf-trace-latency-percentile__value">
                    {formatMs(p.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

TraceLatencyPercentile.displayName = "TraceLatencyPercentile";

export default TraceLatencyPercentile;
