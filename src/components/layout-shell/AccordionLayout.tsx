/**
 * ============================================================================
 * Torafirma Design System — AccordionLayout
 * ============================================================================
 * Accordion layout with expandable/collapsible sections.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/AccordionLayout
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

export interface AccordionLayoutProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Accordion sections. */
  sections?: { id: string; header: React.ReactNode; content: React.ReactNode; disabled?: boolean; state?: TorafirmaComponentState }[];
  /** Whether multiple sections can be open simultaneously. */
  allowMultiple?: boolean;
  /** Default expanded section IDs. */
  defaultExpanded?: string[];
  /** On section toggle. */
  onSectionToggle?: (sectionId: string, expanded: boolean) => void;
}

/**
 * AccordionLayout — Accordion layout with expandable/collapsible sections.
 *
 * Renders an accordion container managing multiple expandable sections where only one may be open at a time within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <AccordionLayout
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const AccordionLayout: React.FC<AccordionLayoutProps> = ({
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
  sections = [],
  allowMultiple = false,
  defaultExpanded = [],
  onSectionToggle,
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
      className={`tf-accordion-layout ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-accordion-layout__header">
          <span className="tf-accordion-layout__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-accordion-layout__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-accordion-layout__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-accordion-layout__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default AccordionLayout;
