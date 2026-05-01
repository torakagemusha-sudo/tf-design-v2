/**
 * @fileoverview LogTimestamp — Formatted timestamp display for log entries.
 * Supports ISO, locale, and relative time formats.
 *
 * @module @torafirma/design-system/runtime-trace-console/LogTimestamp
 */

import React, { useMemo } from "react";
import type { BaseComponentProps } from "./types";

/** Props for LogTimestamp. */
export interface LogTimestampProps extends BaseComponentProps {
  /** ISO timestamp string. */
  timestamp: string;
  /** Display format. */
  format?: "iso" | "locale" | "relative" | "time";
  /** Whether to include milliseconds. */
  showMs?: boolean;
}

/**
 * LogTimestamp — Formatted timestamp for log lines.
 *
 * @example
 * ```tsx
 * <LogTimestamp timestamp="2024-01-15T10:30:00.000Z" format="time" showMs />
 * <LogTimestamp timestamp={ts} format="relative" />
 * ```
 */
export const LogTimestamp: React.FC<LogTimestampProps> = ({
  timestamp,
  format = "time",
  showMs = false,
  className = "",
  "data-testid": dataTestId = "log-timestamp",
}) => {
  const formatted = useMemo(() => {
    const date = new Date(timestamp);

    switch (format) {
      case "iso":
        return timestamp;
      case "locale":
        return date.toLocaleString();
      case "relative": {
        const diff = Date.now() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const mins = Math.floor(seconds / 60);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
      }
      case "time": {
        const parts: string[] = [];
        parts.push(date.toLocaleTimeString());
        if (showMs) {
          parts.push(`.${String(date.getMilliseconds()).padStart(3, "0")}`);
        }
        return parts.join("");
      }
      default:
        return timestamp;
    }
  }, [timestamp, format, showMs]);

  return (
    <time
      className={`tf-log-timestamp tf-log-timestamp--${format} ${className}`}
      data-testid={dataTestId}
      dateTime={timestamp}
      title={new Date(timestamp).toISOString()}
    >
      {formatted}
    </time>
  );
};

LogTimestamp.displayName = "LogTimestamp";

export default LogTimestamp;
