/**
 * @fileoverview ConsoleCommandHistory — Command history list.
 * Navigable list of previously executed console commands.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ConsoleCommandHistory
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for ConsoleCommandHistory. */
export interface ConsoleCommandHistoryProps extends BaseComponentProps {
  /** Command history (most recent first). */
  commands: string[];
  /** Selected command index. */
  selectedIndex?: number;
  /** Callback on command select. */
  onSelect?: (command: string) => void;
  /** Callback to clear history. */
  onClear?: () => void;
  /** Maximum items. */
  maxItems?: number;
}

/**
 * ConsoleCommandHistory — Command history panel.
 *
 * @example
 * ```tsx
 * <ConsoleCommandHistory
 *   commands={history}
 *   onSelect={(cmd) => setInput(cmd)}
 *   onClear={() => clearHistory()}
 * />
 * ```
 */
export const ConsoleCommandHistory: React.FC<ConsoleCommandHistoryProps> = ({
  commands,
  selectedIndex = -1,
  onSelect,
  onClear,
  maxItems = 50,
  className = "",
  "data-testid": dataTestId = "console-command-history",
}) => {
  const visible = commands.slice(0, maxItems);

  return (
    <div
      className={`tf-console-command-history ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-console-command-history__header">
        <span className="tf-console-command-history__title">History</span>
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
        <div className="tf-console-command-history__empty">
          No commands
        </div>
      ) : (
        <ol className="tf-console-command-history__list" reversed>
          {visible.map((cmd, i) => (
            <li
              key={`${cmd}-${i}`}
              className={`tf-console-command-history__item ${
                selectedIndex === i
                  ? "tf-console-command-history__item--selected"
                  : ""
              }`}
              onClick={() => onSelect?.(cmd)}
            >
              <span className="tf-console-command-history__prompt">{"▶"}</span>
              <span className="tf-console-command-history__command">{cmd}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

ConsoleCommandHistory.displayName = "ConsoleCommandHistory";

export default ConsoleCommandHistory;
