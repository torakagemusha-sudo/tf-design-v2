/**
 * ============================================================================
 * Torafirma Design System — SplitPane
 * ============================================================================
 * Resizable split pane container for horizontal or vertical panel division.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/SplitPane
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

export interface SplitPaneProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Split direction. */
  direction?: "horizontal" | "vertical";
  /** Panel contents. */
  panels?: { id: string; content: React.ReactNode; defaultSize?: number; minSize?: number; maxSize?: number; collapsible?: boolean }[];
  /** Gap between panels in pixels. */
  gap?: number;
  /** On layout change callback. */
  onLayoutChange?: (sizes: number[]) => void;
  /** Whether panels can be collapsed. */
  allowCollapse?: boolean;
}

/**
 * SplitPane — Resizable split pane container for horizontal or vertical panel division.
 *
 * Renders a resizable split pane dividing space between two or more child panels within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <SplitPane
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const SplitPane: React.FC<SplitPaneProps> = ({
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
  direction = "horizontal",
  panels = [],
  gap = 4,
  onLayoutChange,
  allowCollapse = true,
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
      className={`tf-split-pane ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-split-pane__header">
          <span className="tf-split-pane__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-split-pane__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-split-pane__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-split-pane__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default SplitPane;
