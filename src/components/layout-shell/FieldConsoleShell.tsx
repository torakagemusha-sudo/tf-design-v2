/**
 * ============================================================================
 * Torafirma Design System — FieldConsoleShell
 * ============================================================================
 * Field/Mission console for mobile, degraded-network, or emergency operations.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/FieldConsoleShell
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

export interface FieldConsoleShellProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Console title. */
  consoleTitle?: string;
  /** Mission status. */
  missionStatus?: TorafirmaComponentState;
  /** Offline mode indicator. */
  offline?: boolean;
  /** Emergency breaker slot. */
  emergencyBreaker?: React.ReactNode;
  /** Main action grid. */
  actionGrid?: React.ReactNode;
  /** Status tiles. */
  statusTiles?: React.ReactNode;
  /** Simplified mode for high-stress operation. */
  simplifiedMode?: boolean;
}

/**
 * FieldConsoleShell — Field/Mission console for mobile, degraded-network, or emergency operations.
 *
 * Renders a field-optimized console shell with large targets, offline support, and emergency controls within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <FieldConsoleShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const FieldConsoleShell: React.FC<FieldConsoleShellProps> = ({
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
  consoleTitle = "Field Console",
  missionStatus = "ready",
  offline = false,
  emergencyBreaker,
  actionGrid,
  statusTiles,
  simplifiedMode = false,
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
      className={`tf-field-console-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-field-console-shell__header">
          <span className="tf-field-console-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-field-console-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-field-console-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-field-console-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default FieldConsoleShell;
