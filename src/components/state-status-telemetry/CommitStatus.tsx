/**
 * ============================================================
 * CommitStatus — Torafirma Design System
 * ============================================================
 *
 * Commit state indicator. Shows the current state of a commit
 * operation with commit hash, message, and branch.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../types';

/**
 * Commit states.
 */
export type CommitState = 'pending' | 'staged' | 'committing' | 'committed' | 'failed' | 'reverted';

/**
 * Props for the CommitStatus component.
 */
export interface CommitStatusProps {
  /** Current commit state. */
  state: CommitState;
  /** Short commit hash. */
  hash?: string;
  /** Commit message. */
  message?: string;
  /** Branch name. */
  branch?: string;
  /** Author identifier. */
  author?: string;
  /** ISO timestamp. */
  timestamp?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const commitMeta: Record<CommitState, { label: string; variant: string }> = {
  pending: { label: 'PENDING', variant: 'neutral' },
  staged: { label: 'STAGED', variant: 'warning' },
  committing: { label: 'COMMITTING', variant: 'stream' },
  committed: { label: 'COMMITTED', variant: 'authority' },
  failed: { label: 'COMMIT FAILED', variant: 'danger' },
  reverted: { label: 'REVERTED', variant: 'warning' },
};

/**
 * CommitStatus renders a commit operation state.
 *
 * @example
 * ```tsx
 * <CommitStatus state="committed" hash="a1b2c3d" message="Fix edge validation" branch="main" author="dev-1" />
 * ```
 */
export const CommitStatus: React.FC<CommitStatusProps> = ({
  state,
  hash,
  message,
  branch,
  author,
  timestamp,
  density = 'standard',
  className = '',
  testId,
}) => {
  const meta = commitMeta[state];
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-commit-status tf-commit-status--${meta.variant} tf-commit-status--${state} ${densityClass} ${className}`}
      data-testid={testId}
      data-commit-state={state}
      role="status"
      aria-label={`Commit: ${meta.label}`}
    >
      <span className={`tf-commit-status__icon tf-commit-status__icon--${meta.variant}`} aria-hidden="true" />
      <span className="tf-commit-status__label">{meta.label}</span>
      {hash && <span className="tf-commit-status__hash">{hash}</span>}
      {message && <span className="tf-commit-status__message">{message}</span>}
      {branch && <span className="tf-commit-status__branch">{branch}</span>}
      {author && <span className="tf-commit-status__author">{author}</span>}
      {timestamp && <span className="tf-commit-status__time">{timestamp}</span>}
    </div>
  );
};

CommitStatus.displayName = 'CommitStatus';

export default CommitStatus;
