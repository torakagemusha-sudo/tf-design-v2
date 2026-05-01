/**
 * ============================================================
 * NodeStatus — Torafirma Design System
 * ============================================================
 *
 * Compute node status display. Shows node name, health, role,
 * and resource usage in a compact format.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { HealthLevel } from './HealthIndicator';

/**
 * Props for the NodeStatus component.
 */
export interface NodeStatusProps {
  /** Node name. */
  name: string;
  /** Node health. */
  health: HealthLevel;
  /** Node role (master, worker, etc.). */
  role?: string;
  /** CPU usage percentage. */
  cpuPercent?: number;
  /** Memory usage percentage. */
  memoryPercent?: number;
  /** Disk usage percentage. */
  diskPercent?: number;
  /** Node age or uptime. */
  age?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const healthVariants: Record<HealthLevel, string> = {
  healthy: 'run',
  degraded: 'warning',
  unhealthy: 'danger',
  unknown: 'neutral',
};

/**
 * NodeStatus renders a compute node status display.
 *
 * @example
 * ```tsx
 * <NodeStatus name="worker-03" health="healthy" role="worker" cpuPercent={45} memoryPercent={62} diskPercent={78} age="45d" />
 * ```
 */
export const NodeStatus: React.FC<NodeStatusProps> = ({
  name,
  health,
  role,
  cpuPercent,
  memoryPercent,
  diskPercent,
  age,
  className = '',
  testId,
}) => {
  return (
    <div
      className={`tf-node-status tf-node-status--${healthVariants[health]} ${className}`}
      data-testid={testId}
      data-node-health={health}
      role="status"
      aria-label={`Node ${name}: ${health}`}
    >
      <div className="tf-node-status__header">
        <span className={`tf-node-status__dot tf-node-status__dot--${healthVariants[health]}`} aria-hidden="true" />
        <span className="tf-node-status__name">{name}</span>
        {role && <span className="tf-node-status__role">{role}</span>}
      </div>
      <div className="tf-node-status__resources">
        {cpuPercent !== undefined && (
          <span className={`tf-node-status__resource tf-node-status__resource--${cpuPercent >= 90 ? 'danger' : cpuPercent >= 70 ? 'warning' : 'run'}`}>
            CPU: {cpuPercent.toFixed(0)}%
          </span>
        )}
        {memoryPercent !== undefined && (
          <span className={`tf-node-status__resource tf-node-status__resource--${memoryPercent >= 90 ? 'danger' : memoryPercent >= 70 ? 'warning' : 'run'}`}>
            MEM: {memoryPercent.toFixed(0)}%
          </span>
        )}
        {diskPercent !== undefined && (
          <span className={`tf-node-status__resource tf-node-status__resource--${diskPercent >= 90 ? 'danger' : diskPercent >= 70 ? 'warning' : 'run'}`}>
            DISK: {diskPercent.toFixed(0)}%
          </span>
        )}
      </div>
      {age && <span className="tf-node-status__age">{age}</span>}
    </div>
  );
};

NodeStatus.displayName = 'NodeStatus';

export default NodeStatus;
