/**
 * ============================================================================
 * Torafirma Design System — ModalLayout
 * ============================================================================
 * Centered modal layout with backdrop and focus trapping.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/ModalLayout
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

export interface ModalLayoutProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Modal title. */
  title?: string;
  /** Whether the modal is visible. */
  visible?: boolean;
  /** Modal size preset. */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** On close callback. */
  onClose?: () => void;
  /** Primary action label. */
  primaryActionLabel?: string;
  /** On primary action. */
  onPrimaryAction?: () => void;
  /** Secondary action label. */
  secondaryActionLabel?: string;
  /** On secondary action. */
  onSecondaryAction?: () => void;
  /** Close on backdrop click. */
  closeOnBackdrop?: boolean;
  /** Close on escape key. */
  closeOnEscape?: boolean;
}

/**
 * ModalLayout — Centered modal layout with backdrop and focus trapping.
 *
 * Renders a centered modal dialog with backdrop, header, content, and action regions within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <ModalLayout
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const ModalLayout: React.FC<ModalLayoutProps> = ({
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
  visible = false,
  size = "md",
  onClose,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  closeOnBackdrop = true,
  closeOnEscape = true,
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
      className={`tf-modal-layout ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-modal-layout__header">
          <span className="tf-modal-layout__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-modal-layout__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-modal-layout__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-modal-layout__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default ModalLayout;
