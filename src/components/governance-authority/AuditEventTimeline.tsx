/**
 * @fileoverview AuditEventTimeline — Timeline view of events.
 *
 * Groups audit events by date and renders them on a vertical timeline
 * with severity-colored indicators.
 */

import React, { useMemo } from "react";
import { AuditEvent, AuditEventTimelineGroup } from "./types";
import { GovernanceComponentBaseProps } from "./types";

export interface AuditEventTimelineProps extends GovernanceComponentBaseProps {
  events: AuditEvent[];
  onSelect?: (event: AuditEvent) => void;
}

/**
 * AuditEventTimeline renders a vertical timeline of grouped audit events.
 */
const AuditEventTimeline: React.FC<AuditEventTimelineProps> = ({
  events,
  onSelect,
  className = "",
  "data-testid": dataTestId = "audit-event-timeline",
}) => {
  const groups = useMemo<AuditEventTimelineGroup[]>(() => {
    const byDate: Record<string, AuditEvent[]> = {};
    events.forEach((ev) => {
      const date = ev.timestamp.split("T")[0];
      if (!byDate[date]) byDate[date] = [];
      byDate[date].push(ev);
    });
    return Object.entries(byDate)
      .map(([date, evs]) => ({ date, events: evs }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [events]);

  return (
    <div
      className={`tf-audit-event-timeline ${className}`.trim()}
      data-testid={dataTestId}
    >
      {groups.map((group) => (
        <div key={group.date} className="tf-audit-timeline-group">
          <div className="tf-audit-timeline-group__marker" />
          <time className="tf-audit-timeline-group__date">{group.date}</time>
          <ul className="tf-audit-timeline-group__events">
            {group.events.map((ev) => (
              <li
                key={ev.id}
                className={`tf-audit-timeline-event tf-audit-timeline-event--${ev.severity}`}
                onClick={() => onSelect?.(ev)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSelect?.(ev)}
              >
                <span className="tf-audit-timeline-event__dot" />
                <time className="tf-audit-timeline-event__time">
                  {ev.timestamp.split("T")[1]?.slice(0, 8) ?? ""}
                </time>
                <span className="tf-audit-timeline-event__actor">{ev.actor}</span>
                <span className="tf-audit-timeline-event__action">{ev.action}</span>
                <span className="tf-audit-timeline-event__message">{ev.message}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

AuditEventTimeline.displayName = "AuditEventTimeline";

export default AuditEventTimeline;
