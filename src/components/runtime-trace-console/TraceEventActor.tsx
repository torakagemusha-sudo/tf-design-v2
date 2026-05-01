/**
 * @fileoverview TraceEventActor — Actor information display.
 * Shows who triggered the event (user, system, AI, service).
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceEventActor
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceEventActor. */
export interface TraceEventActorProps extends BaseComponentProps {
  /** Actor identifier (name, ID, or descriptor). */
  actor: string;
  /** Actor type. */
  actorType?: "user" | "system" | "ai" | "service" | "scheduler" | "unknown";
  /** Optional avatar or icon indicator. */
  icon?: React.ReactNode;
}

/**
 * TraceEventActor — Actor identification display.
 *
 * @example
 * ```tsx
 * <TraceEventActor actor="operator-1" actorType="user" />
 * <TraceEventActor actor="system" actorType="system" />
 * ```
 */
export const TraceEventActor: React.FC<TraceEventActorProps> = ({
  actor,
  actorType = "unknown",
  icon,
  className = "",
  "data-testid": dataTestId = "trace-event-actor",
}) => {
  const typeIcons: Record<string, string> = {
    user: "☺",
    system: "⚙",
    ai: "✦",
    service: "■",
    scheduler: "⏰",
    unknown: "?",
  };

  return (
    <div
      className={`tf-trace-event-actor tf-trace-event-actor--${actorType} ${className}`}
      data-testid={dataTestId}
    >
      <span className="tf-trace-event-actor__icon" aria-hidden="true">
        {icon || typeIcons[actorType]}
      </span>
      <div className="tf-trace-event-actor__info">
        <span className="tf-trace-event-actor__name">{actor}</span>
        <span className="tf-trace-event-actor__type">{actorType}</span>
      </div>
    </div>
  );
};

TraceEventActor.displayName = "TraceEventActor";

export default TraceEventActor;
