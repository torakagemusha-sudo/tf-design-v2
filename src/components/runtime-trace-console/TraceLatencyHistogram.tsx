/**
 * @fileoverview TraceLatencyHistogram — Latency distribution histogram.
 * Shows bucketed latency counts for trace span analysis.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceLatencyHistogram
 */

import React, { useMemo } from "react";
import type { BaseComponentProps, TraceSpan } from "./types";

/** Props for TraceLatencyHistogram. */
export interface TraceLatencyHistogramProps extends BaseComponentProps {
  /** Spans to analyze. */
  spans: TraceSpan[];
  /** Number of buckets. */
  buckets?: number;
  /** Max latency for bucket range. */
  maxLatencyMs?: number;
}

/** Histogram bucket. */
interface Bucket {
  minMs: number;
  maxMs: number;
  count: number;
}

/**
 * TraceLatencyHistogram — Latency distribution chart.
 *
 * @example
 * ```tsx
 * <TraceLatencyHistogram spans={spans} buckets={20} maxLatencyMs={5000} />
 * ```
 */
export const TraceLatencyHistogram: React.FC<TraceLatencyHistogramProps> = ({
  spans,
  buckets = 20,
  maxLatencyMs,
  className = "",
  "data-testid": dataTestId = "trace-latency-histogram",
}) => {
  const { histogram, maxCount } = useMemo(() => {
    const max = maxLatencyMs || Math.max(...spans.map((s) => s.durationMs), 1);
    const h: Bucket[] = [];
    const bucketSize = max / buckets;

    for (let i = 0; i < buckets; i++) {
      h.push({
        minMs: i * bucketSize,
        maxMs: (i + 1) * bucketSize,
        count: 0,
      });
    }

    for (const span of spans) {
      const idx = Math.min(
        Math.floor((span.durationMs / max) * buckets),
        buckets - 1
      );
      h[idx].count += 1;
    }

    return { histogram: h, maxCount: Math.max(...h.map((b) => b.count), 1) };
  }, [spans, buckets, maxLatencyMs]);

  return (
    <div
      className={`tf-trace-latency-histogram ${className}`}
      data-testid={dataTestId}
    >
      <h5 className="tf-trace-latency-histogram__title">
        Latency Distribution
      </h5>
      <div className="tf-trace-latency-histogram__chart">
        {histogram.map((bucket, i) => (
          <div
            key={i}
            className="tf-trace-latency-histogram__bar"
            title={`${bucket.minMs.toFixed(0)}ms – ${bucket.maxMs.toFixed(0)}ms: ${bucket.count}`}
          >
            <div
              className="tf-trace-latency-histogram__fill"
              style={{
                height: `${(bucket.count / maxCount) * 100}%`,
              }}
            />
            <span className="tf-trace-latency-histogram__label">
              {bucket.maxMs >= 1000
                ? `${(bucket.maxMs / 1000).toFixed(1)}s`
                : `${bucket.maxMs.toFixed(0)}ms`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

TraceLatencyHistogram.displayName = "TraceLatencyHistogram";

export default TraceLatencyHistogram;
