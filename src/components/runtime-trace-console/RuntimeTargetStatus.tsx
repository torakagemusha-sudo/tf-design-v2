/**
 * @fileoverview RuntimeTargetStatus — Connection and state status display.
 * Visual indicator of runtime health and connection quality.
 *
 * @module @torafirma/design-system/runtime-trace-console/RuntimeTargetStatus
 */

import React from "react";
import type { BaseComponentProps, RuntimeTarget } from "./types";

/** Props for RuntimeTargetStatus. */
export interface RuntimeTargetStatusProps extends BaseComponentProps {
  /** Connection state. */
  connection: RuntimeTarget["connection"];
  /** Product state of the runtime. */
  state: RuntimeTarget["state"];
  /** Optional latency in ms for connection quality indicator. */
  latencyMs?: number;
  /** Whether to show a compact inline variant. */
  compact?: boolean;
}

/**
 * RuntimeTargetStatus — Connection and operational state indicator.
 *
 * Shows connection quality (connected/disconnected/stale) and product state.
 * Per Section 9.3, unknown/unavailable connections show as blocked.
 *
 * @example
 * ```tsx
 * <RuntimeTargetStatus connection="connected" state="RUNNING" latencyMs={45} />
 * <RuntimeTargetStatus connection="disconnected" state="DISCONNECTED" compact />
 * ```
 */
export const RuntimeTargetStatus: React.FC<RuntimeTargetStatusProps> = ({
  connection,
  state,
  latencyMs,
  compact = false,
  className = "",
  "data-testid": dataTestId = "runtime-target-status",
}) => {
  if (compact) {
    return (
      <span
        className={`tf-runtime-target-status tf-runtime-target-status--compact ${className}`}
        data-testid={dataTestId}
        title={`${connection} · ${state}${latencyMs ? ` · ${latencyMs}ms` : ""}`}
      >
        <span
          className={`tf-runtime-target-status__dot tf-runtime-target-status__dot--${connection}`}
        />
        <span className="tf-runtime-target-status__label">{state}</span>
      </span>
    );
  }

  return (
    <div
      className={`tf-runtime-target-status ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-runtime-target-status__row">
        <span className="tf-runtime-target-status__label">Connection</span>
        <span
          className={`tf-runtime-target-status__value tf-runtime-target-status__value--${connection}`}
        >
          <span
            className={`tf-runtime-target-status__indicator tf-runtime-target-status__indicator--${connection}`}
          />
          {connection}
        </span>
      </div>
      <div className="tf-runtime-target-status__row">
        <span className="tf-runtime-target-status__label">State</span>
        <span
          className={`tf-badge tf-badge--state-${state.toLowerCase()}`}
        >
          {state}
        </span>
      </div>
      {latencyMs !== undefined && (
        <div className="tf-runtime-target-status__row">
          <span className="tf-runtime-target-status__label">Latency</span>
          <span
            className={`tf-runtime-target-status__latency ${
              latencyMs < 50
                ? "tf-runtime-target-status__latency--good"
                : latencyMs < 200
                  ? "tf-runtime-target-status__latency--fair"
                  : "tf-runtime-target-status__latency--poor"
            }`}
          >
            {latencyMs}ms
          </span>
        </div>
      )}
    </div>
  );
};

RuntimeTargetStatus.displayName = "RuntimeTargetStatus";

export default RuntimeTargetStatus;
