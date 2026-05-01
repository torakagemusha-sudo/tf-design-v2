/**
 * ============================================================================
 * Torafirma Design System — BreadcrumbSeparator
 * ============================================================================
 * Breadcrumb separator element between items.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/BreadcrumbSeparator
 * @family   layout-shell
 * @product  Torafirma
 * @system   Command Dark
 * ============================================================================
 */

import React from "react";
import type {
  TorafirmaComponentState,
  SemanticVariant,
  TorafirmaComponentBaseProps,
} from "./types";

/* ──────────────────────────── Interface ─────────────────────────── */

export interface BreadcrumbSeparatorProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Separator type. */
  type?: "chevron" | "slash" | "arrow" | "dot";
}

/**
 * BreadcrumbSeparator — Breadcrumb separator element between items.
 *
 * a separator glyph between breadcrumb items
 */

const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
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
  variant = "neutral",
  type = "chevron",
}) => {
  return (
    <div
      id={id}
      data-testid={testId}
      data-trace-id={traceId}
      data-state={state}
      data-variant={variant}
      data-disabled={disabled}
      className={`tf-breadcrumb-separator tf-state--${state} tf-variant--${variant} tf-density--${density} tf-criticality--${criticality}${disabled ? " tf-disabled" : ""}${className ? " " + className : ""}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {children}
    </div>
  );
};

export default BreadcrumbSeparator;
