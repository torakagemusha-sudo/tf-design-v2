import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the ToggleCommandButton component.
 * On/off state toggle with Run/Stop style labels.
 */
export interface ToggleCommandButtonProps extends TorafirmaComponentBaseProps {
  /** The on-state command descriptor */
  onCommand: CommandDescriptor;
  /** The off-state command descriptor */
  offCommand: CommandDescriptor;
  /** Current toggle state */
  state: 'on' | 'off';
  /** Optional icon displayed in on state */
  onIcon?: React.ReactNode;
  /** Optional icon displayed in off state */
  offIcon?: React.ReactNode;
  /** Callback fired when toggle is activated */
  onToggle: (command: CommandDescriptor) => void;
}

/**
 * ToggleCommandButton — on/off state toggle with Run/Stop labels.
 *
 * Renders a dual-state command button that toggles between an "on"
 * command and an "off" command. Visual treatment reflects the active
 * state distinctly — green/active when on, neutral/slate when off.
 *
 * @example
 * ```tsx
 * <ToggleCommandButton
 *   onCommand={{ id: 'run', label: 'Run workflow', operation: 'run', commandClass: 'execute', state: 'available' }}
 *   offCommand={{ id: 'stop', label: 'Stop workflow', operation: 'stop', commandClass: 'control', state: 'available' }}
 *   state="off"
 *   onToggle={(cmd) => console.log(cmd.label)}
 * />
 * ```
 */
const ToggleCommandButton: React.FC<ToggleCommandButtonProps> = ({
  onCommand: onCmd,
  offCommand: offCmd,
  state,
  onIcon,
  offIcon,
  onToggle,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const isOn = state === 'on';
  const activeCommand = isOn ? offCmd : onCmd;

  return (
    <button
      type="button"
      className={`tf-toggle-command-button tf-toggle-command-button--${isOn ? 'on' : 'off'} tf-toggle-command-button--${activeCommand.commandClass} ${className}`}
      onClick={() => onToggle(activeCommand)}
      disabled={activeCommand.state === 'disabled'}
      aria-pressed={isOn}
      aria-label={activeCommand.label}
      data-state={state}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-toggle-command-button__indicator" aria-hidden="true">
        <span className={`tf-toggle-command-button__indicator-dot tf-toggle-command-button__indicator-dot--${isOn ? 'active' : 'inactive'}`} />
      </span>
      {isOn ? offIcon : onIcon}
      <span className="tf-toggle-command-button__label">
        {activeCommand.label}
      </span>
    </button>
  );
};

export default ToggleCommandButton;
