/**
 * ============================================================================
 * Torafirma Design System — DashboardWidget
 * ============================================================================
 * Dashboard widget container with header, content, and footer.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/DashboardWidget
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

export interface DashboardWidgetProps extends TorafirmaComponentBaseProps {
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
  /** Widget state. */
  widgetState?: TorafirmaComponentState;
  /** Header actions. */
  headerActions?: React.ReactNode;
  /** Widget dimensions in grid units. */
  colSpan?: number;
  /** Widget row span in grid units. */
  rowSpan?: number;
  /** On remove callback. */
  onRemove?: () => void;
  /** On configure callback. */
  onConfigure?: () => void;
  /** Whether the widget is being dragged. */
  dragging?: boolean;
}

/**
 * DashboardWidget — Dashboard widget container with header, content, and footer.
 *
 * Renders a widget container for dashboards with title, content, and actions within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <DashboardWidget
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
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
  widgetState = "idle",
  headerActions,
  colSpan = 4,
  rowSpan = 2,
  onRemove,
  onConfigure,
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
      className={`tf-dashboard-widget ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-dashboard-widget__header">
          <span className="tf-dashboard-widget__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-dashboard-widget__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-dashboard-widget__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-dashboard-widget__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default DashboardWidget;
