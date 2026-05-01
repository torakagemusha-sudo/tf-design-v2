import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldSearchBar.
 */
export interface FieldSearchBarProps {
  /** Current search value. */
  value: string;
  /** Change handler. */
  onChange: (value: string) => void;
  /** Submit handler. */
  onSubmit?: (value: string) => void;
  /** Clear handler. */
  onClear?: () => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Whether focused on mount. */
  autoFocus?: boolean;
  /** Loading state (search in progress). */
  loading?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldSearchBar — mobile search input.
 *
 * Full-width search bar with integrated clear button and loading spinner.
 * 56 px height for comfortable thumb interaction.
 * Auto-focus support for immediate search on screen entry.
 */
export const FieldSearchBar: React.FC<FieldSearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Search...',
  autoFocus = false,
  loading = false,
  className = '',
  testId,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div
      data-testid={testId}
      className={['tf-field-search', className].join(' ')}
      role="search"
    >
      {/* Search icon */}
      <span className="tf-field-search__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label="Search"
        className="tf-field-search__input"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit?.(value);
        }}
      />

      {/* Loading spinner */}
      {loading && (
        <span className="tf-field-search__spinner" aria-hidden="true">
          ⟳
        </span>
      )}

      {/* Clear button */}
      {value && !loading && (
        <button
          type="button"
          className="tf-field-search__clear"
          onClick={onClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

FieldSearchBar.displayName = 'FieldSearchBar';

export default FieldSearchBar;
