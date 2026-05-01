/**
 * ============================================================================
 * Torafirma Design System — LeftNavRail
 * ============================================================================
 * Vertical navigation rail with icon and label pairs for major module navigation.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/LeftNavRail
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

export interface LeftNavRailProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Navigation items organized by section. */
  items?: { id: string; label: string; icon: React.ReactNode; href?: string; state?: TorafirmaComponentState; badge?: string | number }[];
  /** Currently active item ID. */
  activeItemId?: string;
  /** Whether the rail is collapsed to icons only. */
  collapsed?: boolean;
  /** Rail width in pixels when expanded. */
  expandedWidth?: number;
  /** On item select callback. */
  onItemSelect?: (itemId: string) => void;
  /** Bottom slot for rail footer items. */
  footerItems?: React.ReactNode;
  /** Product logo slot. */
  logo?: React.ReactNode;
}

/**
 * LeftNavRail — Vertical navigation rail with icon and label pairs for major module navigation.
 *
 * Renders a left-side vertical navigation rail with icon + label navigation items grouped by section within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <LeftNavRail
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const LeftNavRail: React.FC<LeftNavRailProps> = ({
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
  collapsed = false,
  expandedWidth = 240,
  onItemSelect,
  footerItems,
  logo,
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
      className={`tf-left-nav-rail ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-left-nav-rail__header">
          <span className="tf-left-nav-rail__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-left-nav-rail__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-left-nav-rail__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-left-nav-rail__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default LeftNavRail;
