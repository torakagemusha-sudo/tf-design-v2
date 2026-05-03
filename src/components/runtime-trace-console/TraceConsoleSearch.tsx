/**
 * @fileoverview TraceConsoleSearch — Search input for finding trace events.
 * Provides real-time text search with keyboard shortcuts and result navigation.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceConsoleSearch
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { BaseComponentProps } from "./types";

/** Props for TraceConsoleSearch. */
export interface TraceConsoleSearchProps extends BaseComponentProps {
  /** Current search query. */
  value?: string;
  /** Callback when search query changes. */
  onChange?: (query: string) => void;
  /** Number of matches found. */
  matchCount?: number;
  /** Current match index (0-based). */
  currentMatchIndex?: number;
  /** Callback to navigate to next match. */
  onNextMatch?: () => void;
  /** Callback to navigate to previous match. */
  onPrevMatch?: () => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Whether search is focused on mount. */
  autoFocus?: boolean;
  /** Callback when user presses Enter. */
  onSubmit?: (query: string) => void;
}

/**
 * TraceConsoleSearch — Search bar for the trace console.
 *
 * Supports text search with match navigation, keyboard shortcuts (Enter, Shift+Enter),
 * and result count display.
 *
 * @example
 * ```tsx
 * <TraceConsoleSearch
 *   value={query}
 *   onChange={setQuery}
 *   matchCount={results.length}
 *   currentMatchIndex={currentIndex}
 *   onNextMatch={next}
 *   onPrevMatch={prev}
 * />
 * ```
 */
export const TraceConsoleSearch: React.FC<TraceConsoleSearchProps> = ({
  value = "",
  onChange,
  matchCount,
  currentMatchIndex = 0,
  onNextMatch,
  onPrevMatch,
  placeholder = "Search trace events...",
  autoFocus = false,
  onSubmit,
  className = "",
  "data-testid": dataTestId = "trace-console-search",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setQuery(next);
      onChange?.(next);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          e.preventDefault();
          onPrevMatch?.();
        } else {
          e.preventDefault();
          if (matchCount && matchCount > 0) {
            onNextMatch?.();
          }
          onSubmit?.(query);
        }
      }
      if (e.key === "Escape") {
        setQuery("");
        onChange?.("");
        inputRef.current?.blur();
      }
    },
    [query, onChange, onNextMatch, onPrevMatch, onSubmit, matchCount]
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    onChange?.("");
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div
      className={`tf-trace-console-search ${className}`}
      data-testid={dataTestId}
    >
      <span className="tf-trace-console-search__icon" aria-hidden="true">
        {"⌕"}
      </span>
      <input
        ref={inputRef}
        className="tf-trace-console-search__input"
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search trace events"
        aria-describedby={matchCount !== undefined ? "search-results" : undefined}
      />
      {query && (
        <button
          className="tf-trace-console-search__clear"
          onClick={clearSearch}
          type="button"
          aria-label="Clear search"
        >
          {"✕"}
        </button>
      )}
      {matchCount !== undefined && matchCount > 0 && (
        <span
          id="search-results"
          className="tf-trace-console-search__results"
        >
          <button
            className="tf-trace-console-search__nav"
            onClick={onPrevMatch}
            type="button"
            aria-label="Previous match"
          >
            {"▴"}
          </button>
          <span className="tf-trace-console-search__count">
            {currentMatchIndex + 1} / {matchCount}
          </span>
          <button
            className="tf-trace-console-search__nav"
            onClick={onNextMatch}
            type="button"
            aria-label="Next match"
          >
            {"▾"}
          </button>
        </span>
      )}
      {matchCount === 0 && query && (
        <span className="tf-trace-console-search__no-results">No matches</span>
      )}
    </div>
  );
};

TraceConsoleSearch.displayName = "TraceConsoleSearch";

export default TraceConsoleSearch;
