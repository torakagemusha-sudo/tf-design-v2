/**
 * ============================================================================
 * Torafirma Design System — CommandCockpitShell
 * ============================================================================
 * Operational command center shell for mission-critical command and control surfaces.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/CommandCockpitShell
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

export interface CommandCockpitShellProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Cockpit title. */
  cockpitTitle?: string;
  /** Mission status. */
  missionStatus?: TorafirmaComponentState;
  /** Command modules. */
  modules?: { id: string; label: string; icon?: React.ReactNode; status?: TorafirmaComponentState }[];
  /** Primary workspace content. */
  workspace?: React.ReactNode;
  /** Telemetry panel slot. */
  telemetryPanel?: React.ReactNode;
  /** Command log slot. */
  commandLog?: React.ReactNode;
  /** Operator name. */
  operatorName?: string;
  /** Operator authority. */
  operatorAuthority?: AuthorityLevel;
}

/**
 * CommandCockpitShell — Operational command center shell for mission-critical command and control surfaces.
 *
 * Renders the full command cockpit shell with tactical navigation, telemetry panels, and execution controls within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <CommandCockpitShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const CommandCockpitShell: React.FC<CommandCockpitShellProps> = ({
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
  cockpitTitle = "Command Cockpit",
  missionStatus = "ready",
  modules = [],
  workspace,
  telemetryPanel,
  commandLog,
  operatorName,
  operatorAuthority,
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
      className={`tf-command-cockpit-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-command-cockpit-shell__header">
          <span className="tf-command-cockpit-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-command-cockpit-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-command-cockpit-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-command-cockpit-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default CommandCockpitShell;
