/**
 * @fileoverview EventStreamBadge — Event type badge with severity-based coloring.
 * Small inline badge for labeling event categories in the stream.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/EventStreamBadge
 */

import React from "react";
import type { BaseComponentProps, EventSeverity } from "./types";

/** Props for EventStreamBadge. */
export interface EventStreamBadgeProps extends BaseComponentProps {
  /** Badge display text. */
  text: string;
  /** Severity level for color coding. */
  severity?: EventSeverity;
  /** Visual variant. */
  variant?: "filled" | "outline" | "subtle";
  /** Click handler. */
  onClick?: () => void;
}

/**
 * EventStreamBadge — Small severity-coded badge for event categorization.
 *
 * @example
 * ```tsx
 * <EventStreamBadge text="HTTP" severity="info" variant="subtle" />
 * <EventStreamBadge text="DB" severity="warn" variant="filled" />
 * ```
 */
export const EventStreamBadge: React.FC<EventStreamBadgeProps> = ({
  text,
  severity = "info",
  variant = "subtle",
  onClick,
  className = "",
  "data-testid": dataTestId = "event-stream-badge",
}) => {
  return (
    <span
      className={`tf-event-stream-badge tf-event-stream-badge--${severity} tf-event-stream-badge--${variant} ${
        onClick ? "tf-event-stream-badge--clickable" : ""
      } ${className}`}
      data-testid={dataTestId}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {text}
    </span>
  );
};

EventStreamBadge.displayName = "EventStreamBadge";

export default EventStreamBadge;
