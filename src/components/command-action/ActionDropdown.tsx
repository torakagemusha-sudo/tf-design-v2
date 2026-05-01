import React, { useState, useRef, useEffect } from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * A named group of commands for dropdown display.
 */
export interface CommandGroup {
  label: string;
  commands: CommandDescriptor[];
}

/**
 * Props for the ActionDropdown component.
 * Dropdown menu of commands with grouping.
 */
export interface ActionDropdownProps extends TorafirmaComponentBaseProps {
  /** The trigger element or label */
  trigger: React.ReactNode;
  /** Groups of commands to display in the dropdown */
  commandGroups: CommandGroup[];
  /** Callback fired when a command is selected */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * ActionDropdown — dropdown menu of commands with grouping.
 *
 * Displays a dropdown panel containing semantically grouped
 * commands. Destructive commands are visually separated at the
 * bottom of their respective groups. Supports custom trigger
 * elements for flexible placement.
 *
 * @example
 * ```tsx
 * <ActionDropdown
 *   trigger={<button>Open actions</button>}
 *   commandGroups={[
 *     { label: 'Execute', commands: [{ id: 'run', label: 'Run', operation: 'run', commandClass: 'execute', state: 'available' }] },
 *   ]}
 *   onCommand={(cmd) => console.log(cmd.label)}
 * />
 * ```
 */
const ActionDropdown: React.FC<ActionDropdownProps> = ({
  trigger,
  commandGroups,
  onCommand,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const handleSelect = (command: CommandDescriptor) => {
    setOpen(false);
    onCommand(command);
  };

  return (
    <div
      ref={dropdownRef}
      className={`tf-action-dropdown ${open ? 'tf-action-dropdown--open' : ''} ${className}`}
      data-testid={testId}
      {...rest}
    >
      <button
        type="button"
        className="tf-action-dropdown__trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </button>
      {open && (
        <div className="tf-action-dropdown__panel" role="menu">
          {commandGroups.map((group, gIndex) => (
            <div key={gIndex} className="tf-action-dropdown__group">
              <div className="tf-action-dropdown__group-label">{group.label}</div>
              <ul className="tf-action-dropdown__group-list">
                {group.commands.map((cmd) => (
                  <li key={cmd.id} className="tf-action-dropdown__item" role="none">
                    <button
                      type="button"
                      className={`tf-action-dropdown__command tf-action-dropdown__command--${cmd.commandClass} ${cmd.destructive ? 'tf-action-dropdown__command--destructive' : ''}`}
                      onClick={() => handleSelect(cmd)}
                      disabled={cmd.state === 'disabled'}
                      role="menuitem"
                    >
                      <span className="tf-action-dropdown__command-label">{cmd.label}</span>
                      {cmd.target && (
                        <span className="tf-action-dropdown__command-target">{cmd.target}</span>
                      )}
                      {cmd.state === 'disabled' && cmd.disabledReason && (
                        <span className="tf-action-dropdown__command-reason">{cmd.disabledReason}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              {gIndex < commandGroups.length - 1 && (
                <div className="tf-action-dropdown__divider" role="separator" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
