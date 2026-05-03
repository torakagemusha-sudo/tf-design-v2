/**
 * ============================================================================
 * Torafirma Design System — SidebarItem
 * ============================================================================
 * Individual sidebar navigation item with icon, label, and state.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/SidebarItem
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

export interface SidebarItemProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Item ID. */
  itemId: string;
  /** Item label. */
  itemLabel: string;
  /** Item icon. */
  icon?: React.ReactNode;
  /** Whether the item is active. */
  active?: boolean;
  /** Item state. */
  itemState?: TorafirmaComponentState;
  /** Badge text or count. */
  badge?: string | number;
  /** Href for link behavior. */
  href?: string;
}

/**
 * SidebarItem — Individual sidebar navigation item with icon, label, and state.
 *
 * Renders a single navigation item within a sidebar section within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <SidebarItem
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const SidebarItem: React.FC<SidebarItemProps> = ({
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
  itemId,
  itemLabel,
  icon,
  active = false,
  itemState = "idle",
  badge,
  href,
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
      className={`tf-sidebar-item ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-sidebar-item__header">
          <span className="tf-sidebar-item__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-sidebar-item__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-sidebar-item__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-sidebar-item__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default SidebarItem;
