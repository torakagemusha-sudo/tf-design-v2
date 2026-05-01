/**
 * @fileoverview TerminalHistory — Command history list.
 * Navigable list of previously executed commands.
 *
 * @module @torafirma/design-system/runtime-trace-console/TerminalHistory
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TerminalHistory. */
export interface TerminalHistoryProps extends BaseComponentProps {
  /** Command history strings (most recent first). */
  commands: string[];
  /** Selected index. */
  selectedIndex?: number;
  /** Maximum items to show. */
  maxItems?: number;
  /** Callback when a command is clicked. */
  onSelect?: (command: string, index: number) => void;
  /** Callback to clear history. */
  onClear?: () => void;
}

/**
 * TerminalHistory — Command history panel.
 *
 * @example
 * ```tsx
 * <TerminalHistory
 *   commands={history}
 *   onSelect={(cmd) => setInput(cmd)}
 * />
 * ```
 */
export const TerminalHistory: React.FC<TerminalHistoryProps> = ({
  commands,
  selectedIndex = -1,
  maxItems = 50,
  onSelect,
  onClear,
  className = "",
  "data-testid": dataTestId = "terminal-history",
}) => {
  const visible = commands.slice(0, maxItems);

  return (
    <div
      className={`tf-terminal-history ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-terminal-history__header">
        <span className="tf-terminal-history__title">Command History</span>
        {onClear && commands.length > 0 && (
          <button
            className="tf-btn tf-btn--xs tf-btn--ghost"
            onClick={onClear}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      {visible.length === 0 ? (
        <div className="tf-terminal-history__empty">No commands yet</div>
      ) : (
        <ol className="tf-terminal-history__list" reversed>
          {visible.map((cmd, i) => (
            <li
              key={`${cmd}-${i}`}
              className={`tf-terminal-history__item ${
                selectedIndex === i
                  ? "tf-terminal-history__item--selected"
                  : ""
              }`}
              onClick={() => onSelect?.(cmd, i)}
            >
              <span className="tf-terminal-history__command">{cmd}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

TerminalHistory.displayName = "TerminalHistory";

export default TerminalHistory;
