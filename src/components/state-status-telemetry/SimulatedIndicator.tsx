/**
 * ============================================================
 * SimulatedIndicator — Torafirma Design System
 * ============================================================
 *
 * Shows simulated mode active indicator. Communicates that
 * the current view or operation is running in simulation
 * rather than against real systems.
 *
 * From 03.2 State, Status & Telemetry — Section 6.1 State Model
 * ============================================================
 */

import React from 'react';

/**
 * Props for the SimulatedIndicator component.
 */
export interface SimulatedIndicatorProps {
  /** Whether simulation mode is active. */
  isSimulated: boolean;
  /** Simulation target or scope. */
  scope?: string;
  /** Simulation start timestamp. */
  startedAt?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

/**
 * SimulatedIndicator renders a simulation mode indicator.
 *
 * @example
 * ```tsx
 * <SimulatedIndicator isSimulated={true} scope="TradingEngine-v2" startedAt="2024-01-15T09:00:00Z" />
 * <SimulatedIndicator isSimulated={false} />
 * ```
 */
export const SimulatedIndicator: React.FC<SimulatedIndicatorProps> = ({
  isSimulated,
  scope,
  startedAt,
  className = '',
  testId,
}) => {
  if (!isSimulated) return null;

  return (
    <div
      className={`tf-simulated-indicator ${className}`}
      data-testid={testId}
      data-simulated={isSimulated}
      role="status"
      aria-label="Simulation mode active"
    >
      <span className="tf-simulated-indicator__icon" aria-hidden="true">&#x25C8;</span>
      <span className="tf-simulated-indicator__label">SIMULATED</span>
      {scope && <span className="tf-simulated-indicator__scope">{scope}</span>}
      {startedAt && <span className="tf-simulated-indicator__time">Since: {startedAt}</span>}
    </div>
  );
};

SimulatedIndicator.displayName = 'SimulatedIndicator';

export default SimulatedIndicator;
