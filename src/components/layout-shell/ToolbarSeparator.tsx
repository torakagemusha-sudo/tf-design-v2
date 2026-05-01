/**
 * ============================================================================
 * Torafirma Design System — ToolbarSeparator
 * ============================================================================
 * Visual separator dividing toolbar groups.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/ToolbarSeparator
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

export interface ToolbarSeparatorProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
}

/**
 * ToolbarSeparator — Visual separator dividing toolbar groups.
 *
 * a vertical separator line dividing toolbar groups
 */

const ToolbarSeparator: React.FC<ToolbarSeparatorProps> = ({
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
}) => {
  return (
    <div
      id={id}
      data-testid={testId}
      data-trace-id={traceId}
      data-state={state}
      data-variant={variant}
      data-disabled={disabled}
      className={`tf-toolbar-separator tf-state--${state} tf-variant--${variant} tf-density--${density} tf-criticality--${criticality}${disabled ? " tf-disabled" : ""}${className ? " " + className : ""}`}
      role="separator"
      aria-label={label}
      aria-description={description}
    >
      {children}
    </div>
  );
};

export default ToolbarSeparator;
