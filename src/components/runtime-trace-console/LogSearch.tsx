/**
 * @fileoverview LogSearch — Search input with result navigation for logs.
 * Finds and navigates between matching log lines.
 *
 * @module @torafirma/design-system/runtime-trace-console/LogSearch
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { BaseComponentProps, LogLine } from "./types";

/** Props for LogSearch. */
export interface LogSearchProps extends BaseComponentProps {
  /** Log lines to search within. */
  lines: LogLine[];
  /** Current search query. */
  query?: string;
  /** Callback when query changes. */
  onQueryChange?: (query: string) => void;
  /** Callback when match index changes. */
  onMatchIndexChange?: (index: number) => void;
  /** Callback when a match is selected. */
  onSelectMatch?: (line: LogLine) => void;
  /** Whether to auto-focus on mount. */
  autoFocus?: boolean;
  /** Placeholder text. */
  placeholder?: string;
}

/**
 * LogSearch — Search with match navigation for log viewer.
 *
 * @example
 * ```tsx
 * <LogSearch
 *   lines={logLines}
 *   query={searchQuery}
 *   onQueryChange={setSearchQuery}
 *   onSelectMatch={(line) => scrollToLine(line.id)}
 * />
 * ```
 */
export const LogSearch: React.FC<LogSearchProps> = ({
  lines,
  query = "",
  onQueryChange,
  onMatchIndexChange,
  onSelectMatch,
  autoFocus = false,
  placeholder = "Search logs...",
  className = "",
  "data-testid": dataTestId = "log-search",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [matchIndex, setMatchIndex] = useState(0);

  const matches = React.useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return lines.filter(
      (l) =>
        l.message.toLowerCase().includes(q) ||
        l.source.toLowerCase().includes(q)
    );
  }, [lines, query]);

  useEffect(() => {
    setMatchIndex(0);
    onMatchIndexChange?.(0);
  }, [query, onMatchIndexChange]);

  const goNext = useCallback(() => {
    if (matches.length === 0) return;
    const next = (matchIndex + 1) % matches.length;
    setMatchIndex(next);
    onMatchIndexChange?.(next);
    if (matches[next]) onSelectMatch?.(matches[next]);
  }, [matches, matchIndex, onMatchIndexChange, onSelectMatch]);

  const goPrev = useCallback(() => {
    if (matches.length === 0) return;
    const prev = (matchIndex - 1 + matches.length) % matches.length;
    setMatchIndex(prev);
    onMatchIndexChange?.(prev);
    if (matches[prev]) onSelectMatch?.(matches[prev]);
  }, [matches, matchIndex, onMatchIndexChange, onSelectMatch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) goPrev();
        else goNext();
      }
      if (e.key === "Escape") {
        onQueryChange?.("");
        inputRef.current?.blur();
      }
    },
    [goNext, goPrev, onQueryChange]
  );

  return (
    <div
      className={`tf-log-search ${className}`}
      data-testid={dataTestId}
    >
      <span className="tf-log-search__icon" aria-hidden="true">
        {"⌕"}
      </span>
      <input
        ref={inputRef}
        className="tf-log-search__input"
        type="text"
        value={query}
        onChange={(e) => onQueryChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search logs"
      />
      {query && (
        <button
          className="tf-log-search__clear"
          onClick={() => onQueryChange?.("")}
          type="button"
          aria-label="Clear search"
        >
          {"✕"}
        </button>
      )}
      {query && matches.length > 0 && (
        <span className="tf-log-search__results">
          <button
            className="tf-log-search__nav"
            onClick={goPrev}
            type="button"
            aria-label="Previous match"
          >
            {"▴"}
          </button>
          <span className="tf-log-search__count">
            {matchIndex + 1} / {matches.length}
          </span>
          <button
            className="tf-log-search__nav"
            onClick={goNext}
            type="button"
            aria-label="Next match"
          >
            {"▾"}
          </button>
        </span>
      )}
      {query && matches.length === 0 && (
        <span className="tf-log-search__no-results">No matches</span>
      )}
    </div>
  );
};

LogSearch.displayName = "LogSearch";

export default LogSearch;
