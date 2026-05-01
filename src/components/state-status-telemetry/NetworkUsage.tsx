/**
 * ============================================================
 * NetworkUsage — Torafirma Design System
 * ============================================================
 *
 * Network usage display. Shows inbound/outbound traffic with
 * rates and optional interface name.
 *
 * From 03.2 State, Status & Telemetry — Section 3.10 Visualization
 * ============================================================
 */

import React from 'react';

/**
 * Props for the NetworkUsage component.
 */
export interface NetworkUsageProps {
  /** Inbound rate in Mbps. */
  inboundMbps: number;
  /** Outbound rate in Mbps. */
  outboundMbps: number;
  /** Network interface name. */
  interface?: string;
  /** Total bytes received. */
  totalRxGb?: number;
  /** Total bytes transmitted. */
  totalTxGb?: number;
  /** Label. */
  label?: string;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * NetworkUsage renders a network usage display.
 *
 * @example
 * ```tsx
 * <NetworkUsage inboundMbps={45.2} outboundMbps={12.8} interface="eth0" totalRxGb={150.4} totalTxGb={42.1} />
 * ```
 */
export const NetworkUsage: React.FC<NetworkUsageProps> = ({
  inboundMbps,
  outboundMbps,
  interface: iface,
  totalRxGb,
  totalTxGb,
  label = 'Network',
  size = 'md',
  className = '',
  testId,
}) => {
  const total = inboundMbps + outboundMbps;
  const variant = total > 800 ? 'danger' : total > 500 ? 'warning' : 'run';

  return (
    <div
      className={`tf-network-usage tf-network-usage--${variant} tf-network-usage--${size} ${className}`}
      data-testid={testId}
      role="region"
      aria-label={`${label}${iface ? ` on ${iface}` : ''}`}
    >
      <div className="tf-network-usage__header">
        <span className="tf-network-usage__label">{label}</span>
        {iface && <span className="tf-network-usage__interface">{iface}</span>}
      </div>
      <div className="tf-network-usage__rates">
        <span className="tf-network-usage__inbound">
          <span className="tf-network-usage__direction" aria-hidden="true">&#x2193;</span>
          {inboundMbps.toFixed(1)} Mbps
        </span>
        <span className="tf-network-usage__outbound">
          <span className="tf-network-usage__direction" aria-hidden="true">&#x2191;</span>
          {outboundMbps.toFixed(1)} Mbps
        </span>
      </div>
      {(totalRxGb !== undefined || totalTxGb !== undefined) && (
        <div className="tf-network-usage__totals">
          {totalRxGb !== undefined && <span className="tf-network-usage__total-rx">Rx: {totalRxGb.toFixed(1)} GB</span>}
          {totalTxGb !== undefined && <span className="tf-network-usage__total-tx">Tx: {totalTxGb.toFixed(1)} GB</span>}
        </div>
      )}
    </div>
  );
};

NetworkUsage.displayName = 'NetworkUsage';

export default NetworkUsage;
