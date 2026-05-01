import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ModalActions — a standardized action button group for modals.
 * Arranges primary and secondary actions with consistent spacing.
 *
 * @example
 * ```tsx
 * <ModalActions>
 *   <Button variant="ghost" onClick={onCancel}>Cancel</Button>
 *   <Button variant="primary" onClick={onConfirm}>Confirm</Button>
 * </ModalActions>
 * ```
 */
export interface ModalActionsProps {
  /** Action button elements. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to reverse the button order (primary first vs last). */
  reverse?: boolean;
  /** Full-width buttons on mobile. */
  fullWidth?: boolean;
  /** Whether actions are disabled. */
  disabled?: boolean;
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  children,
  className,
  reverse = false,
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <div
      className={cn(
        'tf-modal-actions',
        'flex items-center gap-2',
        reverse && 'flex-row-reverse',
        fullWidth && '[&>button]:flex-1',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      data-testid="modal-actions"
    >
      {children}
    </div>
  );
};

export default ModalActions;
