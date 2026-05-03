/**
 * @fileoverview TraceSpanList — List of trace spans.
 * Sortable, filterable list of spans with duration bars.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceSpanList
 */

import React, { useState } from "react";
import type { BaseComponentProps, TraceSpan } from "./types";

/** Props for TraceSpanList. */
export interface TraceSpanListProps extends BaseComponentProps {
  /** Spans to display. */
  spans: TraceSpan[];
  /** Selected span ID. */
  selectedId?: string;
  /** Callback when a span is selected. */
  onSelect?: (span: TraceSpan) => void;
  /** Sort column. */
  sortBy?: "name" | "duration" | "service" | "status";
}

/**
 * TraceSpanList — List view of trace spans.
 *
 * @example
 * ```tsx
 * <TraceSpanList
 *   spans={traceSpans}
 *   selectedId={selected?.id}
 *   onSelect={(s) => setSelected(s)}
 *   sortBy="duration"
 * />
 * ```
 */
export const TraceSpanList: React.FC<TraceSpanListProps> = ({
  spans,
  selectedId,
  onSelect,
  sortBy: initialSort = "duration",
  className = "",
  "data-testid": dataTestId = "trace-span-list",
}) => {
  const [sortBy, setSortBy] = useState(initialSort);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = [...spans].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortBy === "duration") return (a.durationMs - b.durationMs) * dir;
    if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
    if (sortBy === "service") return a.service.localeCompare(b.service) * dir;
    if (sortBy === "status") return a.status.localeCompare(b.status) * dir;
    return 0;
  });

  const maxDuration = Math.max(...spans.map((s) => s.durationMs), 1);

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("desc");
    }
  };

  const SortIndicator: React.FC<{ col: typeof sortBy }> = ({ col }) => {
    if (sortBy !== col) return <span className="tf-sort-indicator">↕</span>;
    return (
      <span className="tf-sort-indicator tf-sort-indicator--active">
        {sortDir === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div
      className={`tf-trace-span-list ${className}`}
      data-testid={dataTestId}
    >
      <table className="tf-trace-span-list__table">
        <thead>
          <tr>
            <th onClick={() => toggleSort("name")} className="tf-trace-span-list__sortable">
              Name <SortIndicator col="name" />
            </th>
            <th onClick={() => toggleSort("service")} className="tf-trace-span-list__sortable">
              Service <SortIndicator col="service" />
            </th>
            <th onClick={() => toggleSort("duration")} className="tf-trace-span-list__sortable">
              Duration <SortIndicator col="duration" />
            </th>
            <th onClick={() => toggleSort("status")} className="tf-trace-span-list__sortable">
              Status <SortIndicator col="status" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((span) => (
            <tr
              key={span.id}
              className={`tf-trace-span-list__row ${
                selectedId === span.id
                  ? "tf-trace-span-list__row--selected"
                  : ""
              }`}
              onClick={() => onSelect?.(span)}
            >
              <td className="tf-trace-span-list__name">
                {"  ".repeat(span.depth)}
                {span.name}
              </td>
              <td className="tf-trace-span-list__service">{span.service}</td>
              <td className="tf-trace-span-list__duration">
                <TraceSpanBar
                  duration={span.durationMs}
                  maxDuration={maxDuration}
                  status={span.status}
                />
                <span className="tf-trace-span-list__duration-value">
                  {span.durationMs}ms
                </span>
              </td>
              <td>
                <span
                  className={`tf-badge tf-badge--${span.status}`}
                >
                  {span.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** Inline span bar sub-component. */
const TraceSpanBar: React.FC<{
  duration: number;
  maxDuration: number;
  status: string;
}> = ({ duration, maxDuration, status }) => (
  <div className="tf-trace-span-bar">
    <div
      className={`tf-trace-span-bar__fill tf-trace-span-bar__fill--${status}`}
      style={{ width: `${(duration / maxDuration) * 100}%` }}
    />
  </div>
);

TraceSpanList.displayName = "TraceSpanList";

export default TraceSpanList;
