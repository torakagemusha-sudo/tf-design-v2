/**
 * ============================================================
 * BuildStatus — Torafirma Design System
 * ============================================================
 *
 * Build/deployment status display. Shows CI/CD pipeline state
 * with build number, branch, commit, and duration.
 *
 * From 03.2 State, Status & Telemetry — Section 3.9 Runtime Components
 * ============================================================
 */

import React from 'react';

/**
 * Build states.
 */
export type BuildState = 'queued' | 'running' | 'success' | 'failed' | 'cancelled' | 'timed_out';

/**
 * Props for the BuildStatus component.
 */
export interface BuildStatusProps {
  /** Current build state. */
  state: BuildState;
  /** Build number. */
  buildNumber: string;
  /** Branch name. */
  branch?: string;
  /** Commit hash. */
  commitHash?: string;
  /** Build duration. */
  duration?: string;
  /** Build trigger (e.g., "manual", "push", "scheduled"). */
  trigger?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const buildMeta: Record<BuildState, { label: string; variant: string }> = {
  queued: { label: 'QUEUED', variant: 'neutral' },
  running: { label: 'BUILDING', variant: 'stream' },
  success: { label: 'BUILD PASSED', variant: 'run' },
  failed: { label: 'BUILD FAILED', variant: 'danger' },
  cancelled: { label: 'CANCELLED', variant: 'neutral' },
  timed_out: { label: 'TIMED OUT', variant: 'danger' },
};

/**
 * BuildStatus renders CI/CD build state information.
 *
 * @example
 * ```tsx
 * <BuildStatus state="success" buildNumber="#1842" branch="main" commitHash="a1b2c3d" duration="4m 32s" trigger="push" />
 * ```
 */
export const BuildStatus: React.FC<BuildStatusProps> = ({
  state,
  buildNumber,
  branch,
  commitHash,
  duration,
  trigger,
  className = '',
  testId,
}) => {
  const meta = buildMeta[state];

  return (
    <div
      className={`tf-build-status tf-build-status--${meta.variant} tf-build-status--${state} ${className}`}
      data-testid={testId}
      data-build-state={state}
      role="status"
      aria-label={`Build ${buildNumber}: ${meta.label}`}
    >
      <span className={`tf-build-status__icon tf-build-status__icon--${meta.variant}`} aria-hidden="true" />
      <span className="tf-build-status__label">{meta.label}</span>
      <span className="tf-build-status__number">{buildNumber}</span>
      {branch && <span className="tf-build-status__branch">{branch}</span>}
      {commitHash && <span className="tf-build-status__commit">{commitHash}</span>}
      {duration && <span className="tf-build-status__duration">{duration}</span>}
      {trigger && <span className="tf-build-status__trigger">{trigger}</span>}
    </div>
  );
};

BuildStatus.displayName = 'BuildStatus';

export default BuildStatus;
