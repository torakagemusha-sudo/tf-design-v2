import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandProgressOverlay component.
 * Blocking overlay during command execution.
 */
export interface CommandProgressOverlayProps extends TorafirmaComponentBaseProps {
  /** The command being executed */
  command: CommandDescriptor;
  /** Current progress percentage (0-100) */
  progress: number;
  /** Status message to display */
  message: string;
  /** Whether the overlay is visible */
  visible: boolean;
}

/**
 * CommandProgressOverlay — blocking overlay during command execution.
 *
 * Displays a modal overlay blocking interaction while a command
 * executes. Shows the command label, a determinate progress bar,
 * and a status message. Prevents accidental duplicate submissions
 * during long-running operations.
 *
 * @example
 * ```tsx
 * <CommandProgressOverlay
 *   command={{ id: 'deploy', label: 'Deploy package', operation: 'deploy', commandClass: 'deploy', state: 'running' }}
 *   progress={67}
 *   message="Uploading artifacts to runtime..."
 *   visible={true}
 * />
 * ```
 */
const CommandProgressOverlay: React.FC<CommandProgressOverlayProps> = ({
  command,
  progress,
  message,
  visible,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-command-progress-overlay ${className}`}
      role="alertdialog"
      aria-live="polite"
      aria-label={`Executing: ${command.label}`}
      data-testid={testId}
      {...rest}
    >
      <div className="tf-command-progress-overlay__backdrop" aria-hidden="true" />
      <div className="tf-command-progress-overlay__content">
        <div className="tf-command-progress-overlay__header">
          <span className={`tf-command-progress-overlay__class-badge tf-command-progress-overlay__class-badge--${command.commandClass}`}>
            {command.commandClass.toUpperCase()}
          </span>
          <span className="tf-command-progress-overlay__label">{command.label}</span>
        </div>
        <div className="tf-command-progress-overlay__body">
          <progress
            className="tf-command-progress-overlay__progress"
            value={progress}
            max={100}
            aria-label={`${progress}% complete`}
          />
          <span className="tf-command-progress-overlay__percentage">{progress}%</span>
          <p className="tf-command-progress-overlay__message">{message}</p>
        </div>
        {command.target && (
          <div className="tf-command-progress-overlay__footer">
            <span className="tf-command-progress-overlay__target">Target: {command.target}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandProgressOverlay;
