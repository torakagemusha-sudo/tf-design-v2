/**
 * ============================================================================
 * Torafirma Design System — BuilderStudioShell
 * ============================================================================
 * Builder/Studio layout for visual workflow construction and artifact editing.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/BuilderStudioShell
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

export interface BuilderStudioShellProps extends TorafirmaComponentBaseProps {
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
  /** Palette slot for draggable components. */
  palette?: React.ReactNode;
  /** Canvas workspace slot. */
  canvas?: React.ReactNode;
  /** Property inspector slot. */
  inspector?: React.ReactNode;
  /** Toolbar actions. */
  toolbarActions?: React.ReactNode;
  /** Whether the palette is visible. */
  paletteVisible?: boolean;
  /** Whether the inspector is visible. */
  inspectorVisible?: boolean;
}

/**
 * BuilderStudioShell — Builder/Studio layout for visual workflow construction and artifact editing.
 *
 * Renders a builder studio shell with component palette, canvas workspace, and property inspector within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <BuilderStudioShell
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const BuilderStudioShell: React.FC<BuilderStudioShellProps> = ({
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
  studioTitle = "Builder Studio",
  palette,
  canvas,
  inspector,
  toolbarActions,
  paletteVisible = true,
  inspectorVisible = true,
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
      className={`tf-builder-studio-shell ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-builder-studio-shell__header">
          <span className="tf-builder-studio-shell__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-builder-studio-shell__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-builder-studio-shell__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-builder-studio-shell__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default BuilderStudioShell;
