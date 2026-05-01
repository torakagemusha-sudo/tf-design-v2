/**
 * @fileoverview ConsoleAutoComplete — Autocomplete dropdown for console.
 * Shows filtered suggestions with keyboard and mouse selection.
 *
 * @module @torafirma/design-system/runtime-trace-console/ConsoleAutoComplete
 */

import React, { useState } from "react";
import type { BaseComponentProps, TerminalSuggestion } from "./types";

/** Props for ConsoleAutoComplete. */
export interface ConsoleAutoCompleteProps extends BaseComponentProps {
  /** Suggestions to show. */
  suggestions: TerminalSuggestion[];
  /** Selected index. */
  selectedIndex?: number;
  /** Callback on selection. */
  onSelect: (suggestion: TerminalSuggestion) => void;
  /** Maximum visible items. */
  maxItems?: number;
}

/**
 * ConsoleAutoComplete — Autocomplete suggestion list.
 *
 * @example
 * ```tsx
 * <ConsoleAutoComplete
 *   suggestions={filtered}
 *   onSelect={(s) => setInput(s.value)}
 * />
 * ```
 */
export const ConsoleAutoComplete: React.FC<ConsoleAutoCompleteProps> = ({
  suggestions,
  selectedIndex: propIndex = 0,
  onSelect,
  maxItems = 10,
  className = "",
  "data-testid": dataTestId = "console-auto-complete",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const visible = suggestions.slice(0, maxItems);

  const typeIcons: Record<string, string> = {
    command: "▶",
    file: "■",
    variable: "$",
    flag: "–",
  };

  return (
    <div
      className={`tf-console-auto-complete ${className}`}
      data-testid={dataTestId}
    >
      {visible.map((s, i) => (
        <div
          key={`${s.value}-${i}`}
          className={`tf-console-auto-complete__item ${
            i === propIndex || i === hoveredIndex
              ? "tf-console-auto-complete__item--active"
              : ""
          }`}
          onClick={() => onSelect(s)}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {s.type && (
            <span className="tf-console-auto-complete__icon">
              {typeIcons[s.type] || "•"}
            </span>
          )}
          <span className="tf-console-auto-complete__label">{s.label}</span>
          {s.description && (
            <span className="tf-console-auto-complete__desc">
              {s.description}
            </span>
          )}
        </div>
      ))}
      {visible.length === 0 && (
        <div className="tf-console-auto-complete__empty">No matches</div>
      )}
    </div>
  );
};

ConsoleAutoComplete.displayName = "ConsoleAutoComplete";

export default ConsoleAutoComplete;
