/**
 * ============================================================================
 * Torafirma Design System — FloatingLayout
 * ============================================================================
 * Layout supporting multiple floating windows that can be moved and resized.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/FloatingLayout
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

export interface FloatingLayoutProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Base content rendered beneath floating windows. */
  baseContent?: React.ReactNode;
  /** Floating windows. */
  windows?: { id: string; title: string; x: number; y: number; width: number; height: number; content: React.ReactNode; state?: TorafirmaComponentState }[];
  /** On window close. */
  onWindowClose?: (windowId: string) => void;
  /** On window move. */
  onWindowMove?: (windowId: string, x: number, y: number) => void;
  /** On window resize. */
  onWindowResize?: (windowId: string, w: number, h: number) => void;
  /** Active window ID. */
  activeWindowId?: string;
}

/**
 * FloatingLayout — Layout supporting multiple floating windows that can be moved and resized.
 *
 * Renders a layout container that manages multiple floating windows within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <FloatingLayout
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const FloatingLayout: React.FC<FloatingLayoutProps> = ({
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
  baseContent,
  windows = [],
  onWindowClose,
  onWindowMove,
  onWindowResize,
  activeWindowId,
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
      className={`tf-floating-layout ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-floating-layout__header">
          <span className="tf-floating-layout__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-floating-layout__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-floating-layout__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-floating-layout__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default FloatingLayout;
