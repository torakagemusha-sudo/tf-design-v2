/**
 * ============================================================================
 * Torafirma Design System — BottomTraceConsoleMinimized
 * ============================================================================
 * Minimized trace bar showing a compact summary of trace status and recent events.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/BottomTraceConsoleMinimized
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

export interface BottomTraceConsoleMinimizedProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Latest log entry preview. */
  lastLogPreview?: string;
  /** Log count badge. */
  logCount?: number;
  /** Error count badge. */
  errorCount?: number;
  /** On expand callback. */
  onExpand?: () => void;
  /** Trace state. */
  traceState?: TorafirmaComponentState;
}

/**
 * BottomTraceConsoleMinimized — Minimized trace bar showing a compact summary of trace status and recent events.
 *
 * Renders a minimized bottom bar showing trace status summary with expand control within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <BottomTraceConsoleMinimized
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const BottomTraceConsoleMinimized: React.FC<BottomTraceConsoleMinimizedProps> = ({
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
  lastLogPreview,
  logCount = 0,
  errorCount = 0,
  onExpand,
  traceState = "idle",
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
      className={`tf-bottom-trace-console-minimized ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-bottom-trace-console-minimized__header">
          <span className="tf-bottom-trace-console-minimized__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-bottom-trace-console-minimized__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-bottom-trace-console-minimized__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-bottom-trace-console-minimized__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default BottomTraceConsoleMinimized;
