/**
 * ============================================================================
 * Torafirma Design System — BreadcrumbItem
 * ============================================================================
 * Individual breadcrumb item with link and state.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/BreadcrumbItem
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

export interface BreadcrumbItemProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Item ID. */
  itemId: string;
  /** Item label. */
  itemLabel: string;
  /** Optional href. */
  href?: string;
  /** Item icon. */
  icon?: React.ReactNode;
  /** Whether this is the current (last) item. */
  current?: boolean;
  /** Item authority level. */
  itemAuthority?: AuthorityLevel;
  /** On click callback. */
  onClick?: (itemId: string) => void;
}

/**
 * BreadcrumbItem — Individual breadcrumb item with link and state.
 *
 * Renders a single breadcrumb segment with label, optional link, and state indicator within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <BreadcrumbItem
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
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
  itemId,
  itemLabel,
  href,
  icon,
  current = false,
  itemAuthority,
  onClick,
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
      className={`tf-breadcrumb-item ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-breadcrumb-item__header">
          <span className="tf-breadcrumb-item__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-breadcrumb-item__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-breadcrumb-item__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-breadcrumb-item__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default BreadcrumbItem;
