import React from 'react';
import { cn } from '@/utils/cn';

/**
 * AlertBannerClose — a dismiss button for the alert banner.
 *
 * @example
 * ```tsx
 * <AlertBannerClose onClose={dismissAlert} />
 * ```
 */
export interface AlertBannerCloseProps {
  /** Callback when close is clicked. */
  onClose: () => void;
  /** Additional class names. */
  className?: string;
  /** ARIA label. */
  ariaLabel?: string;
}

export const AlertBannerClose: React.FC<AlertBannerCloseProps> = ({
  onClose,
  className,
  ariaLabel = 'Dismiss alert',
}) => {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={ariaLabel}
      className={cn(
        'tf-alert-banner-close',
        'ml-2 inline-flex h-5 w-5 items-center justify-center rounded',
        'text-steel-400 hover:text-white hover:bg-steel-800',
        'transition-colors duration-150',
        className
      )}
      data-testid="alert-banner-close"
    >
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
};

export default AlertBannerClose;
