import React, { useState, useRef, useEffect } from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the SplitActionButton component.
 * Primary action button with a dropdown for secondary command variants.
 */
export interface SplitActionButtonProps extends TorafirmaComponentBaseProps {
  /** The primary command to execute */
  primaryCommand: CommandDescriptor;
  /** Secondary commands available in the dropdown */
  secondaryCommands: CommandDescriptor[];
  /** Optional icon for the primary action */
  icon?: React.ReactNode;
  /** Callback fired when any command is selected */
  onCommand: (command: CommandDescriptor) => void;
}

/**
 * SplitActionButton — primary action + dropdown with secondary variants.
 *
 * Presents a primary command as a prominent button with an attached
 * dropdown chevron exposing secondary command variants. Ideal when the
 * primary action has natural alternatives that should remain accessible.
 *
 * @example
 * ```tsx
 * <SplitActionButton
 *   primaryCommand={{ id: 'deploy', label: 'Deploy', operation: 'deploy', commandClass: 'deploy', state: 'available' }}
 *   secondaryCommands={[
 *     { id: 'deploy-dry', label: 'Dry Run', operation: 'deploy-dry', commandClass: 'validate', state: 'available' },
 *   ]}
 *   onCommand={(cmd) => console.log(cmd.label)}
 * />
 * ```
 */
const SplitActionButton: React.FC<SplitActionButtonProps> = ({
  primaryCommand,
  secondaryCommands,
  icon,
  onCommand,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrimary = () => {
    if (primaryCommand.state !== 'disabled') {
      onCommand(primaryCommand);
    }
  };

  const handleSecondary = (command: CommandDescriptor) => {
    setDropdownOpen(false);
    onCommand(command);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div
      ref={dropdownRef}
      className={`tf-split-action-button ${className}`}
      data-testid={testId}
      {...rest}
    >
      <button
        type="button"
        className={`tf-split-action-button__primary tf-split-action-button__primary--${primaryCommand.commandClass}`}
        onClick={handlePrimary}
        disabled={primaryCommand.state === 'disabled'}
        aria-label={primaryCommand.label}
      >
        {icon && <span className="tf-split-action-button__icon">{icon}</span>}
        <span className="tf-split-action-button__label">{primaryCommand.label}</span>
      </button>
      <button
        type="button"
        className="tf-split-action-button__dropdown-trigger"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        aria-label={`${primaryCommand.label} — more options`}
      >
        <span className="tf-split-action-button__chevron" aria-hidden="true">&#9662;</span>
      </button>
      {dropdownOpen && (
        <ul className="tf-split-action-button__dropdown" role="listbox">
          {secondaryCommands.map((cmd) => (
            <li key={cmd.id} className="tf-split-action-button__dropdown-item" role="option">
              <button
                type="button"
                className={`tf-split-action-button__secondary tf-split-action-button__secondary--${cmd.commandClass}`}
                onClick={() => handleSecondary(cmd)}
                disabled={cmd.state === 'disabled'}
              >
                <span className="tf-split-action-button__secondary-label">{cmd.label}</span>
                {cmd.state === 'disabled' && cmd.disabledReason && (
                  <span className="tf-split-action-button__disabled-hint">{cmd.disabledReason}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SplitActionButton;
