import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ToastCloseButton — a small dismiss button for individual toast notifications.
 *
 * @example
 * ```tsx
 * <ToastCloseButton onClose={dismissToast} size="sm" />
 * ```
 */
export interface ToastCloseButtonProps {
  /** Callback when the close button is clicked. */
  onClose: () => void;
  /** Button size. */
  size?: 'sm' | 'md';
  /** Additional class names. */
  className?: string;
  /** ARIA label. */
  ariaLabel?: string;
}

const sizeMap: Record<string, string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
};

const iconSizes: Record<string, number> = {
  sm: 10,
  md: 12,
};

export const ToastCloseButton: React.FC<ToastCloseButtonProps> = ({
  onClose,
  size = 'sm',
  className,
  ariaLabel = 'Dismiss notification',
}) => {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={ariaLabel}
      className={cn(
        'tf-toast-close-button',
        'shrink-0 inline-flex items-center justify-center rounded',
        'text-steel-500 hover:text-white hover:bg-steel-800',
        'transition-colors duration-150',
        sizeMap[size],
        className
      )}
      data-testid="toast-close-button"
    >
      <svg width={iconSizes[size]} height={iconSizes[size]} viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
};

export default ToastCloseButton;
