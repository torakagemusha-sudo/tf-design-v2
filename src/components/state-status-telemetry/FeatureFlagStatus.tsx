/**
 * ============================================================
 * FeatureFlagStatus — Torafirma Design System
 * ============================================================
 *
 * Feature flag state indicator. Shows whether a feature flag
 * is enabled or disabled with rollout percentage.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Feature flag states.
 */
export type FeatureFlagState = 'enabled' | 'disabled' | 'partial' | 'deprecated';

/**
 * Props for the FeatureFlagStatus component.
 */
export interface FeatureFlagStatusProps {
  /** Feature flag name. */
  name: string;
  /** Current flag state. */
  state: FeatureFlagState;
  /** Rollout percentage (0-100). */
  rolloutPercent?: number;
  /** Description of the feature. */
  description?: string;
  /** Whether the flag is in an experiment. */
  isExperiment?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const flagMeta: Record<FeatureFlagState, { label: string; variant: string }> = {
  enabled: { label: 'ON', variant: 'run' },
  disabled: { label: 'OFF', variant: 'neutral' },
  partial: { label: 'PARTIAL', variant: 'warning' },
  deprecated: { label: 'DEPRECATED', variant: 'instability' },
};

/**
 * FeatureFlagStatus renders a feature flag state indicator.
 *
 * @example
 * ```tsx
 * <FeatureFlagStatus name="new-dashboard" state="partial" rolloutPercent={50} description="New dashboard UI" isExperiment={true} />
 * ```
 */
export const FeatureFlagStatus: React.FC<FeatureFlagStatusProps> = ({
  name,
  state,
  rolloutPercent,
  description,
  isExperiment,
  className = '',
  testId,
}) => {
  const meta = flagMeta[state];

  return (
    <div
      className={`tf-feature-flag-status tf-feature-flag-status--${meta.variant} tf-feature-flag-status--${state} ${className}`}
      data-testid={testId}
      data-flag-state={state}
      role="status"
      aria-label={`Feature ${name}: ${meta.label}`}
    >
      <span className="tf-feature-flag-status__name">{name}</span>
      <span className={`tf-feature-flag-status__badge tf-feature-flag-status__badge--${meta.variant}`}>
        {meta.label}
      </span>
      {isExperiment && <span className="tf-feature-flag-status__experiment">EXP</span>}
      {rolloutPercent !== undefined && state === 'partial' && (
        <span className="tf-feature-flag-status__rollout">{rolloutPercent}%</span>
      )}
      {description && <span className="tf-feature-flag-status__description">{description}</span>}
    </div>
  );
};

FeatureFlagStatus.displayName = 'FeatureFlagStatus';

export default FeatureFlagStatus;
