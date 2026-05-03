/**
 * @fileoverview TraceErrorHighlight — Error highlighting in traces.
 * Visually emphasizes error and fatal events in trace displays.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceErrorHighlight
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceErrorHighlight. */
export interface TraceErrorHighlightProps extends BaseComponentProps {
  /** Whether the highlighted area has an error. */
  hasError: boolean;
  /** Error count. */
  count?: number;
  /** Children to wrap. */
  children: React.ReactNode;
  /** Visual variant. */
  variant?: "border" | "background" | "glow";
}

/**
 * TraceErrorHighlight — Error emphasis wrapper.
 *
 * @example
 * ```tsx
 * <TraceErrorHighlight hasError={event.severity === "error"} count={2}>
 *   <TraceEventCard event={event} />
 * </TraceErrorHighlight>
 * ```
 */
export const TraceErrorHighlight: React.FC<TraceErrorHighlightProps> = ({
  hasError,
  count,
  children,
  variant = "border",
  className = "",
  "data-testid": dataTestId = "trace-error-highlight",
}) => {
  if (!hasError) return <>{children}</>;

  return (
    <div
      className={`tf-trace-error-highlight tf-trace-error-highlight--${variant} ${className}`}
      data-testid={dataTestId}
    >
      {count !== undefined && count > 0 && (
        <span className="tf-trace-error-highlight__badge">
          {count} error{count > 1 ? "s" : ""}
        </span>
      )}
      {children}
    </div>
  );
};

TraceErrorHighlight.displayName = "TraceErrorHighlight";

export default TraceErrorHighlight;
