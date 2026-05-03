/**
 * @fileoverview RuntimeConnectionStatus — Connection health indicator.
 * Shows runtime connection state with quality metrics.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/RuntimeConnectionStatus
 */

import React from "react";
import type { BaseComponentProps } from "./types";

/** Connection state. */
export type ConnectionState = "connected" | "disconnected" | "connecting" | "stale" | "error";

/** Props for RuntimeConnectionStatus. */
export interface RuntimeConnectionStatusProps extends BaseComponentProps {
  /** Connection state. */
  state: ConnectionState;
  /** Target name. */
  targetName?: string;
  /** Latency in ms (if connected). */
  latencyMs?: number;
  /** Last connected timestamp. */
  lastConnected?: string;
  /** Callback to reconnect. */
  onReconnect?: () => void;
  /** Compact mode. */
  compact?: boolean;
}

/**
 * RuntimeConnectionStatus — Connection health display.
 *
 * Per Section 9.3: disconnected runtimes show blocked state.
 *
 * @example
 * ```tsx
 * <RuntimeConnectionStatus
 *   state="connected"
 *   targetName="prod-us-east"
 *   latencyMs={45}
 * />
 * ```
 */
export const RuntimeConnectionStatus: React.FC<RuntimeConnectionStatusProps> = ({
  state,
  targetName,
  latencyMs,
  lastConnected,
  onReconnect,
  compact = false,
  className = "",
  "data-testid": dataTestId = "runtime-connection-status",
}) => {
  const statusColors: Record<ConnectionState, string> = {
    connected: "#22c55e",
    disconnected: "#ef4444",
    connecting: "#f59e0b",
    stale: "#f97316",
    error: "#dc2626",
  };

  if (compact) {
    return (
      <span
        className={`tf-runtime-connection-status tf-runtime-connection-status--compact tf-runtime-connection-status--${state} ${className}`}
        data-testid={dataTestId}
        title={`${state}${latencyMs ? ` · ${latencyMs}ms` : ""}`}
      >
        <span
          className="tf-runtime-connection-status__dot"
          style={{ backgroundColor: statusColors[state] }}
        />
        {targetName && (
          <span className="tf-runtime-connection-status__name">
            {targetName}
          </span>
        )}
      </span>
    );
  }

  return (
    <div
      className={`tf-runtime-connection-status tf-runtime-connection-status--${state} ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-runtime-connection-status__indicator">
        <span
          className="tf-runtime-connection-status__dot"
          style={{ backgroundColor: statusColors[state] }}
        />
        <span className="tf-runtime-connection-status__state">{state}</span>
      </div>
      {targetName && (
        <span className="tf-runtime-connection-status__target">
          {targetName}
        </span>
      )}
      {latencyMs !== undefined && state === "connected" && (
        <span className="tf-runtime-connection-status__latency">
          {latencyMs}ms
        </span>
      )}
      {lastConnected && state !== "connected" && (
        <span className="tf-runtime-connection-status__last">
          Last: {new Date(lastConnected).toLocaleTimeString()}
        </span>
      )}
      {state === "disconnected" && onReconnect && (
        <button
          className="tf-btn tf-btn--sm tf-btn--primary"
          onClick={onReconnect}
          type="button"
        >
          Reconnect
        </button>
      )}
    </div>
  );
};

RuntimeConnectionStatus.displayName = "RuntimeConnectionStatus";

export default RuntimeConnectionStatus;
