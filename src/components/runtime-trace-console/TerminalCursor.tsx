/**
 * @fileoverview TerminalCursor — Blinking cursor for terminal input.
 * CSS-animated block cursor for the terminal prompt.
 *
 * @module @torafirma/design-system/runtime-trace-console/TerminalCursor
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TerminalCursor. */
export interface TerminalCursorProps extends BaseComponentProps {
  /** Cursor style. */
  style?: "block" | "line" | "underscore";
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
 * <TerminalCursor style="block" blink />
 * ```
 */
export const TerminalCursor: React.FC<TerminalCursorProps> = ({
  style = "block",
  blink = true,
  color,
  className = "",
  "data-testid": dataTestId = "terminal-cursor",
}) => {
  const char = style === "block" ? "█" : style === "line" ? "│" : "▁";

  return (
    <span
      className={`tf-terminal-cursor tf-terminal-cursor--${style} ${
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
