/**
 * @fileoverview TraceConsoleExport — Export trace data in various formats.
 * Supports JSON, CSV, and structured log export with selectable event ranges.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceConsoleExport
 */

import React, { useCallback, useState } from "react";
import type { BaseComponentProps, TraceEvent } from "./types";

/** Supported export formats. */
export type ExportFormat = "json" | "csv" | "ndjson" | "txt";

/** Props for TraceConsoleExport. */
export interface TraceConsoleExportProps extends BaseComponentProps {
  /** Events to export. */
  events: TraceEvent[];
  /** Callback when export is triggered. */
  onExport?: (events: TraceEvent[], format: ExportFormat) => void;
  /** Callback when export panel is closed. */
  onClose?: () => void;
  /** Whether the export panel is visible. */
  open?: boolean;
}

/**
 * TraceConsoleExport — Export panel for trace data.
 *
 * Allows selecting export format and previewing the export payload.
 * Follows Torafirma data portability principles.
 *
 * @example
 * ```tsx
 * <TraceConsoleExport
 *   events={traceEvents}
 *   open={exportOpen}
 *   onExport={(events, fmt) => download(events, fmt)}
 *   onClose={() => setExportOpen(false)}
 * />
 * ```
 */
export const TraceConsoleExport: React.FC<TraceConsoleExportProps> = ({
  events,
  onExport,
  onClose,
  open = false,
  className = "",
  "data-testid": dataTestId = "trace-console-export",
}) => {
  const [format, setFormat] = useState<ExportFormat>("json");

  const handleExport = useCallback(() => {
    onExport?.(events, format);
  }, [events, format, onExport]);

  const previewCount = Math.min(events.length, 5);

  if (!open) return null;

  return (
    <div
      className={`tf-trace-console-export ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-console-export__header">
        <h3 className="tf-trace-console-export__title">Export Trace Data</h3>
        <button
          className="tf-btn tf-btn--sm tf-btn--ghost"
          onClick={onClose}
          type="button"
          aria-label="Close export panel"
        >
          {"✕"}
        </button>
      </div>

      <div className="tf-trace-console-export__body">
        <div className="tf-trace-console-export__info">
          <span className="tf-trace-console-export__count">
            {events.length.toLocaleString()} events available for export
          </span>
        </div>

        <div className="tf-trace-console-export__format">
          <span className="tf-trace-console-export__format-label">Format</span>
          <div className="tf-trace-console-export__format-options" role="radiogroup" aria-label="Export format">
            {(["json", "csv", "ndjson", "txt"] as ExportFormat[]).map((fmt) => (
              <label
                key={fmt}
                className={`tf-trace-console-export__format-option ${
                  format === fmt ? "tf-trace-console-export__format-option--selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="export-format"
                  value={fmt}
                  checked={format === fmt}
                  onChange={() => setFormat(fmt)}
                />
                <span className="tf-trace-console-export__format-name">
                  {fmt.toUpperCase()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {events.length > 0 && (
          <div className="tf-trace-console-export__preview">
            <span className="tf-trace-console-export__preview-label">
              Preview (first {previewCount})
            </span>
            <pre className="tf-trace-console-export__preview-code">
              {format === "json" &&
                JSON.stringify(events.slice(0, previewCount), null, 2)}
              {format === "ndjson" &&
                events
                  .slice(0, previewCount)
                  .map((e) => JSON.stringify(e))
                  .join("\n")}
              {format === "csv" &&
                `timestamp,severity,actor,action,target,message\n` +
                  events
                    .slice(0, previewCount)
                    .map(
                      (e) =>
                        `${e.timestamp},${e.severity},${e.actor},${e.action},${e.target},"${e.message}"`
                    )
                    .join("\n")}
              {format === "txt" &&
                events
                  .slice(0, previewCount)
                  .map(
                    (e) =>
                      `[${e.timestamp}] ${e.severity.toUpperCase()} ${e.actor} ${e.action} ${e.target}: ${e.message}`
                  )
                  .join("\n")}
            </pre>
          </div>
        )}
      </div>

      <div className="tf-trace-console-export__footer">
        <button
          className="tf-btn tf-btn--primary"
          onClick={handleExport}
          type="button"
          disabled={events.length === 0}
        >
          Export {events.length.toLocaleString()} events as {format.toUpperCase()}
        </button>
        <button
          className="tf-btn tf-btn--ghost"
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

TraceConsoleExport.displayName = "TraceConsoleExport";

export default TraceConsoleExport;
