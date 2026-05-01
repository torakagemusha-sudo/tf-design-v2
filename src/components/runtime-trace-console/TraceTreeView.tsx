/**
 * @fileoverview TraceTreeView — Hierarchical trace view.
 * Displays trace events in a nested tree structure.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceTreeView
 */

import React, { useState } from "react";
import type { BaseComponentProps, TraceEvent } from "./types";

/** Props for TraceTreeView. */
export interface TraceTreeViewProps extends BaseComponentProps {
  /** Trace events to display. */
  events: TraceEvent[];
  /** Selected event ID. */
  selectedId?: string;
  /** Callback when an event is selected. */
  onSelect?: (event: TraceEvent) => void;
  /** Root event IDs (auto-detected if not provided). */
  rootIds?: string[];
}

/**
 * TraceTreeView — Hierarchical tree visualization of trace events.
 *
 * Builds parent-child relationships from event parentId references.
 *
 * @example
 * ```tsx
 * <TraceTreeView
 *   events={traceEvents}
 *   selectedId={selected?.eventId}
 *   onSelect={(e) => setSelected(e)}
 * />
 * ```
 */
export const TraceTreeView: React.FC<TraceTreeViewProps> = ({
  events,
  selectedId,
  onSelect,
  rootIds,
  className = "",
  "data-testid": dataTestId = "trace-tree-view",
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(events.map((e) => e.eventId))
  );

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const eventMap = new Map(events.map((e) => [e.eventId, e]));
  const childrenMap = new Map<string, TraceEvent[]>();
  for (const e of events) {
    if (e.parentId) {
      const siblings = childrenMap.get(e.parentId) || [];
      siblings.push(e);
      childrenMap.set(e.parentId, siblings);
    }
  }

  const roots = rootIds
    ? rootIds.map((id) => eventMap.get(id)).filter(Boolean) as TraceEvent[]
    : events.filter((e) => !e.parentId || !eventMap.has(e.parentId));

  const renderNode = (event: TraceEvent, depth: number): React.ReactNode => {
    const children = childrenMap.get(event.eventId) || [];
    const hasChildren = children.length > 0;
    const isExpanded = expanded.has(event.eventId);
    const isSelected = selectedId === event.eventId;

    return (
      <div key={event.eventId}>
        <div
          className={`tf-trace-tree-view__node ${
            isSelected ? "tf-trace-tree-view__node--selected" : ""
          }`}
          style={{ paddingLeft: `${depth * 1.5}rem` }}
          onClick={() => onSelect?.(event)}
        >
          <TraceTreeToggle
            expanded={isExpanded}
            hasChildren={hasChildren}
            onToggle={() => toggleExpand(event.eventId)}
          />
          <span className={`tf-badge tf-badge--${event.severity} tf-badge--sm`}>
            {event.severity}
          </span>
          <span className="tf-trace-tree-view__action">{event.action}</span>
          <span className="tf-trace-tree-view__target">{event.target}</span>
          {event.durationMs && (
            <span className="tf-trace-tree-view__duration">
              {event.durationMs}ms
            </span>
          )}
        </div>
        {isExpanded &&
          children.map((child) => renderNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div
      className={`tf-trace-tree-view ${className}`}
      data-testid={dataTestId}
    >
      {roots.map((root) => renderNode(root, 0))}
      {roots.length === 0 && (
        <div className="tf-trace-tree-view__empty">No trace events</div>
      )}
    </div>
  );
};

TraceTreeView.displayName = "TraceTreeView";

export default TraceTreeView;
