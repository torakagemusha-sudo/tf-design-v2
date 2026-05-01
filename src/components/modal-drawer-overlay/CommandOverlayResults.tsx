import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Command result item definition.
 */
export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  group?: string;
}

/**
 * CommandOverlayResults — renders the filtered result list
 * for the command palette with keyboard navigation support.
 *
 * @example
 * ```tsx
 * <CommandOverlayResults
 *   results={filteredCommands}
 *   selectedIndex={0}
 *   onSelect={handleSelect}
 * />
 * ```
 */
export interface CommandOverlayResultsProps {
  /** Results to display. */
  results: CommandItem[];
  /** Currently selected index. */
  selectedIndex: number;
  /** Callback when a result is selected. */
  onSelect: (item: CommandItem) => void;
  /** Callback when hover changes selection. */
  onHoverIndex?: (index: number) => void;
  /** Additional class names. */
  className?: string;
  /** Empty state message. */
  emptyMessage?: string;
}

export const CommandOverlayResults: React.FC<CommandOverlayResultsProps> = ({
  results,
  selectedIndex,
  onSelect,
  onHoverIndex,
  className,
  emptyMessage = 'No results found',
}) => {
  if (results.length === 0) {
    return (
      <div
        className={cn(
          'tf-command-overlay-results--empty px-4 py-8 text-center text-sm text-steel-500',
          className
        )}
        data-testid="command-overlay-empty"
      >
        {emptyMessage}
      </div>
    );
  }

  // Group results
  const groups = results.reduce<Record<string, CommandItem[]>>((acc, r) => {
    const g = r.group ?? 'Commands';
    if (!acc[g]) acc[g] = [];
    acc[g].push(r);
    return acc;
  }, {});

  let globalIdx = 0;

  return (
    <div
      className={cn(
        'tf-command-overlay-results max-h-[24rem] overflow-y-auto',
        className
      )}
      data-testid="command-overlay-results"
    >
      {Object.entries(groups).map(([group, items]) => (
        <div key={group} className="tf-command-overlay-results__group">
          <div className="tf-command-overlay-results__group-header px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-steel-500 bg-steel-950/50">
            {group}
          </div>
          {items.map((result) => {
            const idx = globalIdx++;
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={result.id}
                type="button"
                onClick={() => onSelect(result)}
                onMouseEnter={() => onHoverIndex?.(idx)}
                className={cn(
                  'tf-command-overlay-results__item w-full flex items-center gap-3 px-4 py-2.5 text-left',
                  'transition-colors duration-75',
                  isSelected
                    ? 'bg-amber-500/10 text-white'
                    : 'text-steel-300 hover:bg-steel-800'
                )}
                data-selected={isSelected}
              >
                {result.icon && (
                  <span className="shrink-0 text-steel-400">{result.icon}</span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{result.label}</div>
                  {result.description && (
                    <div className="text-xs text-steel-500 truncate">
                      {result.description}
                    </div>
                  )}
                </div>
                {result.shortcut && (
                  <kbd className="shrink-0 text-xs font-mono text-steel-500 bg-steel-800 rounded px-1.5 py-0.5">
                    {result.shortcut}
                  </kbd>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CommandOverlayResults;
