/**
 * @fileoverview LogLine — Single log line with colorization and selection.
 * Renders one log entry with timestamp, level badge, source, and message.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/LogLine
 */

import React from "react";
import type { BaseComponentProps, LogLine as LogLineType } from "./types";

/** Props for LogLine component. */
export interface LogLineProps extends BaseComponentProps {
  /** The log line to render. */
  line: LogLineType;
  /** Whether this line is selected. */
  selected?: boolean;
  /** Search terms to highlight. */
  highlightTerms?: string[];
  /** Click handler. */
  onClick?: (line: LogLineType) => void;
  /** Whether to show line numbers. */
  showLineNumber?: boolean;
  /** Line number for display. */
  lineNumber?: number;
}

/**
 * LogLine — Single log entry display.
 *
 * Renders timestamp, severity badge, source identifier, and message.
 * Supports search term highlighting and selection state.
 *
 * @example
 * ```tsx
 * <LogLine
 *   line={logEntry}
 *   selected={selectedId === logEntry.id}
 *   highlightTerms={["error", "timeout"]}
 *   onClick={(l) => setSelectedId(l.id)}
 * />
 * ```
 */
export const LogLine: React.FC<LogLineProps> = ({
  line,
  selected = false,
  highlightTerms = [],
  onClick,
  showLineNumber = false,
  lineNumber,
  className = "",
  "data-testid": dataTestId = "log-line",
}) => {
  const renderMessage = (): React.ReactNode => {
    if (highlightTerms.length === 0) return line.message;

    // Build regex from highlight terms
    const pattern = highlightTerms
      .filter((t) => t.length > 0)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");

    if (!pattern) return line.message;

    const parts = line.message.split(new RegExp(`(${pattern})`, "gi"));
    return parts.map((part, i) =>
      highlightTerms.some(
        (t) => t.length > 0 && part.toLowerCase() === t.toLowerCase()
      ) ? (
        <mark key={i} className="tf-log-highlight">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div
      className={`tf-log-line tf-log-line--${line.level} ${
        selected ? "tf-log-line--selected" : ""
      } ${className}`}
      data-testid={dataTestId}
      onClick={() => onClick?.(line)}
    >
      {showLineNumber && lineNumber !== undefined && (
        <span className="tf-log-line__number">{lineNumber}</span>
      )}
      <time className="tf-log-line__timestamp" dateTime={line.timestamp}>
        {new Date(line.timestamp).toLocaleTimeString()}
      </time>
      <span className={`tf-log-level-badge tf-log-level-badge--${line.level}`}>
        {line.level.toUpperCase()}
      </span>
      <span className="tf-log-line__source">[{line.source}]</span>
      <span className="tf-log-line__message">{renderMessage()}</span>
    </div>
  );
};

LogLine.displayName = "LogLine";

export default LogLine;
