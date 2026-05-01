/**
 * @fileoverview ConsoleInfoDisplay — Formatted info display for console.
 * Shows informational messages and status updates.
 *
 * @module @torafirma/design-system/runtime-trace-console/ConsoleInfoDisplay
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for ConsoleInfoDisplay. */
export interface ConsoleInfoDisplayProps extends BaseComponentProps {
  /** Info message. */
  message: string;
  /** Info title/heading. */
  title?: string;
  /** Additional detail text. */
  detail?: string;
  /** Timestamp. */
  timestamp?: string;
  /** Whether to show an icon. */
  showIcon?: boolean;
}

/**
 * ConsoleInfoDisplay — Structured info message display.
 *
 * @example
 * ```tsx
 * <ConsoleInfoDisplay
 *   title="Deployment Complete"
 *   message="Version 2.1.0 deployed to production"
 *   timestamp="2024-01-15T10:30:00Z"
 * />
 * ```
 */
export const ConsoleInfoDisplay: React.FC<ConsoleInfoDisplayProps> = ({
  message,
  title,
  detail,
  timestamp,
  showIcon = true,
  className = "",
  "data-testid": dataTestId = "console-info-display",
}) => {
  return (
    <div
      className={`tf-console-info-display ${className}`}
      data-testid={dataTestId}
      role="status"
    >
      <div className="tf-console-info-display__header">
        {showIcon && (
          <span className="tf-console-info-display__icon" aria-hidden="true">
            {"ℹ"}
          </span>
        )}
        {title && (
          <span className="tf-console-info-display__title">{title}</span>
        )}
        {timestamp && (
          <time className="tf-console-info-display__time" dateTime={timestamp}>
            {new Date(timestamp).toLocaleTimeString()}
          </time>
        )}
      </div>
      <p className="tf-console-info-display__message">{message}</p>
      {detail && <p className="tf-console-info-display__detail">{detail}</p>}
    </div>
  );
};

ConsoleInfoDisplay.displayName = "ConsoleInfoDisplay";

export default ConsoleInfoDisplay;
