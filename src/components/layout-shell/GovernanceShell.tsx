/**
 * ============================================================================
 * Torafirma Design System — GovernanceShell
 * ============================================================================
 * Governance/Audit layout for policy management, authority review, and audit trails.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/GovernanceShell
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

export interface GovernanceShellProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Governance title. */
  governanceTitle?: string;
  /** Policy panel slot. */
  policyPanel?: React.ReactNode;
  /** Authority ladder slot. */
  authorityLadder?: React.ReactNode;
  /** Audit trail slot. */
  auditTrail?: React.ReactNode;
  /** Workorder panel slot. */
  workorderPanel?: React.ReactNode;
  /** Governance status. */
  governanceStatus?: TorafirmaComponentState;
}

/**
 * GovernanceShell — Governance/Audit layout for policy management, authority review, and audit trails.
 *
 * Renders a governance shell for reviewing policies, managing authority levels, and viewing audit trails within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <GovernanceShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const GovernanceShell: React.FC<GovernanceShellProps> = ({
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
  governanceTitle = "Governance Center",
  policyPanel,
  authorityLadder,
  auditTrail,
  workorderPanel,
  governanceStatus = "ready",
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
      className={`tf-governance-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-governance-shell__header">
          <span className="tf-governance-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-governance-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-governance-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-governance-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default GovernanceShell;
