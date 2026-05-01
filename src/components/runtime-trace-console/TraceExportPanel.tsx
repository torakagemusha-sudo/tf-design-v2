/**
 * @fileoverview TraceExportPanel — Export options panel for traces.
 * Configures export format, filters, and destination.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceExportPanel
 */

import React, { useState } from "react";
import type { BaseComponentProps, TraceEvent, TraceSpan } from "./types";

/** Export format type. */
export type TraceExportFormat = "json" | "csv" | "ndjson" | "txt" | "html";

/** Props for TraceExportPanel. */
export interface TraceExportPanelProps extends BaseComponentProps {
  /** Events to export. */
  events: TraceEvent[];
  /** Spans to export (optional). */
  spans?: TraceSpan[];
  /** Callback when export is triggered. */
  onExport: (format: TraceExportFormat, filters: TraceExportFilters) => void;
  /** Callback to close panel. */
  onClose?: () => void;
  /** Whether panel is open. */
  open?: boolean;
}

/** Export filters. */
export interface TraceExportFilters {
  startTime?: string;
  endTime?: string;
  severity?: string[];
  actions?: string[];
  services?: string[];
}

/**
 * TraceExportPanel — Trace data export configuration.
 *
 * @example
 * ```tsx
 * <TraceExportPanel
 *   events={events}
 *   onExport={(fmt, filters) => exportTrace(fmt, filters)}
 *   open={showExport}
 *   onClose={() => setShowExport(false)}
 * />
 * ```
 */
export const TraceExportPanel: React.FC<TraceExportPanelProps> = ({
  events,
  spans,
  onExport,
  onClose,
  open = true,
  className = "",
  "data-testid": dataTestId = "trace-export-panel",
}) => {
  const [format, setFormat] = useState<TraceExportFormat>("json");
  const [filters, setFilters] = useState<TraceExportFilters>({});

  if (!open) return null;

  const eventCount = events.length;
  const spanCount = spans?.length || 0;

  return (
    <div
      className={`tf-trace-export-panel ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-export-panel__header">
        <h4>Export Trace</h4>
        {onClose && (
          <button
            className="tf-btn tf-btn--xs tf-btn--ghost"
            onClick={onClose}
            type="button"
          >
            {"✕"}
          </button>
        )}
      </div>

      <div className="tf-trace-export-panel__info">
        <span>{eventCount.toLocaleString()} events</span>
        {spanCount > 0 && (
          <span>{spanCount.toLocaleString()} spans</span>
        )}
      </div>

      <div className="tf-trace-export-panel__format">
        <span className="tf-trace-export-panel__label">Format</span>
        <div className="tf-trace-export-panel__format-options">
          {(["json", "csv", "ndjson", "txt", "html"] as TraceExportFormat[]).map(
            (f) => (
              <label
                key={f}
                className={`tf-trace-export-panel__format-option ${
                  format === f
                    ? "tf-trace-export-panel__format-option--selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="export-format"
                  value={f}
                  checked={format === f}
                  onChange={() => setFormat(f)}
                />
                {f.toUpperCase()}
              </label>
            )
          )}
        </div>
      </div>

      <div className="tf-trace-export-panel__footer">
        <button
          className="tf-btn tf-btn--primary"
          onClick={() => onExport(format, filters)}
          type="button"
        >
          Export as {format.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

TraceExportPanel.displayName = "TraceExportPanel";

export default TraceExportPanel;
