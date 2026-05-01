/**
 * ============================================================================
 * Torafirma Design System — PanelHeader
 * ============================================================================
 * Panel header with title, actions, and state indicator.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/PanelHeader
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

export interface PanelHeaderProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Header title text. */
  title?: string;
  /** Actions displayed on the right side of the header. */
  actions?: React.ReactNode;
  /** State badge shown next to the title. */
  stateBadge?: TorafirmaComponentState;
  /** Whether the panel can be collapsed. */
  collapsible?: boolean;
  /** Whether the panel is collapsed. */
  collapsed?: boolean;
  /** On collapse toggle. */
  onCollapseToggle?: () => void;
  /** Icon slot before title. */
  icon?: React.ReactNode;
}

/**
 * PanelHeader — Panel header with title, actions, and state indicator.
 *
 * Renders a header strip for panels containing title and action controls within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <PanelHeader
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const PanelHeader: React.FC<PanelHeaderProps> = ({
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
  title,
  actions,
  stateBadge,
  collapsible = false,
  collapsed = false,
  onCollapseToggle,
  icon,
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
      className={`tf-panel-header ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-panel-header__header">
          <span className="tf-panel-header__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-panel-header__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-panel-header__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-panel-header__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default PanelHeader;
