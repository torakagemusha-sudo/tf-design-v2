/**
 * ============================================================
 * FaultIndicator — Torafirma Design System
 * ============================================================
 *
 * Fault/warning indicator. Displays a fault condition with
 * severity, code, message, and optional recovery action.
 *
 * From 03.2 State, Status & Telemetry — Section 6.1 State Model
 * ============================================================
 */

import React from 'react';
import type { ComponentDensity } from '../../types';

/**
 * Fault severity levels.
 */
export type FaultSeverity = 'critical' | 'major' | 'minor' | 'warning' | 'info';

/**
 * Props for the FaultIndicator component.
 */
export interface FaultIndicatorProps {
  /** Whether a fault is active. */
  faulted: boolean;
  /** Fault severity. */
  severity?: FaultSeverity;
  /** Fault code. */
  code?: string;
  /** Fault message. */
  message?: string;
  /** Suggested recovery action. */
  recoveryAction?: string;
  /** Affected component or object. */
  affectedTarget?: string;
  /** Layout density. */
  density?: ComponentDensity;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const severityMeta: Record<FaultSeverity, { label: string; variant: string }> = {
  critical: { label: 'CRITICAL', variant: 'danger' },
  major: { label: 'MAJOR', variant: 'danger' },
  minor: { label: 'MINOR', variant: 'warning' },
  warning: { label: 'WARNING', variant: 'warning' },
  info: { label: 'INFO', variant: 'neutral' },
};

/**
 * FaultIndicator renders a fault condition display.
 *
 * @example
 * ```tsx
 * <FaultIndicator
 *   faulted={true}
 *   severity="major"
 *   code="CONN_TIMEOUT"
 *   message="Connection to runtime timed out after 30s"
 *   recoveryAction="Check runtime status and retry"
 *   affectedTarget="runtime-prod-01"
 * />
 * ```
 */
export const FaultIndicator: React.FC<FaultIndicatorProps> = ({
  faulted,
  severity = 'warning',
  code,
  message,
  recoveryAction,
  affectedTarget,
  density = 'standard',
  className = '',
  testId,
}) => {
  if (!faulted) return null;

  const meta = severityMeta[severity];
  const densityClass = `tf-density-${density}`;

  return (
    <div
      className={`tf-fault-indicator tf-fault-indicator--${meta.variant} tf-fault-indicator--${severity} ${densityClass} ${className}`}
      data-testid={testId}
      data-fault-severity={severity}
      data-fault-code={code}
      role="alert"
      aria-label={`Fault ${severity}: ${code || 'unknown'}`}
    >
      <span className={`tf-fault-indicator__icon tf-fault-indicator__icon--${meta.variant}`} aria-hidden="true">!</span>
      <div className="tf-fault-indicator__content">
        <span className="tf-fault-indicator__severity">{meta.label}</span>
        {code && <span className="tf-fault-indicator__code">{code}</span>}
        {message && <span className="tf-fault-indicator__message">{message}</span>}
        {affectedTarget && <span className="tf-fault-indicator__target">Target: {affectedTarget}</span>}
        {recoveryAction && (
          <span className="tf-fault-indicator__recovery">Action: {recoveryAction}</span>
        )}
      </div>
    </div>
  );
};

FaultIndicator.displayName = 'FaultIndicator';

export default FaultIndicator;
