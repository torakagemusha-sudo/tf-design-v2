import React from 'react';
import { CommandDescriptor, CommandResult, TorafirmaComponentBaseProps } from '../../types';

/**
 * An executed command that can be rolled back.
 */
export interface RollableCommand {
  command: CommandDescriptor;
  executedAt: string;
  result: CommandResult;
  rollbackAvailable: boolean;
  rollbackImpact?: string;
}

/**
 * Props for the CommandRollbackPanel component.
 * UI for rolling back executed commands.
 */
export interface CommandRollbackPanelProps extends TorafirmaComponentBaseProps {
  /** Array of executed commands eligible for rollback */
  executedCommands: RollableCommand[];
  /** Callback fired when rollback is requested */
  onRollback: (commandId: string) => void;
}

/**
 * CommandRollbackPanel — UI for rolling back executed commands.
 *
 * Displays a list of completed commands that can be reversed.
 * Each entry shows the execution result, timestamp, and rollback
 * impact assessment. Destructive commands are highlighted with
 * stronger warnings.
 *
 * @example
 * ```tsx
 * <CommandRollbackPanel
 *   executedCommands={[
 *     { command: { id: 'deploy', label: 'Deploy', operation: 'deploy', commandClass: 'deploy', state: 'complete' }, executedAt: '2024-01-01T10:00:00Z', result: { commandId: 'deploy', result: 'complete', message: 'Deployed' }, rollbackAvailable: true, rollbackImpact: 'Will restore previous version' },
 *   ]}
 *   onRollback={(id) => console.log('Rollback', id)}
 * />
 * ```
 */
const CommandRollbackPanel: React.FC<CommandRollbackPanelProps> = ({
  executedCommands,
  onRollback,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const rollable = executedCommands.filter((c) => c.rollbackAvailable);

  if (rollable.length === 0) {
    return (
      <div
        className={`tf-command-rollback-panel tf-command-rollback-panel--empty ${className}`}
        data-testid={testId}
        {...rest}
      >
        <span className="tf-command-rollback-panel__empty-text">No rollbackable commands.</span>
      </div>
    );
  }

  return (
    <div className={`tf-command-rollback-panel ${className}`} data-testid={testId} {...rest}>
      <div className="tf-command-rollback-panel__header">
        <span className="tf-command-rollback-panel__title">Rollback Commands</span>
        <span className="tf-command-rollback-panel__count">{rollable.length} available</span>
      </div>
      <ul className="tf-command-rollback-panel__list">
        {rollable.map((entry) => (
          <li key={entry.command.id} className="tf-command-rollback-panel__item">
            <div className="tf-command-rollback-panel__command">
              <span className={`tf-command-rollback-panel__class-badge tf-command-rollback-panel__class-badge--${entry.command.commandClass}`}>
                {entry.command.commandClass.toUpperCase()}
              </span>
              <span className="tf-command-rollback-panel__label">{entry.command.label}</span>
              <time className="tf-command-rollback-panel__time" dateTime={entry.executedAt}>
                {new Date(entry.executedAt).toLocaleString()}
              </time>
            </div>
            {entry.rollbackImpact && (
              <p className="tf-command-rollback-panel__impact">{entry.rollbackImpact}</p>
            )}
            <button
              type="button"
              className="tf-command-rollback-panel__rollback"
              onClick={() => onRollback(entry.command.id)}
            >
              Rollback
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommandRollbackPanel;
