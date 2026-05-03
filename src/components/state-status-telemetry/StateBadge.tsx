/**
 * ============================================================
 * StateBadge — Torafirma Design System
 * ============================================================
 *
 * Displays a single component state with semantic color, icon, and label.
 * States: idle, ready, live, staged, dirty, locked, fault, degraded,
 *         signed, model, sim (and canonical states from the design system).
 *
 * From 03.2 State, Status & Telemetry — Section 3.2 State Components
 * ============================================================
 */

import React from 'react';
import type { TorafirmaComponentState, ComponentDensity, ComponentCriticality } from '../../types';

/**
 * Props for the StateBadge component.
 */
export interface StateBadgeProps {
  /** The canonical state to display. */
  state: TorafirmaComponentState | 'idle' | 'ready' | 'live' | 'staged' | 'dirty' | 'locked' | 'fault' | 'degraded' | 'signed' | 'model' | 'sim';
  /** Optional override label (defaults to uppercase state name). */
  label?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Whether to show the icon alongside the label. */
  showIcon?: boolean;
  /** Optional icon override. */
  icon?: React.ReactNode;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * Maps states to their semantic CSS class suffixes.
 */
const stateClassMap: Record<string, string> = {
  idle: 'neutral',
  ready: 'run',
  live: 'run',
  staged: 'warning',
  dirty: 'warning',
  locked: 'authority',
  fault: 'danger',
  degraded: 'instability',
  signed: 'authority',
  model: 'model',
  sim: 'model',
  validating: 'stream',
  valid: 'run',
  warning: 'warning',
  blocked: 'danger',
  running: 'stream',
  complete: 'run',
  simulated: 'model',
  committed: 'authority',
  deployed: 'run',
  disconnected: 'neutral',
};

/**
 * Maps states to default display labels.
 */
const stateLabelMap: Record<string, string> = {
  idle: 'IDLE',
  ready: 'READY',
  live: 'LIVE',
  staged: 'STAGED',
  dirty: 'DIRTY',
  locked: 'LOCKED',
  fault: 'FAULT',
  degraded: 'DEGRADED',
  signed: 'SIGNED',
  model: 'MODEL',
  sim: 'SIM',
  validating: 'VALIDATING',
  valid: 'VALID',
  warning: 'WARNING',
  blocked: 'BLOCKED',
  running: 'RUNNING',
  complete: 'COMPLETE',
  simulated: 'SIMULATED',
  committed: 'COMMITTED',
  deployed: 'DEPLOYED',
  disconnected: 'DISCONNECTED',
};

/**
 * StateBadge displays a component state with semantic color and icon.
 *
 * @example
 * ```tsx
 * <StateBadge state="ready" />
 * <StateBadge state="fault" density="compact" showIcon={false} />
 * ```
 */
export const StateBadge: React.FC<StateBadgeProps> = ({
  state,
  label,
  density = 'standard',
  showIcon = true,
  icon,
  className = '',
  testId,
}) => {
  const variant = stateClassMap[state] || 'neutral';
  const displayLabel = label || stateLabelMap[state] || state.toUpperCase();
  const densityClass = `tf-density-${density}`;

  return (
    <span
      className={`tf-state-badge tf-state-badge--${variant} tf-state-badge--${state} ${densityClass} ${className}`}
      data-testid={testId}
      data-state={state}
      role="status"
      aria-label={`State: ${displayLabel}`}
    >
      {showIcon && (
        <span className="tf-state-badge__icon" aria-hidden="true">
          {icon || <span className={`tf-state-badge__dot tf-state-badge__dot--${variant}`} />}
        </span>
      )}
      <span className="tf-state-badge__label">{displayLabel}</span>
    </span>
  );
};

StateBadge.displayName = 'StateBadge';

export default StateBadge;
