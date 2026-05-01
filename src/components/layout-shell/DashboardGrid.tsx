/**
 * ============================================================================
 * Torafirma Design System — DashboardGrid
 * ============================================================================
 * Dashboard grid system managing widget placement and sizing.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/DashboardGrid
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

export interface DashboardGridProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Number of columns. */
  columns?: number;
  /** Row height in pixels. */
  rowHeight?: number;
  /** Gap between grid cells. */
  gap?: number;
  /** Breakpoint configurations. */
  breakpoints?: { sm?: number; md?: number; lg?: number; xl?: number };
  /** Whether editing is enabled. */
  editable?: boolean;
  /** On layout change. */
  onLayoutChange?: (layout: any) => void;
}

/**
 * DashboardGrid — Dashboard grid system managing widget placement and sizing.
 *
 * Renders a grid system for dashboards that manages widget positions and responsive breakpoints within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <DashboardGrid
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const DashboardGrid: React.FC<DashboardGridProps> = ({
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
  columns = 12,
  rowHeight = 80,
  gap = 12,
  breakpoints,
  editable = false,
  onLayoutChange,
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
      className={`tf-dashboard-grid ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-dashboard-grid__header">
          <span className="tf-dashboard-grid__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-dashboard-grid__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-dashboard-grid__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-dashboard-grid__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default DashboardGrid;
