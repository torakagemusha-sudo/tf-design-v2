/**
 * ============================================================================
 * Torafirma Design System — TopCommandBar
 * ============================================================================
 * Primary top command bar providing product identity, workspace context, system status, and global actions.
 *
 * Design System: Dark tactical engineering interface with precision
 * instrumentation. Governed, authority-aware, state-rich.
 *
 * @module   layout-shell/TopCommandBar
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

export interface TopCommandBarProps extends TorafirmaComponentBaseProps {
  /** Optional CSS class name for styling overrides. */
  className?: string;
  /** Child elements rendered inside the component. */
  children?: React.ReactNode;
  /** Optional click handler. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Optional variant for semantic styling. */
  variant?: SemanticVariant;
  /** Product or application name. */
  productName?: string;
  /** Current workspace label. */
  workspaceLabel?: string;
  /** System status indicator. */
  systemStatus?: TorafirmaComponentState;
  /** Active mode label. */
  activeMode?: string;
  /** Command search input placeholder. */
  searchPlaceholder?: string;
  /** User display name. */
  userName?: string;
  /** User authority level badge. */
  userAuthority?: AuthorityLevel;
  /** Left action slot. */
  actionsLeft?: React.ReactNode;
  /** Center action slot. */
  actionsCenter?: React.ReactNode;
  /** Right action slot. */
  actionsRight?: React.ReactNode;
  /** On search callback. */
  onSearch?: (query: string) => void;
}

/**
 * TopCommandBar — Primary top command bar providing product identity, workspace context, system status, and global actions.
 *
 * Renders a fixed top command band with title region, action cluster, and user authority section within the Torafirma Layout & Shell system.
 * Uses semantic `tf-` prefixed CSS classes and integrates with the
 * dark tactical engineering aesthetic.
 *
 * @example
 * ```tsx
 * <TopCommandBar
 *   label="Example"
 *   state="ready"
 *   density="standard"
 * />
 * ```
 */

/* ──────────────────────── Component ──────────────────────── */

const TopCommandBar: React.FC<TopCommandBarProps> = ({
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
  productName,
  workspaceLabel,
  systemStatus = "ready",
  activeMode,
  searchPlaceholder = "Search commands...",
  userName,
  userAuthority,
  actionsLeft,
  actionsCenter,
  actionsRight,
  onSearch,
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
      className={`tf-top-command-bar ${stateClass} ${variantClass} ${densityClass} ${criticalityClass} ${disabledClass} ${className}`}
      role="region"
      aria-label={label}
      aria-description={description}
    >
      {label && (
        <div className="tf-top-command-bar__header">
          <span className="tf-top-command-bar__label">{label}</span>
          {state !== "idle" && (
            <span className={`tf-top-command-bar__state-badge tf-state-badge ${stateClass}`}>
              {state.toUpperCase()}
            </span>
          )}
        </div>
      )}
      <div className="tf-top-command-bar__content">
        {children}
      </div>
      {traceId && (
        <div className="tf-top-command-bar__trace">
          <span className="tf-trace-id">{traceId}</span>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Default Export ─────────────────────── */

export default TopCommandBar;
