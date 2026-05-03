/**
 * @fileoverview TerminalPrompt — Terminal input prompt display.
 * Shows the prompt string (e.g., "torafirma>") before the input line.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TerminalPrompt
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for TerminalPrompt. */
export interface TerminalPromptProps extends BaseComponentProps {
  /** Prompt text. */
  prompt?: string;
  /** Authority level indicator (shown in prompt). */
  authorityLevel?: number;
  /** Runtime target name. */
  targetName?: string;
  /** Whether the terminal is ready. */
  ready?: boolean;
}

/**
 * TerminalPrompt — Command input prompt.
 *
 * @example
 * ```tsx
 * <TerminalPrompt prompt="torafirma>" authorityLevel={3} targetName="prod-us-east" />
 * ```
 */
export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  prompt = ">",
  authorityLevel,
  targetName,
  ready = true,
  className = "",
  "data-testid": dataTestId = "terminal-prompt",
}) => {
  return (
    <span
      className={`tf-terminal-prompt ${
        !ready ? "tf-terminal-prompt--not-ready" : ""
      } ${className}`}
      data-testid={dataTestId}
    >
      {authorityLevel !== undefined && (
        <span className="tf-terminal-prompt__auth">
          AUTH {authorityLevel}
        </span>
      )}
      {targetName && (
        <span className="tf-terminal-prompt__target">[{targetName}]</span>
      )}
      <span className="tf-terminal-prompt__text">{prompt}</span>
    </span>
  );
};

TerminalPrompt.displayName = "TerminalPrompt";

export default TerminalPrompt;
