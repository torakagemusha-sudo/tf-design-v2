/**
 * ============================================================
 * CircuitStatus — Torafirma Design System
 * ============================================================
 *
 * Circuit breaker state display. Shows the current state of
 * a circuit breaker with failure count and cooldown timer.
 *
 * From 03.2 State, Status & Telemetry — Section 3.1 Command Components
 * ============================================================
 */

import React from 'react';

/**
 * Circuit breaker states.
 */
export type CircuitBreakerState = 'closed' | 'open' | 'half_open' | 'disabled' | 'forced_open';

/**
 * Props for the CircuitStatus component.
 */
export interface CircuitStatusProps {
  /** Circuit breaker name. */
  name: string;
  /** Current circuit state. */
  state: CircuitBreakerState;
  /** Recent failure count. */
  failureCount?: number;
  /** Failure threshold. */
  failureThreshold?: number;
  /** Cooldown time remaining. */
  cooldownRemaining?: string;
  /** Target service. */
  target?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Test identifier. */
  testId?: string;
}

const circuitMeta: Record<CircuitBreakerState, { label: string; variant: string }> = {
  closed: { label: 'CLOSED', variant: 'run' },
  open: { label: 'OPEN', variant: 'danger' },
  half_open: { label: 'HALF-OPEN', variant: 'warning' },
  disabled: { label: 'DISABLED', variant: 'neutral' },
  forced_open: { label: 'FORCED OPEN', variant: 'danger' },
};

/**
 * CircuitStatus renders a circuit breaker state indicator.
 *
 * @example
 * ```tsx
 * <CircuitStatus name="payment-api" state="open" failureCount={12} failureThreshold={5} cooldownRemaining="30s" target="payment-service" />
 * ```
 */
export const CircuitStatus: React.FC<CircuitStatusProps> = ({
  name,
  state,
  failureCount,
  failureThreshold,
  cooldownRemaining,
  target,
  className = '',
  testId,
}) => {
  const meta = circuitMeta[state];

  return (
    <div
      className={`tf-circuit-status tf-circuit-status--${meta.variant} tf-circuit-status--${state} ${className}`}
      data-testid={testId}
      data-circuit-state={state}
      role="status"
      aria-label={`Circuit ${name}: ${meta.label}`}
    >
      <span className="tf-circuit-status__name">{name}</span>
      <span className={`tf-circuit-status__badge tf-circuit-status__badge--${meta.variant}`}>
        {meta.label}
      </span>
      {target && <span className="tf-circuit-status__target">{target}</span>}
      {failureCount !== undefined && failureThreshold !== undefined && (
        <span className="tf-circuit-status__failures">{failureCount}/{failureThreshold} failures</span>
      )}
      {cooldownRemaining && <span className="tf-circuit-status__cooldown">Cooldown: {cooldownRemaining}</span>}
    </div>
  );
};

CircuitStatus.displayName = 'CircuitStatus';

export default CircuitStatus;
