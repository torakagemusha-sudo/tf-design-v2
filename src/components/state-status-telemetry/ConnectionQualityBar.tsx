/**
 * ============================================================
 * ConnectionQualityBar — Torafirma Design System
 * ============================================================
 *
 * Connection quality visualization showing a segmented bar
 * with color-coded quality levels and optional metric readouts.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';
import type { ConnectionQuality } from './ConnectionStatus';

/**
 * Props for the ConnectionQualityBar component.
 */
export interface ConnectionQualityBarProps {
  /** Current connection quality. */
  quality: ConnectionQuality;
  /** Download speed in Mbps. */
  downloadMbps?: number;
  /** Upload speed in Mbps. */
  uploadMbps?: number;
  /** Packet loss percentage. */
  packetLossPercent?: number;
  /** Jitter in milliseconds. */
  jitterMs?: number;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const qualityOrder: ConnectionQuality[] = ['none', 'poor', 'fair', 'good', 'excellent'];

/**
 * ConnectionQualityBar renders a detailed connection quality display.
 *
 * @example
 * ```tsx
 * <ConnectionQualityBar quality="good" downloadMbps={95.2} uploadMbps={42.1} packetLossPercent={0.1} />
 * ```
 */
export const ConnectionQualityBar: React.FC<ConnectionQualityBarProps> = ({
  quality,
  downloadMbps,
  uploadMbps,
  packetLossPercent,
  jitterMs,
  className = '',
  testId,
}) => {
  const qualityIndex = qualityOrder.indexOf(quality);

  return (
    <div
      className={`tf-connection-quality-bar tf-connection-quality-bar--${quality} ${className}`}
      data-testid={testId}
      data-quality={quality}
      role="meter"
      aria-label={`Connection quality: ${quality}`}
    >
      <div className="tf-connection-quality-bar__segments" aria-hidden="true">
        {qualityOrder.map((q, i) => (
          <span
            key={q}
            className={`tf-connection-quality-bar__segment
              ${i <= qualityIndex ? `tf-connection-quality-bar__segment--filled` : 'tf-connection-quality-bar__segment--empty'}
            `}
          />
        ))}
      </div>
      <span className="tf-connection-quality-bar__label">{quality.toUpperCase()}</span>
      <div className="tf-connection-quality-bar__metrics">
        {downloadMbps !== undefined && (
          <span className="tf-connection-quality-bar__metric">&#x2193; {downloadMbps.toFixed(1)} Mbps</span>
        )}
        {uploadMbps !== undefined && (
          <span className="tf-connection-quality-bar__metric">&#x2191; {uploadMbps.toFixed(1)} Mbps</span>
        )}
        {packetLossPercent !== undefined && (
          <span className="tf-connection-quality-bar__metric">Loss: {packetLossPercent.toFixed(2)}%</span>
        )}
        {jitterMs !== undefined && (
          <span className="tf-connection-quality-bar__metric">Jitter: {jitterMs}ms</span>
        )}
      </div>
    </div>
  );
};

ConnectionQualityBar.displayName = 'ConnectionQualityBar';

export default ConnectionQualityBar;
