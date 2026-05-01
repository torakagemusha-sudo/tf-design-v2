/**
 * ============================================================
 * DeployStatus — Torafirma Design System
 * ============================================================
 *
 * Deployment state indicator. Shows the current state of a
 * deployment operation with target environment and version.
 *
 * From 03.2 State, Status & Telemetry — Section 3.9 Runtime Components
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../../torafirma-design-system/src/types';

/**
 * Deployment states.
 */
export type DeployState = 'pending' | 'building' | 'testing' | 'staging' | 'deploying' | 'deployed' | 'rolling_back' | 'failed' | 'cancelled';

/**
 * Props for the DeployStatus component.
 */
export interface DeployStatusProps {
  /** Current deployment state. */
  state: DeployState;
  /** Target environment. */
  environment?: string;
  /** Version being deployed. */
  version?: string;
  /** Deployment target identifier. */
  target?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const deployMeta: Record<DeployState, { label: string; variant: string }> = {
  pending: { label: 'PENDING', variant: 'neutral' },
  building: { label: 'BUILDING', variant: 'stream' },
  testing: { label: 'TESTING', variant: 'stream' },
  staging: { label: 'STAGING', variant: 'warning' },
  deploying: { label: 'DEPLOYING', variant: 'stream' },
  deployed: { label: 'DEPLOYED', variant: 'run' },
  rolling_back: { label: 'ROLLING BACK', variant: 'danger' },
  failed: { label: 'DEPLOY FAILED', variant: 'danger' },
  cancelled: { label: 'CANCELLED', variant: 'neutral' },
};

/**
 * DeployStatus renders a deployment state indicator.
 *
 * @example
 * ```tsx
 * <DeployStatus state="deploying" environment="production" version="2.4.1" target="api-service" />
 * ```
 */
export const DeployStatus: React.FC<DeployStatusProps> = ({
  state,
  environment,
  version,
  target,
  density = 'standard',
  className = '',
  testId,
}) => {
  const meta = deployMeta[state];
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-deploy-status tf-deploy-status--${meta.variant} tf-deploy-status--${state} ${densityClass} ${className}`}
      data-testid={testId}
      data-deploy-state={state}
      role="status"
      aria-label={`Deploy: ${meta.label}`}
    >
      <span className={`tf-deploy-status__icon tf-deploy-status__icon--${meta.variant}`} aria-hidden="true" />
      <span className="tf-deploy-status__label">{meta.label}</span>
      {environment && <span className="tf-deploy-status__env">{environment}</span>}
      {version && <span className="tf-deploy-status__version">v{version}</span>}
      {target && <span className="tf-deploy-status__target">{target}</span>}
    </div>
  );
};

DeployStatus.displayName = 'DeployStatus';

export default DeployStatus;
