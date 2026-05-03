/**
 * @fileoverview TraceConsoleToolbar — Toolbar for trace console actions.
 * Provides quick access to common trace operations: pause, clear, export, settings.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceConsoleToolbar
 */

import React, { useCallback } from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceConsoleToolbar. */
export interface TraceConsoleToolbarProps extends BaseComponentProps {
  /** Whether streaming is currently active. */
  isStreaming?: boolean;
  /** Whether any events exist. */
  hasEvents?: boolean;
  /** Callback to toggle streaming. */
  onToggleStream?: () => void;
  /** Callback to clear all events. */
  onClear?: () => void;
  /** Callback to export events. */
  onExport?: () => void;
  /** Callback to open settings. */
  onSettings?: () => void;
  /** Callback to search. */
  onSearch?: () => void;
  /** Additional toolbar items. */
  children?: React.ReactNode;
}

/**
 * TraceConsoleToolbar — Action toolbar for the Trace Console.
 *
 * Contains controls for stream management, event clearing, export, and settings.
 *
 * @example
 * ```tsx
 * <TraceConsoleToolbar
 *   isStreaming={true}
 *   hasEvents={true}
 *   onToggleStream={toggle}
 *   onClear={clear}
 *   onExport={exportToJson}
 * />
 * ```
 */
export const TraceConsoleToolbar: React.FC<TraceConsoleToolbarProps> = ({
  isStreaming = false,
  hasEvents = false,
  onToggleStream,
  onClear,
  onExport,
  onSettings,
  onSearch,
  children,
  className = "",
  "data-testid": dataTestId = "trace-console-toolbar",
}) => {
  const handleClear = useCallback(() => {
    if (hasEvents && onClear) {
      onClear();
    }
  }, [hasEvents, onClear]);

  return (
    <div
      className={`tf-trace-console-toolbar ${className}`}
      data-testid={dataTestId}
      role="toolbar"
      aria-label="Trace console actions"
    >
      <div className="tf-trace-console-toolbar__group tf-trace-console-toolbar__group--stream">
        <button
          className={`tf-btn tf-btn--sm ${isStreaming ? "tf-btn--warning" : "tf-btn--primary"}`}
          onClick={onToggleStream}
          type="button"
          aria-label={isStreaming ? "Pause stream" : "Resume stream"}
        >
          <span
            className="tf-icon"
            aria-hidden="true"
          >
            {isStreaming ? "⏸" : "▶"}
          </span>
          {isStreaming ? "Pause" : "Stream"}
        </button>
      </div>

      <div className="tf-trace-console-toolbar__divider" />

      <div className="tf-trace-console-toolbar__group tf-trace-console-toolbar__group--actions">
        <button
          className="tf-btn tf-btn--sm tf-btn--ghost"
          onClick={onSearch}
          type="button"
          aria-label="Search traces"
        >
          <span className="tf-icon" aria-hidden="true">{"⌕"}</span>
          Search
        </button>
        <button
          className="tf-btn tf-btn--sm tf-btn--ghost"
          onClick={handleClear}
          type="button"
          disabled={!hasEvents}
          aria-label="Clear all events"
        >
          <span className="tf-icon" aria-hidden="true">{"✕"}</span>
          Clear
        </button>
        <button
          className="tf-btn tf-btn--sm tf-btn--ghost"
          onClick={onExport}
          type="button"
          disabled={!hasEvents}
          aria-label="Export trace data"
        >
          <span className="tf-icon" aria-hidden="true">{"↓"}</span>
          Export
        </button>
      </div>

      <div className="tf-trace-console-toolbar__divider" />

      <div className="tf-trace-console-toolbar__group tf-trace-console-toolbar__group--config">
        <button
          className="tf-btn tf-btn--sm tf-btn--ghost"
          onClick={onSettings}
          type="button"
          aria-label="Console settings"
        >
          <span className="tf-icon" aria-hidden="true">{"⚙"}</span>
        </button>
      </div>

      {children && (
        <>
          <div className="tf-trace-console-toolbar__divider" />
          <div className="tf-trace-console-toolbar__group tf-trace-console-toolbar__group--custom">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

TraceConsoleToolbar.displayName = "TraceConsoleToolbar";

export default TraceConsoleToolbar;
