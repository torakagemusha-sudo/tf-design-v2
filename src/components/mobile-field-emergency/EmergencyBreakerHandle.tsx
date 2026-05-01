import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for EmergencyBreakerHandle.
 */
export interface EmergencyBreakerHandleProps {
  /** Handle position. */
  position: 'up' | 'down' | 'mid';
  /** Size tier. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the handle is locked. */
  locked?: boolean;
  /** Tap handler. */
  onTap?: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * EmergencyBreakerHandle — large breaker handle.
 *
 * A skeuomorphic breaker handle that animates between up (engaged),
 * mid (transitioning), and down (disengaged) positions.
 * Minimum 80 px touch target for emergency operation with gloved hands.
 * Locked state prevents accidental manipulation.
 */
export const EmergencyBreakerHandle: React.FC<EmergencyBreakerHandleProps> = ({
  position,
  size = 'lg',
  locked = false,
  onTap,
  className = '',
  testId,
}) => {
  const posClass = `tf-breaker-handle--${position}`;
  const sizeClass = `tf-breaker-handle--${size}`;
  const lockedClass = locked ? 'tf-breaker-handle--locked' : '';

  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={`Breaker handle, ${position}${locked ? ', locked' : ''}`}
      disabled={locked}
      onClick={onTap}
      className={[
        'tf-breaker-handle',
        posClass,
        sizeClass,
        lockedClass,
        className,
      ].join(' ')}
    >
      {/* Handle grip */}
      <div className="tf-breaker-handle__grip" aria-hidden="true">
        <div className="tf-breaker-handle__grip-lines" />
      </div>

      {/* Lock indicator */}
      {locked && (
        <span className="tf-breaker-handle__lock" aria-hidden="true">
          🔒
        </span>
      )}

      {/* Position label */}
      <span className="tf-breaker-handle__label">
        {position === 'up' && 'ON'}
        {position === 'mid' && '—'}
        {position === 'down' && 'OFF'}
      </span>
    </button>
  );
};

EmergencyBreakerHandle.displayName = 'EmergencyBreakerHandle';

export default EmergencyBreakerHandle;
