import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ModalCloseButton — a standardized close button for modal dialogs.
 * Provides an accessible button with an X icon and hover/active states.
 *
 * @example
 * ```tsx
 * <ModalCloseButton onClick={handleClose} size="md" />
 * ```
 */
export interface ModalCloseButtonProps {
  /** Callback when the button is clicked. */
  onClick: () => void;
  /** Visual size of the button. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names. */
  className?: string;
  /** ARIA label for accessibility. */
  ariaLabel?: string;
  /** Tab index for focus ordering. */
  tabIndex?: number;
  /** Test id. */
  'data-testid'?: string;
}

const sizeMap: Record<string, { button: string; icon: number }> = {
  sm: { button: 'h-6 w-6', icon: 12 },
  md: { button: 'h-8 w-8', icon: 16 },
  lg: { button: 'h-10 w-10', icon: 20 },
};

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onClick,
  size = 'md',
  className,
  ariaLabel = 'Close modal',
  tabIndex,
  'data-testid': testId,
}) => {
  const s = sizeMap[size];

  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={cn(
        'tf-modal-close-button',
        'inline-flex items-center justify-center rounded',
        'text-steel-400 hover:text-white hover:bg-steel-800',
        'active:bg-steel-700 active:text-white',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-amber-500/50',
        s.button,
        className
      )}
      data-testid={testId ?? 'modal-close-button'}
    >
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 4L4 12M4 4l8 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default ModalCloseButton;
