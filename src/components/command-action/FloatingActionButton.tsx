import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the FloatingActionButton component.
 * FAB for mobile and field contexts.
 */
export interface FloatingActionButtonProps extends TorafirmaComponentBaseProps {
  /** The command to execute */
  command: CommandDescriptor;
  /** Screen position of the FAB */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Callback fired when the FAB is activated */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * FloatingActionButton — FAB for mobile/field contexts.
 *
 * A prominent floating action button optimized for touch interfaces
 * and field operations. Fixed-positioned at a screen corner, it
 * provides immediate access to the primary contextual command.
 *
 * @example
 * ```tsx
 * <FloatingActionButton
 *   command={{ id: 'run', label: 'Run workflow', operation: 'run', commandClass: 'execute', state: 'available' }}
 *   position="bottom-right"
 *   onCommand={(cmd) => console.log(cmd.label)}
 * />
 * ```
 */
const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  command,
  position = 'bottom-right',
  icon,
  onCommand,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const positionClass = `tf-floating-action-button--${position}`;

  return (
    <button
      type="button"
      className={`tf-floating-action-button ${positionClass} tf-floating-action-button--${command.commandClass} ${className}`}
      onClick={() => onCommand(command)}
      disabled={command.state === 'disabled'}
      aria-label={command.label}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-floating-action-button__content">
        {icon || <span className="tf-floating-action-button__default-icon" aria-hidden="true">&#9654;</span>}
        <span className="tf-floating-action-button__label">{command.label}</span>
      </span>
    </button>
  );
};

export default FloatingActionButton;
