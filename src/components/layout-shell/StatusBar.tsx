/**
 * ============================================================================
 * Torafirma Design System — StatusBar
 * ============================================================================
 * Bottom status bar showing connection state, timestamp, user role, and system info.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/StatusBar
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

export interface StatusBarProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Status sections from left to right. */
  sections?: { id: string; label: string; icon?: React.ReactNode; variant?: SemanticVariant; state?: TorafirmaComponentState; onClick?: () => void }[];
  /** Connection state. */
  connectionState?: TorafirmaComponentState;
  /** Current timestamp. */
  timestamp?: string;
  /** Current user name. */
  userName?: string;
  /** Current user role. */
  userRole?: string;
  /** Active branch name. */
  activeBranch?: string;
  /** Dirty/sync state. */
  syncState?: TorafirmaComponentState;
  /** Bar height in pixels. */
  height?: number;
}

/**
 * StatusBar — Bottom status bar showing connection state, timestamp, user role, and system info.
 *
 * Renders a bottom status bar with sections for connection, user, timestamp, and system state within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <StatusBar
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const StatusBar: React.FC<StatusBarProps> = ({
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
  sections = [],
  connectionState = "ready",
  timestamp,
  userName,
  userRole,
  activeBranch,
  syncState = "ready",
  height = 24,
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
      className={`tf-status-bar ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-status-bar__header">
          <span className="tf-status-bar__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-status-bar__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-status-bar__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-status-bar__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default StatusBar;
