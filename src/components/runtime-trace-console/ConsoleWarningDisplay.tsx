/**
 * @fileoverview ConsoleWarningDisplay — Formatted warning display for console.
 * Shows warning messages with acknowledgment option.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ConsoleWarningDisplay
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for ConsoleWarningDisplay. */
export interface ConsoleWarningDisplayProps extends BaseComponentProps {
  /** Warning message. */
  message: string;
  /** Warning code. */
  code?: string;
  /** Whether warning requires acknowledgment. */
  requiresAck?: boolean;
  /** Callback to acknowledge. */
  onAcknowledge?: () => void;
  /** Additional details. */
  details?: string;
}

/**
 * ConsoleWarningDisplay — Structured warning display.
 *
 * @example
 * ```tsx
 * <ConsoleWarningDisplay
 *   message="Deprecated API usage"
 *   code="DEPRECATED_API"
 *   details="Use v2 endpoint instead"
 *   requiresAck
 *   onAcknowledge={() => ack()}
 * />
 * ```
 */
export const ConsoleWarningDisplay: React.FC<ConsoleWarningDisplayProps> = ({
  message,
  code,
  requiresAck = false,
  onAcknowledge,
  details,
  className = "",
  "data-testid": dataTestId = "console-warning-display",
}) => {
  return (
    <div
      className={`tf-console-warning-display ${className}`}
      data-testid={dataTestId}
      role="alert"
    >
      <div className="tf-console-warning-display__header">
        <span className="tf-console-warning-display__icon" aria-hidden="true">
          {"⚠"}
        </span>
        <span className="tf-console-warning-display__title">Warning</span>
        {requiresAck && (
          <span className="tf-badge tf-badge--sm tf-badge--warning">
            Requires Acknowledgment
          </span>
        )}
      </div>
      {code && (
        <code className="tf-console-warning-display__code">{code}</code>
      )}
      <p className="tf-console-warning-display__message">{message}</p>
      {details && (
        <p className="tf-console-warning-display__details">{details}</p>
      )}
      {requiresAck && onAcknowledge && (
        <button
          className="tf-btn tf-btn--sm tf-btn--warning"
          onClick={onAcknowledge}
          type="button"
        >
          Acknowledge
        </button>
      )}
    </div>
  );
};

ConsoleWarningDisplay.displayName = "ConsoleWarningDisplay";

export default ConsoleWarningDisplay;
