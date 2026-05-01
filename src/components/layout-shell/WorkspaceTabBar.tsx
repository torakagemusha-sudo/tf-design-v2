/**
 * ============================================================================
 * Torafirma Design System — WorkspaceTabBar
 * ============================================================================
 * Tab bar for the workspace showing open document tabs.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/WorkspaceTabBar
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

export interface WorkspaceTabBarProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Tab descriptors. */
  tabs?: { id: string; label: string; icon?: React.ReactNode; state?: TorafirmaComponentState; dirty?: boolean; closable?: boolean; pinned?: boolean }[];
  /** Active tab ID. */
  activeTabId?: string;
  /** On tab select. */
  onTabSelect?: (tabId: string) => void;
  /** On tab close. */
  onTabClose?: (tabId: string) => void;
  /** Scrollable tab list. */
  scrollable?: boolean;
}

/**
 * WorkspaceTabBar — Tab bar for the workspace showing open document tabs.
 *
 * Renders a horizontal tab bar showing all open workspace tabs with selection, close, and reorder support within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <WorkspaceTabBar
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const WorkspaceTabBar: React.FC<WorkspaceTabBarProps> = ({
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
  tabs = [],
  activeTabId,
  onTabSelect,
  onTabClose,
  scrollable = true,
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
      className={`tf-workspace-tab-bar ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-workspace-tab-bar__header">
          <span className="tf-workspace-tab-bar__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-workspace-tab-bar__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-workspace-tab-bar__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-workspace-tab-bar__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default WorkspaceTabBar;
