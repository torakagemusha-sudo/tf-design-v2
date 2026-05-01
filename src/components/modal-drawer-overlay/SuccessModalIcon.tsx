import React from 'react';
import { cn } from '@/utils/cn';

/**
 * SuccessModalIcon — renders a success checkmark icon with emerald
 * background circle for use in success modals and confirmations.
 *
 * @example
 * ```tsx
 * <SuccessModalIcon size="lg" />
 * ```
 */
export interface SuccessModalIconProps {
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

export const SuccessModalIcon: React.FC<SuccessModalIconProps> = ({
  size = 'md',
  className,
  children,
}) => {
  return (
    <span
      className={cn(
        'tf-success-modal-icon',
        'inline-flex items-center justify-center rounded-full bg-emerald-500/15',
        sizeClasses[size],
        className
      )}
      data-testid="success-modal-icon"
    >
      {children ?? (
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          className="text-emerald-500"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
};

export default SuccessModalIcon;
