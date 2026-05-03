/**
 * @fileoverview TraceConsoleFilter — Filter controls for trace events.
 * Allows filtering by severity, actor, action, target, and time range.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceConsoleFilter
 */

import React, { useCallback, useState } from "react";
import type { BaseComponentProps, EventSeverity, TraceAction } from "./types";

/** Filter state shape. */
export interface TraceFilterState {
  severity?: EventSeverity;
  actor?: string;
  action?: TraceAction;
  target?: string;
  searchText?: string;
  timeFrom?: string;
  timeTo?: string;
}

/** Props for TraceConsoleFilter. */
export interface TraceConsoleFilterProps extends BaseComponentProps {
  /** Current filter state. */
  filters: TraceFilterState;
  /** Callback when filters change. */
  onChange: (filters: TraceFilterState) => void;
  /** Available actors for dropdown. */
  actors?: string[];
  /** Available targets for dropdown. */
  targets?: string[];
  /** Whether the filter panel is expanded. */
  expanded?: boolean;
}

/**
 * TraceConsoleFilter — Multi-criteria filter for trace events.
 *
 * Provides severity, actor, action, target, text search, and time range filtering.
 *
 * @example
 * ```tsx
 * const [filters, setFilters] = useState<TraceFilterState>({});
 * <TraceConsoleFilter
 *   filters={filters}
 *   onChange={setFilters}
 *   actors={["system", "user", "ai"]}
 * />
 * ```
 */
export const TraceConsoleFilter: React.FC<TraceConsoleFilterProps> = ({
  filters,
  onChange,
  actors = [],
  targets = [],
  expanded = true,
  className = "",
  "data-testid": dataTestId = "trace-console-filter",
}) => {
  const [localFilters, setLocalFilters] = useState<TraceFilterState>(filters);

  const updateFilter = useCallback(
    <K extends keyof TraceFilterState>(key: K, value: TraceFilterState[K]) => {
      setLocalFilters((prev) => {
        const next = { ...prev, [key]: value || undefined };
        onChange(next);
        return next;
      });
    },
    [onChange]
  );

  const clearAll = useCallback(() => {
    setLocalFilters({});
    onChange({});
  }, [onChange]);

  const severities: EventSeverity[] = ["info", "debug", "warn", "error", "fatal"];
  const actions: TraceAction[] = [
    "create", "edit", "validate", "stage", "execute",
    "commit", "deploy", "abort", "reject", "override", "fault", "recover",
  ];

  const hasActiveFilters = Object.values(localFilters).some(Boolean);

  return (
    <div
      className={`tf-trace-console-filter ${expanded ? "tf-trace-console-filter--expanded" : ""} ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-console-filter__header">
        <span className="tf-trace-console-filter__label">Filters</span>
        {hasActiveFilters && (
          <button
            className="tf-link tf-link--sm"
            onClick={clearAll}
            type="button"
          >
            Clear all
          </button>
        )}
      </div>

      {expanded && (
        <div className="tf-trace-console-filter__body">
          <div className="tf-trace-console-filter__row">
            <label className="tf-trace-console-filter__field">
              <span className="tf-trace-console-filter__field-label">Severity</span>
              <select
                className="tf-select tf-select--sm"
                value={localFilters.severity || ""}
                onChange={(e) =>
                  updateFilter("severity", (e.target.value || undefined) as EventSeverity)
                }
              >
                <option value="">All</option>
                {severities.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="tf-trace-console-filter__field">
              <span className="tf-trace-console-filter__field-label">Action</span>
              <select
                className="tf-select tf-select--sm"
                value={localFilters.action || ""}
                onChange={(e) =>
                  updateFilter("action", (e.target.value || undefined) as TraceAction)
                }
              >
                <option value="">All</option>
                {actions.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="tf-trace-console-filter__row">
            {actors.length > 0 && (
              <label className="tf-trace-console-filter__field">
                <span className="tf-trace-console-filter__field-label">Actor</span>
                <select
                  className="tf-select tf-select--sm"
                  value={localFilters.actor || ""}
                  onChange={(e) => updateFilter("actor", e.target.value || undefined)}
                >
                  <option value="">All</option>
                  {actors.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {targets.length > 0 && (
              <label className="tf-trace-console-filter__field">
                <span className="tf-trace-console-filter__field-label">Target</span>
                <select
                  className="tf-select tf-select--sm"
                  value={localFilters.target || ""}
                  onChange={(e) => updateFilter("target", e.target.value || undefined)}
                >
                  <option value="">All</option>
                  {targets.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <div className="tf-trace-console-filter__row">
            <label className="tf-trace-console-filter__field tf-trace-console-filter__field--wide">
              <span className="tf-trace-console-filter__field-label">Search</span>
              <input
                className="tf-input tf-input--sm"
                type="text"
                value={localFilters.searchText || ""}
                onChange={(e) => updateFilter("searchText", e.target.value || undefined)}
                placeholder="Search trace messages..."
              />
            </label>
          </div>

          <div className="tf-trace-console-filter__row">
            <label className="tf-trace-console-filter__field">
              <span className="tf-trace-console-filter__field-label">From</span>
              <input
                className="tf-input tf-input--sm"
                type="datetime-local"
                value={localFilters.timeFrom || ""}
                onChange={(e) => updateFilter("timeFrom", e.target.value || undefined)}
              />
            </label>
            <label className="tf-trace-console-filter__field">
              <span className="tf-trace-console-filter__field-label">To</span>
              <input
                className="tf-input tf-input--sm"
                type="datetime-local"
                value={localFilters.timeTo || ""}
                onChange={(e) => updateFilter("timeTo", e.target.value || undefined)}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

TraceConsoleFilter.displayName = "TraceConsoleFilter";

export default TraceConsoleFilter;
