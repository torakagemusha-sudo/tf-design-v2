import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldErrorState.
 */
export interface FieldErrorStateProps {
  /** Error title. */
  title?: string;
  /** Error message. */
  message?: string;
  /** Error code for diagnostics. */
  errorCode?: string;
  /** Retry handler. */
  onRetry?: () => void;
  /** Custom icon. */
  icon?: React.ReactNode;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldErrorState — error state for mobile.
 *
 * Displays a friendly error message with retry action.
 * Shows error code in monospace for diagnostics/support.
 * Red severity colours communicate failure state without alarm.
 */
export const FieldErrorState: React.FC<FieldErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  errorCode,
  onRetry,
  icon,
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-error-state', className].join(' ')}
      role="alert"
    >
      {/* Error icon */}
      <div className="tf-error-state__icon" aria-hidden="true">
        {icon || (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
      </div>

      {/* Title */}
      <h3 className="tf-error-state__title">{title}</h3>

      {/* Message */}
      <p className="tf-error-state__message">{message}</p>

      {/* Error code */}
      {errorCode && (
        <code className="tf-error-state__code">{errorCode}</code>
      )}

      {/* Retry */}
      {onRetry && (
        <button
          type="button"
          className="tf-error-state__retry"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

FieldErrorState.displayName = 'FieldErrorState';

export default FieldErrorState;
