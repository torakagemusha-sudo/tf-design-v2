import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ToastIcon — renders the appropriate icon for a toast type.
 * Supports success, error, warning, and info variants.
 *
 * @example
 * ```tsx
 * <ToastIcon type="success" size="lg" />
 * ```
 */
export interface ToastIconProps {
  /** Toast type determining the icon. */
  type?: 'success' | 'error' | 'warning' | 'info';
  /** Icon size. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names. */
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  success: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M10.615 4.765L3.314 17.5A2 2 0 005.052 20.5h13.896a2 2 0 001.738-3l-7.3-12.735a2 2 0 00-3.477 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 10v3m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const colorMap: Record<string, string> = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-sky-500',
};

const sizeMap: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-[18px] h-[18px]',
  lg: 'w-6 h-6',
};

export const ToastIcon: React.FC<ToastIconProps> = ({
  type = 'info',
  size = 'md',
  className,
}) => {
  return (
    <span
      className={cn(
        'tf-toast-icon inline-flex shrink-0',
        colorMap[type],
        sizeMap[size],
        className
      )}
      aria-hidden="true"
      data-testid="toast-icon"
    >
      {iconMap[type]}
    </span>
  );
};

export default ToastIcon;
