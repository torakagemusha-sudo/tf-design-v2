/**
 * @fileoverview TraceTreeNode — Single node in the trace tree.
 * Displays one trace event with expand/collapse and indentation.
 *
 * @module @torafirma/design-system/runtime-trace-console/TraceTreeNode
 */

import React from "react";
import type { BaseComponentProps, TraceEvent } from "./types";

/** Props for TraceTreeNode. */
export interface TraceTreeNodeProps extends BaseComponentProps {
  /** Event data. */
  event: TraceEvent;
  /** Tree depth for indentation. */
  depth?: number;
  /** Whether the node is expanded. */
  expanded?: boolean;
  /** Whether the node has children. */
  hasChildren?: boolean;
  /** Whether the node is selected. */
  selected?: boolean;
  /** Toggle expand callback. */
  onToggle?: () => void;
  /** Select callback. */
  onSelect?: (event: TraceEvent) => void;
}

/**
 * TraceTreeNode — Individual trace tree node.
 *
 * @example
 * ```tsx
 * <TraceTreeNode
 *   event={event}
 *   depth={2}
 *   expanded={true}
 *   hasChildren={true}
 *   onToggle={() => toggle(event.eventId)}
 * />
 * ```
 */
export const TraceTreeNode: React.FC<TraceTreeNodeProps> = ({
  event,
  depth = 0,
  expanded = false,
  hasChildren = false,
  selected = false,
  onToggle,
  onSelect,
  className = "",
  "data-testid": dataTestId = "trace-tree-node",
}) => {
  return (
    <div
      className={`tf-trace-tree-node ${
        selected ? "tf-trace-tree-node--selected" : ""
      } tf-trace-tree-node--${event.severity} ${className}`}
      data-testid={dataTestId}
      style={{ paddingLeft: `${depth * 1.5}rem` }}
      onClick={() => onSelect?.(event)}
    >
      <button
        className={`tf-trace-tree-node__toggle ${
          !hasChildren ? "tf-trace-tree-node__toggle--leaf" : ""
        } ${expanded ? "tf-trace-tree-node__toggle--expanded" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
        type="button"
        aria-label={expanded ? "Collapse" : "Expand"}
      >
        {hasChildren ? (expanded ? "▼" : "▶") : "·"}
      </button>

      <span className={`tf-badge tf-badge--${event.severity} tf-badge--sm`}>
        {event.severity}
      </span>

      <span className="tf-trace-tree-node__action">{event.action}</span>

      <span className="tf-trace-tree-node__target" title={event.target}>
        {event.target}
      </span>

      {event.result && (
        <span className={`tf-badge tf-badge--result-${event.result} tf-badge--sm`}>
          {event.result}
        </span>
      )}

      {event.durationMs && (
        <span className="tf-trace-tree-node__duration">
          {event.durationMs >= 1000
            ? `${(event.durationMs / 1000).toFixed(2)}s`
            : `${event.durationMs}ms`}
        </span>
      )}
    </div>
  );
};

TraceTreeNode.displayName = "TraceTreeNode";

export default TraceTreeNode;
