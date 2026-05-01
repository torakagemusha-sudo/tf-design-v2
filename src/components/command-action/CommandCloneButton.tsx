import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandCloneButton component.
 * Clone/duplicate a command config.
 */
export interface CommandCloneButtonProps extends TorafirmaComponentBaseProps {
  /** The command to clone */
  command: CommandDescriptor;
  /** Optional label override */
  label?: string;
  /** Callback fired when clone is requested */
  onClone: (command: CommandDescriptor) => void;
}

/**
 * CommandCloneButton — clone/duplicate a command config.
 *
 * Renders a button that duplicates an existing command
 * configuration. The cloned command receives a new ID while
 * inheriting all parameters from the source. Used for creating
 * variants of existing commands without reconfiguring from scratch.
 *
 * @example
 * ```tsx
 * <CommandCloneButton
 *   command={{ id: 'deploy-prod', label: 'Deploy to Production', operation: 'deploy', commandClass: 'deploy', state: 'available' }}
 *   onClone={(cmd) => console.log('Cloned', cmd.label)}
 * />
 * ```
 */
const CommandCloneButton: React.FC<CommandCloneButtonProps> = ({
  command,
  label = 'Clone',
  onClone,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`tf-command-clone-button ${className}`}
      onClick={() => onClone(command)}
      aria-label={`Clone ${command.label}`}
      title={`Duplicate "${command.label}" configuration`}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-command-clone-button__icon" aria-hidden="true">&#10697;</span>
      <span className="tf-command-clone-button__label">{label}</span>
    </button>
  );
};

export default CommandCloneButton;
