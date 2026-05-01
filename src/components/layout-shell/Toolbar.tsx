/**
 * ============================================================================
 * Torafirma Design System — Toolbar
 * ============================================================================
 * Generic toolbar containing action buttons, groups, and separators.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/Toolbar
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

export interface ToolbarProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Toolbar items (actions, groups, separators). */
  items?: { id: string; type: "action" | "group" | "separator" | "spacer"; label?: string; icon?: React.ReactNode; onClick?: () => void; variant?: SemanticVariant; disabled?: boolean }[];
  /** Toolbar size. */
  size?: "sm" | "md" | "lg";
  /** Whether the toolbar is sticky/fixed. */
  sticky?: boolean;
  /** Position when sticky. */
  stickyPosition?: "top" | "bottom";
}

/**
 * Toolbar — Generic toolbar containing action buttons, groups, and separators.
 *
 * Renders a horizontal toolbar band containing grouped actions, separators, and spacers within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <Toolbar
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const Toolbar: React.FC<ToolbarProps> = ({
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
  size = "md",
  sticky = false,
  stickyPosition = "top",
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
      className={`tf-toolbar ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-toolbar__header">
          <span className="tf-toolbar__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-toolbar__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-toolbar__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-toolbar__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default Toolbar;
