import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for FieldSOSButton.
 */
export interface FieldSOSButtonProps {
  /** SOS activation handler. */
  onSOS: () => void;
  /** Whether SOS is active. */
  active?: boolean;
  /** Countdown seconds before activation. */
  countdownSeconds?: number;
  /** Label override. */
  label?: string;
  /** Size tier. */
  size?: 'large' | 'xlarge';
  /** Whether to require long-press. */
  longPressRequired?: boolean;
  /** Long-press duration in ms. */
  longPressDuration?: number;
  /** Disabled. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldSOSButton — SOS/emergency button.
 *
 * Distinctive red SOS button with optional countdown timer.
 * Long-press requirement prevents accidental activation.
 * Pulsing red animation draws attention during active distress.
 * Minimum 100 px touch target for emergency operation.
 */
export const FieldSOSButton: React.FC<FieldSOSButtonProps> = ({
  onSOS,
  active = false,
  countdownSeconds = 3,
  label = 'SOS',
  size = 'xlarge',
  longPressRequired = true,
  longPressDuration = 2000,
  disabled = false,
  className = '',
  testId,
}) => {
  const [counting, setCounting] = React.useState(false);
  const [remaining, setRemaining] = React.useState(countdownSeconds);
  const [pressing, setPressing] = React.useState(false);
  const pressTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const sizeClass = `tf-sos-btn--${size}`;
  const activeClass = active ? 'tf-sos-btn--active' : '';
  const countingClass = counting ? 'tf-sos-btn--counting' : '';
  const pressingClass = pressing ? 'tf-sos-btn--pressing' : '';

  // Countdown effect
  React.useEffect(() => {
    if (!counting) return;

    setRemaining(countdownSeconds);
    countdownTimer.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          // Activate
          clearInterval(countdownTimer.current!);
          setCounting(false);
          onSOS();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownTimer.current) clearInterval(countdownTimer.current);
    };
  }, [counting, countdownSeconds, onSOS]);

  const handlePressStart = () => {
    if (active || disabled) return;

    if (longPressRequired) {
      setPressing(true);
      pressTimer.current = setTimeout(() => {
        setPressing(false);
        setCounting(true);
      }, longPressDuration);
    } else {
      setCounting(true);
    }
  };

  const handlePressEnd = () => {
    setPressing(false);
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    // If counting but not yet activated, allow cancel
    if (counting && remaining > 0) {
      setCounting(false);
      if (countdownTimer.current) clearInterval(countdownTimer.current);
    }
  };

  return (
    <button
      type="button"
      data-testid={testId}
      className={[
        'tf-sos-btn',
        sizeClass,
        activeClass,
        countingClass,
        pressingClass,
        className,
      ].join(' ')}
      disabled={disabled}
      aria-label={active ? 'SOS Active' : label}
      aria-pressed={active}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      {/* Pulse ring */}
      {(active || counting) && (
        <span className="tf-sos-btn__pulse" aria-hidden="true" />
      )}

      {/* Countdown */}
      {counting && (
        <span className="tf-sos-btn__countdown">{remaining}</span>
      )}

      {/* Label */}
      {!counting && (
        <span className="tf-sos-btn__label">
          {active ? 'SOS ACTIVE' : label}
        </span>
      )}

      {/* Long press hint */}
      {longPressRequired && !active && !counting && (
        <span className="tf-sos-btn__hint">
          Hold {longPressDuration / 1000}s
        </span>
      )}

      {/* Active distress indicator */}
      {active && (
        <span className="tf-sos-btn__distress" aria-hidden="true">
          🚨 HELP REQUESTED
        </span>
      )}
    </button>
  );
};

FieldSOSButton.displayName = 'FieldSOSButton';

export default FieldSOSButton;
