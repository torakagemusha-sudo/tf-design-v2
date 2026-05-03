/**
 * @fileoverview TraceEventHeader — Compact event header for trace cards.
 * Shows severity, action, target, and timestamp in a single line.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceEventHeader
 */

import React from "react";
import type { BaseComponentProps, TraceEvent } from "./types";

/** Props for TraceEventHeader. */
export interface TraceEventHeaderProps extends BaseComponentProps {
  /** Event data. */
  event: TraceEvent;
  /** Callback to close/dismiss. */
  onClose?: () => void;
  /** Callback to bookmark. */
  onBookmark?: (eventId: string) => void;
  /** Whether event is bookmarked. */
  bookmarked?: boolean;
}

/**
 * TraceEventHeader — Compact trace event header row.
 *
 * @example
 * ```tsx
 * <TraceEventHeader event={event} onClose={() => setSelected(null)} />
 * ```
 */
export const TraceEventHeader: React.FC<TraceEventHeaderProps> = ({
  event,
  onClose,
  onBookmark,
  bookmarked = false,
  className = "",
  "data-testid": dataTestId = "trace-event-header",
}) => {
  return (
    <div
      className={`tf-trace-event-header tf-trace-event-header--${event.severity} ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-event-header__left">
        <span className={`tf-badge tf-badge--${event.severity}`}>
          {event.severity}
        </span>
        <span className="tf-trace-event-header__action">{event.action}</span>
        <span
          className="tf-trace-event-header__target"
          title={event.target}
        >
          {event.target}
        </span>
        {event.result && (
          <span className={`tf-badge tf-badge--result-${event.result}`}>
            {event.result}
          </span>
        )}
      </div>
      <div className="tf-trace-event-header__right">
        <time
          className="tf-trace-event-header__timestamp"
          dateTime={event.timestamp}
        >
          {new Date(event.timestamp).toLocaleTimeString()}
        </time>
        <span
          className="tf-trace-event-header__id"
          title={event.eventId}
        >
          {event.eventId.slice(0, 8)}
        </span>
        {onBookmark && (
          <button
            className={`tf-btn tf-btn--xs tf-btn--ghost ${bookmarked ? "tf-btn--active" : ""}`}
            onClick={() => onBookmark(event.eventId)}
            type="button"
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark event"}
          >
            {bookmarked ? "★" : "☆"}
          </button>
        )}
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
};

TraceEventHeader.displayName = "TraceEventHeader";

export default TraceEventHeader;
