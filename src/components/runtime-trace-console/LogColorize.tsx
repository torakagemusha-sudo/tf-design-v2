/**
 * @fileoverview LogColorize — Colorize log output by severity level.
 * Applies CSS color classes based on log level for visual scanning.
 *
 * @module @torafirma/design-system/runtime-trace-console/LogColorize
 */

import React from "react";
import type { BaseComponentProps, LogLevel } from "./types";

/** Props for LogColorize. */
export interface LogColorizeProps extends BaseComponentProps {
  /** Log level determining color. */
  level: LogLevel;
  /** Content to colorize. */
  children: React.ReactNode;
  /** Color intensity. */
  intensity?: "subtle" | "normal" | "strong";
}

/** Level-to-color mapping for reference. */
export const LEVEL_COLORS: Record<LogLevel, string> = {
  trace: "#6b7280",
  debug: "#8b5cf6",
  info: "#06b6d4",
  warn: "#f59e0b",
  error: "#ef4444",
  fatal: "#dc2626",
};

/**
 * LogColorize — Applies level-based colorization to content.
 *
 * @example
 * ```tsx
 * <LogColorize level="error">Connection failed</LogColorize>
 * <LogColorize level="warn" intensity="strong">Deprecated API</LogColorize>
 * ```
 */
export const LogColorize: React.FC<LogColorizeProps> = ({
  level,
  children,
  intensity = "normal",
  className = "",
  "data-testid": dataTestId = "log-colorize",
}) => {
  return (
    <span
      className={`tf-log-colorize tf-log-colorize--${level} tf-log-colorize--${intensity} ${className}`}
      data-testid={dataTestId}
      style={{ color: LEVEL_COLORS[level] }}
    >
      {children}
    </span>
  );
};

LogColorize.displayName = "LogColorize";

export default LogColorize;
