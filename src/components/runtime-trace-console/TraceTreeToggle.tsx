/**
 * @fileoverview TraceTreeToggle — Expand/collapse toggle for trace tree nodes.
 * Small button to toggle visibility of child events.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceTreeToggle
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceTreeToggle. */
export interface TraceTreeToggleProps extends BaseComponentProps {
  /** Whether the node is expanded. */
  expanded: boolean;
  /** Whether the node has children (if false, shows leaf indicator). */
  hasChildren?: boolean;
  /** Toggle callback. */
  onToggle: () => void;
}

/**
 * TraceTreeToggle — Tree node expand/collapse control.
 *
 * @example
 * ```tsx
 * <TraceTreeToggle expanded={isOpen} hasChildren={true} onToggle={toggle} />
 * ```
 */
export const TraceTreeToggle: React.FC<TraceTreeToggleProps> = ({
  expanded,
  hasChildren = true,
  onToggle,
  className = "",
  "data-testid": dataTestId = "trace-tree-toggle",
}) => {
  return (
    <button
      className={`tf-trace-tree-toggle ${
        !hasChildren ? "tf-trace-tree-toggle--leaf" : ""
      } ${expanded ? "tf-trace-tree-toggle--expanded" : ""} ${className}`}
      data-testid={dataTestId}
      onClick={onToggle}
      type="button"
      aria-label={expanded ? "Collapse" : "Expand"}
      aria-expanded={expanded}
      disabled={!hasChildren}
    >
      {hasChildren ? (expanded ? "▼" : "▶") : "·"}
    </button>
  );
};

TraceTreeToggle.displayName = "TraceTreeToggle";

export default TraceTreeToggle;
