/**
 * ============================================================================
 * Torafirma Design System — RightInspector
 * ============================================================================
 * Right-side inspector panel for selected object details, properties, and actions.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/RightInspector
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

export interface RightInspectorProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Inspector title. */
  title?: string;
  /** Inspector subtitle or target name. */
  subtitle?: string;
  /** Content tabs for the inspector. */
  tabs?: { id: string; label: string; content: React.ReactNode }[];
  /** Active tab ID. */
  activeTabId?: string;
  /** On tab change callback. */
  onTabChange?: (tabId: string) => void;
  /** On close callback. */
  onClose?: () => void;
  /** Whether the inspector is visible. */
  open?: boolean;
  /** Panel width in pixels. */
  width?: number;
}

/**
 * RightInspector — Right-side inspector panel for selected object details, properties, and actions.
 *
 * Renders a right-side inspector surface showing detailed information about the currently selected object within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <RightInspector
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const RightInspector: React.FC<RightInspectorProps> = ({
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
  subtitle,
  tabs = [],
  activeTabId,
  onTabChange,
  onClose,
  open = true,
  width = 320,
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
      className={`tf-right-inspector ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-right-inspector__header">
          <span className="tf-right-inspector__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-right-inspector__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-right-inspector__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-right-inspector__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default RightInspector;
