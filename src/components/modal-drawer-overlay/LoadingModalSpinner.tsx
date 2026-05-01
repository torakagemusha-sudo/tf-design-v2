import React from 'react';
import { cn } from '@/utils/cn';

/**
 * LoadingModalSpinner — animated spinner for loading states.
 * Uses CSS keyframe animation for smooth rotation.
 *
 * @example
 * ```tsx
 * <LoadingModalSpinner size="md" variant="amber" />
 * ```
 */
export interface LoadingModalSpinnerProps {
  /** Size of the spinner. */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant. */
  variant?: 'amber' | 'sky' | 'white' | 'steel';
  /** Additional class names. */
  className?: string;
  /** ARIA label for accessibility. */
  ariaLabel?: string;
}

const sizeMap: Record<string, { spinner: string; stroke: number }> = {
  sm: { spinner: 'h-5 w-5', stroke: 3 },
  md: { spinner: 'h-8 w-8', stroke: 2.5 },
  lg: { spinner: 'h-10 w-10', stroke: 2 },
};

const colorMap: Record<string, string> = {
  amber: 'text-amber-500',
  sky: 'text-sky-500',
  white: 'text-white',
  steel: 'text-steel-400',
};

export const LoadingModalSpinner: React.FC<LoadingModalSpinnerProps> = ({
  size = 'md',
  variant = 'amber',
  className,
  ariaLabel = 'Loading',
}) => {
  const s = sizeMap[size];

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={cn('tf-loading-modal-spinner inline-block', s.spinner, className)}
      data-testid="loading-modal-spinner"
    >
      <svg
        className={cn('animate-spin', colorMap[variant])}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={s.stroke}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
  );
};

export default LoadingModalSpinner;
