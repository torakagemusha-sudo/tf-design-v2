/**
 * ============================================================================
 * Torafirma Design System — FloatingWindow
 * ============================================================================
 * Individual floating window with title bar, content, and resize controls.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/FloatingWindow
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

export interface FloatingWindowProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Window ID. */
  windowId: string;
  /** Window title. */
  title?: string;
  /** Window X position. */
  x?: number;
  /** Window Y position. */
  y?: number;
  /** Window width. */
  width?: number;
  /** Window height. */
  height?: number;
  /** Whether the window is active/focused. */
  active?: boolean;
  /** Whether the window is minimized. */
  minimized?: boolean;
  /** Whether the window is maximized. */
  maximized?: boolean;
  /** On close callback. */
  onClose?: (windowId: string) => void;
  /** On move callback. */
  onMove?: (windowId: string, x: number, y: number) => void;
  /** On resize callback. */
  onResize?: (windowId: string, w: number, h: number) => void;
  /** On focus callback. */
  onFocus?: (windowId: string) => void;
}

/**
 * FloatingWindow — Individual floating window with title bar, content, and resize controls.
 *
 * Renders a single floating window that can be moved, resized, and closed within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <FloatingWindow
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const FloatingWindow: React.FC<FloatingWindowProps> = ({
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
  windowId,
  title,
  x = 100,
  y = 100,
  width = 400,
  height = 300,
  active = false,
  minimized = false,
  maximized = false,
  onClose,
  onMove,
  onResize,
  onFocus,
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
      className={`tf-floating-window ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-floating-window__header">
          <span className="tf-floating-window__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-floating-window__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-floating-window__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-floating-window__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default FloatingWindow;
