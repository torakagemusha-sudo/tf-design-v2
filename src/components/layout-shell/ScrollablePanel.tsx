/**
 * ============================================================================
 * Torafirma Design System — ScrollablePanel
 * ============================================================================
 * Panel with custom-styled scrollbar for scrollable content.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/ScrollablePanel
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

export interface ScrollablePanelProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Scroll direction. */
  direction?: "both" | "vertical" | "horizontal";
  /** Whether to show scroll shadow indicators. */
  scrollShadows?: boolean;
  /** Whether to auto-hide the scrollbar. */
  autoHideScrollbar?: boolean;
  /** Maximum height before scrolling. */
  maxHeight?: number | string;
  /** Maximum width before scrolling. */
  maxWidth?: number | string;
}

/**
 * ScrollablePanel — Panel with custom-styled scrollbar for scrollable content.
 *
 * Renders a panel featuring a custom-styled scrollbar for consistent visual appearance within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <ScrollablePanel
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const ScrollablePanel: React.FC<ScrollablePanelProps> = ({
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
  direction = "vertical",
  scrollShadows = true,
  autoHideScrollbar = true,
  maxHeight,
  maxWidth,
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
      className={`tf-scrollable-panel ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-scrollable-panel__header">
          <span className="tf-scrollable-panel__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-scrollable-panel__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-scrollable-panel__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-scrollable-panel__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default ScrollablePanel;
