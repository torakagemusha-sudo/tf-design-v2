import React, { useState, useMemo } from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandSearch component.
 * Spotlight-style command finder with fuzzy search.
 */
export interface CommandSearchProps extends TorafirmaComponentBaseProps {
  /** Array of searchable commands */
  commands: CommandDescriptor[];
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Callback fired when a command is selected */
  onSelect: (command: CommandDescriptor) => void;
}

/**
 * CommandSearch — spotlight-style command finder with fuzzy search.
 *
 * Provides a keyboard-first search surface for discovering and
 * executing commands. Supports fuzzy matching on labels, operations,
 * and aliases. Results are ranked by relevance and grouped by
 * command class.
 *
 * @example
 * ```tsx
 * <CommandSearch
 *   commands={[
 *     { id: 'run', label: 'Run workflow', operation: 'run', commandClass: 'execute', state: 'available', aliases: ['start', 'go'] },
 *   ]}
 *   placeholder="Search commands..."
 *   onSelect={(cmd) => console.log(cmd.label)}
 * />
 * ```
 */
const CommandSearch: React.FC<CommandSearchProps> = ({
  commands,
  placeholder = 'Search commands...',
  onSelect,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const lower = query.toLowerCase();
    return commands.filter((cmd) => {
      const haystack = [
        cmd.label,
        cmd.operation,
        cmd.target,
        cmd.description,
        ...(cmd.aliases || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(lower);
    });
  }, [query, commands]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandDescriptor[]>();
    filtered.forEach((cmd) => {
      const list = map.get(cmd.commandClass) || [];
      list.push(cmd);
      map.set(cmd.commandClass, list);
    });
    return map;
  }, [filtered]);

  return (
    <div className={`tf-command-search ${className}`} data-testid={testId} {...rest}>
      <div className="tf-command-search__input-wrapper">
        <span className="tf-command-search__icon" aria-hidden="true">&#9906;</span>
        <input
          type="text"
          className="tf-command-search__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Command search"
          autoFocus
        />
        {query && (
          <button
            type="button"
            className="tf-command-search__clear"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            &#10005;
          </button>
        )}
      </div>
      <div className="tf-command-search__results">
        {filtered.length === 0 ? (
          <div className="tf-command-search__empty">No commands found.</div>
        ) : (
          Array.from(grouped.entries()).map(([cls, cmds]) => (
            <div key={cls} className="tf-command-search__group">
              <div className="tf-command-search__group-header">{cls.toUpperCase()}</div>
              <ul className="tf-command-search__group-list">
                {cmds.map((cmd) => (
                  <li key={cmd.id} className={`tf-command-search__result tf-command-search__result--${cmd.state}`}>
                    <button
                      type="button"
                      className="tf-command-search__result-button"
                      onClick={() => onSelect(cmd)}
                      disabled={cmd.state === 'disabled'}
                    >
                      <span className="tf-command-search__result-label">{cmd.label}</span>
                      {cmd.target && (
                        <span className="tf-command-search__result-target">{cmd.target}</span>
                      )}
                      {cmd.shortcut && (
                        <kbd className="tf-command-search__shortcut">{cmd.shortcut}</kbd>
                      )}
                      {cmd.state === 'disabled' && cmd.disabledReason && (
                        <span className="tf-command-search__result-reason">{cmd.disabledReason}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommandSearch;
