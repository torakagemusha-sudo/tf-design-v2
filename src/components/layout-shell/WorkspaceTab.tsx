/**
 * ============================================================================
 * Torafirma Design System — WorkspaceTab
 * ============================================================================
 * Individual workspace tab with state, dirty indicator, and close action.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/WorkspaceTab
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

export interface WorkspaceTabProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Tab ID. */
  tabId: string;
  /** Tab label text. */
  tabLabel: string;
  /** Tab icon. */
  icon?: React.ReactNode;
  /** Whether the tab is active. */
  active?: boolean;
  /** Whether the tab content is dirty/unsaved. */
  dirty?: boolean;
  /** Whether the tab can be closed. */
  closable?: boolean;
  /** Whether the tab is pinned. */
  pinned?: boolean;
  /** Tab state. */
  tabState?: TorafirmaComponentState;
  /** On select callback. */
  onSelect?: () => void;
  /** On close callback. */
  onClose?: () => void;
}

/**
 * WorkspaceTab — Individual workspace tab with state, dirty indicator, and close action.
 *
 * Renders a single workspace tab showing label, state indicator, and optional close button within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <WorkspaceTab
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const WorkspaceTab: React.FC<WorkspaceTabProps> = ({
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
  tabId,
  tabLabel,
  icon,
  active = false,
  dirty = false,
  closable = true,
  pinned = false,
  tabState = "idle",
  onSelect,
  onClose,
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
      className={`tf-workspace-tab ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-workspace-tab__header">
          <span className="tf-workspace-tab__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-workspace-tab__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-workspace-tab__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-workspace-tab__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default WorkspaceTab;
