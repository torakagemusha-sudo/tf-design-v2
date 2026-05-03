/**
 * ============================================================================
 * Torafirma Design System — Card
 * ============================================================================
 * Card container with header, content, footer, and semantic variant styling.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/Card
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

export interface CardProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Card title. */
  title?: string;
  /** Subtitle. */
  subtitle?: string;
  /** Header actions. */
  headerActions?: React.ReactNode;
  /** Footer content. */
  footer?: React.ReactNode;
  /** Whether the card is clickable. */
  clickable?: boolean;
  /** Hover effect. */
  hoverable?: boolean;
  /** Border style. */
  bordered?: boolean;
}

/**
 * Card — Card container with header, content, footer, and semantic variant styling.
 *
 * Renders a modular card container with header, content, and footer regions within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <Card
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const Card: React.FC<CardProps> = ({
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
  headerActions,
  footer,
  clickable = false,
  hoverable = false,
  bordered = true,
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
      className={`tf-card ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-card__header">
          <span className="tf-card__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-card__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-card__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-card__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default Card;
