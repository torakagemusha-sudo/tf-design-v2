/**
 * ============================================================================
 * Torafirma Design System — RightInspectorTabbed
 * ============================================================================
 * Tabbed right-side inspector panel with multiple content views.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/RightInspectorTabbed
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

export interface RightInspectorTabbedProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Inspector tabs. */
  tabs?: { id: string; label: string; icon?: React.ReactNode; content: React.ReactNode; badge?: string | number }[];
  /** Active tab ID. */
  activeTabId?: string;
  /** On tab change callback. */
  onTabChange?: (tabId: string) => void;
  /** On close callback. */
  onClose?: () => void;
  /** Panel width in pixels. */
  width?: number;
  /** Whether the inspector is visible. */
  open?: boolean;
}

/**
 * RightInspectorTabbed — Tabbed right-side inspector panel with multiple content views.
 *
 * Renders a tabbed inspector with multiple content views switchable via tab headers within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <RightInspectorTabbed
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const RightInspectorTabbed: React.FC<RightInspectorTabbedProps> = ({
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
  onTabChange,
  onClose,
  width = 320,
  open = true,
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
      className={`tf-right-inspector-tabbed ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-right-inspector-tabbed__header">
          <span className="tf-right-inspector-tabbed__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-right-inspector-tabbed__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-right-inspector-tabbed__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-right-inspector-tabbed__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default RightInspectorTabbed;
