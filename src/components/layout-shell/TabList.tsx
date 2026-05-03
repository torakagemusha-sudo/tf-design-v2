/**
 * ============================================================================
 * Torafirma Design System — TabList
 * ============================================================================
 * Horizontal tab list displaying tab triggers.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/TabList
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
  TorafirmaComponentBaseProps,
} from "./types";

/* ──────────────────────────── Interface ─────────────────────────── */

export interface TabListProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Tab items. */
  items?: { id: string; label: string; icon?: React.ReactNode; badge?: string | number; disabled?: boolean; state?: TorafirmaComponentState }[];
  /** Active tab ID. */
  activeTabId?: string;
  /** On tab select. */
  onTabSelect?: (tabId: string) => void;
  /** Tab list visual variant. */
  variant?: "default" | "pills" | "underline" | "bordered";
  /** Whether the tab list is scrollable. */
  scrollable?: boolean;
}

/**
 * TabList — Horizontal tab list displaying tab triggers.
 *
 * Renders a horizontal list of tab triggers for switching between tab panels within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <TabList
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const TabList: React.FC<TabListProps> = ({
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
  variant = "default",
  items = [],
  activeTabId,
  onTabSelect,
  scrollable = true,
}) => {
  const stateClass = `tf-state--${state}`;
  const variantClass = `tf-variant--neutral`;
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
      className={`tf-tab-list ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-tab-list__header">
          <span className="tf-tab-list__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-tab-list__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-tab-list__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-tab-list__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default TabList;
