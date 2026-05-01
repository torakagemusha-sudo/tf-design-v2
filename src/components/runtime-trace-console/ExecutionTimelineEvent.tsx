/**
 * @fileoverview ExecutionTimelineEvent — Event marker on the timeline.
 * Visual representation of a single event with type/severity styling.
 *
 * @module @torafirma/design-system/runtime-trace-console/ExecutionTimelineEvent
 */

import React from "react";
import type { BaseComponentProps, TimelineEvent } from "./types";

/** Props for ExecutionTimelineEvent. */
export interface ExecutionTimelineEventProps extends BaseComponentProps {
  /** Event data. */
  event: TimelineEvent;
  /** Horizontal position as percentage (0-100). */
  position: number;
  /** Width in pixels. */
  width?: number;
  /** Whether event is selected. */
  selected?: boolean;
  /** Click handler. */
  onClick?: (event: TimelineEvent) => void;
}

/**
 * ExecutionTimelineEvent — Single event marker on a timeline track.
 *
 * @example
 * ```tsx
 * <ExecutionTimelineEvent
 *   event={event}
 *   position={45.2}
 *   width={12}
 *   onClick={(e) => inspect(e)}
 * />
 * ```
 */
export const ExecutionTimelineEvent: React.FC<ExecutionTimelineEventProps> = ({
  event,
  position,
  width = 8,
  selected = false,
  onClick,
  className = "",
  "data-testid": dataTestId = "execution-timeline-event",
}) => {
  return (
    <div
      className={`tf-execution-timeline-event tf-execution-timeline-event--${event.type} tf-execution-timeline-event--${event.severity} ${
        selected ? "tf-execution-timeline-event--selected" : ""
      } ${className}`}
      data-testid={dataTestId}
      style={{
        left: `${position}%`,
        width: `${Math.max(width, 4)}px`,
      }}
      onClick={() => onClick?.(event)}
      title={`${event.label} (${event.type}, ${event.severity}) @ ${event.timestamp}ms${event.durationMs ? `, duration: ${event.durationMs}ms` : ""}`}
    >
      <span className="tf-execution-timeline-event__label">
        {event.label}
      </span>
      {event.durationMs && event.durationMs > 0 && (
        <div
          className="tf-execution-timeline-event__duration"
          style={{ width: `${Math.max(event.durationMs / 100, 2)}px` }}
        />
      )}
    </div>
  );
};

ExecutionTimelineEvent.displayName = "ExecutionTimelineEvent";

export default ExecutionTimelineEvent;
