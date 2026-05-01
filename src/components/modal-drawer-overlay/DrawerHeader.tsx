import React from 'react';
import { cn } from '@/utils/cn';

/**
 * DrawerHeader — the top section of a drawer panel with title,
 * optional subtitle, and close button.
 *
 * @example
 * ```tsx
 * <DrawerHeader title="Settings" subtitle="System configuration" onClose={close} />
 * ```
 */
export interface DrawerHeaderProps {
  /** Drawer title. */
  title: React.ReactNode;
  /** Optional subtitle. */
  subtitle?: React.ReactNode;
  /** Close button callback. */
  onClose?: () => void;
  /** Whether to show the close button. */
  showCloseButton?: boolean;
  /** Additional class names. */
  className?: string;
  /** Optional icon before the title. */
  icon?: React.ReactNode;
  /** Whether to use a compact height. */
  compact?: boolean;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  title,
  subtitle,
  onClose,
  showCloseButton = true,
  className,
  icon,
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'tf-drawer-header',
        'flex items-start justify-between gap-3 border-b border-steel-700',
        compact ? 'px-4 py-3' : 'px-5 py-4',
        className
      )}
      data-testid="drawer-header"
    >
      <div className="tf-drawer-header__content flex items-start gap-3 min-w-0">
        {icon && (
          <span className="tf-drawer-header__icon mt-0.5 shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <h2 className="tf-drawer-header__title text-base font-semibold text-white truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="tf-drawer-header__subtitle mt-0.5 text-sm text-steel-400">
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
            'tf-drawer-header__close',
            'ml-auto shrink-0 inline-flex h-8 w-8 items-center justify-center rounded',
            'text-steel-400 hover:text-white hover:bg-steel-800',
            'transition-colors duration-150'
          )}
          aria-label="Close drawer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default DrawerHeader;
