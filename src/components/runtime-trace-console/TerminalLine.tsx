/**
 * @fileoverview TerminalLine — Terminal output line with type-based styling.
 * Renders input, output, error, warning, info, and prompt lines.
 *
 * @module @torafirma/design-system/runtime-trace-console/TerminalLine
 */

import React from "react";
import type { BaseComponentProps, TerminalLine as TerminalLineType } from "./types";

/** Props for TerminalLine. */
export interface TerminalLineProps extends BaseComponentProps {
  /** Terminal line data. */
  line: TerminalLineType;
  /** Whether to show timestamp. */
  showTimestamp?: boolean;
  /** Whether line is selected. */
  selected?: boolean;
}

/**
 * TerminalLine — Single line of terminal output.
 *
 * @example
 * ```tsx
 * <TerminalLine
 *   line={{ id: "1", type: "output", content: "Build complete", timestamp: "..." }}
 * />
 * ```
 */
export const TerminalLine: React.FC<TerminalLineProps> = ({
  line,
  showTimestamp = false,
  selected = false,
  className = "",
  "data-testid": dataTestId = "terminal-line",
}) => {
  return (
    <div
      className={`tf-terminal-line tf-terminal-line--${line.type} ${
        selected ? "tf-terminal-line--selected" : ""
      } ${className}`}
      data-testid={dataTestId}
    >
      {showTimestamp && (
        <time className="tf-terminal-line__time" dateTime={line.timestamp}>
          {new Date(line.timestamp).toLocaleTimeString()}
        </time>
      )}
      {line.prompt && (
        <span className="tf-terminal-line__prompt">{line.prompt}</span>
      )}
      <span className="tf-terminal-line__content">{line.content}</span>
    </div>
  );
};

TerminalLine.displayName = "TerminalLine";

export default TerminalLine;
