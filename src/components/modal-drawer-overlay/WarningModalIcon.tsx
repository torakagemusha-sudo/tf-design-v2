import React from 'react';
import { cn } from '@/utils/cn';

/**
 * WarningModalIcon — renders a warning/caution icon with amber
 * background circle for use in warning modals and alerts.
 *
 * @example
 * ```tsx
 * <WarningModalIcon size="lg" />
 * ```
 */
export interface WarningModalIconProps {
  /** Size of the icon container. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names. */
  className?: string;
  /** Custom icon override. */
  children?: React.ReactNode;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
};

const iconSizes: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

export const WarningModalIcon: React.FC<WarningModalIconProps> = ({
  size = 'md',
  className,
  children,
}) => {
  return (
    <span
      className={cn(
        'tf-warning-modal-icon',
        'inline-flex items-center justify-center rounded-full bg-amber-500/15',
        sizeClasses[size],
        className
      )}
      data-testid="warning-modal-icon"
    >
      {children ?? (
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          className="text-amber-500"
        >
          <path d="M10.615 4.765L3.314 17.5A2 2 0 005.052 20.5h13.896a2 2 0 001.738-3l-7.3-12.735a2 2 0 00-3.477 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 10v3m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
};

export default WarningModalIcon;
