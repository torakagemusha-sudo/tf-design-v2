/**
 * ============================================================================
 * Torafirma Design System — PanelDraggable
 * ============================================================================
 * Draggable panel that can be repositioned within its container.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/PanelDraggable
 * @family   layout-shell
 * @product  Torafirma
 * @system   Command Dark
 * ============================================================================
 */

import React from "react";
import type {
  TorafirmaComponentState,
  AuthorityLevel,
  ComponentDensity,
  ComponentCriticality,
  SemanticVariant,
  TorafirmaComponentBaseProps,
} from "./types";

/* ──────────────────────────── Interface ─────────────────────────── */

export interface PanelDraggableProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Initial X position. */
  initialX?: number;
  /** Initial Y position. */
  initialY?: number;
  /** Whether the panel is currently being dragged. */
  dragging?: boolean;
  /** On drag start. */
  onDragStart?: () => void;
  /** On drag. */
  onDrag?: (x: number, y: number) => void;
  /** On drag end. */
  onDragEnd?: () => void;
  /** Drag handle selector. */
  dragHandle?: string;
}

/**
 * PanelDraggable — Draggable panel that can be repositioned within its container.
 *
 * Renders a panel that can be dragged to a new position within its parent container within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <PanelDraggable
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const PanelDraggable: React.FC<PanelDraggableProps> = ({
  id,
  label,
  description,
  state = "idle",
  authority,
  requiredAuthority,
  density = "standard",
  criticality = "passive",
  disabled = false,
  disabledReason,
  traceId,
  testId,
  className = "",
  children,
  onClick,
  variant = "neutral",
  initialX = 0,
  initialY = 0,
  dragging = false,
  onDragStart,
  onDrag,
  onDragEnd,
  dragHandle,
}) => {
  const stateClass = `tf-state--${state}`;
  const variantClass = `tf-variant--${variant}`;
  const densityClass = `tf-density--${density}`;
  const criticalityClass = `tf-criticality--${criticality}`;
  const disabledClass = disabled ? "tf-disabled" : "";

  return (
    <div
      id={id}
      data-testid={testId}
      data-trace-id={traceId}
      data-state={state}
      data-authority={authority}
      data-required-authority={requiredAuthority}
      data-density={density}
      data-criticality={criticality}
      data-variant={variant}
      data-disabled={disabled}
      data-disabled-reason={disabledReason}
      onClick={onClick}
      className={`tf-panel-draggable ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-panel-draggable__header">
          <span className="tf-panel-draggable__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-panel-draggable__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-panel-draggable__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-panel-draggable__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default PanelDraggable;
