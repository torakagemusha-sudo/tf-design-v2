import React from 'react';
import { cn } from '@/utils/cn';

/**
 * AlertBannerMessage — renders the message text of an alert banner
 * with appropriate typography and tone.
 *
 * @example
 * ```tsx
 * <AlertBannerMessage tone="warning">
 *   System maintenance scheduled for 02:00 UTC.
 * </AlertBannerMessage>
 * ```
 */
export interface AlertBannerMessageProps {
  /** Message content. */
  children: React.ReactNode;
  /** Visual tone. */
  tone?: 'info' | 'warning' | 'error' | 'success';
  /** Additional class names. */
  className?: string;
}

const toneClasses: Record<string, string> = {
  info: 'text-sky-100',
  warning: 'text-amber-100',
  error: 'text-red-100',
  success: 'text-emerald-100',
};

export const AlertBannerMessage: React.FC<AlertBannerMessageProps> = ({
  children,
  tone = 'info',
  className,
}) => {
  return (
    <div
      className={cn(
        'tf-alert-banner-message text-sm leading-relaxed',
        toneClasses[tone],
        className
      )}
      data-testid="alert-banner-message"
    >
      {children}
    </div>
  );
};

export default AlertBannerMessage;
