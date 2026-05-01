/**
 * ============================================================================
 * Torafirma Design System — OperationsCenterShell
 * ============================================================================
 * Operations center shell for monitoring, coordinating, and managing live operations.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/OperationsCenterShell
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

export interface OperationsCenterShellProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Center title. */
  centerTitle?: string;
  /** Live event stream slot. */
  eventStream?: React.ReactNode;
  /** Operations map slot. */
  operationsMap?: React.ReactNode;
  /** Active operations list. */
  activeOperations?: React.ReactNode;
  /** Alert panel slot. */
  alertPanel?: React.ReactNode;
  /** Overall ops status. */
  opsStatus?: TorafirmaComponentState;
}

/**
 * OperationsCenterShell — Operations center shell for monitoring, coordinating, and managing live operations.
 *
 * Renders an operations center shell with live telemetry, event streams, and coordination tools within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <OperationsCenterShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const OperationsCenterShell: React.FC<OperationsCenterShellProps> = ({
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
  centerTitle = "Operations Center",
  eventStream,
  operationsMap,
  activeOperations,
  alertPanel,
  opsStatus = "ready",
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
      className={`tf-operations-center-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-operations-center-shell__header">
          <span className="tf-operations-center-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-operations-center-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-operations-center-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-operations-center-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default OperationsCenterShell;
