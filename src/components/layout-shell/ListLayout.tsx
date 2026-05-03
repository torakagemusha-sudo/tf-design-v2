/**
 * ============================================================================
 * Torafirma Design System — ListLayout
 * ============================================================================
 * List-based layout for vertical item stacks.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/ListLayout
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

export interface ListLayoutProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Whether to show dividers between items. */
  dividers?: boolean;
  /** Visual density of list rows (distinct from layout `density`). */
  listDensity?: "compact" | "normal" | "spacious";
  /** Whether items are selectable. */
  selectable?: boolean;
  /** Selected item ID. */
  selectedId?: string;
  /** On item select. */
  onItemSelect?: (itemId: string) => void;
  /** Empty state content. */
  emptyState?: React.ReactNode;
}

/**
 * ListLayout — List-based layout for vertical item stacks.
 *
 * Renders a vertical list layout for displaying items in a stack with optional dividers within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <ListLayout
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const ListLayout: React.FC<ListLayoutProps> = ({
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
  dividers = true,
  listDensity = "normal",
  selectable = false,
  selectedId,
  onItemSelect,
  emptyState,
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
      className={`tf-list-layout ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-list-layout__header">
          <span className="tf-list-layout__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-list-layout__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-list-layout__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-list-layout__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default ListLayout;
