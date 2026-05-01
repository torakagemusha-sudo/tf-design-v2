/**
 * ============================================================================
 * Torafirma Design System — AppShell
 * ============================================================================
 * Root application shell providing the foundational layout structure for all Torafirma applications.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/AppShell
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

export interface AppShellProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Top command bar slot. */
  topBar?: React.ReactNode;
  /** Left navigation rail slot. */
  leftNav?: React.ReactNode;
  /** Right inspector panel slot. */
  rightInspector?: React.ReactNode;
  /** Bottom trace console slot. */
  bottomConsole?: React.ReactNode;
  /** Main content/workspace slot. */
  mainContent?: React.ReactNode;
  /** Status bar slot. */
  statusBar?: React.ReactNode;
  /** Whether the left nav is collapsed. */
  leftNavCollapsed?: boolean;
  /** Whether the right inspector is visible. */
  rightInspectorOpen?: boolean;
  /** Whether the bottom console is visible. */
  bottomConsoleOpen?: boolean;
  /** Product theme applied to the shell. */
  theme?: string;
  /** Application version displayed in shell. */
  appVersion?: string;
}

/**
 * AppShell — Root application shell providing the foundational layout structure for all Torafirma applications.
 *
 * Renders the complete application frame with slots for top command bar, left navigation rail, primary workspace, right inspector, and bottom trace console within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <AppShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const AppShell: React.FC<AppShellProps> = ({
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
  topBar,
  leftNav,
  rightInspector,
  bottomConsole,
  mainContent,
  statusBar,
  leftNavCollapsed = false,
  rightInspectorOpen = true,
  bottomConsoleOpen = false,
  theme = "command-dark",
  appVersion,
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
      className={`tf-app-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-app-shell__header">
          <span className="tf-app-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-app-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-app-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-app-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default AppShell;
