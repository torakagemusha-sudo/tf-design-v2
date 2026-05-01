/**
 * ============================================================================
 * Torafirma Design System — DashboardWidgetHeader
 * ============================================================================
 * Dashboard widget header with title, actions, and drag handle.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/DashboardWidgetHeader
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

export interface DashboardWidgetHeaderProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Widget title. */
  title?: string;
  /** State badge. */
  stateBadge?: TorafirmaComponentState;
  /** Actions slot. */
  actions?: React.ReactNode;
  /** Drag handle slot. */
  dragHandle?: React.ReactNode;
  /** Whether the widget is being dragged. */
  dragging?: boolean;
}

/**
 * DashboardWidgetHeader — Dashboard widget header with title, actions, and drag handle.
 *
 * Renders a header strip for a dashboard widget with title and action controls within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <DashboardWidgetHeader
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const DashboardWidgetHeader: React.FC<DashboardWidgetHeaderProps> = ({
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
  stateBadge,
  actions,
  dragHandle,
  dragging = false,
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
      className={`tf-dashboard-widget-header ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-dashboard-widget-header__header">
          <span className="tf-dashboard-widget-header__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-dashboard-widget-header__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-dashboard-widget-header__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-dashboard-widget-header__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default DashboardWidgetHeader;
