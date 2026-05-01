/**
 * @fileoverview TraceWarningHighlight — Warning highlighting in traces.
 * Visually emphasizes warning-level events.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceWarningHighlight
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceWarningHighlight. */
export interface TraceWarningHighlightProps extends BaseComponentProps {
  /** Whether to show warning styling. */
  hasWarning: boolean;
  /** Warning count. */
  count?: number;
  /** Children to wrap. */
  children: React.ReactNode;
  /** Visual variant. */
  variant?: "border" | "background" | "glow";
}

/**
 * TraceWarningHighlight — Warning emphasis wrapper.
 *
 * @example
 * ```tsx
 * <TraceWarningHighlight hasWarning={event.severity === "warn"}>
 *   <TraceEventCard event={event} />
 * </TraceWarningHighlight>
 * ```
 */
export const TraceWarningHighlight: React.FC<TraceWarningHighlightProps> = ({
  hasWarning,
  count,
  children,
  variant = "border",
  className = "",
  "data-testid": dataTestId = "trace-warning-highlight",
}) => {
  if (!hasWarning) return <>{children}</>;

  return (
    <div
      className={`tf-trace-warning-highlight tf-trace-warning-highlight--${variant} ${className}`}
      data-testid={dataTestId}
    >
      {count !== undefined && count > 0 && (
        <span className="tf-trace-warning-highlight__badge">
          {count} warning{count > 1 ? "s" : ""}
        </span>
      )}
      {children}
    </div>
  );
};

TraceWarningHighlight.displayName = "TraceWarningHighlight";

export default TraceWarningHighlight;
