import React from 'react';
import { cn } from '@/utils/cn';

/**
 * AlertBanner — a top-level alert banner for system-wide notifications.
 * Sits above the main content, spanning the full viewport width.
 *
 * @example
 * ```tsx
 * <AlertBanner
 *   type="warning"
 *   message="Scheduled maintenance in 30 minutes."
 *   onClose={dismiss}
 * />
 * ```
 */
export interface AlertBannerProps {
  /** Visual severity type. */
  type?: 'info' | 'warning' | 'error' | 'success';
  /** Alert message content. */
  message: React.ReactNode;
  /** Callback when banner is dismissed. */
  onClose?: () => void;
  /** Whether the banner is visible. */
  isOpen?: boolean;
  /** Additional class names. */
  className?: string;
  /** Whether to show an icon. */
  showIcon?: boolean;
  /** Optional action button. */
  action?: { label: string; onClick: () => void };
  /** Whether the banner is dismissible. */
  dismissible?: boolean;
}

const typeStyles: Record<string, { bg: string; border: string; icon: string; text: string }> = {
  info: {
    bg: 'bg-sky-950/70',
    border: 'border-b-sky-800',
    icon: 'text-sky-500',
    text: 'text-sky-100',
  },
  warning: {
    bg: 'bg-amber-950/70',
    border: 'border-b-amber-800',
    icon: 'text-amber-500',
    text: 'text-amber-100',
  },
  error: {
    bg: 'bg-red-950/70',
    border: 'border-b-red-800',
    icon: 'text-red-500',
    text: 'text-red-100',
  },
  success: {
    bg: 'bg-emerald-950/70',
    border: 'border-b-emerald-800',
    icon: 'text-emerald-500',
    text: 'text-emerald-100',
  },
};

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type = 'info',
  message,
  onClose,
  isOpen = true,
  className,
  showIcon = true,
  action,
  dismissible = true,
}) => {
  const styles = typeStyles[type];

  if (!isOpen) return null;

  return (
    <div
      role="alert"
      className={cn(
        'tf-alert-banner',
        'relative flex items-center gap-3 border-b px-4 py-2.5',
        styles.bg,
        styles.border,
        className
      )}
      data-testid="alert-banner"
      data-type={type}
    >
      {showIcon && <AlertBannerIcon type={type} className={styles.icon} />}
      <div className={cn('tf-alert-banner__message flex-1 text-sm', styles.text)}>
        {message}
      </div>
      <AlertBannerActions action={action} />
      {dismissible && onClose && <AlertBannerClose onClose={onClose} />}
    </div>
  );
};

// Sub-components
const AlertBannerIcon: React.FC<{ type: string; className?: string }> = ({ type, className }) => {
  const icons: Record<string, React.ReactNode> = {
    info: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    warning: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M10.615 4.765L3.314 17.5A2 2 0 005.052 20.5h13.896a2 2 0 001.738-3l-7.3-12.735a2 2 0 00-3.477 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10v3m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    error: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    success: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return (
    <span className={cn('tf-alert-banner-icon shrink-0', className)} aria-hidden="true">
      {icons[type]}
    </span>
  );
};

const AlertBannerActions: React.FC<{ action?: { label: string; onClick: () => void } }> = ({ action }) => {
  if (!action) return null;
  return (
    <button
      type="button"
      onClick={action.onClick}
      className="tf-alert-banner-actions__button text-xs font-medium underline text-steel-200 hover:text-white transition-colors"
    >
      {action.label}
    </button>
  );
};

const AlertBannerClose: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <button
    type="button"
    onClick={onClose}
    className="tf-alert-banner-close ml-2 inline-flex h-5 w-5 items-center justify-center rounded text-steel-400 hover:text-white hover:bg-steel-800 transition-colors"
    aria-label="Dismiss alert"
  >
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </button>
);

export default AlertBanner;
