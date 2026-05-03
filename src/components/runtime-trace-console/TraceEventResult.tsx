/**
 * @fileoverview TraceEventResult — Operation result display.
 * Shows success, failure, partial, or blocked result.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceEventResult
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Result type. */
type ResultType = "success" | "failure" | "partial" | "blocked";

/** Props for TraceEventResult. */
export interface TraceEventResultProps extends BaseComponentProps {
  /** Operation result. */
  result: ResultType;
  /** Optional human-readable message. */
  message?: string;
  /** Whether to show icon. */
  showIcon?: boolean;
}

/** Result icons. */
const RESULT_ICONS: Record<ResultType, string> = {
  success: "✓",
  failure: "✗",
  partial: "◯",
  blocked: "⛔",
};

/**
 * TraceEventResult — Operation result indicator.
 *
 * @example
 * ```tsx
 * <TraceEventResult result="success" message="Deployment complete" />
 * <TraceEventResult result="blocked" showIcon />
 * ```
 */
export const TraceEventResult: React.FC<TraceEventResultProps> = ({
  result,
  message,
  showIcon = true,
  className = "",
  "data-testid": dataTestId = "trace-event-result",
}) => {
  return (
    <span
      className={`tf-trace-event-result tf-trace-event-result--${result} ${className}`}
      data-testid={dataTestId}
    >
      {showIcon && (
        <span className="tf-trace-event-result__icon" aria-hidden="true">
          {RESULT_ICONS[result]}
        </span>
      )}
      <span className="tf-trace-event-result__label">{result}</span>
      {message && (
        <span className="tf-trace-event-result__message">{message}</span>
      )}
    </span>
  );
};

TraceEventResult.displayName = "TraceEventResult";

export default TraceEventResult;
