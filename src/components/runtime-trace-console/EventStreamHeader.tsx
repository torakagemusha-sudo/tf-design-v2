/**
 * @fileoverview EventStreamHeader — Header bar for the event stream.
 * Shows stream status, event count, and aggregate severity indicators.
 *
 * @module @torafirma/design-system/runtime-trace-console/EventStreamHeader
 */

import React from "react";
import type { BaseComponentProps, StreamEvent } from "./types";

/** Props for EventStreamHeader. */
export interface EventStreamHeaderProps extends BaseComponentProps {
  /** Stream title. */
  title?: string;
  /** Current events for aggregate stats. */
  events: StreamEvent[];
  /** Whether stream is live. */
  isLive?: boolean;
  /** Children for custom actions. */
  children?: React.ReactNode;
}

/**
 * EventStreamHeader — Header for the event stream panel.
 *
 * Displays stream identity, live status, and per-severity event counts.
 *
 * @example
 * ```tsx
 * <EventStreamHeader
 *   title="Runtime Events"
 *   events={events}
 *   isLive={streaming}
 * />
 * ```
 */
export const EventStreamHeader: React.FC<EventStreamHeaderProps> = ({
  title = "Event Stream",
  events,
  isLive = false,
  children,
  className = "",
  "data-testid": dataTestId = "event-stream-header",
}) => {
  const severityCounts = events.reduce<Record<string, number>>((acc, e) => {
    acc[e.severity] = (acc[e.severity] || 0) + 1;
    return acc;
  }, {});

  return (
    <header
      className={`tf-event-stream-header ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-event-stream-header__left">
        <h3 className="tf-event-stream-header__title">{title}</h3>
        {isLive && (
          <span className="tf-event-stream-header__live">
            <span className="tf-pulse-dot" />
            LIVE
          </span>
        )}
      </div>

      <div className="tf-event-stream-header__counts">
        {Object.entries(severityCounts).map(([severity, count]) => (
          <span
            key={severity}
            className={`tf-event-stream-header__count tf-event-stream-header__count--${severity}`}
          >
            {count} {severity}
          </span>
        ))}
        <span className="tf-event-stream-header__total">
          {events.length.toLocaleString()} total
        </span>
      </div>

      <div className="tf-event-stream-header__actions">{children}</div>
    </header>
  );
};

EventStreamHeader.displayName = "EventStreamHeader";

export default EventStreamHeader;
