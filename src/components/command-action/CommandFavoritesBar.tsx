import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandFavoritesBar component.
 * User-pinned favorite commands displayed as a horizontal bar.
 */
export interface CommandFavoritesBarProps extends TorafirmaComponentBaseProps {
  /** Array of favorited command descriptors */
  favorites: CommandDescriptor[];
  /** Callback fired when a favorite command is activated */
  onCommand: (command: CommandDescriptor) => void;
  /** Callback fired when the manage action is triggered */
  onManage: () => void;
}

/**
 * CommandFavoritesBar — user-pinned favorite commands.
 *
 * Displays a persistent horizontal bar of user-pinned command
 * shortcuts. Provides rapid access to frequently used operations
 * across sessions. Includes a management action for reorganizing
 * pinned favorites.
 *
 * @example
 * ```tsx
 * <CommandFavoritesBar
 *   favorites={[
 *     { id: 'run', label: 'Run workflow', operation: 'run', commandClass: 'execute', state: 'available' },
 *     { id: 'validate', label: 'Validate graph', operation: 'validate', commandClass: 'validate', state: 'available' },
 *   ]}
 *   onCommand={(cmd) => console.log(cmd.label)}
 *   onManage={() => console.log('Manage favorites')}
 * />
 * ```
 */
const CommandFavoritesBar: React.FC<CommandFavoritesBarProps> = ({
  favorites,
  onCommand,
  onManage,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  if (favorites.length === 0) {
    return (
      <div className={`tf-command-favorites-bar tf-command-favorites-bar--empty ${className}`} data-testid={testId} {...rest}>
        <span className="tf-command-favorites-bar__empty-text">No pinned commands.</span>
        <button type="button" className="tf-command-favorites-bar__manage" onClick={onManage}>
          Pin commands
        </button>
      </div>
    );
  }

  return (
    <div className={`tf-command-favorites-bar ${className}`} data-testid={testId} {...rest}>
      <span className="tf-command-favorites-bar__label" aria-hidden="true">&#9733;</span>
      <ul className="tf-command-favorites-bar__list">
        {favorites.map((cmd) => (
          <li key={cmd.id} className="tf-command-favorites-bar__item">
            <button
              type="button"
              className={`tf-command-favorites-bar__button tf-command-favorites-bar__button--${cmd.commandClass}`}
              onClick={() => onCommand(cmd)}
              disabled={cmd.state === 'disabled'}
              aria-label={cmd.label}
              title={cmd.disabledReason || cmd.label}
            >
              {cmd.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="tf-command-favorites-bar__manage"
        onClick={onManage}
        aria-label="Manage pinned commands"
      >
        &#8942;
      </button>
    </div>
  );
};

export default CommandFavoritesBar;
