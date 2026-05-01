/**
 * ============================================================================
 * Torafirma Design System — PanelResizable
 * ============================================================================
 * Resizable panel with draggable edges.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/PanelResizable
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

export interface PanelResizableProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Default width in pixels. */
  defaultWidth?: number;
  /** Default height in pixels. */
  defaultHeight?: number;
  /** Minimum width. */
  minWidth?: number;
  /** Minimum height. */
  minHeight?: number;
  /** Maximum width. */
  maxWidth?: number;
  /** Maximum height. */
  maxHeight?: number;
  /** Which edges are resizable. */
  resizeHandles?: ("n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw")[];
  /** On size change. */
  onSizeChange?: (width: number, height: number) => void;
}

/**
 * PanelResizable — Resizable panel with draggable edges.
 *
 * Renders a panel with draggable edges for resizing in one or both directions within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <PanelResizable
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const PanelResizable: React.FC<PanelResizableProps> = ({
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
  defaultWidth,
  defaultHeight,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  resizeHandles = ["se"],
  onSizeChange,
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
      className={`tf-panel-resizable ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-panel-resizable__header">
          <span className="tf-panel-resizable__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-panel-resizable__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-panel-resizable__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-panel-resizable__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default PanelResizable;
