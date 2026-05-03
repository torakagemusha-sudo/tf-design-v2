/**
 * @fileoverview ExecutionTimeline — Timeline visualization of execution events.
 * Multi-track timeline with zoom, cursor, and event markers.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ExecutionTimeline
 */

import React, { useCallback, useMemo, useState } from "react";
import type { BaseComponentProps, TimelineEvent, TimelineTrack } from "./types";

/** Props for ExecutionTimeline. */
export interface ExecutionTimelineProps extends BaseComponentProps {
  /** Timeline tracks. */
  tracks: TimelineTrack[];
  /** Total time range in ms. */
  durationMs: number;
  /** Current cursor position in ms. */
  cursorPosition?: number;
  /** Selected time range. */
  selectionRange?: [number, number];
  /** Callback when cursor position changes. */
  onCursorMove?: (position: number) => void;
  /** Callback when selection changes. */
  onSelectionChange?: (range: [number, number] | undefined) => void;
  /** Callback when an event is clicked. */
  onEventClick?: (event: TimelineEvent) => void;
  /** Zoom range (0.1 = 10%, 1 = 100%). */
  zoom?: number;
  /** Callback when zoom changes. */
  onZoomChange?: (zoom: number) => void;
}

/**
 * ExecutionTimeline — Multi-track execution timeline.
 *
 * Visualizes execution flow across multiple tracks with zoom, cursor,
 * and event selection. Follows Torafirma state transition discipline.
 *
 * @example
 * ```tsx
 * <ExecutionTimeline
 *   tracks={timelineTracks}
 *   durationMs={15000}
 *   cursorPosition={currentTime}
 *   onCursorMove={setCurrentTime}
 *   onEventClick={inspectEvent}
 * />
 * ```
 */
export const ExecutionTimeline: React.FC<ExecutionTimelineProps> = ({
  tracks,
  durationMs,
  cursorPosition = 0,
  selectionRange,
  onCursorMove,
  onSelectionChange,
  onEventClick,
  zoom = 1,
  onZoomChange,
  className = "",
  "data-testid": dataTestId = "execution-timeline",
}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectStart, setSelectStart] = useState<number | null>(null);

  const visibleDuration = durationMs / zoom;
  const startTime = Math.max(0, cursorPosition - visibleDuration / 2);
  const endTime = Math.min(durationMs, startTime + visibleDuration);

  const timeToPx = useCallback(
    (t: number) => ((t - startTime) / visibleDuration) * 100,
    [startTime, visibleDuration]
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const time = startTime + x * visibleDuration;
      onCursorMove?.(Math.max(0, Math.min(durationMs, time)));
    },
    [startTime, visibleDuration, durationMs, onCursorMove]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsSelecting(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      setSelectStart(startTime + x * visibleDuration);
    },
    [startTime, visibleDuration]
  );

  const handleMouseUp = useCallback(() => {
    if (isSelecting && selectStart !== null && cursorPosition !== undefined) {
      const minT = Math.min(selectStart, cursorPosition);
      const maxT = Math.max(selectStart, cursorPosition);
      if (maxT - minT > 10) {
        onSelectionChange?.([minT, maxT]);
      }
    }
    setIsSelecting(false);
    setSelectStart(null);
  }, [isSelecting, selectStart, cursorPosition, onSelectionChange]);

  // Ruler ticks
  const ticks = useMemo(() => {
    const count = 10;
    const result: { time: number; label: string }[] = [];
    for (let i = 0; i <= count; i++) {
      const t = startTime + (i / count) * visibleDuration;
      result.push({
        time: t,
        label: `${(t / 1000).toFixed(1)}s`,
      });
    }
    return result;
  }, [startTime, visibleDuration]);

  return (
    <div
      className={`tf-execution-timeline ${className}`}
      data-testid={dataTestId}
      onMouseUp={handleMouseUp}
    >
      {/* Controls */}
      <ExecutionTimelineZoom zoom={zoom} onZoomChange={onZoomChange} />

      {/* Ruler */}
      <ExecutionTimelineRuler
        ticks={ticks}
        timeToPx={timeToPx}
        onTrackClick={handleTrackClick}
      />

      {/* Cursor */}
      <ExecutionTimelineCursor
        position={timeToPx(cursorPosition)}
        timestamp={cursorPosition}
      />

      {/* Selection */}
      {selectionRange && (
        <ExecutionTimelineSelection
          start={timeToPx(selectionRange[0])}
          end={timeToPx(selectionRange[1])}
          onClear={() => onSelectionChange?.(undefined)}
        />
      )}

      {/* Tracks */}
      <div className="tf-execution-timeline__tracks">
        {tracks.map((track) => (
          <ExecutionTimelineTrack
            key={track.id}
            track={track}
            timeToPx={timeToPx}
            onEventClick={onEventClick}
            onTrackClick={handleTrackClick}
            onMouseDown={handleMouseDown}
          />
        ))}
      </div>
    </div>
  );
};

/** Inline sub-components. */
const ExecutionTimelineTrack: React.FC<{
  track: TimelineTrack;
  timeToPx: (t: number) => number;
  onEventClick?: (event: TimelineEvent) => void;
  onTrackClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}> = ({ track, timeToPx, onEventClick, onTrackClick, onMouseDown }) => (
  <div
    className="tf-execution-timeline-track"
    style={{ borderLeftColor: track.color }}
  >
    <div className="tf-execution-timeline-track__label">{track.label}</div>
    <div
      className="tf-execution-timeline-track__lane"
      onClick={onTrackClick}
      onMouseDown={onMouseDown}
    >
      {track.events.map((event) => (
        <ExecutionTimelineEvent
          key={event.id}
          event={event}
          left={timeToPx(event.timestamp)}
          width={
            event.durationMs
              ? (event.durationMs / 1000) * 10
              : 8
          }
          onClick={() => onEventClick?.(event)}
        />
      ))}
    </div>
  </div>
);

const ExecutionTimelineEvent: React.FC<{
  event: TimelineEvent;
  left: number;
  width: number;
  onClick?: () => void;
}> = ({ event, left, width, onClick }) => (
  <div
    className={`tf-execution-timeline-event tf-execution-timeline-event--${event.type} tf-execution-timeline-event--${event.severity}`}
    style={{ left: `${left}%`, width: `${Math.max(width, 6)}px` }}
    onClick={onClick}
    title={`${event.label} (${event.type})`}
  >
    <span className="tf-execution-timeline-event__label">{event.label}</span>
  </div>
);

const ExecutionTimelineRuler: React.FC<{
  ticks: { time: number; label: string }[];
  timeToPx: (t: number) => number;
  onTrackClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ ticks, timeToPx }) => (
  <div className="tf-execution-timeline-ruler">
    {ticks.map((tick, i) => (
      <div
        key={i}
        className="tf-execution-timeline-ruler__tick"
        style={{ left: `${timeToPx(tick.time)}%` }}
      >
        <div className="tf-execution-timeline-ruler__tick-line" />
        <span className="tf-execution-timeline-ruler__tick-label">
          {tick.label}
        </span>
      </div>
    ))}
  </div>
);

const ExecutionTimelineZoom: React.FC<{
  zoom: number;
  onZoomChange?: (zoom: number) => void;
}> = ({ zoom, onZoomChange }) => (
  <div className="tf-execution-timeline-zoom">
    <button
      className="tf-btn tf-btn--xs tf-btn--ghost"
      onClick={() => onZoomChange?.(Math.max(0.1, zoom - 0.1))}
      type="button"
      aria-label="Zoom out"
    >
      {"−"}
    </button>
    <span className="tf-execution-timeline-zoom__value">
      {(zoom * 100).toFixed(0)}%
    </span>
    <button
      className="tf-btn tf-btn--xs tf-btn--ghost"
      onClick={() => onZoomChange?.(Math.min(10, zoom + 0.1))}
      type="button"
      aria-label="Zoom in"
    >
      {"+"}
    </button>
  </div>
);

const ExecutionTimelineCursor: React.FC<{
  position: number;
  timestamp: number;
}> = ({ position, timestamp }) => (
  <div
    className="tf-execution-timeline-cursor"
    style={{ left: `${position}%` }}
  >
    <div className="tf-execution-timeline-cursor__line" />
    <div className="tf-execution-timeline-cursor__head">
      {(timestamp / 1000).toFixed(2)}s
    </div>
  </div>
);

const ExecutionTimelineSelection: React.FC<{
  start: number;
  end: number;
  onClear?: () => void;
}> = ({ start, end, onClear }) => (
  <div
    className="tf-execution-timeline-selection"
    style={{
      left: `${Math.min(start, end)}%`,
      width: `${Math.abs(end - start)}%`,
    }}
  >
    <button
      className="tf-execution-timeline-selection__clear"
      onClick={onClear}
      type="button"
      aria-label="Clear selection"
    >
      {"✕"}
    </button>
  </div>
);

ExecutionTimeline.displayName = "ExecutionTimeline";

export default ExecutionTimeline;
