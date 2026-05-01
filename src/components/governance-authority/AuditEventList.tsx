/**
 * @fileoverview AuditEventList — List of audit events.
 *
 * Displays a scrollable, filterable list of audit events with
 * severity indicators, actor info, and timestamps. Supports
 * searching, filtering, and selecting events for detail view.
 *
 * Torafirma Governance Component — Authority Gold / Dark Theme
 */

import React, { useState, useMemo } from "react";
import {
  AuditEvent,
  AuditEventFilter,
  AuditEventCategory,
  AuditEventSeverity,
} from "./types";
import { GovernanceComponentBaseProps } from "./types";
import AuditEventItem from "./AuditEventItem";
import AuditEventFilterComp from "./AuditEventFilter";
import AuditEventSearch from "./AuditEventSearch";
import AuditEventDetail from "./AuditEventDetail";

export interface AuditEventListProps extends GovernanceComponentBaseProps {
  events: AuditEvent[];
  onExport?: () => void;
}

/**
 * AuditEventList renders a complete filterable audit event list.
 */
const AuditEventList: React.FC<AuditEventListProps> = ({
  events,
  onExport,
  className = "",
  "data-testid": dataTestId = "audit-event-list",
}) => {
  const [filter, setFilter] = useState<AuditEventFilter>({
    categories: [],
    severities: [],
    actors: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const filtered = useMemo(() => {
    return events.filter((ev) => {
      if (filter.categories.length > 0 && !filter.categories.includes(ev.category)) return false;
      if (filter.severities.length > 0 && !filter.severities.includes(ev.severity)) return false;
      if (filter.actors.length > 0 && !filter.actors.includes(ev.actor)) return false;
      if (searchQuery && !ev.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [events, filter, searchQuery]);

  return (
    <div
      className={`tf-audit-event-list ${className}`.trim()}
      data-testid={dataTestId}
    >
      <div className="tf-audit-event-list__toolbar">
        <AuditEventSearch query={searchQuery} onChange={setSearchQuery} />
        <AuditEventFilterComp filter={filter} onChange={setFilter} />
        {onExport && (
          <button
            type="button"
            className="tf-btn tf-btn--export"
            onClick={onExport}
            data-testid="audit-export-btn"
          >
            EXPORT
          </button>
        )}
      </div>
      <div className="tf-audit-event-list__count">
        SHOWING {filtered.length} OF {events.length} EVENTS
      </div>
      <ul className="tf-audit-event-list__items">
        {filtered.map((ev) => (
          <AuditEventItem
            key={ev.id}
            event={ev}
            onSelect={() => setSelectedEvent(ev)}
            selected={selectedEvent?.id === ev.id}
          />
        ))}
      </ul>
      {selectedEvent && (
        <AuditEventDetail
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

AuditEventList.displayName = "AuditEventList";

export default AuditEventList;
