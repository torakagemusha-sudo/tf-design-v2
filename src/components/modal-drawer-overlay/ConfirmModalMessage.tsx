import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ConfirmModalMessage — renders the message body of a confirmation dialog
 * with appropriate typography and optional emphasis styling.
 *
 * @example
 * ```tsx
 * <ConfirmModalMessage>This action cannot be undone.</ConfirmModalMessage>
 * ```
 */
export interface ConfirmModalMessageProps {
  /** Message content. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to emphasize the message visually. */
  emphasized?: boolean;
  /** Visual tone of the message. */
  tone?: 'neutral' | 'warning' | 'critical';
}

const toneClasses: Record<string, string> = {
  neutral: 'text-steel-200',
  warning: 'text-amber-300',
  critical: 'text-red-300',
};

export const ConfirmModalMessage: React.FC<ConfirmModalMessageProps> = ({
  children,
  className,
  emphasized = false,
  tone = 'neutral',
}) => {
  return (
    <div
      className={cn(
        'tf-confirm-modal-message',
        'text-sm leading-relaxed',
        toneClasses[tone],
        emphasized && 'font-medium',
        className
      )}
      data-testid="confirm-modal-message"
    >
      {children}
    </div>
  );
};

export default ConfirmModalMessage;
