/**
 * @fileoverview EventStream — Real-time event stream display.
 * Renders a scrolling feed of live events with severity-based styling.
 *
 * @module @torafirma/design-system/runtime-trace-console/EventStream
 */

import React, { useEffect, useRef } from "react";
import type { BaseComponentProps, StreamEvent } from "./types";

/** Props for EventStream. */
export interface EventStreamProps extends BaseComponentProps {
  /** Array of stream events. */
  events: StreamEvent[];
  /** Whether new events are being streamed live. */
  isLive?: boolean;
  /** Max events to keep in DOM. */
  maxEvents?: number;
  /** Callback when an event is clicked. */
  onEventClick?: (event: StreamEvent) => void;
  /** Whether to auto-scroll to bottom. */
  autoScroll?: boolean;
  /** Empty state message. */
  emptyMessage?: string;
}

/**
 * EventStream — Real-time event stream panel.
 *
 * Displays events in a vertically scrolling feed with automatic scrolling
 * during live streaming. Events are styled by severity.
 *
 * @example
 * ```tsx
 * <EventStream
 *   events={streamEvents}
 *   isLive={true}
 *   onEventClick={(e) => inspectEvent(e)}
 * />
 * ```
 */
export const EventStream: React.FC<EventStreamProps> = ({
  events,
  isLive = false,
  maxEvents = 5000,
  onEventClick,
  autoScroll = true,
  emptyMessage = "Waiting for events...",
  className = "",
  "data-testid": dataTestId = "event-stream",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new events
  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [events, autoScroll]);

  const visibleEvents = events.length > maxEvents
    ? events.slice(events.length - maxEvents)
    : events;

  return (
    <div
      className={`tf-event-stream ${isLive ? "tf-event-stream--live" : ""} ${className}`}
      data-testid={dataTestId}
    >
      {isLive && (
        <div className="tf-event-stream__live-bar">
          <span className="tf-pulse-dot" />
          <span className="tf-event-stream__live-label">Live stream</span>
          <span className="tf-event-stream__live-count">
            {events.length.toLocaleString()} events
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        className="tf-event-stream__scroll"
        role="log"
        aria-live="polite"
      >
        {visibleEvents.length === 0 ? (
          <div className="tf-event-stream__empty">
            <span className="tf-event-stream__empty-icon" aria-hidden="true">
              {"○"}
            </span>
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <ul className="tf-event-stream__list" role="list">
            {visibleEvents.map((event) => (
              <li
                key={event.id}
                className={`tf-event-stream__item tf-event-stream__item--${event.severity}`}
                onClick={() => onEventClick?.(event)}
                role="listitem"
              >
                <EventStreamItem event={event} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/** Inline item renderer for EventStream. */
const EventStreamItem: React.FC<{ event: StreamEvent }> = ({ event }) => (
  <div className="tf-event-stream__row">
    <time className="tf-event-stream__time" dateTime={event.timestamp}>
      {new Date(event.timestamp).toLocaleTimeString()}
    </time>
    <span className={`tf-badge tf-badge--${event.severity}`}>
      {event.severity}
    </span>
    <span className="tf-event-stream__source">{event.source}</span>
    {event.badge && (
      <span className="tf-event-stream__badge">{event.badge}</span>
    )}
    <span className="tf-event-stream__message">{event.message}</span>
  </div>
);

EventStream.displayName = "EventStream";

export default EventStream;
