/**
 * ============================================================================
 * Torafirma Design System — TitleBar
 * ============================================================================
 * Window or panel title bar with title and control buttons.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/TitleBar
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

export interface TitleBarProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Window title. */
  title?: string;
  /** Subtitle or context. */
  subtitle?: string;
  /** Icon slot. */
  icon?: React.ReactNode;
  /** Whether the window is maximized. */
  maximized?: boolean;
  /** Whether the window is minimized. */
  minimized?: boolean;
  /** On minimize. */
  onMinimize?: () => void;
  /** On maximize/restore. */
  onMaximize?: () => void;
  /** On close. */
  onClose?: () => void;
  /** Whether the bar is draggable. */
  draggable?: boolean;
  /** On drag start. */
  onDragStart?: () => void;
}

/**
 * TitleBar — Window or panel title bar with title and control buttons.
 *
 * Renders a title bar strip with window title and minimize/maximize/close controls within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <TitleBar
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const TitleBar: React.FC<TitleBarProps> = ({
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
  icon,
  maximized = false,
  minimized = false,
  onMinimize,
  onMaximize,
  onClose,
  draggable = false,
  onDragStart,
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
      className={`tf-title-bar ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-title-bar__header">
          <span className="tf-title-bar__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-title-bar__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-title-bar__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-title-bar__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default TitleBar;
