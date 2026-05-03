/**
 * @fileoverview LogHighlight — Highlighted search terms in log messages.
 * Wraps matching terms in highlighted mark elements.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/LogHighlight
 */

import React, { useMemo } from "react";
import type { BaseComponentProps } from "./types";

/** Props for LogHighlight (inline usage within log messages). */
export interface LogHighlightProps extends BaseComponentProps {
  /** Terms to highlight. */
  terms: string[];
  /** The message text to search within. */
  children: string;
  /** Highlight CSS variant. */
  variant?: "default" | "active" | "dimmed";
}

/**
 * LogHighlight — Renders log message with highlighted search terms.
 *
 * Splits the message on matching terms and wraps them in <mark>.
 *
 * @example
 * ```tsx
 * <LogHighlight terms={["error", "timeout"]}>Connection timeout error</LogHighlight>
 * ```
 */
export const LogHighlight: React.FC<LogHighlightProps> = ({
  terms,
  children,
  variant = "default",
  className = "",
  "data-testid": dataTestId = "log-highlight",
}) => {
  const parts = useMemo(() => {
    if (!terms.length || !children) return [{ text: children, highlight: false }];

    const pattern = terms
      .filter((t) => t.length > 0)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");

    if (!pattern) return [{ text: children, highlight: false }];

    const regex = new RegExp(`(${pattern})`, "gi");
    const split = children.split(regex);

    return split.map((text) => ({
      text,
      highlight: terms.some(
        (t) => t.length > 0 && text.toLowerCase() === t.toLowerCase()
      ),
    }));
  }, [children, terms]);

  return (
    <span
      className={`tf-log-highlight-container tf-log-highlight--${variant} ${className}`}
      data-testid={dataTestId}
    >
      {parts.map((part, i) =>
        part.highlight ? (
          <mark key={i} className="tf-log-highlight">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </span>
  );
};

LogHighlight.displayName = "LogHighlight";

export default LogHighlight;
