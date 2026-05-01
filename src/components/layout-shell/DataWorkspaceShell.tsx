/**
 * ============================================================================
 * Torafirma Design System — DataWorkspaceShell
 * ============================================================================
 * Data/QC workspace for dataset inspection, validation, and correction workflows.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/DataWorkspaceShell
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

export interface DataWorkspaceShellProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Workspace title. */
  workspaceTitle?: string;
  /** Dataset selector slot. */
  datasetSelector?: React.ReactNode;
  /** Data table slot. */
  dataTable?: React.ReactNode;
  /** Validation panel slot. */
  validationPanel?: React.ReactNode;
  /** Correction panel slot. */
  correctionPanel?: React.ReactNode;
  /** QC status. */
  qcStatus?: TorafirmaComponentState;
}

/**
 * DataWorkspaceShell — Data/QC workspace for dataset inspection, validation, and correction workflows.
 *
 * Renders a data quality workspace shell with dataset panels, validation matrices, and correction tools within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <DataWorkspaceShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const DataWorkspaceShell: React.FC<DataWorkspaceShellProps> = ({
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
  workspaceTitle = "Data Workspace",
  datasetSelector,
  dataTable,
  validationPanel,
  correctionPanel,
  qcStatus = "idle",
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
      className={`tf-data-workspace-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-data-workspace-shell__header">
          <span className="tf-data-workspace-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-data-workspace-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-data-workspace-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-data-workspace-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default DataWorkspaceShell;
