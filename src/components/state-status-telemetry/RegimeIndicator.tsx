/**
 * ============================================================
 * RegimeIndicator — Torafirma Design System
 * ============================================================
 *
 * Displays the active regime classification with full context.
 * Regimes represent operational modes such as normal, degraded,
 * emergency, maintenance, or simulation.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../types';

/**
 * Operational regime classifications.
 */
export type RegimeType = 'normal' | 'degraded' | 'emergency' | 'maintenance' | 'simulation' | 'lockdown' | 'startup' | 'shutdown';

/**
 * Props for the RegimeIndicator component.
 */
export interface RegimeIndicatorProps {
  /** Currently active regime. */
  regime: RegimeType;
  /** Optional description of why this regime is active. */
  reason?: string;
  /** Time the regime has been active. */
  duration?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Whether to show the duration. */
  showDuration?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const regimeMeta: Record<RegimeType, { label: string; variant: string }> = {
  normal: { label: 'NORMAL OPERATIONS', variant: 'run' },
  degraded: { label: 'DEGRADED MODE', variant: 'instability' },
  emergency: { label: 'EMERGENCY MODE', variant: 'danger' },
  maintenance: { label: 'MAINTENANCE MODE', variant: 'inspect' },
  simulation: { label: 'SIMULATION MODE', variant: 'model' },
  lockdown: { label: 'LOCKDOWN', variant: 'authority' },
  startup: { label: 'STARTING UP', variant: 'stream' },
  shutdown: { label: 'SHUTTING DOWN', variant: 'warning' },
};

/**
 * RegimeIndicator shows the active operational regime.
 *
 * @example
 * ```tsx
 * <RegimeIndicator regime="normal" />
 * <RegimeIndicator regime="degraded" reason="High CPU load" duration="12m 30s" />
 * ```
 */
export const RegimeIndicator: React.FC<RegimeIndicatorProps> = ({
  regime,
  reason,
  duration,
  density = 'standard',
  showDuration = true,
  className = '',
  testId,
}) => {
  const meta = regimeMeta[regime];
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-regime-indicator tf-regime-indicator--${meta.variant} tf-regime-indicator--${regime} ${densityClass} ${className}`}
      data-testid={testId}
      data-regime={regime}
      role="status"
      aria-label={`Regime: ${meta.label}`}
    >
      <span className={`tf-regime-indicator__badge tf-regime-indicator__badge--${meta.variant}`} aria-hidden="true" />
      <div className="tf-regime-indicator__content">
        <span className="tf-regime-indicator__label">{meta.label}</span>
        {reason && <span className="tf-regime-indicator__reason">{reason}</span>}
        {showDuration && duration && (
          <span className="tf-regime-indicator__duration">Active: {duration}</span>
        )}
      </div>
    </div>
  );
};

RegimeIndicator.displayName = 'RegimeIndicator';

export default RegimeIndicator;
