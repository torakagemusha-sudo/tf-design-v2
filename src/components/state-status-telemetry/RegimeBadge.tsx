/**
 * ============================================================
 * RegimeBadge — Torafirma Design System
 * ============================================================
 *
 * Compact regime label badge. Shows only the regime name in
 * its semantic color. For use in headers, toolbars, and tables.
 *
 * From 03.2 State, Status & Telemetry
 * ============================================================
 */

import React from 'react';
import type { RegimeType } from './RegimeIndicator';

/**
 * Props for the RegimeBadge component.
 */
export interface RegimeBadgeProps {
  /** Regime to display. */
  regime: RegimeType;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const regimeShortLabels: Record<RegimeType, string> = {
  normal: 'NORMAL',
  degraded: 'DEGRADED',
  emergency: 'EMERGENCY',
  maintenance: 'MAINT',
  simulation: 'SIM',
  lockdown: 'LOCKDOWN',
  startup: 'STARTUP',
  shutdown: 'SHUTDOWN',
};

const regimeVariants: Record<RegimeType, string> = {
  normal: 'run',
  degraded: 'instability',
  emergency: 'danger',
  maintenance: 'inspect',
  simulation: 'model',
  lockdown: 'authority',
  startup: 'stream',
  shutdown: 'warning',
};

/**
 * RegimeBadge renders a compact regime label.
 *
 * @example
 * ```tsx
 * <RegimeBadge regime="normal" />
 * <RegimeBadge regime="degraded" size="sm" />
 * ```
 */
export const RegimeBadge: React.FC<RegimeBadgeProps> = ({
  regime,
  size = 'sm',
  className = '',
  testId,
}) => {
  return (
    <span
      className={`tf-regime-badge tf-regime-badge--${regimeVariants[regime]} tf-regime-badge--${regime} tf-regime-badge--${size} ${className}`}
      data-testid={testId}
      data-regime={regime}
      role="status"
      aria-label={`Regime: ${regime}`}
    >
      {regimeShortLabels[regime]}
    </span>
  );
};

RegimeBadge.displayName = 'RegimeBadge';

export default RegimeBadge;
