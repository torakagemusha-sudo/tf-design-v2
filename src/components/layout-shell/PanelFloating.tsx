/**
 * ============================================================================
 * Torafirma Design System — PanelFloating
 * ============================================================================
 * Floating panel overlay positioned above other content.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/PanelFloating
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

export interface PanelFloatingProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Panel X position. */
  x?: number;
  /** Panel Y position. */
  y?: number;
  /** Panel width. */
  width?: number;
  /** Panel height. */
  height?: number;
  /** Whether the panel is visible. */
  visible?: boolean;
  /** Whether to show a backdrop. */
  backdrop?: boolean;
  /** On close callback. */
  onClose?: () => void;
  /** Whether the panel is resizable. */
  resizable?: boolean;
  /** Whether the panel is draggable. */
  draggable?: boolean;
}

/**
 * PanelFloating — Floating panel overlay positioned above other content.
 *
 * Renders a floating panel rendered as an overlay with optional backdrop within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <PanelFloating
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const PanelFloating: React.FC<PanelFloatingProps> = ({
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
  x,
  y,
  width = 400,
  height = 300,
  visible = true,
  backdrop = false,
  onClose,
  resizable = true,
  draggable = true,
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
      className={`tf-panel-floating ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-panel-floating__header">
          <span className="tf-panel-floating__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-panel-floating__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-panel-floating__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-panel-floating__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default PanelFloating;
