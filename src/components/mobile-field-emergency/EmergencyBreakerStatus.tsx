import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for EmergencyBreakerStatus.
 */
export interface EmergencyBreakerStatusProps {
  /** Status label. */
  label: string;
  /** Current state text. */
  stateText: string;
  /** Severity colour. */
  severity?: 'critical' | 'warning' | 'normal';
  /** Last tripped timestamp. */
  lastTrippedAt?: string;
  /** Trip count. */
  tripCount?: number;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * EmergencyBreakerStatus — breaker status read-out.
 *
 * Displays the current breaker state with severity colour coding.
 * Shows trip history for maintenance and audit purposes.
 */
export const EmergencyBreakerStatus: React.FC<EmergencyBreakerStatusProps> = ({
  label,
  stateText,
  severity = 'normal',
  lastTrippedAt,
  tripCount,
  className = '',
  testId,
}) => {
  const severityClass = `tf-breaker-status--${severity}`;

  return (
    <div
      data-testid={testId}
      className={['tf-breaker-status', severityClass, className].join(' ')}
      role="status"
    >
      {/* Status dot */}
      <span
        className="tf-breaker-status__dot"
        aria-hidden="true"
      />

      {/* Label */}
      <span className="tf-breaker-status__label">{label}</span>

      {/* State */}
      <span className="tf-breaker-status__state">{stateText}</span>

      {/* Trip history */}
      {(lastTrippedAt || tripCount !== undefined) && (
        <div className="tf-breaker-status__history">
          {tripCount !== undefined && (
            <span className="tf-breaker-status__trips">
              {tripCount} trip{tripCount !== 1 ? 's' : ''}
            </span>
          )}
          {lastTrippedAt && (
            <time
              className="tf-breaker-status__last"
              dateTime={lastTrippedAt}
            >
              Last: {lastTrippedAt}
            </time>
          )}
        </div>
      )}
    </div>
  );
};

EmergencyBreakerStatus.displayName = 'EmergencyBreakerStatus';

export default EmergencyBreakerStatus;
