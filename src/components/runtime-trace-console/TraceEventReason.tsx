/**
 * @fileoverview TraceEventReason — Reason code display for events.
 * Shows structured reason codes explaining why an event occurred.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceEventReason
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceEventReason. */
export interface TraceEventReasonProps extends BaseComponentProps {
  /** Reason code string. */
  code: string;
  /** Human-readable description. */
  description?: string;
  /** Category of reason. */
  category?: "validation" | "authority" | "runtime" | "policy" | "system" | "unknown";
  /** Whether the reason is resolvable. */
  resolvable?: boolean;
}

/**
 * TraceEventReason — Structured reason code display.
 *
 * Explains why an event has a particular result (per Section 3.9 Trace Layer).
 *
 * @example
 * ```tsx
 * <TraceEventReason
 *   code="VALIDATION_SCHEMA_MISMATCH"
 *   description="The submitted schema does not match the expected format."
 *   category="validation"
 * />
 * ```
 */
export const TraceEventReason: React.FC<TraceEventReasonProps> = ({
  code,
  description,
  category = "unknown",
  resolvable,
  className = "",
  "data-testid": dataTestId = "trace-event-reason",
}) => {
  return (
    <div
      className={`tf-trace-event-reason tf-trace-event-reason--${category} ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-event-reason__header">
        <span className="tf-trace-event-reason__label">Reason</span>
        <code className="tf-trace-event-reason__code">{code}</code>
        {resolvable !== undefined && (
          <span
            className={`tf-badge tf-badge--sm ${
              resolvable ? "tf-badge--ok" : "tf-badge--blocked"
            }`}
          >
            {resolvable ? "Resolvable" : "Blocked"}
          </span>
        )}
      </div>
      {description && (
        <p className="tf-trace-event-reason__description">{description}</p>
      )}
      <span className="tf-trace-event-reason__category">{category}</span>
    </div>
  );
};

TraceEventReason.displayName = "TraceEventReason";

export default TraceEventReason;
