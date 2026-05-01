import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single diff line entry.
 */
export interface DiffLine {
  lineNumber: number;
  type: 'unchanged' | 'added' | 'removed';
  content: string;
}

/**
 * Props for the ActionDiffViewer component.
 * Diff view for action changes.
 */
export interface ActionDiffViewerProps extends TorafirmaComponentBaseProps {
  /** Lines from the before state */
  before: DiffLine[];
  /** Lines from the after state */
  after: DiffLine[];
  /** Callback fired when the diff is accepted */
  onAccept: () => void;
  /** Callback fired when the diff is rejected */
  onReject: () => void;
  /** Optional title for the diff view */
  title?: string;
}

/**
 * ActionDiffViewer — diff view for action changes.
 *
 * Presents a side-by-side or inline diff showing what will
 * change when an action is applied. Added lines are shown in
 * green, removed lines in red, and unchanged lines in neutral.
 * Includes Accept and Reject actions for operator decision.
 *
 * @example
 * ```tsx
 * <ActionDiffViewer
 *   before={[{ lineNumber: 1, type: 'removed', content: 'version: 1.0' }]}
 *   after={[{ lineNumber: 1, type: 'added', content: 'version: 1.1' }]}
 *   onAccept={() => console.log('Accepted')}
 *   onReject={() => console.log('Rejected')}
 *   title="Deployment Version Change"
 * />
 * ```
 */
const ActionDiffViewer: React.FC<ActionDiffViewerProps> = ({
  before,
  after,
  onAccept,
  onReject,
  title = 'Changes',
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const addedCount = after.filter((l) => l.type === 'added').length;
  const removedCount = before.filter((l) => l.type === 'removed').length;

  return (
    <div className={`tf-action-diff-viewer ${className}`} data-testid={testId} {...rest}>
      <div className="tf-action-diff-viewer__header">
        <span className="tf-action-diff-viewer__title">{title}</span>
        <div className="tf-action-diff-viewer__stats">
          <span className="tf-action-diff-viewer__stat tf-action-diff-viewer__stat--removed">-{removedCount}</span>
          <span className="tf-action-diff-viewer__stat tf-action-diff-viewer__stat--added">+{addedCount}</span>
        </div>
      </div>

      <div className="tf-action-diff-viewer__columns">
        <div className="tf-action-diff-viewer__column tf-action-diff-viewer__column--before">
          <span className="tf-action-diff-viewer__column-label">Before</span>
          <ul className="tf-action-diff-viewer__lines">
            {before.map((line) => (
              <li
                key={`before-${line.lineNumber}`}
                className={`tf-action-diff-viewer__line tf-action-diff-viewer__line--${line.type}`}
              >
                <span className="tf-action-diff-viewer__line-number">{line.lineNumber}</span>
                <span className="tf-action-diff-viewer__line-marker" aria-hidden="true">
                  {line.type === 'removed' ? '−' : ' '}
                </span>
                <span className="tf-action-diff-viewer__line-content">{line.content}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="tf-action-diff-viewer__column tf-action-diff-viewer__column--after">
          <span className="tf-action-diff-viewer__column-label">After</span>
          <ul className="tf-action-diff-viewer__lines">
            {after.map((line) => (
              <li
                key={`after-${line.lineNumber}`}
                className={`tf-action-diff-viewer__line tf-action-diff-viewer__line--${line.type}`}
              >
                <span className="tf-action-diff-viewer__line-number">{line.lineNumber}</span>
                <span className="tf-action-diff-viewer__line-marker" aria-hidden="true">
                  {line.type === 'added' ? '+' : ' '}
                </span>
                <span className="tf-action-diff-viewer__line-content">{line.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="tf-action-diff-viewer__footer">
        <button
          type="button"
          className="tf-action-diff-viewer__reject"
          onClick={onReject}
        >
          Reject Changes
        </button>
        <button
          type="button"
          className="tf-action-diff-viewer__accept"
          onClick={onAccept}
        >
          Accept Changes
        </button>
      </div>
    </div>
  );
};

export default ActionDiffViewer;
