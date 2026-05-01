/**
 * ============================================================
 * DeployProgress — Torafirma Design System
 * ============================================================
 *
 * Deployment progress display combining a progress bar with
 * deploy state, step-by-step progress, and optional log output.
 *
 * From 03.2 State, Status & Telemetry — Section 3.9 Runtime Components
 * ============================================================
 */

import React from 'react';
import type { DeployState } from './DeployStatus';

/**
 * Individual deployment step.
 */
export interface DeployStep {
  /** Step label. */
  label: string;
  /** Step state. */
  state: 'pending' | 'running' | 'complete' | 'failed';
  /** Optional log output for this step. */
  log?: string;
}

/**
 * Props for the DeployProgress component.
 */
export interface DeployProgressProps {
  /** Current deployment state. */
  deployState: DeployState;
  /** Deployment steps. */
  steps: DeployStep[];
  /** Overall progress percentage. */
  progressPercent: number;
  /** Target environment. */
  environment?: string;
  /** Version being deployed. */
  version?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * DeployProgress renders a detailed deployment progress display.
 *
 * @example
 * ```tsx
 * <DeployProgress
 *   deployState="deploying"
 *   steps={[
 *     { label: 'Build', state: 'complete' },
 *     { label: 'Test', state: 'complete' },
 *     { label: 'Deploy', state: 'running' },
 *   ]}
 *   progressPercent={75}
 *   environment="production"
 *   version="2.4.1"
 * />
 * ```
 */
export const DeployProgress: React.FC<DeployProgressProps> = ({
  deployState,
  steps,
  progressPercent,
  environment,
  version,
  className = '',
  testId,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progressPercent));

  return (
    <div
      className={`tf-deploy-progress tf-deploy-progress--${deployState} ${className}`}
      data-testid={testId}
      data-deploy-state={deployState}
      role="progressbar"
      aria-label={`Deployment progress: ${clampedProgress}%`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedProgress}
    >
      <div className="tf-deploy-progress__header">
        <span className="tf-deploy-progress__state">{deployState.toUpperCase()}</span>
        {environment && <span className="tf-deploy-progress__env">{environment}</span>}
        {version && <span className="tf-deploy-progress__version">v{version}</span>}
        <span className="tf-deploy-progress__percent">{Math.round(clampedProgress)}%</span>
      </div>
      <div className="tf-deploy-progress__bar">
        <div
          className="tf-deploy-progress__fill"
          style={{ width: `${clampedProgress}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="tf-deploy-progress__steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`tf-deploy-progress__step tf-deploy-progress__step--${step.state}`}
          >
            <span className="tf-deploy-progress__step-indicator" aria-hidden="true">
              {step.state === 'complete' ? '&#x2713;' : step.state === 'failed' ? '!' : '&#x25CB;'}
            </span>
            <span className="tf-deploy-progress__step-label">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

DeployProgress.displayName = 'DeployProgress';

export default DeployProgress;
