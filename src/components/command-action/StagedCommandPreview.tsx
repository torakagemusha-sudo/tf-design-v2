import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the StagedCommandPreview component.
 * Preview panel for queued commands.
 */
export interface StagedCommandPreviewProps extends TorafirmaComponentBaseProps {
  /** Array of staged commands to preview */
  stagedCommands: CommandDescriptor[];
  /** Callback fired when a staged command is removed */
  onRemove: (commandId: string) => void;
  /** Callback fired when staged commands are reordered */
  onReorder: (commandIds: string[]) => void;
}

/**
 * StagedCommandPreview — preview panel for queued commands.
 *
 * Displays a list of staged commands with the ability to
 * remove individual entries or reorder the queue. Provides
 * a clear visual summary of what will execute and in what
 * sequence when the staged run is committed.
 *
 * @example
 * ```tsx
 * <StagedCommandPreview
 *   stagedCommands={[
 *     { id: 'cmd1', label: 'Validate graph', operation: 'validate', commandClass: 'validate', state: 'staged' },
 *     { id: 'cmd2', label: 'Run workflow', operation: 'run', commandClass: 'execute', state: 'staged' },
 *   ]}
 *   onRemove={(id) => console.log('Remove', id)}
 *   onReorder={(ids) => console.log('New order', ids)}
 * />
 * ```
 */
const StagedCommandPreview: React.FC<StagedCommandPreviewProps> = ({
  stagedCommands,
  onRemove,
  onReorder,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...stagedCommands];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    onReorder(newOrder.map((c) => c.id));
  };

  const handleMoveDown = (index: number) => {
    if (index === stagedCommands.length - 1) return;
    const newOrder = [...stagedCommands];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    onReorder(newOrder.map((c) => c.id));
  };

  if (stagedCommands.length === 0) {
    return (
      <div
        className={`tf-staged-command-preview tf-staged-command-preview--empty ${className}`}
        data-testid={testId}
        {...rest}
      >
        <span className="tf-staged-command-preview__empty-text">No staged commands.</span>
      </div>
    );
  }

  return (
    <div className={`tf-staged-command-preview ${className}`} data-testid={testId} {...rest}>
      <div className="tf-staged-command-preview__header">
        <span className="tf-staged-command-preview__title">Staged Commands</span>
        <span className="tf-staged-command-preview__count">{stagedCommands.length}</span>
      </div>
      <ol className="tf-staged-command-preview__list">
        {stagedCommands.map((cmd, index) => (
          <li key={cmd.id} className="tf-staged-command-preview__item">
            <span className="tf-staged-command-preview__index">{index + 1}</span>
            <span className={`tf-staged-command-preview__class tf-staged-command-preview__class--${cmd.commandClass}`}>
              {cmd.commandClass.toUpperCase()}
            </span>
            <span className="tf-staged-command-preview__label">{cmd.label}</span>
            {cmd.target && (
              <span className="tf-staged-command-preview__target">{cmd.target}</span>
            )}
            <div className="tf-staged-command-preview__controls">
              <button
                type="button"
                className="tf-staged-command-preview__move"
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                aria-label={`Move ${cmd.label} up`}
              >
                &#9650;
              </button>
              <button
                type="button"
                className="tf-staged-command-preview__move"
                onClick={() => handleMoveDown(index)}
                disabled={index === stagedCommands.length - 1}
                aria-label={`Move ${cmd.label} down`}
              >
                &#9660;
              </button>
              <button
                type="button"
                className="tf-staged-command-preview__remove"
                onClick={() => onRemove(cmd.id)}
                aria-label={`Remove ${cmd.label}`}
              >
                &#10005;
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StagedCommandPreview;
