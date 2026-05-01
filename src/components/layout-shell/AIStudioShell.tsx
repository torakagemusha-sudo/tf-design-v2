/**
 * ============================================================================
 * Torafirma Design System — AIStudioShell
 * ============================================================================
 * AI model studio for prompt engineering, model training, and inference management.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/AIStudioShell
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

export interface AIStudioShellProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Studio title. */
  studioTitle?: string;
  /** Model selector slot. */
  modelSelector?: React.ReactNode;
  /** Prompt editor slot. */
  promptEditor?: React.ReactNode;
  /** Inference panel slot. */
  inferencePanel?: React.ReactNode;
  /** Model metrics slot. */
  modelMetrics?: React.ReactNode;
  /** Training monitor slot. */
  trainingMonitor?: React.ReactNode;
}

/**
 * AIStudioShell — AI model studio for prompt engineering, model training, and inference management.
 *
 * Renders an AI model studio shell with purple-themed model controls, prompt editor, and inference monitor within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <AIStudioShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const AIStudioShell: React.FC<AIStudioShellProps> = ({
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
  studioTitle = "AI Studio",
  modelSelector,
  promptEditor,
  inferencePanel,
  modelMetrics,
  trainingMonitor,
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
      className={`tf-ai-studio-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-ai-studio-shell__header">
          <span className="tf-ai-studio-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-ai-studio-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-ai-studio-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-ai-studio-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default AIStudioShell;
