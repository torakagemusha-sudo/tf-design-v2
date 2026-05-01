import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { useKeyPress } from '@/hooks/useKeyPress';

/**
 * Command result item for the command palette.
 */
export interface CommandResult {
  /** Unique identifier. */
  id: string;
  /** Display label. */
  label: string;
  /** Optional secondary description. */
  description?: string;
  /** Keyboard shortcut hint. */
  shortcut?: string;
  /** Icon or visual element. */
  icon?: React.ReactNode;
  /** Action callback. */
  action: () => void;
  /** Group category. */
  group?: string;
}

/**
 * CommandOverlay — a command palette overlay for keyboard-driven navigation.
 * Provides a search input and filtered result list for quick actions.
 *
 * @example
 * ```tsx
 * <CommandOverlay
 *   isOpen={open}
 *   onClose={close}
 *   results={commands}
 *   onSelect={handleSelect}
 * />
 * ```
 */
export interface CommandOverlayProps {
  /** Whether the overlay is visible. */
  isOpen: boolean;
  /** Callback when the overlay is dismissed. */
  onClose: () => void;
  /** Available command results. */
  results: CommandResult[];
  /** Callback when a result is selected. */
  onSelect: (result: CommandResult) => void;
  /** Search query state. */
  query: string;
  /** Callback when query changes. */
  onQueryChange: (query: string) => void;
  /** Placeholder text for the search input. */
  placeholder?: string;
  /** Additional class names. */
  className?: string;
}

export const CommandOverlay: React.FC<CommandOverlayProps> = ({
  isOpen,
  onClose,
  results,
  onSelect,
  query,
  onQueryChange,
  placeholder = 'Type a command or search...',
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useKeyPress('Escape', () => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!results.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        onSelect(results[selectedIndex]);
      }
    },
    [results, selectedIndex, onSelect]
  );

  if (!isOpen) return null;

  // Group results
  const groups = results.reduce<Record<string, CommandResult[]>>((acc, r) => {
    const g = r.group ?? 'Commands';
    if (!acc[g]) acc[g] = [];
    acc[g].push(r);
    return acc;
  }, {});

  let globalIdx = 0;

  const overlay = (
    <div
      className={cn(
        'tf-command-overlay',
        'fixed inset-0 z-overlay flex items-start justify-center pt-[20vh]',
        'bg-black/70 backdrop-blur-sm',
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-testid="command-overlay"
    >
      <div
        className={cn(
          'tf-command-overlay__panel',
          'w-full max-w-xl rounded-lg border border-steel-700 bg-steel-900 shadow-2xl overflow-hidden'
        )}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <CommandOverlayInput
          ref={inputRef}
          value={query}
          onChange={onQueryChange}
          placeholder={placeholder}
        />
        <div
          ref={listRef}
          className="tf-command-overlay__results max-h-[24rem] overflow-y-auto"
        >
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-steel-500">
              No results found
            </div>
          ) : (
            Object.entries(groups).map(([group, items]) => (
              <div key={group} className="tf-command-overlay__group">
                <div className="tf-command-overlay__group-header px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-steel-500 bg-steel-950/50">
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
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        'tf-command-overlay__result w-full flex items-center gap-3 px-4 py-2.5 text-left',
                        'transition-colors duration-75',
                        isSelected
                          ? 'bg-amber-500/10 text-white'
                          : 'text-steel-300 hover:bg-steel-800'
                      )}
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
            ))
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

// Inline input component
const CommandOverlayInput = React.forwardRef<
  HTMLInputElement,
  { value: string; onChange: (v: string) => void; placeholder: string }
>(({ value, onChange, placeholder }, ref) => (
  <div className="tf-command-overlay__input-wrapper flex items-center gap-3 px-4 border-b border-steel-700">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-steel-500 shrink-0">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'tf-command-overlay__input w-full py-3 text-sm text-white bg-transparent',
        'placeholder-steel-500 focus:outline-none'
      )}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
    />
  </div>
));
CommandOverlayInput.displayName = 'CommandOverlayInput';

export default CommandOverlay;
