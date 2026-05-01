/**
 * ============================================================================
 * Torafirma Design System — ResizableContainer
 * ============================================================================
 * Generic resizable container supporting drag-to-resize on any edge.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/ResizableContainer
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

export interface ResizableContainerProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Initial width. */
  initialWidth?: number;
  /** Initial height. */
  initialHeight?: number;
  /** Minimum width. */
  minWidth?: number;
  /** Minimum height. */
  minHeight?: number;
  /** Maximum width. */
  maxWidth?: number;
  /** Maximum height. */
  maxHeight?: number;
  /** Which edges are resizable. */
  handles?: ("n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw")[];
  /** On resize callback. */
  onResize?: (width: number, height: number) => void;
}

/**
 * ResizableContainer — Generic resizable container supporting drag-to-resize on any edge.
 *
 * Renders a generic container that can be resized by dragging its edges or corners within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <ResizableContainer
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const ResizableContainer: React.FC<ResizableContainerProps> = ({
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
  initialWidth = 400,
  initialHeight = 300,
  minWidth = 100,
  minHeight = 60,
  maxWidth,
  maxHeight,
  handles = ["se"],
  onResize,
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
      className={`tf-resizable-container ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-resizable-container__header">
          <span className="tf-resizable-container__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-resizable-container__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-resizable-container__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-resizable-container__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default ResizableContainer;
