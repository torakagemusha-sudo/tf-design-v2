/**
 * @fileoverview TraceEventTiming — Timing information display.
 * Shows duration, timestamps, and latency for trace events.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceEventTiming
 */

import React, { useMemo } from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceEventTiming. */
export interface TraceEventTimingProps extends BaseComponentProps {
  /** Duration in milliseconds. */
  durationMs: number;
  /** Start timestamp (ISO). */
  startTimestamp?: string;
  /** End timestamp (ISO). */
  endTimestamp?: string;
  /** Whether to show a visual bar. */
  showBar?: boolean;
}

/**
 * TraceEventTiming — Duration and timing display.
 *
 * @example
 * ```tsx
 * <TraceEventTiming durationMs={1450} showBar />
 * ```
 */
export const TraceEventTiming: React.FC<TraceEventTimingProps> = ({
  durationMs,
  startTimestamp,
  endTimestamp,
  showBar = true,
  className = "",
  "data-testid": dataTestId = "trace-event-timing",
}) => {
  const formatted = useMemo(() => {
    if (durationMs >= 1000) {
      return `${(durationMs / 1000).toFixed(2)}s`;
    }
    if (durationMs >= 1) {
      return `${durationMs.toFixed(0)}ms`;
    }
    return `${(durationMs * 1000).toFixed(0)}µs`;
  }, [durationMs]);

  const severity =
    durationMs > 5000 ? "critical" : durationMs > 1000 ? "warning" : "ok";

  return (
    <div
      className={`tf-trace-event-timing tf-trace-event-timing--${severity} ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-event-timing__main">
        <span className="tf-trace-event-timing__label">Duration</span>
        <span className="tf-trace-event-timing__value">{formatted}</span>
      </div>

      {showBar && (
        <div className="tf-trace-event-timing__bar">
          <div
            className={`tf-trace-event-timing__fill tf-trace-event-timing__fill--${severity}`}
            style={{
              width: `${Math.min((durationMs / 5000) * 100, 100)}%`,
            }}
          />
        </div>
      )}

      {startTimestamp && (
        <div className="tf-trace-event-timing__detail">
          <span>Started: {new Date(startTimestamp).toLocaleTimeString()}</span>
        </div>
      )}
      {endTimestamp && (
        <div className="tf-trace-event-timing__detail">
          <span>Ended: {new Date(endTimestamp).toLocaleTimeString()}</span>
        </div>
      )}
    </div>
  );
};

TraceEventTiming.displayName = "TraceEventTiming";

export default TraceEventTiming;
