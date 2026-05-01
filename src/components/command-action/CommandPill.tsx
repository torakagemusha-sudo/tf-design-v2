import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandPill component.
 * Pill-shaped tag button for toggling features.
 */
export interface CommandPillProps extends TorafirmaComponentBaseProps {
  /** The command descriptor to toggle */
  command: CommandDescriptor;
  /** Whether the pill is currently active/pressed */
  active: boolean;
  /** Icon element to display */
  icon?: React.ReactNode;
  /** Callback fired when the pill is toggled */
  onToggle: (command: CommandDescriptor, active: boolean) => void;
}

/**
 * CommandPill — pill-shaped tag button for toggling features.
 *
 * A compact, rounded tag that toggles a feature or mode on and off.
 * When active, displays a filled treatment. When inactive, shows
 * an outlined treatment. Optimized for filter bars and feature toggles.
 *
 * @example
 * ```tsx
 * <CommandPill
 *   command={{ id: 'auto-save', label: 'Auto-save', operation: 'toggle', commandClass: 'control', state: 'available' }}
 *   active={false}
 *   onToggle={(cmd, isActive) => console.log(cmd.label, isActive)}
 * />
 * ```
 */
const CommandPill: React.FC<CommandPillProps> = ({
  command,
  active,
  icon,
  onToggle,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`tf-command-pill ${active ? 'tf-command-pill--active' : 'tf-command-pill--inactive'} tf-command-pill--${command.commandClass} ${className}`}
      onClick={() => onToggle(command, !active)}
      disabled={command.state === 'disabled'}
      aria-pressed={active}
      aria-label={command.label}
      title={command.disabledReason || command.description || command.label}
      data-testid={testId}
      {...rest}
    >
      {icon && <span className="tf-command-pill__icon">{icon}</span>}
      <span className="tf-command-pill__label">{command.label}</span>
      {active && <span className="tf-command-pill__check" aria-hidden="true">&#10003;</span>}
    </button>
  );
};

export default CommandPill;
