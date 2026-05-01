/**
 * ============================================================================
 * Torafirma Design System — AnalysisDashboardShell
 * ============================================================================
 * Analysis workspace shell for research, intelligence, and data exploration.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/AnalysisDashboardShell
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

export interface AnalysisDashboardShellProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Dashboard title. */
  dashboardTitle?: string;
  /** Analysis panels. */
  panels?: React.ReactNode;
  /** Chart/visualization slot. */
  visualization?: React.ReactNode;
  /** Data table slot. */
  dataTable?: React.ReactNode;
  /** Filter bar slot. */
  filterBar?: React.ReactNode;
  /** Query input slot. */
  queryInput?: React.ReactNode;
}

/**
 * AnalysisDashboardShell — Analysis workspace shell for research, intelligence, and data exploration.
 *
 * Renders an analysis workspace shell with deep-blue theming for research and intelligence tasks within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <AnalysisDashboardShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const AnalysisDashboardShell: React.FC<AnalysisDashboardShellProps> = ({
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
  dashboardTitle = "Analysis Workspace",
  panels,
  visualization,
  dataTable,
  filterBar,
  queryInput,
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
      className={`tf-analysis-dashboard-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-analysis-dashboard-shell__header">
          <span className="tf-analysis-dashboard-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-analysis-dashboard-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-analysis-dashboard-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-analysis-dashboard-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default AnalysisDashboardShell;
