import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandPinToggle component.
 * Pin command to persistent toolbar.
 */
export interface CommandPinToggleProps extends TorafirmaComponentBaseProps {
  /** The command ID to pin/unpin */
  commandId: string;
  /** Whether the command is currently pinned */
  pinned: boolean;
  /** Callback fired when the pin state is toggled */
  onToggle: (commandId: string, pinned: boolean) => void;
}

/**
 * CommandPinToggle — pin command to persistent toolbar.
 *
 * Renders a pin toggle button that adds or removes a command
 * from the persistent favorites toolbar. Pinned commands
 * persist across sessions and appear in the favorites bar.
 *
 * @example
 * ```tsx
 * <CommandPinToggle
 *   commandId="cmd-run-001"
 *   pinned={true}
 *   onToggle={(id, isPinned) => console.log(id, isPinned)}
 * />
 * ```
 */
const CommandPinToggle: React.FC<CommandPinToggleProps> = ({
  commandId,
  pinned,
  onToggle,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`tf-command-pin-toggle ${pinned ? 'tf-command-pin-toggle--active' : ''} ${className}`}
      onClick={() => onToggle(commandId, !pinned)}
      aria-pressed={pinned}
      aria-label={pinned ? 'Unpin command' : 'Pin command'}
      title={pinned ? 'Pinned to toolbar' : 'Pin to toolbar'}
      data-command-id={commandId}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-command-pin-toggle__icon" aria-hidden="true">
        {pinned ? '&#128204;' : '&#128205;'}
      </span>
    </button>
  );
};

export default CommandPinToggle;
