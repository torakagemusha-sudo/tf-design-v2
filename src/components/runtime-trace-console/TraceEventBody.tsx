/**
 * @fileoverview TraceEventBody — Event body/detail display.
 * Shows message, fields, and action details for a trace event.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceEventBody
 */

import React from "react";
import type { BaseComponentProps, TraceEvent } from "./types";

/** Props for TraceEventBody. */
export interface TraceEventBodyProps extends BaseComponentProps {
  /** Event data. */
  event: TraceEvent;
}

/**
 * TraceEventBody — Trace event detail body.
 *
 * @example
 * ```tsx
 * <TraceEventBody event={selectedEvent} />
 * ```
 */
export const TraceEventBody: React.FC<TraceEventBodyProps> = ({
  event,
  className = "",
  "data-testid": dataTestId = "trace-event-body",
}) => {
  return (
    <div
      className={`tf-trace-event-body ${className}`}
      data-testid={dataTestId}
    >
      <p className="tf-trace-event-body__message">{event.message}</p>

      <div className="tf-trace-event-body__grid">
        <div className="tf-trace-event-body__field">
          <span className="tf-trace-event-body__label">Event ID</span>
          <code className="tf-trace-event-body__value">{event.eventId}</code>
        </div>
        <div className="tf-trace-event-body__field">
          <span className="tf-trace-event-body__label">Timestamp</span>
          <span className="tf-trace-event-body__value">
            {new Date(event.timestamp).toISOString()}
          </span>
        </div>
        <div className="tf-trace-event-body__field">
          <span className="tf-trace-event-body__label">Actor</span>
          <span className="tf-trace-event-body__value">{event.actor}</span>
        </div>
        <div className="tf-trace-event-body__field">
          <span className="tf-trace-event-body__label">Action</span>
          <span className="tf-trace-event-body__value">{event.action}</span>
        </div>
        <div className="tf-trace-event-body__field">
          <span className="tf-trace-event-body__label">Target</span>
          <span className="tf-trace-event-body__value">{event.target}</span>
        </div>
        <div className="tf-trace-event-body__field">
          <span className="tf-trace-event-body__label">Runtime</span>
          <span className="tf-trace-event-body__value">
            {event.runtimeTarget}
          </span>
        </div>
        {event.validationState && (
          <div className="tf-trace-event-body__field">
            <span className="tf-trace-event-body__label">Validation</span>
            <span
              className={`tf-badge tf-badge--state-${event.validationState.toLowerCase()}`}
            >
              {event.validationState}
            </span>
          </div>
        )}
        {event.result && (
          <div className="tf-trace-event-body__field">
            <span className="tf-trace-event-body__label">Result</span>
            <span
              className={`tf-badge tf-badge--result-${event.result}`}
            >
              {event.result}
            </span>
          </div>
        )}
        {event.reasonCode && (
          <div className="tf-trace-event-body__field">
            <span className="tf-trace-event-body__label">Reason Code</span>
            <code className="tf-trace-event-body__value">
              {event.reasonCode}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

TraceEventBody.displayName = "TraceEventBody";

export default TraceEventBody;
