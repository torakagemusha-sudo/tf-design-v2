import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for EmergencyStopConfirm.
 */
export interface EmergencyStopConfirmProps {
  /** Whether the dialog is visible. */
  isOpen: boolean;
  /** Emergency description. */
  description?: string;
  /** User's authority level. */
  userAuthLevel?: number;
  /** Required authority level. */
  requiredAuthLevel?: number;
  /** Confirm handler. */
  onConfirm: () => void;
  /** Cancel handler. */
  onCancel: () => void;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * EmergencyStopConfirm — confirmation dialog for emergency stop.
 *
 * Authority-aware confirmation that prevents accidental emergency activation.
 * Displays authority level requirements and blocks unconfirmed users.
 * Dark overlay with high-contrast warning text for stress-resistant readability.
 */
export const EmergencyStopConfirm: React.FC<EmergencyStopConfirmProps> = ({
  isOpen,
  description = 'This will immediately halt all active operations.',
  userAuthLevel = 0,
  requiredAuthLevel = 1,
  onConfirm,
  onCancel,
  className = '',
  testId,
}) => {
  if (!isOpen) return null;

  const hasAuthority = userAuthLevel >= requiredAuthLevel;

  return (
    <div
      data-testid={testId}
      className={['tf-e-stop-confirm', className].join(' ')}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="e-stop-confirm-title"
      aria-describedby="e-stop-confirm-desc"
    >
      {/* Backdrop */}
      <div className="tf-e-stop-confirm__backdrop" aria-hidden="true" />

      {/* Dialog panel */}
      <div className="tf-e-stop-confirm__panel">
        {/* Warning icon */}
        <div className="tf-e-stop-confirm__icon" aria-hidden="true">
          ⚠
        </div>

        {/* Title */}
        <h2
          id="e-stop-confirm-title"
          className="tf-e-stop-confirm__title"
        >
          Confirm Emergency Stop
        </h2>

        {/* Description */}
        <p
          id="e-stop-confirm-desc"
          className="tf-e-stop-confirm__desc"
        >
          {description}
        </p>

        {/* Authority check */}
        {!hasAuthority && (
          <div className="tf-e-stop-confirm__auth-block">
            <span className="tf-e-stop-confirm__auth-icon">🔒</span>
            <span className="tf-e-stop-confirm__auth-text">
              Authority Level {requiredAuthLevel} required. Your level:{' '}
              {userAuthLevel}.
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="tf-e-stop-confirm__actions">
          <button
            type="button"
            className="tf-e-stop-confirm__btn tf-e-stop-confirm__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="tf-e-stop-confirm__btn tf-e-stop-confirm__btn--confirm"
            onClick={onConfirm}
            disabled={!hasAuthority}
          >
            EMERGENCY STOP
          </button>
        </div>
      </div>
    </div>
  );
};

EmergencyStopConfirm.displayName = 'EmergencyStopConfirm';

export default EmergencyStopConfirm;
