/**
 * @fileoverview ExecutionTimelineZoom — Zoom controls for the timeline.
 * Provides zoom in/out, fit-to-view, and zoom level display.
 *
 * @module @torafirma/design-system/runtime-trace-console/ExecutionTimelineZoom
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for ExecutionTimelineZoom. */
export interface ExecutionTimelineZoomProps extends BaseComponentProps {
  /** Current zoom level (1 = 100%). */
  zoom: number;
  /** Minimum zoom. */
  minZoom?: number;
  /** Maximum zoom. */
  maxZoom?: number;
  /** Zoom step. */
  step?: number;
  /** Callback when zoom changes. */
  onZoomChange: (zoom: number) => void;
  /** Callback to fit all events in view. */
  onFit?: () => void;
}

/**
 * ExecutionTimelineZoom — Timeline zoom control bar.
 *
 * @example
 * ```tsx
 * <ExecutionTimelineZoom
 *   zoom={zoom}
 *   minZoom={0.1}
 *   maxZoom={10}
 *   onZoomChange={setZoom}
 *   onFit={() => setZoom(1)}
 * />
 * ```
 */
export const ExecutionTimelineZoom: React.FC<ExecutionTimelineZoomProps> = ({
  zoom,
  minZoom = 0.1,
  maxZoom = 10,
  step = 0.25,
  onZoomChange,
  onFit,
  className = "",
  "data-testid": dataTestId = "execution-timeline-zoom",
}) => {
  const zoomOut = () => onZoomChange(Math.max(minZoom, zoom - step));
  const zoomIn = () => onZoomChange(Math.min(maxZoom, zoom + step));
  const zoomTo = (level: number) => onZoomChange(level);

  return (
    <div
      className={`tf-execution-timeline-zoom ${className}`}
      data-testid={dataTestId}
    >
      <button
        className="tf-btn tf-btn--xs tf-btn--ghost"
        onClick={zoomOut}
        type="button"
        aria-label="Zoom out"
        disabled={zoom <= minZoom}
      >
        {"−"}
      </button>

      <span className="tf-execution-timeline-zoom__value">
        {(zoom * 100).toFixed(0)}%
      </span>

      <button
        className="tf-btn tf-btn--xs tf-btn--ghost"
        onClick={zoomIn}
        type="button"
        aria-label="Zoom in"
        disabled={zoom >= maxZoom}
      >
        {"+"}
      </button>

      <div className="tf-execution-timeline-zoom__presets">
        {[0.5, 1, 2, 5].map((level) => (
          <button
            key={level}
            className={`tf-btn tf-btn--xs ${
              Math.abs(zoom - level) < 0.05
                ? "tf-btn--active"
                : "tf-btn--ghost"
            }`}
            onClick={() => zoomTo(level)}
            type="button"
          >
            {(level * 100).toFixed(0)}%
          </button>
        ))}
        {onFit && (
          <button
            className="tf-btn tf-btn--xs tf-btn--ghost"
            onClick={onFit}
            type="button"
          >
            Fit
          </button>
        )}
      </div>
    </div>
  );
};

ExecutionTimelineZoom.displayName = "ExecutionTimelineZoom";

export default ExecutionTimelineZoom;
