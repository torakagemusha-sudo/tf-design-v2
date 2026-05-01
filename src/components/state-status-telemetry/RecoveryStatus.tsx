/**
 * ============================================================
 * RecoveryStatus — Torafirma Design System
 * ============================================================
 *
 * System recovery indicator. Shows the progress and state of
 * a recovery operation with steps completed and estimated time.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Recovery states.
 */
export type RecoveryState = 'idle' | 'detecting' | 'diagnosing' | 'recovering' | 'verifying' | 'recovered' | 'failed' | 'manual_intervention_required';

/**
 * Props for the RecoveryStatus component.
 */
export interface RecoveryStatusProps {
  /** Current recovery state. */
  state: RecoveryState;
  /** Progress percentage (0-100). */
  progressPercent?: number;
  /** Current recovery step description. */
  currentStep?: string;
  /** Estimated time remaining. */
  eta?: string;
  /** Number of recovery steps total. */
  totalSteps?: number;
  /** Number of steps completed. */
  completedSteps?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const recoveryMeta: Record<RecoveryState, { label: string; variant: string }> = {
  idle: { label: 'IDLE', variant: 'neutral' },
  detecting: { label: 'DETECTING FAULT', variant: 'stream' },
  diagnosing: { label: 'DIAGNOSING', variant: 'stream' },
  recovering: { label: 'RECOVERING', variant: 'warning' },
  verifying: { label: 'VERIFYING', variant: 'stream' },
  recovered: { label: 'RECOVERED', variant: 'run' },
  failed: { label: 'RECOVERY FAILED', variant: 'danger' },
  manual_intervention_required: { label: 'MANUAL INTERVENTION REQUIRED', variant: 'danger' },
};

/**
 * RecoveryStatus renders a system recovery progress indicator.
 *
 * @example
 * ```tsx
 * <RecoveryStatus state="recovering" progressPercent={65} currentStep="Restarting services" eta="2m 30s" />
 * ```
 */
export const RecoveryStatus: React.FC<RecoveryStatusProps> = ({
  state,
  progressPercent,
  currentStep,
  eta,
  totalSteps,
  completedSteps,
  className = '',
  testId,
}) => {
  const meta = recoveryMeta[state];
  const showProgress = progressPercent !== undefined;
  const clampedProgress = showProgress ? Math.max(0, Math.min(100, progressPercent)) : 0;

  return (
    <div
      className={`tf-recovery-status tf-recovery-status--${meta.variant} tf-recovery-status--${state} ${className}`}
      data-testid={testId}
      data-recovery-state={state}
      role="status"
      aria-label={`Recovery: ${meta.label}`}
    >
      <span className={`tf-recovery-status__icon tf-recovery-status__icon--${meta.variant}`} aria-hidden="true" />
      <span className="tf-recovery-status__label">{meta.label}</span>
      {currentStep && <span className="tf-recovery-status__step">{currentStep}</span>}
      {showProgress && (
        <div className="tf-recovery-status__progress">
          <div className="tf-recovery-status__bar">
            <div
              className="tf-recovery-status__fill"
              style={{ width: `${clampedProgress}%` }}
              aria-hidden="true"
            />
          </div>
          <span className="tf-recovery-status__percent">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      {totalSteps !== undefined && completedSteps !== undefined && (
        <span className="tf-recovery-status__steps">Step {completedSteps} of {totalSteps}</span>
      )}
      {eta && <span className="tf-recovery-status__eta">ETA: {eta}</span>}
    </div>
  );
};

RecoveryStatus.displayName = 'RecoveryStatus';

export default RecoveryStatus;
