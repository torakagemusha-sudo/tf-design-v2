import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ToastProgress — a countdown progress bar indicating remaining time
 * before a toast auto-dismisses. Animated via CSS keyframes.
 *
 * @example
 * ```tsx
 * <ToastProgress duration={5000} variant="emerald" />
 * ```
 */
export interface ToastProgressProps {
  /** Duration in milliseconds. */
  duration: number;
  /** Visual variant. */
  variant?: 'emerald' | 'red' | 'amber' | 'sky' | 'white';
  /** Additional class names. */
  className?: string;
  /** Height of the progress bar. */
  height?: number;
}

const variantMap: Record<string, string> = {
  emerald: 'bg-emerald-500/40',
  red: 'bg-red-500/40',
  amber: 'bg-amber-500/40',
  sky: 'bg-sky-500/40',
  white: 'bg-white/30',
};

export const ToastProgress: React.FC<ToastProgressProps> = ({
  duration,
  variant = 'white',
  className,
  height = 2,
}) => {
  return (
    <div
      className={cn(
        'tf-toast-progress absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-md',
        className
      )}
      style={{ height }}
      data-testid="toast-progress"
    >
      <div
        className={cn('tf-toast-progress__bar h-full origin-left', variantMap[variant])}
        style={{
          animation: `tf-toast-progress ${duration}ms linear forwards`,
        }}
      />
    </div>
  );
};

export default ToastProgress;
