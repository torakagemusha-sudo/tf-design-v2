/**
 * @fileoverview TerminalAutocomplete — Autocomplete dropdown for terminal.
 * Shows matching command/file/variable suggestions with keyboard navigation.
 *
 * @module @torafirma/design-system/runtime-trace-console/TerminalAutocomplete
 */

import React, { useEffect, useState } from "react";
import type { BaseComponentProps, TerminalSuggestion } from "./types";

/** Props for TerminalAutocomplete. */
export interface TerminalAutocompleteProps extends BaseComponentProps {
  /** Suggestions to display. */
  suggestions: TerminalSuggestion[];
  /** Currently selected index. */
  selectedIndex?: number;
  /** Callback when a suggestion is selected. */
  onSelect: (suggestion: TerminalSuggestion) => void;
  /** Maximum items to show. */
  maxItems?: number;
}

/**
 * TerminalAutocomplete — Suggestion dropdown for terminal input.
 *
 * @example
 * ```tsx
 * <TerminalAutocomplete
 *   suggestions={filteredSuggestions}
 *   onSelect={(s) => setInput(s.value)}
 * />
 * ```
 */
export const TerminalAutocomplete: React.FC<TerminalAutocompleteProps> = ({
  suggestions,
  selectedIndex: propIndex,
  onSelect,
  maxItems = 10,
  className = "",
  "data-testid": dataTestId = "terminal-autocomplete",
}) => {
  const [activeIndex, setActiveIndex] = useState(propIndex ?? 0);

  useEffect(() => {
    if (propIndex !== undefined) {
      setActiveIndex(propIndex);
    }
  }, [propIndex]);

  const visible = suggestions.slice(0, maxItems);

  const typeIcons: Record<string, string> = {
    command: "▶",
    file: "■",
    variable: "$",
    flag: "–",
  };

  return (
    <div
      className={`tf-terminal-autocomplete ${className}`}
      data-testid={dataTestId}
    >
      {visible.map((s, i) => (
        <div
          key={`${s.value}-${i}`}
          className={`tf-terminal-autocomplete__item ${
            i === activeIndex
              ? "tf-terminal-autocomplete__item--active"
              : ""
          }`}
          onClick={() => onSelect(s)}
          onMouseEnter={() => setActiveIndex(i)}
        >
          {s.type && (
            <span className="tf-terminal-autocomplete__icon">
              {typeIcons[s.type] || "•"}
            </span>
          )}
          <span className="tf-terminal-autocomplete__label">{s.label}</span>
          {s.description && (
            <span className="tf-terminal-autocomplete__desc">
              {s.description}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

TerminalAutocomplete.displayName = "TerminalAutocomplete";

export default TerminalAutocomplete;
