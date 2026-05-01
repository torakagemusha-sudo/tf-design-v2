/**
 * ============================================================================
 * Torafirma Design System — DockPanelHeader
 * ============================================================================
 * Dock panel header with title, tab list, and window controls.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/DockPanelHeader
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

export interface DockPanelHeaderProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Panel title. */
  title?: string;
  /** Tabs displayed in the header. */
  tabs?: { id: string; label: string; icon?: React.ReactNode; active?: boolean; closable?: boolean }[];
  /** On tab click. */
  onTabClick?: (tabId: string) => void;
  /** On tab close. */
  onTabClose?: (tabId: string) => void;
  /** On float toggle. */
  onFloatToggle?: () => void;
  /** On maximize toggle. */
  onMaximizeToggle?: () => void;
  /** On close panel. */
  onClose?: () => void;
}

/**
 * DockPanelHeader — Dock panel header with title, tab list, and window controls.
 *
 * Renders a header strip for dock panels containing tab labels and control buttons within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <DockPanelHeader
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const DockPanelHeader: React.FC<DockPanelHeaderProps> = ({
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
  tabs = [],
  onTabClick,
  onTabClose,
  onFloatToggle,
  onMaximizeToggle,
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
      className={`tf-dock-panel-header ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-dock-panel-header__header">
          <span className="tf-dock-panel-header__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-dock-panel-header__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-dock-panel-header__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-dock-panel-header__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default DockPanelHeader;
