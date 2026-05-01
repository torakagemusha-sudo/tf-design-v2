/**
 * @fileoverview TraceConsoleHeader — Console header with controls for the Trace Console.
 * Displays title, state badge, live indicator, and global console actions.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceConsoleHeader
 */

import React from "react";
import type { BaseComponentProps, ProductState } from "./types";

/** Props for TraceConsoleHeader. */
export interface TraceConsoleHeaderProps extends BaseComponentProps {
  /** Console title text. */
  title?: string;
  /** Current product state. */
  productState?: ProductState;
  /** Whether live streaming is active. */
  isStreaming?: boolean;
  /** Event count summary. */
  eventCounts?: Record<string, number>;
  /** Available actions rendered as toolbar buttons. */
  children?: React.ReactNode;
}

/**
 * TraceConsoleHeader — Header bar for the Trace Console.
 *
 * Provides context about the current trace session, including product state,
 * streaming status, and event severity distribution.
 *
 * @example
 * ```tsx
 * <TraceConsoleHeader
 *   title="Execution Trace"
 *   productState="RUNNING"
 *   isStreaming={true}
 *   eventCounts={{ info: 42, warn: 3, error: 1 }}
 * >
 *   <button>Export</button>
 * </TraceConsoleHeader>
 * ```
 */
export const TraceConsoleHeader: React.FC<TraceConsoleHeaderProps> = ({
  title = "Trace Console",
  productState = "IDLE",
  isStreaming = false,
  eventCounts,
  children,
  className = "",
  "data-testid": dataTestId = "trace-console-header",
}) => {
  const totalEvents = eventCounts
    ? Object.values(eventCounts).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <header
      className={`tf-trace-console-header ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-console-header__left">
        <h2 className="tf-trace-console-header__title">{title}</h2>
        <span
          className={`tf-badge tf-badge--state-${productState.toLowerCase()}`}
        >
          {productState}
        </span>
        {isStreaming && (
          <span className="tf-trace-console-header__live-badge">
            <span className="tf-pulse-dot" />
            LIVE
          </span>
        )}
      </div>

      <div className="tf-trace-console-header__counts">
        <span className="tf-trace-console-header__total">
          {totalEvents.toLocaleString()} events
        </span>
        {eventCounts &&
          Object.entries(eventCounts).map(([severity, count]) => (
            <span
              key={severity}
              className={`tf-trace-console-header__count tf-trace-console-header__count--${severity}`}
            >
              <span className="tf-trace-console-header__count-dot" />
              {count} {severity}
            </span>
          ))}
      </div>

      <div className="tf-trace-console-header__actions">{children}</div>
    </header>
  );
};

TraceConsoleHeader.displayName = "TraceConsoleHeader";

export default TraceConsoleHeader;
