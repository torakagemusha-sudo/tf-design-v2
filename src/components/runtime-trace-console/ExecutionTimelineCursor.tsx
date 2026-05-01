/**
 * @fileoverview ExecutionTimelineCursor — Playhead cursor on the timeline.
 * Shows current playback/inspection position with draggable interaction.
 *
 * @module @torafirma/design-system/runtime-trace-console/ExecutionTimelineCursor
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for ExecutionTimelineCursor. */
export interface ExecutionTimelineCursorProps extends BaseComponentProps {
  /** Horizontal position as percentage (0-100). */
  position: number;
  /** Timestamp at cursor in ms. */
  timestamp: number;
  /** Whether cursor is being dragged. */
  dragging?: boolean;
}

/**
 * ExecutionTimelineCursor — Timeline playhead cursor.
 *
 * @example
 * ```tsx
 * <ExecutionTimelineCursor
 *   position={42.5}
 *   timestamp={8500}
 * />
 * ```
 */
export const ExecutionTimelineCursor: React.FC<ExecutionTimelineCursorProps> = ({
  position,
  timestamp,
  dragging = false,
  className = "",
  "data-testid": dataTestId = "execution-timeline-cursor",
}) => {
  const formatted =
    timestamp >= 1000
      ? `${(timestamp / 1000).toFixed(2)}s`
      : `${timestamp.toFixed(0)}ms`;

  return (
    <div
      className={`tf-execution-timeline-cursor ${
        dragging ? "tf-execution-timeline-cursor--dragging" : ""
      } ${className}`}
      data-testid={dataTestId}
      style={{ left: `${position}%` }}
    >
      <div className="tf-execution-timeline-cursor__line" />
      <div className="tf-execution-timeline-cursor__head">{formatted}</div>
    </div>
  );
};

ExecutionTimelineCursor.displayName = "ExecutionTimelineCursor";

export default ExecutionTimelineCursor;
