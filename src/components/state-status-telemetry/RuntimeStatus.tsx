/**
 * ============================================================
 * RuntimeStatus — Torafirma Design System
 * ============================================================
 *
 * Displays the current runtime connection state with color,
 * label, and optional detail text. Indicates whether the
 * system is connected, disconnected, or in a transitional state.
 *
 * From 03.2 State, Status & Telemetry — Section 3.9 Runtime Components
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../../torafirma-design-system/src/types';

/**
 * Runtime connection states.
 */
export type RuntimeConnectionState = 'connected' | 'connecting' | 'disconnected' | 'reconnecting' | 'degraded' | 'error';

/**
 * Props for the RuntimeStatus component.
 */
export interface RuntimeStatusProps {
  /** Current runtime connection state. */
  state: RuntimeConnectionState;
  /** Runtime target name or URL. */
  target?: string;
  /** Optional detail message (e.g., latency, last connected). */
  detail?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Whether to show the target name. */
  showTarget?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const runtimeStateMeta: Record<RuntimeConnectionState, { label: string; variant: string }> = {
  connected: { label: 'CONNECTED', variant: 'run' },
  connecting: { label: 'CONNECTING', variant: 'stream' },
  disconnected: { label: 'DISCONNECTED', variant: 'neutral' },
  reconnecting: { label: 'RECONNECTING', variant: 'warning' },
  degraded: { label: 'DEGRADED', variant: 'instability' },
  error: { label: 'ERROR', variant: 'danger' },
};

/**
 * RuntimeStatus shows the current runtime connection state.
 *
 * @example
 * ```tsx
 * <RuntimeStatus state="connected" target="prod-runtime-01" detail="Latency: 12ms" />
 * <RuntimeStatus state="disconnected" showTarget />
 * ```
 */
export const RuntimeStatus: React.FC<RuntimeStatusProps> = ({
  state,
  target,
  detail,
  density = 'standard',
  showTarget = true,
  className = '',
  testId,
}) => {
  const meta = runtimeStateMeta[state];
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-runtime-status tf-runtime-status--${meta.variant} tf-runtime-status--${state} ${densityClass} ${className}`}
      data-testid={testId}
      data-runtime-state={state}
      role="status"
      aria-label={`Runtime ${meta.label}${target ? ` to ${target}` : ''}`}
    >
      <span className="tf-runtime-status__indicator" aria-hidden="true">
        <span className={`tf-runtime-status__dot tf-runtime-status__dot--${state}`} />
      </span>
      <span className="tf-runtime-status__label">{meta.label}</span>
      {showTarget && target && (
        <span className="tf-runtime-status__target">{target}</span>
      )}
      {detail && (
        <span className="tf-runtime-status__detail">{detail}</span>
      )}
    </div>
  );
};

RuntimeStatus.displayName = 'RuntimeStatus';

export default RuntimeStatus;
