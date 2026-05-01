/**
 * @fileoverview TraceEventAuthority — Authority level badge for events.
 * Shows the authority level that produced or was required by the event.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceEventAuthority
 */

import React from "react";
import type { BaseComponentProps, AuthorityLevel, AuthorityLabel } from "./types";

/** Props for TraceEventAuthority. */
export interface TraceEventAuthorityProps extends BaseComponentProps {
  /** Authority level (0-6). */
  level: AuthorityLevel;
  /** Display variant. */
  variant?: "badge" | "full" | "compact";
}

/** Level-to-label mapping. */
const LEVEL_LABELS: Record<number, AuthorityLabel> = {
  0: "OBSERVE",
  1: "DRAFT",
  2: "STAGE",
  3: "EXECUTE",
  4: "COMMIT",
  5: "OVERRIDE",
  6: "ROOT",
};

/**
 * TraceEventAuthority — Authority level indicator.
 *
 * @example
 * ```tsx
 * <TraceEventAuthority level={3} variant="full" />
 * <TraceEventAuthority level={5} variant="compact" />
 * ```
 */
export const TraceEventAuthority: React.FC<TraceEventAuthorityProps> = ({
  level,
  variant = "badge",
  className = "",
  "data-testid": dataTestId = "trace-event-authority",
}) => {
  const label = LEVEL_LABELS[level] || "UNKNOWN";

  if (variant === "compact") {
    return (
      <span
        className={`tf-trace-event-authority tf-trace-event-authority--compact tf-trace-event-authority--${level} ${className}`}
        data-testid={dataTestId}
        title={`AUTH ${level} · ${label}`}
      >
        AUTH {level}
      </span>
    );
  }

  if (variant === "full") {
    return (
      <div
        className={`tf-trace-event-authority tf-trace-event-authority--${level} ${className}`}
        data-testid={dataTestId}
      >
        <span className="tf-trace-event-authority__shield" aria-hidden="true">
          {"⚡"}
        </span>
        <span className="tf-trace-event-authority__text">
          AUTH {level} &middot; {label}
        </span>
      </div>
    );
  }

  // badge variant
  return (
    <span
      className={`tf-badge tf-badge--auth-${level} ${className}`}
      data-testid={dataTestId}
      title={`AUTH ${level} · ${label}`}
    >
      AUTH {level}
    </span>
  );
};

TraceEventAuthority.displayName = "TraceEventAuthority";

export default TraceEventAuthority;
