/**
 * @fileoverview ExecutionTimelineRuler — Time ruler for the timeline.
 * Displays tick marks and time labels above the tracks.
 *
 * @module @torafirma/design-system/runtime-trace-console/ExecutionTimelineRuler
 */

import React, { useMemo } from "react";
import type { BaseComponentProps } from "./types";

/** Props for ExecutionTimelineRuler. */
export interface ExecutionTimelineRulerProps extends BaseComponentProps {
  /** Start time in ms. */
  startMs: number;
  /** End time in ms. */
  endMs: number;
  /** Number of major ticks. */
  ticks?: number;
  /** Time-to-pixel conversion. */
  timeToPx: (time: number) => number;
}

/**
 * ExecutionTimelineRuler — Time ruler with tick marks.
 *
 * @example
 * ```tsx
 * <ExecutionTimelineRuler
 *   startMs={0}
 *   endMs={15000}
 *   timeToPx={(t) => (t / duration) * 100}
 * />
 * ```
 */
export const ExecutionTimelineRuler: React.FC<ExecutionTimelineRulerProps> = ({
  startMs,
  endMs,
  ticks = 10,
  timeToPx,
  className = "",
  "data-testid": dataTestId = "execution-timeline-ruler",
}) => {
  const tickMarks = useMemo(() => {
    const result: { time: number; label: string; major: boolean }[] = [];
    const range = endMs - startMs;
    for (let i = 0; i <= ticks; i++) {
      const t = startMs + (i / ticks) * range;
      const seconds = t / 1000;
      result.push({
        time: t,
        label: seconds >= 1 ? `${seconds.toFixed(1)}s` : `${t.toFixed(0)}ms`,
        major: i % 5 === 0,
      });
    }
    return result;
  }, [startMs, endMs, ticks]);

  return (
    <div
      className={`tf-execution-timeline-ruler ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-execution-timeline-ruler__track">
        {tickMarks.map((tick, i) => (
          <div
            key={i}
            className={`tf-execution-timeline-ruler__tick ${
              tick.major
                ? "tf-execution-timeline-ruler__tick--major"
                : ""
            }`}
            style={{ left: `${timeToPx(tick.time)}%` }}
          >
            <div className="tf-execution-timeline-ruler__tick-line" />
            {tick.major && (
              <span className="tf-execution-timeline-ruler__tick-label">
                {tick.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

ExecutionTimelineRuler.displayName = "ExecutionTimelineRuler";

export default ExecutionTimelineRuler;
