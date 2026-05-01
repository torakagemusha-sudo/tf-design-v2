/**
 * ============================================================================
 * Torafirma Design System — ResizableHandle
 * ============================================================================
 * Resize drag handle for adjusting container dimensions.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/ResizableHandle
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

export interface ResizableHandleProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Handle position. */
  position?: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
  /** Whether the handle is being dragged. */
  dragging?: boolean;
  /** Handle size in pixels. */
  size?: number;
  /** On drag start. */
  onDragStart?: () => void;
  /** On drag. */
  onDrag?: (deltaX: number, deltaY: number) => void;
  /** On drag end. */
  onDragEnd?: () => void;
}

/**
 * ResizableHandle — Resize drag handle for adjusting container dimensions.
 *
 * Renders a draggable handle used to resize a container from an edge or corner within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <ResizableHandle
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const ResizableHandle: React.FC<ResizableHandleProps> = ({
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
  position = "se",
  dragging = false,
  size = 8,
  onDragStart,
  onDrag,
  onDragEnd,
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
      className={`tf-resizable-handle ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-resizable-handle__header">
          <span className="tf-resizable-handle__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-resizable-handle__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-resizable-handle__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-resizable-handle__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default ResizableHandle;
