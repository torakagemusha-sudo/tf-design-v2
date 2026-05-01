/**
 * ============================================================
 * EnvironmentBadge — Torafirma Design System
 * ============================================================
 *
 * Environment label badge for dev/staging/prod. Clearly
 * identifies the deployment environment with semantic color.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Deployment environments.
 */
export type DeployEnvironment = 'development' | 'staging' | 'production' | 'testing' | 'local' | 'demo';

/**
 * Props for the EnvironmentBadge component.
 */
export interface EnvironmentBadgeProps {
  /** Current deployment environment. */
  environment: DeployEnvironment;
  /** Optional cluster or region name. */
  region?: string;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const envMeta: Record<DeployEnvironment, { label: string; variant: string }> = {
  development: { label: 'DEV', variant: 'inspect' },
  staging: { label: 'STAGING', variant: 'warning' },
  production: { label: 'PROD', variant: 'run' },
  testing: { label: 'TEST', variant: 'model' },
  local: { label: 'LOCAL', variant: 'neutral' },
  demo: { label: 'DEMO', variant: 'stream' },
};

/**
 * EnvironmentBadge renders an environment label badge.
 *
 * @example
 * ```tsx
 * <EnvironmentBadge environment="production" region="us-east-1" />
 * <EnvironmentBadge environment="staging" size="sm" />
 * ```
 */
export const EnvironmentBadge: React.FC<EnvironmentBadgeProps> = ({
  environment,
  region,
  size = 'md',
  className = '',
  testId,
}) => {
  const meta = envMeta[environment];

  return (
    <span
      className={`tf-environment-badge tf-environment-badge--${meta.variant} tf-environment-badge--${environment} tf-environment-badge--${size} ${className}`}
      data-testid={testId}
      data-environment={environment}
      role="status"
      aria-label={`Environment: ${environment}${region ? `, region: ${region}` : ''}`}
      title={`${environment}${region ? ` (${region})` : ''}`}
    >
      {meta.label}
      {region && <span className="tf-environment-badge__region">{region}</span>}
    </span>
  );
};

EnvironmentBadge.displayName = 'EnvironmentBadge';

export default EnvironmentBadge;
