import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldSOSConfirm.
 */
export interface FieldSOSConfirmProps {
  /** Whether dialog is visible. */
  isOpen: boolean;
  /** Location to include in SOS. */
  location?: { lat: number; lng: number } | null;
  /** Operator name. */
  operatorName?: string;
  /** Unit/vehicle identifier. */
  unitId?: string;
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
 * FieldSOSConfirm — SOS confirmation.
 *
 * Authority-aware confirmation dialog before sending SOS distress signal.
 * Displays operator identity, unit ID, and current location for
 * verification. Full-screen overlay with maximum visual urgency.
 * Countdown timer prevents panic-induced mis-taps.
 */
export const FieldSOSConfirm: React.FC<FieldSOSConfirmProps> = ({
  isOpen,
  location,
  operatorName,
  unitId,
  onConfirm,
  onCancel,
  className = '',
  testId,
}) => {
  const [countdown, setCountdown] = React.useState(5);
  const [canConfirm, setCanConfirm] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setCanConfirm(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanConfirm(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      data-testid={testId}
      className={['tf-sos-confirm', className].join(' ')}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="sos-confirm-title"
      aria-describedby="sos-confirm-desc"
    >
      {/* Backdrop */}
      <div className="tf-sos-confirm__backdrop" aria-hidden="true" />

      {/* Panel */}
      <div className="tf-sos-confirm__panel">
        {/* Warning icon */}
        <div className="tf-sos-confirm__icon" aria-hidden="true">
          🚨
        </div>

        {/* Title */}
        <h2 id="sos-confirm-title" className="tf-sos-confirm__title">
          SEND DISTRESS SIGNAL
        </h2>

        {/* Description */}
        <p id="sos-confirm-desc" className="tf-sos-confirm__desc">
          This will alert dispatch and nearby units of your emergency.
        </p>

        {/* Operator details */}
        <div className="tf-sos-confirm__details">
          {operatorName && (
            <div className="tf-sos-confirm__detail">
              <span className="tf-sos-confirm__detail-label">Operator</span>
              <span className="tf-sos-confirm__detail-value">{operatorName}</span>
            </div>
          )}
          {unitId && (
            <div className="tf-sos-confirm__detail">
              <span className="tf-sos-confirm__detail-label">Unit</span>
              <span className="tf-sos-confirm__detail-value">{unitId}</span>
            </div>
          )}
          {location && (
            <div className="tf-sos-confirm__detail">
              <span className="tf-sos-confirm__detail-label">Location</span>
              <span className="tf-sos-confirm__detail-value">
                {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
              </span>
            </div>
          )}
        </div>

        {/* Countdown */}
        {!canConfirm && (
          <div className="tf-sos-confirm__countdown">
            Confirm in {countdown}s...
          </div>
        )}

        {/* Actions */}
        <div className="tf-sos-confirm__actions">
          <button
            type="button"
            className="tf-sos-confirm__btn tf-sos-confirm__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="tf-sos-confirm__btn tf-sos-confirm__btn--confirm"
            onClick={onConfirm}
            disabled={!canConfirm}
          >
            {canConfirm ? 'SEND SOS' : `Wait ${countdown}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

FieldSOSConfirm.displayName = 'FieldSOSConfirm';

export default FieldSOSConfirm;
