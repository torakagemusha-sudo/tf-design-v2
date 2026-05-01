/**
 * ============================================================
 * SecurityPostureBadge — Torafirma Design System
 * ============================================================
 *
 * Security posture level badge. Indicates the current security
 * posture with a simple, scannable badge.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';

/**
 * Security posture levels.
 */
export type SecurityPosture = 'secure' | 'elevated' | 'at_risk' | 'compromised' | 'unknown';

/**
 * Props for the SecurityPostureBadge component.
 */
export interface SecurityPostureBadgeProps {
  /** Current security posture. */
  posture: SecurityPosture;
  /** Number of active threats. */
  activeThreats?: number;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const postureMeta: Record<SecurityPosture, { label: string; variant: string }> = {
  secure: { label: 'SECURE', variant: 'run' },
  elevated: { label: 'ELEVATED', variant: 'warning' },
  at_risk: { label: 'AT RISK', variant: 'danger' },
  compromised: { label: 'COMPROMISED', variant: 'danger' },
  unknown: { label: 'UNKNOWN', variant: 'neutral' },
};

/**
 * SecurityPostureBadge renders a security posture badge.
 *
 * @example
 * ```tsx
 * <SecurityPostureBadge posture="secure" />
 * <SecurityPostureBadge posture="elevated" activeThreats={2} size="sm" />
 * ```
 */
export const SecurityPostureBadge: React.FC<SecurityPostureBadgeProps> = ({
  posture,
  activeThreats,
  size = 'md',
  className = '',
  testId,
}) => {
  const meta = postureMeta[posture];

  return (
    <span
      className={`tf-security-posture-badge tf-security-posture-badge--${meta.variant} tf-security-posture-badge--${posture} tf-security-posture-badge--${size} ${className}`}
      data-testid={testId}
      data-security-posture={posture}
      role="status"
      aria-label={`Security posture: ${meta.label}${activeThreats ? `, ${activeThreats} active threats` : ''}`}
      title={`Security posture: ${posture}`}
    >
      <span className="tf-security-posture-badge__icon" aria-hidden="true">&#x1F6E1;</span>
      {meta.label}
      {activeThreats !== undefined && activeThreats > 0 && (
        <span className="tf-security-posture-badge__threats">{activeThreats}</span>
      )}
    </span>
  );
};

SecurityPostureBadge.displayName = 'SecurityPostureBadge';

export default SecurityPostureBadge;
