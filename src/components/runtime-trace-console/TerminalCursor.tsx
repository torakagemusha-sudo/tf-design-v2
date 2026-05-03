/**
 * @fileoverview TerminalCursor — Blinking cursor for terminal input.
 * CSS-animated block cursor for the terminal prompt.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TerminalCursor
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TerminalCursor. */
export interface TerminalCursorProps extends BaseComponentProps {
  /** Cursor style. */
  cursorStyle?: "block" | "line" | "underscore";
  /** Whether cursor is blinking. */
  blink?: boolean;
  /** Cursor color. */
  color?: string;
}

/**
 * TerminalCursor — Animated terminal cursor.
 *
 * @example
 * ```tsx
 * <TerminalCursor cursorStyle="block" blink />
 * ```
 */
export const TerminalCursor: React.FC<TerminalCursorProps> = ({
  cursorStyle = "block",
  blink = true,
  color,
  className = "",
  "data-testid": dataTestId = "terminal-cursor",
}) => {
  const char = cursorStyle === "block" ? "█" : cursorStyle === "line" ? "│" : "▁";

  return (
    <span
      className={`tf-terminal-cursor tf-terminal-cursor--${cursorStyle} ${
        blink ? "tf-terminal-cursor--blink" : ""
      } ${className}`}
      data-testid={dataTestId}
      style={color ? { color } : undefined}
      aria-hidden="true"
    >
      {char}
    </span>
  );
};

TerminalCursor.displayName = "TerminalCursor";

export default TerminalCursor;
