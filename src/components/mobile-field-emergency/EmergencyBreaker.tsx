import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Breaker state in the state machine.
 */
export type EmergencyBreakerState =
  | 'engaged'
  | 'disengaged'
  | 'transitioning'
  | 'fault';

/**
 * Props for EmergencyBreaker.
 */
export interface EmergencyBreakerProps {
  /** Current breaker state. */
  state: EmergencyBreakerState;
  /** Label above the breaker. */
  label: string;
  /** Disengage (trip) handler — the emergency action. */
  onDisengage: () => void;
  /** Engage (reset) handler — authorised personnel only. */
  onEngage?: () => void;
  /** Whether the user has authority to reset. */
  canReset?: boolean;
  /** Authorisation level required. */
  authLevel?: number;
  /** Time since last state change. */
  timeInState?: string;
  /** Composed children (handle, status). */
  children?: React.ReactNode;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * EmergencyBreaker — emergency stop/breaker component.
 *
 * Large authority-aware breaker with guarded reset.
 * Disengage (trip) is always available — one-tap emergency stop.
 * Engage (reset) requires canReset authority to prevent accidental re-arming.
 * Visual state machine: engaged → transitioning → disengaged → fault.
 */
export const EmergencyBreaker: React.FC<EmergencyBreakerProps> = ({
  state,
  label,
  onDisengage,
  onEngage,
  canReset = false,
  authLevel,
  timeInState,
  children,
  className = '',
  testId,
}) => {
  const stateClass = `tf-emergency-breaker--${state}`;

  return (
    <div
      data-testid={testId}
      data-state={state}
      data-auth-level={authLevel}
      className={['tf-emergency-breaker', stateClass, className].join(' ')}
      role="alert"
      aria-live="assertive"
    >
      {/* Authority watermark */}
      {authLevel !== undefined && (
        <div className="tf-emergency-breaker__watermark" aria-hidden="true">
          L{authLevel}
        </div>
      )}

      {/* Label */}
      <span className="tf-emergency-breaker__label">{label}</span>

      {/* Main breaker body */}
      <div className="tf-emergency-breaker__body">
        {children || (
          <>
            {/* State indicator ring */}
            <div
              className="tf-emergency-breaker__ring"
              aria-hidden="true"
            />

            {/* State text */}
            <span className="tf-emergency-breaker__state-text">
              {state === 'engaged' && 'ENGAGED'}
              {state === 'disengaged' && 'TRIPPED'}
              {state === 'transitioning' && '...'}
              {state === 'fault' && 'FAULT'}
            </span>
          </>
        )}
      </div>

      {/* Action buttons */}
      <div className="tf-emergency-breaker__actions">
        {/* Disengage — always available */}
        <button
          type="button"
          className="tf-emergency-breaker__btn tf-emergency-breaker__btn--disengage"
          onClick={onDisengage}
          disabled={state === 'disengaged' || state === 'transitioning'}
        >
          DISENGAGE
        </button>

        {/* Engage — authority-guarded */}
        <button
          type="button"
          className="tf-emergency-breaker__btn tf-emergency-breaker__btn--engage"
          onClick={onEngage}
          disabled={
            state === 'engaged' ||
            state === 'transitioning' ||
            !canReset
          }
        >
          ENGAGE
          {!canReset && state === 'disengaged' && (
            <span className="tf-emergency-breaker__lock-icon"> 🔒</span>
          )}
        </button>
      </div>

      {/* Time in state */}
      {timeInState && (
        <span className="tf-emergency-breaker__time">{timeInState}</span>
      )}
    </div>
  );
};

EmergencyBreaker.displayName = 'EmergencyBreaker';

export default EmergencyBreaker;
