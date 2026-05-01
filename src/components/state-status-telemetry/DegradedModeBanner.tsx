/**
 * ============================================================
 * DegradedModeBanner — Torafirma Design System
 * ============================================================
 *
 * Banner indicating degraded operation. Prominently displayed
 * when the system is operating below nominal capacity with
 * explanation of what functionality is limited.
 *
 * From 03.2 State, Status & Telemetry — Section 6.1 State Model
 * ============================================================
 */

import React from 'react';

/**
 * Props for the DegradedModeBanner component.
 */
export interface DegradedModeBannerProps {
  /** Whether the banner is visible. */
  visible: boolean;
  /** Reason for degraded mode. */
  reason: string;
  /** Affected capabilities. */
  affectedCapabilities?: string[];
  /** Estimated recovery time. */
  estimatedRecovery?: string;
  /** Handler to view details. */
  onViewDetails?: () => void;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * DegradedModeBanner renders a prominent degraded operation warning.
 *
 * @example
 * ```tsx
 * <DegradedModeBanner
 *   visible={true}
 *   reason="Database replication lag exceeds threshold"
 *   affectedCapabilities={["Real-time analytics", "Report generation"]}
 *   estimatedRecovery="5 minutes"
 * />
 * ```
 */
export const DegradedModeBanner: React.FC<DegradedModeBannerProps> = ({
  visible,
  reason,
  affectedCapabilities,
  estimatedRecovery,
  onViewDetails,
  className = '',
  testId,
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-degraded-mode-banner ${className}`}
      data-testid={testId}
      role="alert"
      aria-label="System operating in degraded mode"
    >
      <span className="tf-degraded-mode-banner__icon" aria-hidden="true">&#x26A0;</span>
      <div className="tf-degraded-mode-banner__content">
        <span className="tf-degraded-mode-banner__title">DEGRADED MODE</span>
        <span className="tf-degraded-mode-banner__reason">{reason}</span>
        {affectedCapabilities && affectedCapabilities.length > 0 && (
          <span className="tf-degraded-mode-banner__affected">
            Affected: {affectedCapabilities.join(', ')}
          </span>
        )}
        {estimatedRecovery && (
          <span className="tf-degraded-mode-banner__recovery">ETA: {estimatedRecovery}</span>
        )}
      </div>
      {onViewDetails && (
        <button
          className="tf-degraded-mode-banner__details-btn"
          onClick={onViewDetails}
          type="button"
        >
          Details
        </button>
      )}
    </div>
  );
};

DegradedModeBanner.displayName = 'DegradedModeBanner';

export default DegradedModeBanner;
