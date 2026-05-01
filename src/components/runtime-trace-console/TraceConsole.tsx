/**
 * @fileoverview TraceConsole — Main trace console panel for the Torafirma Design System.
 * Displays real-time and historical trace events with filtering, search, and export.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceConsole
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  BaseComponentProps,
  TraceEvent,
  ProductState,
} from "./types";

/** Props for the TraceConsole component. */
export interface TraceConsoleProps extends BaseComponentProps {
  /** Array of trace events to display. */
  events: TraceEvent[];
  /** Current product state reflected in console chrome. */
  productState?: ProductState;
  /** Whether the console is streaming live events. */
  isStreaming?: boolean;
  /** Callback when a trace event is selected. */
  onEventSelect?: (event: TraceEvent) => void;
  /** Callback to pause/resume streaming. */
  onToggleStreaming?: () => void;
  /** Callback to clear all events. */
  onClear?: () => void;
  /** Maximum number of events to render (virtualization limit). */
  maxEvents?: number;
  /** Initial filter severity. */
  initialSeverityFilter?: string;
}

/**
 * TraceConsole — Main trace console panel.
 *
 * Renders a governed, authority-aware trace console with real-time streaming,
 * severity filtering, and event selection. Follows Torafirma Section 3.9 Trace Layer.
 *
 * @example
 * ```tsx
 * <TraceConsole
 *   events={traceEvents}
 *   productState="RUNNING"
 *   isStreaming={true}
 *   onEventSelect={handleSelect}
 * />
 * ```
 */
export const TraceConsole: React.FC<TraceConsoleProps> = ({
  events,
  productState = "IDLE",
  isStreaming = false,
  onEventSelect,
  onToggleStreaming,
  onClear,
  maxEvents = 10000,
  initialSeverityFilter,
  className = "",
  "data-testid": dataTestId = "trace-console",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | undefined>(
    initialSeverityFilter
  );

  const filteredEvents = useMemo(() => {
    let list = severityFilter
      ? events.filter((e) => e.severity === severityFilter)
      : events;
    if (list.length > maxEvents) {
      list = list.slice(list.length - maxEvents);
    }
    return list;
  }, [events, severityFilter, maxEvents]);

  const handleSelect = useCallback(
    (event: TraceEvent) => {
      setSelectedEventId(event.eventId);
      onEventSelect?.(event);
    },
    [onEventSelect]
  );

  // Auto-scroll on new events when streaming
  useEffect(() => {
    if (isStreaming && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [filteredEvents, isStreaming]);

  const severityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of events) {
      counts[e.severity] = (counts[e.severity] || 0) + 1;
    }
    return counts;
  }, [events]);

  return (
    <div
      className={`tf-trace-console tf-trace-console--state-${productState.toLowerCase()} ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-console__header">
        <div className="tf-trace-console__title">
          <span className="tf-trace-console__icon" aria-hidden="true">
            {"■"}
          </span>
          <span className="tf-trace-console__label">Trace Console</span>
          {productState && (
            <span className={`tf-badge tf-badge--state-${productState.toLowerCase()}`}>
              {productState}
            </span>
          )}
          {isStreaming && (
            <span className="tf-trace-console__live-indicator">
              <span className="tf-pulse-dot" />
              LIVE
            </span>
          )}
        </div>
        <div className="tf-trace-console__counts">
          {Object.entries(severityCounts).map(([sev, count]) => (
            <button
              key={sev}
              className={`tf-trace-console__count ${
                severityFilter === sev ? "tf-trace-console__count--active" : ""
              } tf-trace-console__count--${sev}`}
              onClick={() =>
                setSeverityFilter((f) => (f === sev ? undefined : sev))
              }
              type="button"
              aria-label={`Filter by ${sev}: ${count} events`}
            >
              <span className="tf-trace-console__count-label">{sev}</span>
              <span className="tf-trace-console__count-value">{count}</span>
            </button>
          ))}
        </div>
        <div className="tf-trace-console__actions">
          <button
            className="tf-btn tf-btn--sm"
            onClick={onToggleStreaming}
            type="button"
            aria-label={isStreaming ? "Pause streaming" : "Resume streaming"}
          >
            {isStreaming ? "Pause" : "Resume"}
          </button>
          <button
            className="tf-btn tf-btn--sm tf-btn--ghost"
            onClick={onClear}
            type="button"
            aria-label="Clear trace events"
          >
            Clear
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="tf-trace-console__body"
        role="log"
        aria-live="polite"
        aria-label="Trace event stream"
      >
        {filteredEvents.length === 0 ? (
          <div className="tf-trace-console__empty">
            <p>No trace events.</p>
            {severityFilter && (
              <p>
                <button
                  className="tf-link"
                  onClick={() => setSeverityFilter(undefined)}
                  type="button"
                >
                  Clear filter
                </button>
              </p>
            )}
          </div>
        ) : (
          <ul className="tf-trace-console__list" role="list">
            {filteredEvents.map((event) => (
              <li
                key={event.eventId}
                className={`tf-trace-console__item tf-trace-console__item--${event.severity} ${
                  selectedEventId === event.eventId
                    ? "tf-trace-console__item--selected"
                    : ""
                }`}
                onClick={() => handleSelect(event)}
                role="listitem"
              >
                <span className="tf-trace-console__timestamp">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
                <span className={`tf-badge tf-badge--${event.severity}`}>
                  {event.severity}
                </span>
                <span className="tf-trace-console__actor">{event.actor}</span>
                <span className="tf-trace-console__action">{event.action}</span>
                <span className="tf-trace-console__target">{event.target}</span>
                <span className="tf-trace-console__message">
                  {event.message}
                </span>
                {event.result && (
                  <span
                    className={`tf-badge tf-badge--result-${event.result}`}
                  >
                    {event.result}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tf-trace-console__footer">
        <span className="tf-trace-console__stats">
          {filteredEvents.length.toLocaleString()} events
          {severityFilter && ` · filtered by ${severityFilter}`}
        </span>
      </div>
    </div>
  );
};

TraceConsole.displayName = "TraceConsole";

export default TraceConsole;
