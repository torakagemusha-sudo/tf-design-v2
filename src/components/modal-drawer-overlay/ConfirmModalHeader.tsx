import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ConfirmModalHeader — a simplified header for confirmation dialogs.
 * Displays a title with an optional decorative accent strip.
 *
 * @example
 * ```tsx
 * <ConfirmModalHeader title="Confirm Action" accent="amber" />
 * ```
 */
export interface ConfirmModalHeaderProps {
  /** Dialog title. */
  title: string;
  /** Optional subtitle text. */
  subtitle?: string;
  /** Accent color for the top border strip. */
  accent?: 'amber' | 'sky' | 'emerald' | 'red' | 'neutral';
  /** Additional class names. */
  className?: string;
  /** Whether to show the close button. */
  showClose?: boolean;
  /** Close handler. */
  onClose?: () => void;
}

const accentMap: Record<string, string> = {
  amber: 'border-t-amber-500',
  sky: 'border-t-sky-500',
  emerald: 'border-t-emerald-500',
  red: 'border-t-red-500',
  neutral: 'border-t-steel-500',
};

export const ConfirmModalHeader: React.FC<ConfirmModalHeaderProps> = ({
  title,
  subtitle,
  accent = 'amber',
  className,
  showClose = true,
  onClose,
}) => {
  return (
    <div
      className={cn(
        'tf-confirm-modal-header',
        'border-t-2 px-5 py-4',
        'border-b border-steel-700',
        accentMap[accent],
        className
      )}
      data-testid="confirm-modal-header"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="tf-confirm-modal-header__title text-base font-semibold text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="tf-confirm-modal-header__subtitle mt-0.5 text-sm text-steel-400">
              {subtitle}
            </p>
          )}
        </div>
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="tf-confirm-modal-header__close inline-flex h-7 w-7 items-center justify-center rounded text-steel-400 hover:text-white hover:bg-steel-800 transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfirmModalHeader;
