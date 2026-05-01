import React from 'react';
import { cn } from '@/utils/cn';

/**
 * LoadingModalProgress — a determinate progress bar for loading modals.
 * Shows visual progress from 0% to 100% with optional label.
 *
 * @example
 * ```tsx
 * <LoadingModalProgress progress={67} showLabel variant="amber" />
 * ```
 */
export interface LoadingModalProgressProps {
  /** Progress percentage (0-100). */
  progress: number;
  /** Whether to show the percentage label. */
  showLabel?: boolean;
  /** Visual variant. */
  variant?: 'amber' | 'sky' | 'emerald';
  /** Additional class names. */
  className?: string;
  /** Bar height. */
  height?: 'sm' | 'md';
}

const variantFill: Record<string, string> = {
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
};

const heightMap: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2',
};

export const LoadingModalProgress: React.FC<LoadingModalProgressProps> = ({
  progress,
  showLabel = true,
  variant = 'amber',
  className,
  height = 'md',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn('tf-loading-modal-progress w-full', className)}
      data-testid="loading-modal-progress"
    >
      <div
        className={cn(
          'tf-loading-modal-progress__track w-full rounded-full bg-steel-800 overflow-hidden',
          heightMap[height]
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            'tf-loading-modal-progress__fill h-full rounded-full transition-all duration-300 ease-out',
            variantFill[variant]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="tf-loading-modal-progress__label block text-right text-xs text-steel-400 mt-1 font-mono">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
};

export default LoadingModalProgress;
