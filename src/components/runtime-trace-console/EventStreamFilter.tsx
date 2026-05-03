/**
 * @fileoverview EventStreamFilter — Filter controls for event streams.
 * Filters by event type, severity, and source.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/EventStreamFilter
 */

import React, { useCallback, useState } from "react";
import type { BaseComponentProps, EventSeverity } from "./types";

/** Stream filter state. */
export interface StreamFilterState {
  severity?: EventSeverity;
  type?: string;
  source?: string;
  text?: string;
}

/** Props for EventStreamFilter. */
export interface EventStreamFilterProps extends BaseComponentProps {
  /** Current filter state. */
  filters: StreamFilterState;
  /** Callback on filter change. */
  onChange: (filters: StreamFilterState) => void;
  /** Available event types. */
  types?: string[];
  /** Available sources. */
  sources?: string[];
}

/**
 * EventStreamFilter — Filter bar for event streams.
 *
 * @example
 * ```tsx
 * const [filters, setFilters] = useState<StreamFilterState>({});
 * <EventStreamFilter
 *   filters={filters}
 *   onChange={setFilters}
 *   types={["http", "db", "cache"]}
 * />
 * ```
 */
export const EventStreamFilter: React.FC<EventStreamFilterProps> = ({
  filters,
  onChange,
  types = [],
  sources = [],
  className = "",
  "data-testid": dataTestId = "event-stream-filter",
}) => {
  const [local, setLocal] = useState<StreamFilterState>(filters);

  const update = useCallback(
    <K extends keyof StreamFilterState>(key: K, value: StreamFilterState[K]) => {
      const next = { ...local, [key]: value || undefined };
      setLocal(next);
      onChange(next);
    },
    [local, onChange]
  );

  const severities: EventSeverity[] = ["info", "debug", "warn", "error", "fatal"];

  return (
    <div
      className={`tf-event-stream-filter ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-event-stream-filter__field">
        <input
          className="tf-input tf-input--sm"
          type="text"
          value={local.text || ""}
          onChange={(e) => update("text", e.target.value || undefined)}
          placeholder="Filter events..."
          aria-label="Filter events by text"
        />
      </div>

      <div className="tf-event-stream-filter__field">
        <select
          className="tf-select tf-select--sm"
          value={local.severity || ""}
          onChange={(e) =>
            update("severity", (e.target.value || undefined) as EventSeverity)
          }
          aria-label="Filter by severity"
        >
          <option value="">All severities</option>
          {severities.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {types.length > 0 && (
        <div className="tf-event-stream-filter__field">
          <select
            className="tf-select tf-select--sm"
            value={local.type || ""}
            onChange={(e) => update("type", e.target.value || undefined)}
            aria-label="Filter by type"
          >
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )}

      {sources.length > 0 && (
        <div className="tf-event-stream-filter__field">
          <select
            className="tf-select tf-select--sm"
            value={local.source || ""}
            onChange={(e) => update("source", e.target.value || undefined)}
            aria-label="Filter by source"
          >
            <option value="">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

EventStreamFilter.displayName = "EventStreamFilter";

export default EventStreamFilter;
