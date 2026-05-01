import React from 'react';
import { cn } from '@/utils/cn';

/**
 * DestructiveModalWarning — renders a highlighted warning block within
 * a destructive action modal, drawing attention to the consequences.
 *
 * @example
 * ```tsx
 * <DestructiveModalWarning>
 *   All associated data will be permanently deleted. This action cannot be reversed.
 * </DestructiveModalWarning>
 * ```
 */
export interface DestructiveModalWarningProps {
  /** Warning content. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Severity level affecting color intensity. */
  severity?: 'high' | 'critical';
  /** Whether to show the warning icon. */
  showIcon?: boolean;
}

export const DestructiveModalWarning: React.FC<DestructiveModalWarningProps> = ({
  children,
  className,
  severity = 'high',
  showIcon = true,
}) => {
  return (
    <div
      className={cn(
        'tf-destructive-modal-warning',
        'flex gap-3 rounded p-3 border',
        severity === 'high' && 'bg-red-950/30 border-red-800/50 text-red-200',
        severity === 'critical' && 'bg-red-950/50 border-red-700 text-red-100',
        className
      )}
      data-testid="destructive-modal-warning"
    >
      {showIcon && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-red-500 mt-0.5"
        >
          <path
            d="M12 9v4m0 4h.01M10.615 4.765L3.314 17.5A2 2 0 005.052 20.5h13.896a2 2 0 001.738-3l-7.3-12.735a2 2 0 00-3.477 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <div className="tf-destructive-modal-warning__content text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default DestructiveModalWarning;
