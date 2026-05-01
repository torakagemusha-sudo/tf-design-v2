import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for EmergencyStopButton.
 */
export interface EmergencyStopButtonProps {
  /** Button label — typically "EMERGENCY STOP". */
  label?: string;
  /** Press handler. */
  onPress: () => void;
  /** Whether the stop has been activated. */
  activated?: boolean;
  /** Size tier — emergency buttons are always large. */
  size?: 'large' | 'xlarge';
  /** Whether to show a confirmation step. */
  confirmRequired?: boolean;
  /** Shake animation on mount. */
  shakeOnMount?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * EmergencyStopButton — big red emergency stop button.
 *
 * 120 px minimum touch target for panicked, gloved-hand operation.
 * Mushroom-cap shape with tactile depression feedback.
 * Shake animation draws attention during critical conditions.
 * Confirmation step available to prevent accidental activation.
 */
export const EmergencyStopButton: React.FC<EmergencyStopButtonProps> = ({
  label = 'EMERGENCY STOP',
  onPress,
  activated = false,
  size = 'xlarge',
  confirmRequired = false,
  shakeOnMount = false,
  className = '',
  testId,
}) => {
  const [confirming, setConfirming] = React.useState(false);
  const sizeClass = `tf-e-stop-btn--${size}`;
  const activatedClass = activated ? 'tf-e-stop-btn--activated' : '';
  const shakeClass = shakeOnMount ? 'tf-e-stop-btn--shake' : '';
  const confirmingClass = confirming ? 'tf-e-stop-btn--confirming' : '';

  const handlePress = () => {
    if (confirmRequired && !confirming) {
      setConfirming(true);
      // Auto-reset confirmation after 3 seconds
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    setConfirming(false);
    onPress();
  };

  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={label}
      aria-pressed={activated}
      onClick={handlePress}
      className={[
        'tf-e-stop-btn',
        sizeClass,
        activatedClass,
        shakeClass,
        confirmingClass,
        className,
      ].join(' ')}
    >
      {/* Mushroom cap shape */}
      <span className="tf-e-stop-btn__cap" aria-hidden="true" />

      {/* Label */}
      <span className="tf-e-stop-btn__label">
        {confirming ? 'TAP AGAIN TO CONFIRM' : label}
      </span>

      {/* Activated indicator */}
      {activated && (
        <span className="tf-e-stop-btn__active-indicator" aria-hidden="true">
          ⚠ ACTIVATED
        </span>
      )}
    </button>
  );
};

EmergencyStopButton.displayName = 'EmergencyStopButton';

export default EmergencyStopButton;
