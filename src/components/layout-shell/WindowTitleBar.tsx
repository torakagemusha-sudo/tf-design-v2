/**
 * ============================================================================
 * Torafirma Design System — WindowTitleBar
 * ============================================================================
 * Floating window title bar with drag support and window controls.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/WindowTitleBar
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

export interface WindowTitleBarProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Window title. */
  title?: string;
  /** Whether the window is active. */
  active?: boolean;
  /** Whether the window is maximized. */
  maximized?: boolean;
  /** Whether the window is minimized. */
  minimized?: boolean;
  /** On drag start. */
  onDragStart?: () => void;
  /** On minimize. */
  onMinimize?: () => void;
  /** On maximize/restore. */
  onMaximize?: () => void;
  /** On close. */
  onClose?: () => void;
}

/**
 * WindowTitleBar — Floating window title bar with drag support and window controls.
 *
 * Renders a title bar for floating windows with drag-to-move and minimize/maximize/close controls within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <WindowTitleBar
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const WindowTitleBar: React.FC<WindowTitleBarProps> = ({
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
  title,
  active = false,
  maximized = false,
  minimized = false,
  onDragStart,
  onMinimize,
  onMaximize,
  onClose,
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
      className={`tf-window-title-bar ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-window-title-bar__header">
          <span className="tf-window-title-bar__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-window-title-bar__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-window-title-bar__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-window-title-bar__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default WindowTitleBar;
