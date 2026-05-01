/**
 * ============================================================================
 * Torafirma Design System — LeftNavRailCollapsed
 * ============================================================================
 * Icon-only collapsed navigation rail for maximum workspace area.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/LeftNavRailCollapsed
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

export interface LeftNavRailCollapsedProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Navigation items. */
  items?: { id: string; label: string; icon: React.ReactNode; href?: string; state?: TorafirmaComponentState; badge?: string | number }[];
  /** Currently active item ID. */
  activeItemId?: string;
  /** On item select callback. */
  onItemSelect?: (itemId: string) => void;
  /** Toggle expand callback. */
  onExpand?: () => void;
}

/**
 * LeftNavRailCollapsed — Icon-only collapsed navigation rail for maximum workspace area.
 *
 * Renders a minimized vertical nav rail showing only icons with tooltips on hover within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <LeftNavRailCollapsed
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const LeftNavRailCollapsed: React.FC<LeftNavRailCollapsedProps> = ({
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
  items = [],
  activeItemId,
  onItemSelect,
  onExpand,
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
      className={`tf-left-nav-rail-collapsed ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-left-nav-rail-collapsed__header">
          <span className="tf-left-nav-rail-collapsed__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-left-nav-rail-collapsed__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-left-nav-rail-collapsed__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-left-nav-rail-collapsed__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default LeftNavRailCollapsed;
