/**
 * @fileoverview LogSource — Log source identifier display.
 * Shows the originating component, service, or thread for a log line.
 *
 * @module @torafirma/design-system/runtime-trace-console/LogSource
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Props for LogSource. */
export interface LogSourceProps extends BaseComponentProps {
  /** Source name. */
  source: string;
  /** Optional thread ID. */
  threadId?: string;
  /** Optional process ID. */
  processId?: number;
  /** Whether to show in compact form. */
  compact?: boolean;
}

/**
 * LogSource — Source identifier for log entries.
 *
 * @example
 * ```tsx
 * <LogSource source="api-gateway" threadId="worker-3" />
 * <LogSource source="db-pool" processId={1234} compact />
 * ```
 */
export const LogSource: React.FC<LogSourceProps> = ({
  source,
  threadId,
  processId,
  compact = false,
  className = "",
  "data-testid": dataTestId = "log-source",
}) => {
  if (compact) {
    return (
      <span
        className={`tf-log-source tf-log-source--compact ${className}`}
        data-testid={dataTestId}
        title={`Source: ${source}${threadId ? ` · Thread: ${threadId}` : ""}${processId ? ` · PID: ${processId}` : ""}`}
      >
        {source}
      </span>
    );
  }

  return (
    <span
      className={`tf-log-source ${className}`}
      data-testid={dataTestId}
    >
      <span className="tf-log-source__name">{source}</span>
      {threadId && (
        <span className="tf-log-source__thread">{threadId}</span>
      )}
      {processId !== undefined && (
        <span className="tf-log-source__pid">{processId}</span>
      )}
    </span>
  );
};

LogSource.displayName = "LogSource";

export default LogSource;
