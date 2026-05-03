/**
 * @fileoverview TraceEventCard — Detailed trace event card.
 * Full-detail view for a single trace event with all fields.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceEventCard
 */

import React from "react";
import type { BaseComponentProps, TraceEvent } from "./types";

/** Props for TraceEventCard. */
export interface TraceEventCardProps extends BaseComponentProps {
  /** Event to display. */
  event: TraceEvent;
  /** Whether the card is expanded. */
  expanded?: boolean;
  /** Callback when expand/collapse is toggled. */
  onToggleExpand?: () => void;
  /** Callback to close the card. */
  onClose?: () => void;
}

/**
 * TraceEventCard — Detailed trace event inspector card.
 *
 * Shows all trace fields: event ID, timestamp, actor, action, target,
 * result, authority, metadata, stack trace, and before/after state.
 *
 * @example
 * ```tsx
 * <TraceEventCard
 *   event={selectedEvent}
 *   expanded={true}
 *   onClose={() => setSelectedEvent(null)}
 * />
 * ```
 */
export const TraceEventCard: React.FC<TraceEventCardProps> = ({
  event,
  expanded = true,
  onToggleExpand,
  onClose,
  className = "",
  "data-testid": dataTestId = "trace-event-card",
}) => {
  return (
    <div
      className={`tf-trace-event-card tf-trace-event-card--${event.severity} ${className}`}
      data-testid={dataTestId}
    >
      {/* Header */}
      <TraceEventHeader event={event} onClose={onClose} />

      {/* Body */}
      {expanded && (
        <div className="tf-trace-event-card__body">
          <TraceEventBody event={event} />
          <TraceEventMetadata event={event} />
          {event.stackTrace && event.stackTrace.length > 0 && (
            <TraceEventStackTrace stackTrace={event.stackTrace} />
          )}
          {event.durationMs !== undefined && (
            <TraceEventTiming durationMs={event.durationMs} />
          )}
          {event.before && event.after && (
            <TraceEventDiff before={event.before} after={event.after} />
          )}
          <TraceEventActor actor={event.actor} />
          <TraceEventAuthority level={event.authorityLevel} />
          {event.result && <TraceEventResult result={event.result} />}
          {event.reasonCode && <TraceEventReason code={event.reasonCode} />}
        </div>
      )}

      {/* Toggle */}
      {onToggleExpand && (
        <button
          className="tf-trace-event-card__toggle"
          onClick={onToggleExpand}
          type="button"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

/** Header sub-component. */
const TraceEventHeader: React.FC<{ event: TraceEvent; onClose?: () => void }> = ({
  event,
  onClose,
}) => (
  <div className="tf-trace-event-header">
    <div className="tf-trace-event-header__left">
      <span className={`tf-badge tf-badge--${event.severity}`}>
        {event.severity}
      </span>
      <span className="tf-trace-event-header__action">{event.action}</span>
      <span className="tf-trace-event-header__target">{event.target}</span>
    </div>
    <div className="tf-trace-event-header__right">
      <span className="tf-trace-event-header__id" title={event.eventId}>
        {event.eventId.slice(0, 8)}
      </span>
      <time dateTime={event.timestamp}>
        {new Date(event.timestamp).toLocaleString()}
      </time>
      {onClose && (
        <button
          className="tf-btn tf-btn--xs tf-btn--ghost"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          {"✕"}
        </button>
      )}
    </div>
  </div>
);

/** Body sub-component. */
const TraceEventBody: React.FC<{ event: TraceEvent }> = ({ event }) => (
  <div className="tf-trace-event-body">
    <p className="tf-trace-event-body__message">{event.message}</p>
    <div className="tf-trace-event-body__fields">
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
    </div>
  </div>
);

/** Metadata sub-component. */
const TraceEventMetadata: React.FC<{ event: TraceEvent }> = ({ event }) => {
  if (!event.metadata || Object.keys(event.metadata).length === 0) return null;
  return (
    <div className="tf-trace-event-metadata">
      <h5 className="tf-trace-event-metadata__title">Metadata</h5>
      <dl className="tf-trace-event-metadata__list">
        {Object.entries(event.metadata).map(([key, value]) => (
          <div key={key} className="tf-trace-event-metadata__item">
            <dt className="tf-trace-event-metadata__key">{key}</dt>
            <dd className="tf-trace-event-metadata__value">
              {typeof value === "string"
                ? value
                : JSON.stringify(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

/** Stack trace sub-component. */
const TraceEventStackTrace: React.FC<{ stackTrace: string[] }> = ({
  stackTrace,
}) => (
  <div className="tf-trace-event-stack-trace">
    <h5 className="tf-trace-event-stack-trace__title">Stack Trace</h5>
    <pre className="tf-trace-event-stack-trace__code">
      {stackTrace.join("\n")}
    </pre>
  </div>
);

/** Timing sub-component. */
const TraceEventTiming: React.FC<{ durationMs: number }> = ({ durationMs }) => (
  <div className="tf-trace-event-timing">
    <span className="tf-trace-event-timing__label">Duration</span>
    <span className="tf-trace-event-timing__value">
      {durationMs >= 1000
        ? `${(durationMs / 1000).toFixed(2)}s`
        : `${durationMs}ms`}
    </span>
  </div>
);

/** Diff sub-component. */
const TraceEventDiff: React.FC<{
  before: Record<string, unknown>;
  after: Record<string, unknown>;
}> = ({ before, after }) => {
  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);
  return (
    <div className="tf-trace-event-diff">
      <h5 className="tf-trace-event-diff__title">State Change</h5>
      <table className="tf-trace-event-diff__table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Before</th>
            <th>After</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(allKeys).map((key) => (
            <tr
              key={key}
              className={
                JSON.stringify(before[key]) !== JSON.stringify(after[key])
                  ? "tf-trace-event-diff__changed"
                  : ""
              }
            >
              <td>{key}</td>
              <td className="tf-trace-event-diff__before">
                {JSON.stringify(before[key])}
              </td>
              <td className="tf-trace-event-diff__after">
                {JSON.stringify(after[key])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** Actor sub-component. */
const TraceEventActor: React.FC<{ actor: string }> = ({ actor }) => (
  <div className="tf-trace-event-actor">
    <span className="tf-trace-event-actor__label">Actor</span>
    <span className="tf-trace-event-actor__value">{actor}</span>
  </div>
);

/** Authority sub-component. */
const TraceEventAuthority: React.FC<{ level: number }> = ({ level }) => (
  <div className="tf-trace-event-authority">
    <span className="tf-trace-event-authority__label">Authority</span>
    <span className="tf-trace-event-authority__value">
      AUTH {level}
    </span>
  </div>
);

/** Result sub-component. */
const TraceEventResult: React.FC<{
  result: TraceEvent["result"];
}> = ({ result }) => (
  <div className="tf-trace-event-result">
    <span className="tf-trace-event-result__label">Result</span>
    <span
      className={`tf-badge tf-badge--result-${result}`}
    >
      {result}
    </span>
  </div>
);

/** Reason sub-component. */
const TraceEventReason: React.FC<{ code: string }> = ({ code }) => (
  <div className="tf-trace-event-reason">
    <span className="tf-trace-event-reason__label">Reason Code</span>
    <code className="tf-trace-event-reason__code">{code}</code>
  </div>
);

TraceEventCard.displayName = "TraceEventCard";

export default TraceEventCard;
