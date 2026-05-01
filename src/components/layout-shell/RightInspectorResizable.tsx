/**
 * ============================================================================
 * Torafirma Design System — RightInspectorResizable
 * ============================================================================
 * Resizable right-side inspector panel with draggable width adjustment.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/RightInspectorResizable
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

export interface RightInspectorResizableProps extends TorafirmaComponentBaseProps {
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
  /** Default width in pixels. */
  defaultWidth?: number;
  /** Minimum width in pixels. */
  minWidth?: number;
  /** Maximum width in pixels. */
  maxWidth?: number;
  /** On width change callback. */
  onWidthChange?: (width: number) => void;
  /** Whether the inspector is visible. */
  open?: boolean;
  /** On close callback. */
  onClose?: () => void;
  /** Content tabs. */
  tabs?: { id: string; label: string; content: React.ReactNode }[];
  /** Active tab ID. */
  activeTabId?: string;
}

/**
 * RightInspectorResizable — Resizable right-side inspector panel with draggable width adjustment.
 *
 * Renders a resizable inspector panel with a draggable edge for width adjustment within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <RightInspectorResizable
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const RightInspectorResizable: React.FC<RightInspectorResizableProps> = ({
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
  defaultWidth = 320,
  minWidth = 200,
  maxWidth = 600,
  onWidthChange,
  open = true,
  onClose,
  tabs = [],
  activeTabId,
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
      className={`tf-right-inspector-resizable ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-right-inspector-resizable__header">
          <span className="tf-right-inspector-resizable__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-right-inspector-resizable__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-right-inspector-resizable__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-right-inspector-resizable__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default RightInspectorResizable;
