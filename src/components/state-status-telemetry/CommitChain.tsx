/**
 * ============================================================
 * CommitChain — Torafirma Design System
 * ============================================================
 *
 * Commit chain visualization. Displays a linear sequence of
 * commits as a connected chain with status indicators for each.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { CommitState } from './CommitStatus';

/**
 * Individual commit in the chain.
 */
export interface CommitLink {
  /** Short commit hash. */
  hash: string;
  /** Commit message. */
  message: string;
  /** Commit state. */
  state: CommitState;
  /** Author identifier. */
  author?: string;
  /** ISO timestamp. */
  timestamp?: string;
}

/**
 * Props for the CommitChain component.
 */
export interface CommitChainProps {
  /** Array of commits, oldest first. */
  commits: CommitLink[];
  /** Maximum number of commits to show. */
  maxVisible?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const stateVariants: Record<CommitState, string> = {
  pending: 'neutral',
  staged: 'warning',
  committing: 'stream',
  committed: 'run',
  failed: 'danger',
  reverted: 'warning',
};

/**
 * CommitChain renders a visual chain of commits.
 *
 * @example
 * ```tsx
 * <CommitChain
 *   commits={[
 *     { hash: 'a1b2c3d', message: 'Initial', state: 'committed' },
 *     { hash: 'e4f5g6h', message: 'Add feature', state: 'committed' },
 *     { hash: 'i7j8k9l', message: 'Fix bug', state: 'staged' },
 *   ]}
 * />
 * ```
 */
export const CommitChain: React.FC<CommitChainProps> = ({
  commits,
  maxVisible = 8,
  className = '',
  testId,
}) => {
  const visible = commits.slice(-maxVisible);

  return (
    <div
      className={`tf-commit-chain ${className}`}
      data-testid={testId}
      role="list"
      aria-label="Commit chain"
    >
      {visible.map((commit, index) => (
        <div
          key={commit.hash}
          className={`tf-commit-chain__link tf-commit-chain__link--${stateVariants[commit.state]}`}
          role="listitem"
        >
          <span className={`tf-commit-chain__node tf-commit-chain__node--${stateVariants[commit.state]}`} aria-hidden="true" />
          <div className="tf-commit-chain__content">
            <span className="tf-commit-chain__hash">{commit.hash}</span>
            <span className="tf-commit-chain__message">{commit.message}</span>
            {commit.author && <span className="tf-commit-chain__author">{commit.author}</span>}
          </div>
          {index < visible.length - 1 && (
            <span className="tf-commit-chain__connector" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
};

CommitChain.displayName = 'CommitChain';

export default CommitChain;
