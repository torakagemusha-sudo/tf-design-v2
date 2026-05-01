/**
 * ============================================================================
 * Torafirma Design System — DrawerLayout
 * ============================================================================
 * Slide-out drawer layout that appears from any edge of the viewport.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/DrawerLayout
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

export interface DrawerLayoutProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Drawer position. */
  position?: "left" | "right" | "top" | "bottom";
  /** Whether the drawer is open. */
  open?: boolean;
  /** Drawer width (for left/right). */
  width?: number;
  /** Drawer height (for top/bottom). */
  height?: number;
  /** On close callback. */
  onClose?: () => void;
  /** Close on backdrop click. */
  closeOnBackdrop?: boolean;
  /** Backdrop opacity. */
  backdropOpacity?: number;
}

/**
 * DrawerLayout — Slide-out drawer layout that appears from any edge of the viewport.
 *
 * Renders a slide-out drawer panel that enters from a specified edge of the screen within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <DrawerLayout
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const DrawerLayout: React.FC<DrawerLayoutProps> = ({
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
  position = "right",
  open = false,
  width = 400,
  height = 300,
  onClose,
  closeOnBackdrop = true,
  backdropOpacity = 0.4,
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
      className={`tf-drawer-layout ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-drawer-layout__header">
          <span className="tf-drawer-layout__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-drawer-layout__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-drawer-layout__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-drawer-layout__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default DrawerLayout;
