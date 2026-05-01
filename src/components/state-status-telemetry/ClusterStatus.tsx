/**
 * ============================================================
 * ClusterStatus — Torafirma Design System
 * ============================================================
 *
 * Cluster health indicator. Shows the status of a compute
 * cluster with node counts and overall health.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Props for the ClusterStatus component.
 */
export interface ClusterStatusProps {
  /** Cluster name. */
  name: string;
  /** Total nodes in the cluster. */
  totalNodes: number;
  /** Ready node count. */
  readyNodes: number;
  /** Unavailable node count. */
  unavailableNodes?: number;
  /** Cluster version. */
  version?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ClusterStatus renders a cluster health indicator.
 *
 * @example
 * ```tsx
 * <ClusterStatus name="prod-k8s-01" totalNodes={12} readyNodes={11} unavailableNodes={1} version="1.28.4" />
 * ```
 */
export const ClusterStatus: React.FC<ClusterStatusProps> = ({
  name,
  totalNodes,
  readyNodes,
  unavailableNodes = 0,
  version,
  className = '',
  testId,
}) => {
  const readyPercent = totalNodes > 0 ? (readyNodes / totalNodes) * 100 : 0;
  const variant = unavailableNodes > 1 ? 'danger' : unavailableNodes > 0 ? 'warning' : 'run';

  return (
    <div
      className={`tf-cluster-status tf-cluster-status--${variant} ${className}`}
      data-testid={testId}
      role="status"
      aria-label={`Cluster ${name}: ${readyNodes} of ${totalNodes} nodes ready`}
    >
      <div className="tf-cluster-status__header">
        <span className="tf-cluster-status__name">{name}</span>
        {version && <span className="tf-cluster-status__version">v{version}</span>}
      </div>
      <div className="tf-cluster-status__nodes">
        <span className="tf-cluster-status__ready">{readyNodes}/{totalNodes} ready</span>
        {unavailableNodes > 0 && (
          <span className="tf-cluster-status__unavailable">{unavailableNodes} unavailable</span>
        )}
      </div>
      <div className="tf-cluster-status__bar">
        <div
          className={`tf-cluster-status__fill tf-cluster-status__fill--${variant}`}
          style={{ width: `${readyPercent}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

ClusterStatus.displayName = 'ClusterStatus';

export default ClusterStatus;
