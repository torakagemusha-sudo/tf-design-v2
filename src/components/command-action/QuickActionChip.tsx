import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the QuickActionChip component.
 * Compact inline button for frequent single-tap commands (run, pause, refresh).
 */
export interface QuickActionChipProps extends TorafirmaComponentBaseProps {
  /** The command descriptor to execute */
  command: CommandDescriptor;
  /** Size of the chip */
  size?: 'sm' | 'md';
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Callback fired when the chip is activated */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * QuickActionChip — compact inline button for frequent single-tap commands.
 *
 * Renders a small, dense action chip for high-frequency operations like
 * run, pause, and refresh. Optimized for rapid, repeated invocation with
 * minimal visual weight.
 *
 * @example
 * ```tsx
 * <QuickActionChip
 *   command={{ id: 'run', label: 'Run', operation: 'run', commandClass: 'execute', state: 'available' }}
 *   size="sm"
 *   onCommand={(cmd) => console.log(cmd.label)}
 * />
 * ```
 */
const QuickActionChip: React.FC<QuickActionChipProps> = ({
  command,
  size = 'md',
  icon,
  onCommand,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const sizeClass = size === 'sm' ? 'tf-quick-action-chip--sm' : 'tf-quick-action-chip--md';

  const handleClick = () => {
    if (command.state !== 'disabled' && command.state !== 'blocked') {
      onCommand(command);
    }
  };

  return (
    <button
      type="button"
      className={`tf-quick-action-chip ${sizeClass} tf-quick-action-chip--${command.commandClass} ${className}`}
      onClick={handleClick}
      disabled={command.state === 'disabled'}
      aria-label={command.label}
      aria-disabled={command.state === 'disabled'}
      data-command-class={command.commandClass}
      data-testid={testId}
      {...rest}
    >
      {icon && <span className="tf-quick-action-chip__icon">{icon}</span>}
      <span className="tf-quick-action-chip__label">{command.label}</span>
    </button>
  );
};

export default QuickActionChip;
