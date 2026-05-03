/**
 * @fileoverview LogLevelBadge — Log level indicator badge.
 * Colored badge showing TRACE, DEBUG, INFO, WARN, ERROR, FATAL.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/LogLevelBadge
 */

import React from "react";
import type { BaseComponentProps, LogLevel } from "./types";

/** Props for LogLevelBadge. */
export interface LogLevelBadgeProps extends BaseComponentProps {
  /** Log level to display. */
  level: LogLevel;
  /** Visual size variant. */
  size?: "sm" | "md" | "lg";
  /** Whether to show as icon only (no text). */
  iconOnly?: boolean;
}

/** Level-to-icon mapping. */
export const LEVEL_ICONS: Record<LogLevel, string> = {
  trace: "⋮",
  debug: "ὐ",
  info: "ℹ",
  warn: "⚠",
  error: "✕",
  fatal: "☠",
};

/**
 * LogLevelBadge — Severity badge for log entries.
 *
 * @example
 * ```tsx
 * <LogLevelBadge level="error" size="sm" />
 * <LogLevelBadge level="warn" iconOnly />
 * ```
 */
export const LogLevelBadge: React.FC<LogLevelBadgeProps> = ({
  level,
  size = "sm",
  iconOnly = false,
  className = "",
  "data-testid": dataTestId = "log-level-badge",
}) => {
  return (
    <span
      className={`tf-log-level-badge tf-log-level-badge--${level} tf-log-level-badge--${size} ${className}`}
      data-testid={dataTestId}
      title={level.toUpperCase()}
    >
      <span className="tf-log-level-badge__icon" aria-hidden="true">
        {LEVEL_ICONS[level]}
      </span>
      {!iconOnly && (
        <span className="tf-log-level-badge__text">{level.toUpperCase()}</span>
      )}
    </span>
  );
};

LogLevelBadge.displayName = "LogLevelBadge";

export default LogLevelBadge;
