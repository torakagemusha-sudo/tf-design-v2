/**
 * ============================================================
 * PodStatus — Torafirma Design System
 * ============================================================
 *
 * Kubernetes-style pod status display. Shows pod name, status,
 * restarts, and age in a compact format.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Pod phases.
 */
export type PodPhase = 'Pending' | 'Running' | 'Succeeded' | 'Failed' | 'Unknown' | 'Terminating' | 'CrashLoopBackOff';

/**
 * Props for the PodStatus component.
 */
export interface PodStatusProps {
  /** Pod name. */
  name: string;
  /** Pod namespace. */
  namespace?: string;
  /** Current pod phase. */
  phase: PodPhase;
  /** Container ready count. */
  readyContainers?: string;
  /** Restart count. */
  restarts?: number;
  /** Pod age. */
  age?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const phaseVariants: Record<PodPhase, string> = {
  Pending: 'warning',
  Running: 'run',
  Succeeded: 'run',
  Failed: 'danger',
  Unknown: 'neutral',
  Terminating: 'warning',
  CrashLoopBackOff: 'danger',
};

/**
 * PodStatus renders a Kubernetes-style pod status.
 *
 * @example
 * ```tsx
 * <PodStatus name="api-service-7d9f4b8c5-x2k9m" namespace="production" phase="Running" readyContainers="2/2" restarts={0} age="15d" />
 * ```
 */
export const PodStatus: React.FC<PodStatusProps> = ({
  name,
  namespace,
  phase,
  readyContainers,
  restarts,
  age,
  className = '',
  testId,
}) => {
  return (
    <div
      className={`tf-pod-status tf-pod-status--${phaseVariants[phase]} tf-pod-status--${phase} ${className}`}
      data-testid={testId}
      data-pod-phase={phase}
      role="status"
      aria-label={`Pod ${name}: ${phase}`}
    >
      <div className="tf-pod-status__name-row">
        <span className="tf-pod-status__name">{name}</span>
        {namespace && <span className="tf-pod-status__namespace">{namespace}</span>}
      </div>
      <div className="tf-pod-status__details">
        <span className={`tf-pod-status__phase tf-pod-status__phase--${phaseVariants[phase]}`}>{phase}</span>
        {readyContainers && <span className="tf-pod-status__ready">{readyContainers}</span>}
        {restarts !== undefined && restarts > 0 && (
          <span className={`tf-pod-status__restarts tf-pod-status__restarts--${restarts > 5 ? 'danger' : 'warning'}`}>
            {restarts} restart{restarts !== 1 ? 's' : ''}
          </span>
        )}
        {age && <span className="tf-pod-status__age">{age}</span>}
      </div>
    </div>
  );
};

PodStatus.displayName = 'PodStatus';

export default PodStatus;
