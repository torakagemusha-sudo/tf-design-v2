/**
 * ============================================================
 * SimulatedBanner — Torafirma Design System
 * ============================================================
 *
 * Banner warning of simulation mode. Prominent display element
 * that makes it unmistakably clear the system is in simulation.
 *
 * From 03.2 State, Status & Telemetry — Section 6.1 State Model
 * ============================================================
 */

import React from 'react';

/**
 * Props for the SimulatedBanner component.
 */
export interface SimulatedBannerProps {
  /** Whether the banner is visible. */
  visible: boolean;
  /** Simulation scope description. */
  scope?: string;
  /** Handler to dismiss the banner. */
  onDismiss?: () => void;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * SimulatedBanner renders a prominent simulation mode warning.
 *
 * @example
 * ```tsx
 * <SimulatedBanner visible={true} scope="All trading workflows" />
 * <SimulatedBanner visible={false} />
 * ```
 */
export const SimulatedBanner: React.FC<SimulatedBannerProps> = ({
  visible,
  scope,
  onDismiss,
  className = '',
  testId,
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-simulated-banner ${className}`}
      data-testid={testId}
      role="alert"
      aria-label="Simulation mode is active"
    >
      <span className="tf-simulated-banner__icon" aria-hidden="true">&#x26A0;</span>
      <div className="tf-simulated-banner__content">
        <span className="tf-simulated-banner__title">SIMULATION MODE ACTIVE</span>
        <span className="tf-simulated-banner__text">
          No real operations are being executed.{scope ? ` Scope: ${scope}.` : ''}
        </span>
      </div>
      {onDismiss && (
        <button
          className="tf-simulated-banner__dismiss"
          onClick={onDismiss}
          type="button"
          aria-label="Dismiss simulation banner"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
};

SimulatedBanner.displayName = 'SimulatedBanner';

export default SimulatedBanner;
