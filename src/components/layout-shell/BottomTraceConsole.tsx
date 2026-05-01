/**
 * ============================================================================
 * Torafirma Design System — BottomTraceConsole
 * ============================================================================
 * Bottom trace console panel for logs, execution trace, diagnostics, and event streams.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/BottomTraceConsole
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

export interface BottomTraceConsoleProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Console title. */
  title?: string;
  /** Trace log entries. */
  logs?: { id: string; timestamp: string; level: "info" | "warn" | "error" | "debug"; message: string; traceId?: string }[];
  /** On log click callback. */
  onLogClick?: (logId: string) => void;
  /** On clear callback. */
  onClear?: () => void;
  /** Panel height in pixels. */
  height?: number;
  /** Whether auto-scroll is enabled. */
  autoScroll?: boolean;
  /** Filter input value. */
  filter?: string;
  /** On filter change. */
  onFilterChange?: (filter: string) => void;
}

/**
 * BottomTraceConsole — Bottom trace console panel for logs, execution trace, diagnostics, and event streams.
 *
 * Renders a bottom panel showing execution trace, event logs, and diagnostic output in a terminal-inspired interface within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <BottomTraceConsole
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const BottomTraceConsole: React.FC<BottomTraceConsoleProps> = ({
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
  title = "Execution Trace",
  logs = [],
  onLogClick,
  onClear,
  height = 200,
  autoScroll = true,
  filter,
  onFilterChange,
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
      className={`tf-bottom-trace-console ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-bottom-trace-console__header">
          <span className="tf-bottom-trace-console__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-bottom-trace-console__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-bottom-trace-console__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-bottom-trace-console__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default BottomTraceConsole;
