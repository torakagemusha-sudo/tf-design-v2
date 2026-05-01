/**
 * @fileoverview ExecutionTimelineTrack — Individual timeline track.
 * Horizontal lane showing events on a named track.
 *
 * @module @torafirma/design-system/runtime-trace-console/ExecutionTimelineTrack
 */

import React from "react";
import type { BaseComponentProps, TimelineEvent, TimelineTrack } from "./types";

/** Props for ExecutionTimelineTrack. */
export interface ExecutionTimelineTrackProps extends BaseComponentProps {
  /** Track data. */
  track: TimelineTrack;
  /** Time-to-pixel conversion function. */
  timeToPx: (time: number) => number;
  /** Callback when an event is clicked. */
  onEventClick?: (event: TimelineEvent) => void;
  /** Callback when the track lane is clicked. */
  onLaneClick?: (timeMs: number) => void;
  /** Whether the track is collapsed. */
  collapsed?: boolean;
}

/**
 * ExecutionTimelineTrack — Single track in the execution timeline.
 *
 * @example
 * ```tsx
 * <ExecutionTimelineTrack
 *   track={track}
 *   timeToPx={(t) => t / 10}
 *   onEventClick={(e) => inspect(e)}
 * />
 * ```
 */
export const ExecutionTimelineTrack: React.FC<ExecutionTimelineTrackProps> = ({
  track,
  timeToPx,
  onEventClick,
  onLaneClick,
  collapsed = false,
  className = "",
  "data-testid": dataTestId = "execution-timeline-track",
}) => {
  const handleLaneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    onLaneClick?.(x);
  };

  return (
    <div
      className={`tf-execution-timeline-track ${collapsed ? "tf-execution-timeline-track--collapsed" : ""} ${className}`}
      data-testid={dataTestId}
    >
      <div
        className="tf-execution-timeline-track__label"
        style={{ borderLeftColor: track.color }}
        title={track.label}
      >
        {track.label}
      </div>
      <div
        className="tf-execution-timeline-track__lane"
        onClick={handleLaneClick}
      >
        {!collapsed &&
          track.events.map((event) => (
            <div
              key={event.id}
              className={`tf-execution-timeline-event tf-execution-timeline-event--${event.type} tf-execution-timeline-event--${event.severity}`}
              style={{
                left: `${timeToPx(event.timestamp)}%`,
                width: event.durationMs
                  ? `${Math.max((event.durationMs / 100), 4)}px`
                  : "8px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick?.(event);
              }}
              title={`${event.label} @ ${event.timestamp}ms`}
            >
              <span className="tf-execution-timeline-event__label">
                {event.label}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

ExecutionTimelineTrack.displayName = "ExecutionTimelineTrack";

export default ExecutionTimelineTrack;
