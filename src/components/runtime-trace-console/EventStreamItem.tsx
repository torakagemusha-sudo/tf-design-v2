/**
 * @fileoverview EventStreamItem — Single event item in the event stream.
 * Renders one stream event with full detail: timestamp, type, source, message.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/EventStreamItem
 */

import React, { useState } from "react";
import type { BaseComponentProps, StreamEvent } from "./types";

/** Props for EventStreamItem. */
export interface EventStreamItemProps extends BaseComponentProps {
  /** The stream event to render. */
  event: StreamEvent;
  /** Whether to show expanded detail view. */
  expanded?: boolean;
  /** Callback when the item is clicked. */
  onClick?: (event: StreamEvent) => void;
  /** Callback when expand/collapse is toggled. */
  onToggleExpand?: (event: StreamEvent) => void;
}

/**
 * EventStreamItem — Individual event row in the stream.
 *
 * Displays event metadata in a compact row. Expandable to show full payload data.
 *
 * @example
 * ```tsx
 * <EventStreamItem
 *   event={event}
 *   onClick={(e) => console.log("Clicked:", e.id)}
 * />
 * ```
 */
export const EventStreamItem: React.FC<EventStreamItemProps> = ({
  event,
  expanded: expandedProp = false,
  onClick,
  onToggleExpand,
  className = "",
  "data-testid": dataTestId = "event-stream-item",
}) => {
  const [expanded, setExpanded] = useState(expandedProp);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !expanded;
    setExpanded(next);
    onToggleExpand?.(event);
  };

  const hasData = event.data && Object.keys(event.data).length > 0;

  return (
    <div
      className={`tf-event-stream-item tf-event-stream-item--${event.severity} ${className}`}
      data-testid={dataTestId}
      onClick={() => onClick?.(event)}
    >
      <div className="tf-event-stream-item__header">
        {hasData && (
          <button
            className={`tf-event-stream-item__toggle ${expanded ? "tf-event-stream-item__toggle--expanded" : ""}`}
            onClick={handleToggle}
            type="button"
            aria-label={expanded ? "Collapse event data" : "Expand event data"}
            aria-expanded={expanded}
          >
            {expanded ? "▼" : "▶"}
          </button>
        )}
        <time
          className="tf-event-stream-item__timestamp"
          dateTime={event.timestamp}
        >
          {new Date(event.timestamp).toLocaleTimeString()}
        </time>
        <span
          className={`tf-badge tf-badge--${event.severity} tf-badge--sm`}
        >
          {event.severity}
        </span>
        <span className="tf-event-stream-item__type">{event.type}</span>
        <span className="tf-event-stream-item__source">{event.source}</span>
        {event.badge && (
          <EventStreamBadge text={event.badge} severity={event.severity} />
        )}
      </div>
      <p className="tf-event-stream-item__message">{event.message}</p>

      {expanded && hasData && (
        <div className="tf-event-stream-item__detail">
          <pre className="tf-event-stream-item__data">
            {JSON.stringify(event.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

/** Sub-component: Event type badge. */
const EventStreamBadge: React.FC<{ text: string; severity: string }> = ({
  text,
  severity,
}) => (
  <span className={`tf-event-stream-badge tf-event-stream-badge--${severity}`}>
    {text}
  </span>
);

EventStreamItem.displayName = "EventStreamItem";

export default EventStreamItem;
