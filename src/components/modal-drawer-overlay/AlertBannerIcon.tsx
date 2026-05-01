import React from 'react';
import { cn } from '@/utils/cn';

/**
 * AlertBannerIcon — renders the appropriate icon for an alert banner type.
 *
 * @example
 * ```tsx
 * <AlertBannerIcon type="warning" />
 * ```
 */
export interface AlertBannerIconProps {
  /** Alert type determining the icon. */
  type?: 'info' | 'warning' | 'error' | 'success';
  /** Additional class names. */
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
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

const colorMap: Record<string, string> = {
  info: 'text-sky-500',
  warning: 'text-amber-500',
  error: 'text-red-500',
  success: 'text-emerald-500',
};

export const AlertBannerIcon: React.FC<AlertBannerIconProps> = ({
  type = 'info',
  className,
}) => {
  return (
    <span
      className={cn(
        'tf-alert-banner-icon shrink-0',
        colorMap[type],
        className
      )}
      aria-hidden="true"
      data-testid="alert-banner-icon"
    >
      {iconMap[type]}
    </span>
  );
};

export default AlertBannerIcon;
