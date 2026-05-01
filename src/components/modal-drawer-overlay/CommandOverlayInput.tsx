import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * CommandOverlayInput — the search input field for the command palette.
 * Provides keyboard-optimized search with icon prefix.
 *
 * @example
 * ```tsx
 * <CommandOverlayInput
 *   value={query}
 *   onChange={setQuery}
 *   placeholder="Search commands..."
 * />
 * ```
 */
export interface CommandOverlayInputProps {
  /** Current search query. */
  value: string;
  /** Callback when query changes. */
  onChange: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Additional class names. */
  className?: string;
}

export const CommandOverlayInput = forwardRef<HTMLInputElement, CommandOverlayInputProps>(
  ({ value, onChange, placeholder = 'Type a command...', className }, ref) => {
    return (
      <div
        className={cn(
          'tf-command-overlay-input',
          'flex items-center gap-3 px-4 border-b border-steel-700',
          className
        )}
        data-testid="command-overlay-input"
      >
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
            'tf-command-overlay-input__field w-full py-3 text-sm text-white bg-transparent',
            'placeholder-steel-500 focus:outline-none'
          )}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
    );
  }
);

CommandOverlayInput.displayName = 'CommandOverlayInput';

export default CommandOverlayInput;
