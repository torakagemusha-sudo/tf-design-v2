/**
 * ============================================================================
 * Torafirma Design System — DockPanel
 * ============================================================================
 * Dockable panel container supporting tabbed content and drag-to-dock behavior.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/DockPanel
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

export interface DockPanelProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Panel tabs. */
  tabs?: { id: string; label: string; icon?: React.ReactNode; content: React.ReactNode; closable?: boolean }[];
  /** Active tab ID. */
  activeTabId?: string;
  /** On tab change. */
  onTabChange?: (tabId: string) => void;
  /** On tab close. */
  onTabClose?: (tabId: string) => void;
  /** Panel title when floating. */
  panelTitle?: string;
  /** Whether the panel is floating. */
  floating?: boolean;
  /** Current dock position. */
  dockPosition?: "left" | "right" | "top" | "bottom" | "center";
}

/**
 * DockPanel — Dockable panel container supporting tabbed content and drag-to-dock behavior.
 *
 * Renders a dockable panel with tabbed content that can be rearranged within dock zones within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <DockPanel
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const DockPanel: React.FC<DockPanelProps> = ({
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
  onTabClose,
  panelTitle,
  floating = false,
  dockPosition = "center",
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
      className={`tf-dock-panel ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-dock-panel__header">
          <span className="tf-dock-panel__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-dock-panel__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-dock-panel__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-dock-panel__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default DockPanel;
