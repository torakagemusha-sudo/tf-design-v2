/**
 * @fileoverview ConsoleDebugDisplay — Formatted debug output display.
 * Shows debug-level messages with expandable detail.
 *
 * @module @torafirma/design-system/runtime-trace-console/ConsoleDebugDisplay
 */

import React, { useState } from "react";
import type { BaseComponentProps } from "./types";

/** Props for ConsoleDebugDisplay. */
export interface ConsoleDebugDisplayProps extends BaseComponentProps {
  /** Debug message. */
  message: string;
  /** Debug data payload. */
  data?: Record<string, unknown>;
  /** Source component. */
  source?: string;
  /** Whether expanded. */
  expanded?: boolean;
}

/**
 * ConsoleDebugDisplay — Debug output with expandable data.
 *
 * @example
 * ```tsx
 * <ConsoleDebugDisplay
 *   message="Variable state"
 *   data={{ count: 5, items: ["a", "b"] }}
 *   source="useCounter"
 * />
 * ```
 */
export const ConsoleDebugDisplay: React.FC<ConsoleDebugDisplayProps> = ({
  message,
  data,
  source,
  expanded: initialExpanded = false,
  className = "",
  "data-testid": dataTestId = "console-debug-display",
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const hasData = data && Object.keys(data).length > 0;

  return (
    <div
      className={`tf-console-debug-display ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-console-debug-display__header">
        <span className="tf-console-debug-display__icon" aria-hidden="true">
          {"ὐ"}
        </span>
        <span className="tf-console-debug-display__label">DEBUG</span>
        {source && (
          <span className="tf-console-debug-display__source">{source}</span>
        )}
        {hasData && (
          <button
            className="tf-console-debug-display__toggle"
            onClick={() => setExpanded(!expanded)}
            type="button"
          >
            {expanded ? "▼" : "▶"}
          </button>
        )}
      </div>
      <p className="tf-console-debug-display__message">{message}</p>
      {expanded && hasData && (
        <pre className="tf-console-debug-display__data">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

ConsoleDebugDisplay.displayName = "ConsoleDebugDisplay";

export default ConsoleDebugDisplay;
