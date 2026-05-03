/**
 * ============================================================================
 * Torafirma Design System — TabItem
 * ============================================================================
 * Individual tab trigger with label, icon, and state indicator.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/TabItem
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

export interface TabItemProps extends TorafirmaComponentBaseProps {
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
  /** Tab label. */
  tabLabel: string;
  /** Tab icon. */
  icon?: React.ReactNode;
  /** Whether the tab is active. */
  active?: boolean;
  /** Tab state. */
  tabState?: TorafirmaComponentState;
  /** Badge text or count. */
  badge?: string | number;
  /** On select callback. */
  onSelect?: () => void;
  /** On close callback for closable tabs. */
  onClose?: () => void;
}

/**
 * TabItem — Individual tab trigger with label, icon, and state indicator.
 *
 * Renders a single tab trigger button within a tab list within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <TabItem
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const TabItem: React.FC<TabItemProps> = ({
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
  tabState = "idle",
  badge,
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
      className={`tf-tab-item ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-tab-item__header">
          <span className="tf-tab-item__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-tab-item__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-tab-item__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-tab-item__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default TabItem;
