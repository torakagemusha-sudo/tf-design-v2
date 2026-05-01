/**
 * ============================================================
 * ConnectionStatus — Torafirma Design System
 * ============================================================
 *
 * Network/connection indicator showing the current state of
 * a network connection with quality level and optional details.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../../torafirma-design-system/src/types';

/**
 * Connection quality levels.
 */
export type ConnectionQuality = 'excellent' | 'good' | 'fair' | 'poor' | 'none';

/**
 * Props for the ConnectionStatus component.
 */
export interface ConnectionStatusProps {
  /** Whether connected. */
  connected: boolean;
  /** Connection quality level. */
  quality?: ConnectionQuality;
  /** Connection name or endpoint. */
  name?: string;
  /** Latency in milliseconds. */
  latencyMs?: number;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const qualityMeta: Record<ConnectionQuality, { variant: string; bars: number }> = {
  excellent: { variant: 'run', bars: 4 },
  good: { variant: 'run', bars: 3 },
  fair: { variant: 'warning', bars: 2 },
  poor: { variant: 'danger', bars: 1 },
  none: { variant: 'neutral', bars: 0 },
};

/**
 * ConnectionStatus renders a network connection indicator.
 *
 * @example
 * ```tsx
 * <ConnectionStatus connected={true} quality="good" latencyMs={24} name="API Gateway" />
 * <ConnectionStatus connected={false} quality="none" />
 * ```
 */
export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  connected,
  quality = 'none',
  name,
  latencyMs,
  density = 'standard',
  className = '',
  testId,
}) => {
  const meta = qualityMeta[quality];
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-connection-status tf-connection-status--${meta.variant} tf-connection-status--${connected ? 'connected' : 'disconnected'} ${densityClass} ${className}`}
      data-testid={testId}
      data-connected={connected}
      data-quality={quality}
      role="status"
      aria-label={`Connection${name ? ` to ${name}` : ''}: ${connected ? quality : 'disconnected'}`}
    >
      <div className="tf-connection-status__bars" aria-hidden="true">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={`tf-connection-status__bar
              ${bar <= meta.bars ? `tf-connection-status__bar--filled tf-connection-status__bar--${meta.variant}` : 'tf-connection-status__bar--empty'}
            `}
          />
        ))}
      </div>
      {name && <span className="tf-connection-status__name">{name}</span>}
      {latencyMs !== undefined && connected && (
        <span className="tf-connection-status__latency">{latencyMs}ms</span>
      )}
    </div>
  );
};

ConnectionStatus.displayName = 'ConnectionStatus';

export default ConnectionStatus;
