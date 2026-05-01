import React from 'react';
import { cn } from '@/utils/cn';

/**
 * Toast notification — a non-blocking message that appears temporarily.
 * Used for success, error, warning, and informational feedback.
 *
 * @example
 * ```tsx
 * <Toast
 *   type="success"
 *   title="Deployment complete"
 *   message="All nodes updated."
 *   onClose={dismiss}
 * />
 * ```
 */
export interface ToastProps {
  /** Visual type of the toast. */
  type?: 'success' | 'error' | 'warning' | 'info';
  /** Toast title. */
  title?: string;
  /** Toast message body. */
  message: React.ReactNode;
  /** Callback when toast is dismissed. */
  onClose: () => void;
  /** Whether the toast is visible. */
  isOpen?: boolean;
  /** Duration in ms before auto-dismiss (0 = no auto-dismiss). */
  duration?: number;
  /** Whether to show a progress bar for auto-dismiss. */
  showProgress?: boolean;
  /** Additional class names. */
  className?: string;
  /** Whether the toast is being dismissed (for exit animation). */
  isExiting?: boolean;
  /** Action button label. */
  actionLabel?: string;
  /** Action button callback. */
  onAction?: () => void;
}

const typeClasses: Record<string, { border: string; bg: string; icon: string }> = {
  success: { border: 'border-emerald-800', bg: 'bg-emerald-950/60', icon: 'text-emerald-500' },
  error: { border: 'border-red-800', bg: 'bg-red-950/60', icon: 'text-red-500' },
  warning: { border: 'border-amber-800', bg: 'bg-amber-950/60', icon: 'text-amber-500' },
  info: { border: 'border-sky-800', bg: 'bg-sky-950/60', icon: 'text-sky-500' },
};

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  isOpen = true,
  showProgress = true,
  className,
  isExiting,
  actionLabel,
  onAction,
}) => {
  const styles = typeClasses[type];

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'tf-toast',
        'relative flex gap-3 rounded-md border p-4 shadow-xl min-w-[20rem] max-w-[28rem]',
        'transition-all duration-300',
        isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0',
        styles.border,
        styles.bg,
        className
      )}
      role="alert"
      data-testid="toast"
      data-type={type}
    >
      <ToastIcon type={type} className="shrink-0 mt-0.5" />
      <div className="tf-toast__content flex-1 min-w-0">
        {title && (
          <h4 className="tf-toast__title text-sm font-semibold text-white">
            {title}
          </h4>
        )}
        <div className="tf-toast__message text-sm text-steel-200 leading-relaxed">
          {message}
        </div>
        {onAction && actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="mt-2 text-xs font-medium text-steel-300 underline hover:text-white transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
      <ToastCloseButton onClose={onClose} />
      {showProgress && <ToastProgress duration={5000} />}
    </div>
  );
};

// Inline components
const ToastIcon: React.FC<{ type: string; className?: string }> = ({ type, className }) => {
  const icons: Record<string, React.ReactNode> = {
    success: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    error: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    warning: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M10.615 4.765L3.314 17.5A2 2 0 005.052 20.5h13.896a2 2 0 001.738-3l-7.3-12.735a2 2 0 00-3.477 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10v3m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    info: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <span className={cn('tf-toast-icon', typeClasses[type].icon, className)} aria-hidden="true">
      {icons[type]}
    </span>
  );
};

const ToastCloseButton: React.FC<{ onClose: () => void; className?: string }> = ({ onClose, className }) => (
  <button
    type="button"
    onClick={onClose}
    className={cn(
      'tf-toast-close-button shrink-0 inline-flex h-5 w-5 items-center justify-center rounded',
      'text-steel-500 hover:text-white hover:bg-steel-800 transition-colors',
      className
    )}
    aria-label="Dismiss notification"
  >
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </button>
);

const ToastProgress: React.FC<{ duration: number; className?: string }> = ({ duration, className }) => (
  <div className={cn('tf-toast-progress absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-md', className)}>
    <div
      className="h-full bg-white/30 origin-left"
      style={{ animation: `tf-toast-progress ${duration}ms linear forwards` }}
    />
  </div>
);

export default Toast;
