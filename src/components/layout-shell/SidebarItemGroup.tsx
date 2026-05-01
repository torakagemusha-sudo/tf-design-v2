/**
 * ============================================================================
 * Torafirma Design System — SidebarItemGroup
 * ============================================================================
 * Grouped sidebar items with expandable sub-items.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/SidebarItemGroup
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

export interface SidebarItemGroupProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Group ID. */
  groupId: string;
  /** Group label. */
  groupLabel: string;
  /** Group icon. */
  icon?: React.ReactNode;
  /** Sub-items. */
  items?: { id: string; label: string; icon?: React.ReactNode; href?: string; state?: TorafirmaComponentState }[];
  /** Whether the group is expanded. */
  expanded?: boolean;
  /** On toggle callback. */
  onToggle?: () => void;
  /** Active item ID. */
  activeItemId?: string;
}

/**
 * SidebarItemGroup — Grouped sidebar items with expandable sub-items.
 *
 * Renders a group of sidebar items with an expandable sub-menu within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <SidebarItemGroup
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const SidebarItemGroup: React.FC<SidebarItemGroupProps> = ({
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
  groupId,
  groupLabel,
  icon,
  items = [],
  expanded = false,
  onToggle,
  activeItemId,
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
      className={`tf-sidebar-item-group ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-sidebar-item-group__header">
          <span className="tf-sidebar-item-group__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-sidebar-item-group__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-sidebar-item-group__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-sidebar-item-group__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default SidebarItemGroup;
