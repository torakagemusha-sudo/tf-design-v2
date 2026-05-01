/**
 * ============================================================================
 * Torafirma Design System — PageLayoutWithSidebar
 * ============================================================================
 * Page layout with collapsible sidebar alongside main content.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/PageLayoutWithSidebar
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

export interface PageLayoutWithSidebarProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Sidebar slot. */
  sidebar?: React.ReactNode;
  /** Main content slot. */
  content?: React.ReactNode;
  /** Whether the sidebar is expanded. */
  sidebarExpanded?: boolean;
  /** Sidebar width. */
  sidebarWidth?: number;
  /** Toggle sidebar callback. */
  onSidebarToggle?: () => void;
}

/**
 * PageLayoutWithSidebar — Page layout with collapsible sidebar alongside main content.
 *
 * Renders a page layout with a sidebar panel and main content area within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <PageLayoutWithSidebar
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const PageLayoutWithSidebar: React.FC<PageLayoutWithSidebarProps> = ({
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
  sidebar,
  content,
  sidebarExpanded = true,
  sidebarWidth = 240,
  onSidebarToggle,
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
      className={`tf-page-layout-with-sidebar ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-page-layout-with-sidebar__header">
          <span className="tf-page-layout-with-sidebar__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-page-layout-with-sidebar__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-page-layout-with-sidebar__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-page-layout-with-sidebar__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default PageLayoutWithSidebar;
