import React from 'react';
import { cn } from '@/utils/cn';

/**
 * PopoverHeader — the title section of a popover panel.
 * Provides a bold header with optional close button.
 *
 * @example
 * ```tsx
 * <PopoverHeader title="Options" onClose={close} />
 * ```
 */
export interface PopoverHeaderProps {
  /** Header title text. */
  title: string;
  /** Optional close button callback. */
  onClose?: () => void;
  /** Additional class names. */
  className?: string;
  /** Optional icon before the title. */
  icon?: React.ReactNode;
}

export const PopoverHeader: React.FC<PopoverHeaderProps> = ({
  title,
  onClose,
  className,
  icon,
}) => {
  return (
    <div
      className={cn(
        'tf-popover-header',
        'flex items-center justify-between gap-2 px-3 py-2 border-b border-steel-700/50',
        className
      )}
      data-testid="popover-header"
    >
      <div className="flex items-center gap-2 min-w-0">
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="tf-popover-header__title text-sm font-semibold text-white truncate">
          {title}
        </span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 inline-flex h-5 w-5 items-center justify-center rounded text-steel-400 hover:text-white hover:bg-steel-800 transition-colors"
          aria-label="Close popover"
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PopoverHeader;
