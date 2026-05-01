import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ModalHeader — renders the top section of a modal dialog with
 * title, optional subtitle, and an optional close button.
 *
 * @example
 * ```tsx
 * <ModalHeader title="System Settings" subtitle="Configure operational parameters" onClose={handleClose} />
 * ```
 */
export interface ModalHeaderProps {
  /** Modal title displayed in the header. */
  title: React.ReactNode;
  /** Optional subtitle or description. */
  subtitle?: React.ReactNode;
  /** Optional icon rendered before the title. */
  icon?: React.ReactNode;
  /** Callback when the close button is clicked. */
  onClose?: () => void;
  /** Whether to show the close button. */
  showCloseButton?: boolean;
  /** Additional class names. */
  className?: string;
  /** Whether the header has a bottom border. */
  bordered?: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  icon,
  onClose,
  showCloseButton = true,
  className,
  bordered = true,
}) => {
  return (
    <div
      className={cn(
        'tf-modal-header',
        'flex items-start justify-between gap-3 px-5 py-4',
        bordered && 'border-b border-steel-700',
        className
      )}
      data-testid="modal-header"
    >
      <div className="tf-modal-header__content flex items-start gap-3 min-w-0">
        {icon && (
          <span className="tf-modal-header__icon mt-0.5 shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="tf-modal-header__text min-w-0">
          <h2 className="tf-modal-header__title text-base font-semibold text-white truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="tf-modal-header__subtitle mt-0.5 text-sm text-steel-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'tf-modal-header__close',
            'ml-auto shrink-0 inline-flex h-8 w-8 items-center justify-center rounded',
            'text-steel-400 hover:text-white hover:bg-steel-800',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-amber-500/50'
          )}
          aria-label="Close modal"
          data-testid="modal-close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ModalHeader;
