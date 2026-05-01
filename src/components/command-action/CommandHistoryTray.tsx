import React, { useState } from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * A history entry containing the command and its timestamp.
 */
export interface CommandHistoryEntry {
  command: CommandDescriptor;
  executedAt: string;
  result?: 'success' | 'failed' | 'blocked';
}

/**
 * Props for the CommandHistoryTray component.
 * Collapsible tray showing recent N commands.
 */
export interface CommandHistoryTrayProps extends TorafirmaComponentBaseProps {
  /** Array of recent command history entries */
  history: CommandHistoryEntry[];
  /** Maximum number of items to display */
  maxItems?: number;
  /** Callback fired when a history command is replayed */
  onReplay: (command: CommandDescriptor) => void;
}

/**
 * CommandHistoryTray — collapsible tray showing recent N commands.
 *
 * Provides a slide-out or collapsible panel listing recently executed
 * commands. Each entry can be replayed directly. Supports truncation
 * via maxItems with a "show more" expansion control.
 *
 * @example
 * ```tsx
 * <CommandHistoryTray
 *   history={[
 *     { command: { id: 'run', label: 'Run workflow', operation: 'run', commandClass: 'execute', state: 'complete' }, executedAt: '2024-01-01T10:00:00Z', result: 'success' },
 *   ]}
 *   maxItems={10}
 *   onReplay={(cmd) => console.log('Replay', cmd.label)}
 * />
 * ```
 */
const CommandHistoryTray: React.FC<CommandHistoryTrayProps> = ({
  history,
  maxItems = 10,
  onReplay,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const displayItems = collapsed ? history.slice(0, maxItems) : history;

  return (
    <div
      className={`tf-command-history-tray ${collapsed ? 'tf-command-history-tray--collapsed' : 'tf-command-history-tray--expanded'} ${className}`}
      data-testid={testId}
      {...rest}
    >
      <button
        type="button"
        className="tf-command-history-tray__header"
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
      >
        <span className="tf-command-history-tray__title">Command History</span>
        <span className="tf-command-history-tray__count">{history.length}</span>
        <span className="tf-command-history-tray__toggle" aria-hidden="true">
          {collapsed ? '+' : '−'}
        </span>
      </button>
      {!collapsed && (
        <ul className="tf-command-history-tray__list">
          {displayItems.map((entry, index) => (
            <li
              key={`${entry.command.id}-${index}`}
              className={`tf-command-history-tray__item tf-command-history-tray__item--${entry.result || 'unknown'}`}
            >
              <span className="tf-command-history-tray__item-class">{entry.command.commandClass.toUpperCase()}</span>
              <span className="tf-command-history-tray__item-label">{entry.command.label}</span>
              <time className="tf-command-history-tray__item-time" dateTime={entry.executedAt}>
                {new Date(entry.executedAt).toLocaleTimeString()}
              </time>
              <button
                type="button"
                className="tf-command-history-tray__replay"
                onClick={() => onReplay(entry.command)}
                aria-label={`Replay ${entry.command.label}`}
              >
                &#8635;
              </button>
            </li>
          ))}
          {history.length > maxItems && collapsed && (
            <li className="tf-command-history-tray__more">
              <button type="button" onClick={() => setCollapsed(false)}>
                Show {history.length - maxItems} more
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CommandHistoryTray;
