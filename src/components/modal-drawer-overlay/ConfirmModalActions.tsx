import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ConfirmModalActions — a pre-styled action group for confirmation dialogs.
 * Provides cancel and confirm buttons with consistent Torafirma styling.
 *
 * @example
 * ```tsx
 * <ConfirmModalActions
 *   onCancel={close}
 *   onConfirm={handleConfirm}
 *   confirmLabel="Proceed"
 *   variant="primary"
 * />
 * ```
 */
export interface ConfirmModalActionsProps {
  /** Callback for cancel action. */
  onCancel: () => void;
  /** Callback for confirm action. */
  onConfirm: () => void;
  /** Label for the cancel button. */
  cancelLabel?: string;
  /** Label for the confirm button. */
  confirmLabel?: string;
  /** Whether confirm action is in progress. */
  isConfirming?: boolean;
  /** Whether confirm is disabled. */
  confirmDisabled?: boolean;
  /** Confirm button variant. */
  variant?: 'neutral' | 'primary' | 'accent' | 'destructive';
  /** Additional class names. */
  className?: string;
}

const variantClasses: Record<string, string> = {
  neutral: 'bg-steel-200 text-steel-950 hover:bg-white',
  primary: 'bg-amber-500 text-steel-950 hover:bg-amber-400',
  accent: 'bg-sky-500 text-white hover:bg-sky-400',
  destructive: 'bg-red-600 text-white hover:bg-red-500',
};

export const ConfirmModalActions: React.FC<ConfirmModalActionsProps> = ({
  onCancel,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isConfirming,
  confirmDisabled,
  variant = 'primary',
  className,
}) => {
  return (
    <div
      className={cn(
        'tf-confirm-modal-actions',
        'flex items-center justify-end gap-2 px-5 py-4 border-t border-steel-700',
        className
      )}
      data-testid="confirm-modal-actions"
    >
      <button
        type="button"
        onClick={onCancel}
        disabled={isConfirming}
        className={cn(
          'tf-confirm-modal-actions__cancel',
          'rounded px-3 py-1.5 text-sm font-medium',
          'border border-steel-600 bg-transparent text-steel-300',
          'hover:bg-steel-800 hover:text-white',
          'disabled:opacity-50 disabled:pointer-events-none',
          'transition-colors duration-150'
        )}
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={confirmDisabled || isConfirming}
        className={cn(
          'tf-confirm-modal-actions__confirm',
          'rounded px-3 py-1.5 text-sm font-medium',
          variantClasses[variant],
          'disabled:opacity-50 disabled:pointer-events-none',
          'transition-colors duration-150'
        )}
      >
        {isConfirming ? 'Processing...' : confirmLabel}
      </button>
    </div>
  );
};

export default ConfirmModalActions;
