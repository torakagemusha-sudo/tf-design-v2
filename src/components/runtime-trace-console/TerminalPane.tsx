/**
 * @fileoverview TerminalPane — Terminal/console pane with history, input, and autocomplete.
 * Provides an interactive command-line interface within the Torafirma environment.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TerminalPane
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { BaseComponentProps, TerminalLine, TerminalSuggestion } from "./types";

/** Props for TerminalPane. */
export interface TerminalPaneProps extends BaseComponentProps {
  /** Terminal output lines. */
  lines: TerminalLine[];
  /** Current prompt string. */
  prompt?: string;
  /** Callback when a command is submitted. */
  onCommand?: (command: string) => void;
  /** Available autocomplete suggestions. */
  suggestions?: TerminalSuggestion[];
  /** Command history. */
  history?: string[];
  /** Whether the terminal is ready for input. */
  ready?: boolean;
  /** Loading/busy state. */
  busy?: boolean;
  /** Welcome message. */
  welcomeMessage?: string;
}

/**
 * TerminalPane — Interactive terminal console panel.
 *
 * Provides a command-line interface with history, autocomplete, and
 * styled output. Follows Torafirma Section 4.5 Bottom Trace / Console.
 *
 * @example
 * ```tsx
 * <TerminalPane
 *   lines={terminalOutput}
 *   prompt="torafirma>"
 *   onCommand={(cmd) => executeCommand(cmd)}
 *   suggestions={commandSuggestions}
 *   history={commandHistory}
 * />
 * ```
 */
export const TerminalPane: React.FC<TerminalPaneProps> = ({
  lines,
  prompt = "torafirma>",
  onCommand,
  suggestions = [],
  history = [],
  ready = true,
  busy = false,
  welcomeMessage,
  className = "",
  "data-testid": dataTestId = "terminal-pane",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<TerminalSuggestion[]>([]);

  // Auto-scroll on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Filter suggestions based on input
  useEffect(() => {
    if (input.length > 0 && suggestions.length > 0) {
      const filtered = suggestions.filter((s) =>
        s.label.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowAutocomplete(filtered.length > 0);
    } else {
      setShowAutocomplete(false);
    }
  }, [input, suggestions]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || busy) return;
      onCommand?.(input.trim());
      setInput("");
      setHistoryIndex(-1);
      setShowAutocomplete(false);
    },
    [input, busy, onCommand]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length > 0) {
          const nextIndex =
            historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(nextIndex);
          setInput(history[history.length - 1 - nextIndex] || "");
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const nextIndex = historyIndex - 1;
          setHistoryIndex(nextIndex);
          setInput(history[history.length - 1 - nextIndex] || "");
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (filteredSuggestions.length > 0) {
          setInput(filteredSuggestions[0].value);
          setShowAutocomplete(false);
        }
      } else if (e.key === "Escape") {
        setShowAutocomplete(false);
      }
    },
    [history, historyIndex, filteredSuggestions]
  );

  const handleSuggestionClick = (suggestion: TerminalSuggestion) => {
    setInput(suggestion.value);
    setShowAutocomplete(false);
    inputRef.current?.focus();
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={`tf-terminal-pane ${busy ? "tf-terminal-pane--busy" : ""} ${className}`}
      data-testid={dataTestId}
      onClick={handleTerminalClick}
    >
      {/* Output area */}
      <div
        ref={scrollRef}
        className="tf-terminal-pane__output"
        role="log"
        aria-live="polite"
      >
        {welcomeMessage && (
          <div className="tf-terminal-pane__welcome">{welcomeMessage}</div>
        )}
        {lines.map((line) => (
          <TerminalLineComponent key={line.id} line={line} />
        ))}
      </div>

      {/* Input area */}
      {ready && (
        <div className="tf-terminal-pane__input-area">
          <TerminalPrompt prompt={prompt} />
          <form
            className="tf-terminal-pane__form"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              className="tf-terminal-pane__input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </form>
          <TerminalCursor />

          {/* Autocomplete dropdown */}
          {showAutocomplete && (
            <TerminalAutocomplete
              suggestions={filteredSuggestions}
              onSelect={handleSuggestionClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

/** Inline sub-components. */
const TerminalLineComponent: React.FC<{ line: TerminalLine }> = ({ line }) => (
  <div className={`tf-terminal-line tf-terminal-line--${line.type}`}>
    {line.prompt && (
      <span className="tf-terminal-line__prompt">{line.prompt}</span>
    )}
    <span className="tf-terminal-line__content">{line.content}</span>
  </div>
);

const TerminalPrompt: React.FC<{ prompt: string }> = ({ prompt }) => (
  <span className="tf-terminal-prompt">{prompt}</span>
);

const TerminalCursor: React.FC = () => (
  <span className="tf-terminal-cursor" aria-hidden="true">
    {"█"}
  </span>
);

const TerminalAutocomplete: React.FC<{
  suggestions: TerminalSuggestion[];
  onSelect: (s: TerminalSuggestion) => void;
}> = ({ suggestions, onSelect }) => (
  <div className="tf-terminal-autocomplete">
    {suggestions.map((s, i) => (
      <div
        key={`${s.value}-${i}`}
        className="tf-terminal-autocomplete__item"
        onClick={() => onSelect(s)}
      >
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

TerminalPane.displayName = "TerminalPane";

export default TerminalPane;
