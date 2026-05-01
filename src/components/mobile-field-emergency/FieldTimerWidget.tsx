import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Timer mode.
 */
export type TimerMode = 'countdown' | 'countup';

/**
 * Props for FieldTimerWidget.
 */
export interface FieldTimerWidgetProps {
  /** Timer mode. */
  mode?: TimerMode;
  /** Duration in seconds (countdown) or start timestamp (countup). */
  durationOrStart?: number;
  /** Whether the timer is running. */
  running?: boolean;
  /** Timer label. */
  label?: string;
  /** Called when countdown reaches zero. */
  onExpire?: () => void;
  /** Called every tick with current seconds. */
  onTick?: (seconds: number) => void;
  /** Show milliseconds. */
  showMs?: boolean;
  /** Large variant. */
  large?: boolean;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldTimerWidget — countdown/up timer.
 *
 * Precision timer for field operations: patrol timing, evidence logging,
 * shift tracking. Countdown mode for time-boxed tasks.
 * Large variant for vehicle dashboard or tablet mount display.
 * Flashing animation when countdown approaches zero.
 */
export const FieldTimerWidget: React.FC<FieldTimerWidgetProps> = ({
  mode = 'countup',
  durationOrStart = 0,
  running = false,
  label,
  onExpire,
  onTick,
  showMs = false,
  large = false,
  className = '',
  testId,
}) => {
  const [elapsed, setElapsed] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    if (mode === 'countup') {
      startRef.current = Date.now() - (durationOrStart || 0) * 1000;
    } else {
      startRef.current = Date.now();
    }

    const tick = () => {
      const now = Date.now();
      let seconds: number;

      if (mode === 'countup') {
        seconds = (now - startRef.current) / 1000;
      } else {
        seconds = Math.max(0, durationOrStart - (now - startRef.current) / 1000);
        if (seconds <= 0) {
          onExpire?.();
        }
      }

      setElapsed(seconds);
      onTick?.(seconds);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, mode, durationOrStart, onExpire, onTick]);

  const totalSeconds = Math.floor(elapsed);
  const ms = Math.floor((elapsed % 1) * 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');
  const display = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  const isLow = mode === 'countdown' && elapsed < 10;
  const largeClass = large ? 'tf-timer--large' : '';
  const lowClass = isLow ? 'tf-timer--low' : '';
  const runningClass = running ? 'tf-timer--running' : '';

  return (
    <div
      data-testid={testId}
      className={['tf-timer', largeClass, lowClass, runningClass, className].join(' ')}
      role="timer"
      aria-label={label || 'Timer'}
    >
      {/* Label */}
      {label && <span className="tf-timer__label">{label}</span>}

      {/* Time display */}
      <div className="tf-timer__display">
        <span className="tf-timer__time">{display}</span>
        {showMs && (
          <span className="tf-timer__ms">.{String(ms).padStart(3, '0')}</span>
        )}
      </div>

      {/* Low time indicator */}
      {isLow && (
        <span className="tf-timer__warning" role="alert">
          Time almost up
        </span>
      )}
    </div>
  );
};

FieldTimerWidget.displayName = 'FieldTimerWidget';

export default FieldTimerWidget;
