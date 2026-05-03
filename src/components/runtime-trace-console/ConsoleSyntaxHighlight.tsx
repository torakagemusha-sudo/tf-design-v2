/**
 * @fileoverview ConsoleSyntaxHighlight — Syntax highlighting for console output.
 * Highlights JSON, key-value pairs, and structured command syntax.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/ConsoleSyntaxHighlight
 */

import React, { useMemo } from "react";
import type { BaseComponentProps } from "./types";

/** Supported language modes. */
export type SyntaxLanguage = "json" | "yaml" | "shell" | "log" | "text";

/** Props for ConsoleSyntaxHighlight. */
export interface ConsoleSyntaxHighlightProps extends BaseComponentProps {
  /** Code to highlight. */
  code: string;
  /** Language mode. */
  language?: SyntaxLanguage;
  /** Whether to show line numbers. */
  showLineNumbers?: boolean;
}

/**
 * ConsoleSyntaxHighlight — Syntax-highlighted code display.
 *
 * @example
 * ```tsx
 * <ConsoleSyntaxHighlight
 *   code={'{"key": "value", "num": 42}'}
 *   language="json"
 *   showLineNumbers
 * />
 * ```
 */
export const ConsoleSyntaxHighlight: React.FC<ConsoleSyntaxHighlightProps> = ({
  code,
  language = "text",
  showLineNumbers = false,
  className = "",
  "data-testid": dataTestId = "console-syntax-highlight",
}) => {
  const highlighted = useMemo(() => {
    if (language === "json") {
      return highlightJson(code);
    }
    if (language === "shell") {
      return highlightShell(code);
    }
    return [<span key="0">{code}</span>];
  }, [code, language]);

  const lines = code.split("\n");

  return (
    <pre
      className={`tf-console-syntax-highlight tf-console-syntax-highlight--${language} ${className}`}
      data-testid={dataTestId}
    >
      {showLineNumbers && (
        <span className="tf-console-syntax-highlight__line-numbers">
          {lines.map((_, i) => (
            <span key={i} className="tf-console-syntax-highlight__line-num">
              {i + 1}
            </span>
          ))}
        </span>
      )}
      <code className="tf-console-syntax-highlight__code">{highlighted}</code>
    </pre>
  );
};

/** Simple JSON highlighter. */
function highlightJson(code: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const stringRegex = /"(?:[^"\\]|\\.)*"/g;
  const numberRegex = /-?\d+\.?\d*/g;
  const keywordRegex = /(true|false|null)/g;
  const punctuationRegex = /[{}[\],:]/g;

  // Simple approach: split and colorize
  let remaining = code;
  let i = 0;

  const patterns = [
    { regex: stringRegex, className: "tf-sh-string" },
    { regex: numberRegex, className: "tf-sh-number" },
    { regex: keywordRegex, className: "tf-sh-keyword" },
    { regex: punctuationRegex, className: "tf-sh-punctuation" },
  ];

  // Naive tokenization for display
  const parts = code.split(/("(?:[^"\\]|\\.)*"|-?\d+\.?\d*|(true|false|null)|[{}[\],:])/g);

  parts.forEach((part, idx) => {
    if (!part) return;
    if (stringRegex.test(part)) {
      tokens.push(
        <span key={idx} className="tf-console-syntax-highlight__string">
          {part}
        </span>
      );
    } else if (numberRegex.test(part)) {
      tokens.push(
        <span key={idx} className="tf-console-syntax-highlight__number">
          {part}
        </span>
      );
    } else if (keywordRegex.test(part)) {
      tokens.push(
        <span key={idx} className="tf-console-syntax-highlight__keyword">
          {part}
        </span>
      );
    } else if (punctuationRegex.test(part)) {
      tokens.push(
        <span key={idx} className="tf-console-syntax-highlight__punctuation">
          {part}
        </span>
      );
    } else {
      tokens.push(<span key={idx}>{part}</span>);
    }
  });

  return tokens;
}

/** Simple shell highlighter. */
function highlightShell(code: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  const parts = code.split(/(\$\w+|--?\w+|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\||>|;)/g);

  parts.forEach((part, idx) => {
    if (!part) return;
    if (part.startsWith("$") || part.startsWith("-")) {
      tokens.push(
        <span key={idx} className="tf-console-syntax-highlight__flag">
          {part}
        </span>
      );
    } else if (part === "|" || part === ">" || part === ";") {
      tokens.push(
        <span key={idx} className="tf-console-syntax-highlight__operator">
          {part}
        </span>
      );
    } else {
      tokens.push(<span key={idx}>{part}</span>);
    }
  });

  return tokens;
}

ConsoleSyntaxHighlight.displayName = "ConsoleSyntaxHighlight";

export default ConsoleSyntaxHighlight;
