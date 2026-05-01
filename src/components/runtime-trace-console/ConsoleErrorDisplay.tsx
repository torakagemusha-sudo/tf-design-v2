/**
 * @fileoverview ConsoleErrorDisplay — Formatted error display for console.
 * Shows structured error information with severity and context.
 *
 * @module @torafirma/design-system/runtime-trace-console/ConsoleErrorDisplay
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for ConsoleErrorDisplay. */
export interface ConsoleErrorDisplayProps extends BaseComponentProps {
  /** Error message. */
  message: string;
  /** Error code. */
  code?: string;
  /** Stack trace. */
  stack?: string[];
  /** Context information. */
  context?: Record<string, unknown>;
  /** Whether the error is recoverable. */
  recoverable?: boolean;
  /** Callback to retry. */
  onRetry?: () => void;
  /** Callback to dismiss. */
  onDismiss?: () => void;
}

/**
 * ConsoleErrorDisplay — Structured error display.
 *
 * @example
 * ```tsx
 * <ConsoleErrorDisplay
 *   message="Connection failed"
 *   code="ECONNREFUSED"
 *   stack={["at connect (net.js:...)", "at async run"]}
 *   onRetry={() => retry()}
 * />
 * ```
 */
export const ConsoleErrorDisplay: React.FC<ConsoleErrorDisplayProps> = ({
  message,
  code,
  stack,
  context,
  recoverable = false,
  onRetry,
  onDismiss,
  className = "",
  "data-testid": dataTestId = "console-error-display",
}) => {
  return (
    <div
      className={`tf-console-error-display ${className}`}
      data-testid={dataTestId}
      role="alert"
    >
      <div className="tf-console-error-display__header">
        <span className="tf-console-error-display__icon" aria-hidden="true">
          {"✗"}
        </span>
        <span className="tf-console-error-display__title">Error</span>
        {recoverable && <span className="tf-badge tf-badge--sm">Recoverable</span>}
        {onDismiss && (
          <button
            className="tf-console-error-display__dismiss"
            onClick={onDismiss}
            type="button"
            aria-label="Dismiss"
          >
            {"✕"}
          </button>
        )}
      </div>
      {code && (
        <code className="tf-console-error-display__code">{code}</code>
      )}
      <p className="tf-console-error-display__message">{message}</p>
      {context && Object.keys(context).length > 0 && (
        <dl className="tf-console-error-display__context">
          {Object.entries(context).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{JSON.stringify(value)}</dd>
            </div>
          ))}
        </dl>
      )}
      {stack && stack.length > 0 && (
        <pre className="tf-console-error-display__stack">
          {stack.join("\n")}
        </pre>
      )}
      {onRetry && (
        <button
          className="tf-btn tf-btn--sm tf-btn--primary"
          onClick={onRetry}
          type="button"
        >
          Retry
        </button>
      )}
    </div>
  );
};

ConsoleErrorDisplay.displayName = "ConsoleErrorDisplay";

export default ConsoleErrorDisplay;
