import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Props for EmergencyCountdown.
 */
export interface EmergencyCountdownProps {
  /** Target timestamp (ISO string or epoch ms). */
  targetAt: string | number;
  /** Countdown label. */
  label?: string;
  /** Variant controlling visual urgency. */
  variant?: 'calm' | 'urgent' | 'critical';
  /** Called when countdown reaches zero. */
  onExpire?: () => void;
  /** Called every second with remaining ms. */
  onTick?: (remainingMs: number) => void;
  /** Show milliseconds. */
  showMs?: boolean;
  /** Format string: d/h/m/s auto. */
  format?: 'auto' | 'hh:mm:ss' | 'mm:ss';
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * EmergencyCountdown — countdown timer.
 *
 * High-visibility countdown for time-critical emergency operations.
 * Visual urgency escalates as time remaining decreases: calm → urgent → critical.
 * Calls onExpire precisely at zero. Supports millisecond display for
 * detonation/evacuation scenarios.
 */
export const EmergencyCountdown: React.FC<EmergencyCountdownProps> = ({
  targetAt,
  label = 'Time Remaining',
  variant = 'urgent',
  onExpire,
  onTick,
  showMs = false,
  format = 'auto',
  className = '',
  testId,
}) => {
  const [remaining, setRemaining] = React.useState(0);
  const [displayVariant, setDisplayVariant] = React.useState(variant);
  const rafRef = React.useRef<number | null>(null);
  const expiredRef = React.useRef(false);

  React.useEffect(() => {
    const targetMs =
      typeof targetAt === 'string' ? new Date(targetAt).getTime() : targetAt;

    const tick = () => {
      const now = Date.now();
      const rem = Math.max(0, targetMs - now);
      setRemaining(rem);
      onTick?.(rem);

      // Auto-escalate variant
      if (rem < 10000) setDisplayVariant('critical');
      else if (rem < 60000) setDisplayVariant('urgent');
      else setDisplayVariant('calm');

      if (rem === 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpire?.();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetAt, onExpire, onTick]);

  const totalSeconds = Math.floor(remaining / 1000);
  const ms = remaining % 1000;
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  let display = '';
  if (format === 'hh:mm:ss') {
    display = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else if (format === 'mm:ss') {
    display = `${pad(minutes)}:${pad(seconds)}`;
  } else {
    // auto
    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${pad(hours)}h`);
    if (minutes > 0 || hours > 0 || days > 0) parts.push(`${pad(minutes)}m`);
    parts.push(`${pad(seconds)}s`);
    display = parts.join(' ');
  }

  const variantClass = `tf-e-countdown--${displayVariant}`;

  return (
    <div
      data-testid={testId}
      className={['tf-e-countdown', variantClass, className].join(' ')}
      role="timer"
      aria-label={label}
      aria-live="polite"
    >
      {/* Label */}
      <span className="tf-e-countdown__label">{label}</span>

      {/* Time display */}
      <div className="tf-e-countdown__display">
        <span className="tf-e-countdown__time">{display}</span>
        {showMs && (
          <span className="tf-e-countdown__ms">
            .{String(ms).padStart(3, '0')}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="tf-e-countdown__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.max(0, Math.min(100, (remaining / (60 * 1000)) * 100))}
      >
        <div
          className="tf-e-countdown__fill"
          style={{
            width: `${Math.max(0, Math.min(100, (remaining / (60 * 1000)) * 100))}%`,
          }}
        />
      </div>
    </div>
  );
};

EmergencyCountdown.displayName = 'EmergencyCountdown';

export default EmergencyCountdown;
