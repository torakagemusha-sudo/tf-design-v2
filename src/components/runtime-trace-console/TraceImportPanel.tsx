/**
 * @fileoverview TraceImportPanel — Import trace data panel.
 * Accepts trace files for upload and parsing.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceImportPanel
 */

import React, { useCallback, useState } from "react";
import type { BaseComponentProps, TraceEvent } from "./types";

/** Props for TraceImportPanel. */
export interface TraceImportPanelProps extends BaseComponentProps {
  /** Callback when trace data is imported. */
  onImport: (events: TraceEvent[]) => void;
  /** Callback to close panel. */
  onClose?: () => void;
  /** Whether panel is open. */
  open?: boolean;
  /** Supported formats. */
  supportedFormats?: string[];
}

/**
 * TraceImportPanel — Trace data import UI.
 *
 * @example
 * ```tsx
 * <TraceImportPanel
 *   onImport={(events) => loadTrace(events)}
 *   open={showImport}
 *   onClose={() => setShowImport(false)}
 * />
 * ```
 */
export const TraceImportPanel: React.FC<TraceImportPanelProps> = ({
  onImport,
  onClose,
  open = true,
  supportedFormats = [".json", ".csv", ".ndjson", ".txt"],
  className = "",
  "data-testid": dataTestId = "trace-import-panel",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setError(null);

      const file = e.dataTransfer.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const text = ev.target?.result as string;
          const data = JSON.parse(text);
          const events = Array.isArray(data) ? data : [data];
          onImport(events as TraceEvent[]);
        } catch {
          setError("Failed to parse file. Ensure valid JSON.");
        }
      };
      reader.readAsText(file);
    },
    [onImport]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  if (!open) return null;

  return (
    <div
      className={`tf-trace-import-panel ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-import-panel__header">
        <h4>Import Trace</h4>
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

      <div
        className={`tf-trace-import-panel__dropzone ${
          isDragging ? "tf-trace-import-panel__dropzone--dragging" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <span className="tf-trace-import-panel__icon">
          {"↑"}
        </span>
        <p>Drop trace file here</p>
        <p className="tf-trace-import-panel__formats">
          Supported: {supportedFormats.join(", ")}
        </p>
      </div>

      {error && (
        <div className="tf-trace-import-panel__error">{error}</div>
      )}
    </div>
  );
};

TraceImportPanel.displayName = "TraceImportPanel";

export default TraceImportPanel;
