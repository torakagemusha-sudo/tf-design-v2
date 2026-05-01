/**
 * @fileoverview ConsolePrompt — Interactive console prompt.
 * Input area with prompt string, autocomplete, and history navigation.
 *
 * @module @torafirma/design-system/runtime-trace-console/ConsolePrompt
 */

import React, { useCallback, useRef, useState } from "react";
import type { BaseComponentProps, TerminalSuggestion } from "./types";

/** Props for ConsolePrompt. */
export interface ConsolePromptProps extends BaseComponentProps {
  /** Prompt text. */
  prompt?: string;
  /** Callback on command submit. */
  onSubmit: (command: string) => void;
  /** Available suggestions. */
  suggestions?: TerminalSuggestion[];
  /** Command history. */
  history?: string[];
  /** Whether prompt is disabled. */
  disabled?: boolean;
  /** Placeholder text. */
  placeholder?: string;
}

/**
 * ConsolePrompt — Interactive command prompt for console.
 *
 * @example
 * ```tsx
 * <ConsolePrompt
 *   prompt="torafirma>"
 *   onSubmit={(cmd) => execute(cmd)}
 *   suggestions={suggestions}
 *   history={history}
 * />
 * ```
 */
export const ConsolePrompt: React.FC<ConsolePromptProps> = ({
  prompt = ">",
  onSubmit,
  suggestions = [],
  history = [],
  disabled = false,
  placeholder = "Enter command...",
  className = "",
  "data-testid": dataTestId = "console-prompt",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = suggestions.filter((s) =>
    s.label.toLowerCase().startsWith(input.toLowerCase())
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || disabled) return;
      onSubmit(input.trim());
      setInput("");
      setHistoryIndex(-1);
      setShowSuggestions(false);
    },
    [input, disabled, onSubmit]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length > 0) {
          const next = Math.min(historyIndex + 1, history.length - 1);
          setHistoryIndex(next);
          setInput(history[history.length - 1 - next] || "");
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const next = historyIndex - 1;
          setHistoryIndex(next);
          setInput(history[history.length - 1 - next] || "");
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (filtered.length > 0) {
          setInput(filtered[0].value);
          setShowSuggestions(false);
        }
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    },
    [history, historyIndex, filtered]
  );

  return (
    <div
      className={`tf-console-prompt ${disabled ? "tf-console-prompt--disabled" : ""} ${className}`}
      data-testid={dataTestId}
    >
      <span className="tf-console-prompt__text">{prompt}</span>
      <form className="tf-console-prompt__form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="tf-console-prompt__input"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
        />
      </form>
      {showSuggestions && filtered.length > 0 && (
        <div className="tf-console-prompt__suggestions">
          {filtered.slice(0, 8).map((s, i) => (
            <div
              key={`${s.value}-${i}`}
              className="tf-console-prompt__suggestion"
              onClick={() => {
                setInput(s.value);
                setShowSuggestions(false);
              }}
            >
              <span className="tf-console-prompt__suggestion-label">
                {s.label}
              </span>
              {s.description && (
                <span className="tf-console-prompt__suggestion-desc">
                  {s.description}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ConsolePrompt.displayName = "ConsolePrompt";

export default ConsolePrompt;
