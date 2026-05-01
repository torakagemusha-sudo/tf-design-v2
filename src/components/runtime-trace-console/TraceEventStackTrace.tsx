/**
 * @fileoverview TraceEventStackTrace — Stack trace display for error events.
 * Formatted stack trace with collapsible frames.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceEventStackTrace
 */

import React, { useState } from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceEventStackTrace. */
export interface TraceEventStackTraceProps extends BaseComponentProps {
  /** Stack trace frames. */
  stackTrace: string[];
  /** Maximum frames to show initially. */
  maxInitialFrames?: number;
  /** Error message (first line). */
  errorMessage?: string;
}

/**
 * TraceEventStackTrace — Formatted stack trace viewer.
 *
 * @example
 * ```tsx
 * <TraceEventStackTrace
 *   stackTrace={event.stackTrace}
 *   errorMessage="Connection refused"
 *   maxInitialFrames={5}
 * />
 * ```
 */
export const TraceEventStackTrace: React.FC<TraceEventStackTraceProps> = ({
  stackTrace,
  maxInitialFrames = 10,
  errorMessage,
  className = "",
  "data-testid": dataTestId = "trace-event-stack-trace",
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = stackTrace.length > maxInitialFrames;
  const visible = expanded ? stackTrace : stackTrace.slice(0, maxInitialFrames);

  return (
    <div
      className={`tf-trace-event-stack-trace ${className}`}
      data-testid={dataTestId}
    >
      <h5 className="tf-trace-event-stack-trace__title">Stack Trace</h5>
      {errorMessage && (
        <div className="tf-trace-event-stack-trace__error">
          {errorMessage}
        </div>
      )}
      <pre className="tf-trace-event-stack-trace__frames">
        {visible.map((frame, i) => (
          <div
            key={i}
            className={`tf-trace-event-stack-trace__frame ${
              i === 0 ? "tf-trace-event-stack-trace__frame--top" : ""
            }`}
          >
            <span className="tf-trace-event-stack-trace__frame-num">
              {i + 1}
            </span>
            <span className="tf-trace-event-stack-trace__frame-text">
              {frame}
            </span>
          </div>
        ))}
      </pre>
      {hasMore && (
        <button
          className="tf-btn tf-btn--xs tf-btn--ghost"
          onClick={() => setExpanded(!expanded)}
          type="button"
        >
          {expanded ? "Show less" : `Show ${stackTrace.length - maxInitialFrames} more frames`}
        </button>
      )}
    </div>
  );
};

TraceEventStackTrace.displayName = "TraceEventStackTrace";

export default TraceEventStackTrace;
