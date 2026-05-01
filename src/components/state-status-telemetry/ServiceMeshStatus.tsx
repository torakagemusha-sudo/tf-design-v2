/**
 * ============================================================
 * ServiceMeshStatus — Torafirma Design System
 * ============================================================
 *
 * Service mesh health overview. Displays aggregate health of
 * all services in a mesh with healthy/unhealthy counts.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Props for the ServiceMeshStatus component.
 */
export interface ServiceMeshStatusProps {
  /** Total number of services. */
  totalServices: number;
  /** Number of healthy services. */
  healthyCount: number;
  /** Number of degraded services. */
  degradedCount?: number;
  /** Number of unhealthy services. */
  unhealthyCount?: number;
  /** Number of unknown-state services. */
  unknownCount?: number;
  /** Mesh name. */
  meshName?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * ServiceMeshStatus renders a service mesh health overview.
 *
 * @example
 * ```tsx
 * <ServiceMeshStatus totalServices={24} healthyCount={20} degradedCount={3} unhealthyCount={1} meshName="production-mesh" />
 * ```
 */
export const ServiceMeshStatus: React.FC<ServiceMeshStatusProps> = ({
  totalServices,
  healthyCount,
  degradedCount = 0,
  unhealthyCount = 0,
  unknownCount = 0,
  meshName,
  className = '',
  testId,
}) => {
  const healthPercent = totalServices > 0 ? (healthyCount / totalServices) * 100 : 0;
  const variant = unhealthyCount > 0 ? 'danger' : degradedCount > 0 ? 'warning' : 'run';

  return (
    <div
      className={`tf-service-mesh-status tf-service-mesh-status--${variant} ${className}`}
      data-testid={testId}
      role="region"
      aria-label={`Service mesh${meshName ? ` ${meshName}` : ''}: ${healthyCount} of ${totalServices} healthy`}
    >
      {meshName && <span className="tf-service-mesh-status__name">{meshName}</span>}
      <div className="tf-service-mesh-status__counts">
        <span className="tf-service-mesh-status__healthy">{healthyCount} healthy</span>
        {degradedCount > 0 && <span className="tf-service-mesh-status__degraded">{degradedCount} degraded</span>}
        {unhealthyCount > 0 && <span className="tf-service-mesh-status__unhealthy">{unhealthyCount} unhealthy</span>}
        {unknownCount > 0 && <span className="tf-service-mesh-status__unknown">{unknownCount} unknown</span>}
      </div>
      <div className="tf-service-mesh-status__bar">
        <div
          className={`tf-service-mesh-status__fill tf-service-mesh-status__fill--${variant}`}
          style={{ width: `${healthPercent}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="tf-service-mesh-status__percent">{healthPercent.toFixed(0)}% healthy</span>
    </div>
  );
};

ServiceMeshStatus.displayName = 'ServiceMeshStatus';

export default ServiceMeshStatus;
