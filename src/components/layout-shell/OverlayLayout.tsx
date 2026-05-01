/**
 * ============================================================================
 * Torafirma Design System — OverlayLayout
 * ============================================================================
 * Layout with overlay support for floating panels, modals, and popovers.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/OverlayLayout
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

export interface OverlayLayoutProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Base content slot. */
  baseContent?: React.ReactNode;
  /** Overlay content slot. */
  overlayContent?: React.ReactNode;
  /** Whether the overlay is visible. */
  overlayVisible?: boolean;
  /** Overlay backdrop opacity. */
  backdropOpacity?: number;
  /** On backdrop click. */
  onBackdropClick?: () => void;
  /** Whether the overlay blocks pointer events on base content. */
  blocking?: boolean;
}

/**
 * OverlayLayout — Layout with overlay support for floating panels, modals, and popovers.
 *
 * Renders a layout container that supports overlay layers above primary content within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <OverlayLayout
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const OverlayLayout: React.FC<OverlayLayoutProps> = ({
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
  baseContent,
  overlayContent,
  overlayVisible = false,
  backdropOpacity = 0.5,
  onBackdropClick,
  blocking = true,
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
      className={`tf-overlay-layout ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-overlay-layout__header">
          <span className="tf-overlay-layout__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-overlay-layout__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-overlay-layout__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-overlay-layout__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default OverlayLayout;
