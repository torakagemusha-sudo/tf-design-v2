import React from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

/**
 * ConfirmModal — a standard confirmation dialog with primary action
 * and cancel button. Used for decisions requiring user acknowledgment.
 *
 * @example
 * ```tsx
 * <ConfirmModal
 *   isOpen={showConfirm}
 *   onClose={close}
 *   title="Delete Configuration?"
 *   message="This will remove the config permanently."
 *   onConfirm={handleDelete}
 *   confirmLabel="Delete"
 * />
 * ```
 */
export interface ConfirmModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Callback when the modal is dismissed. */
  onClose: () => void;
  /** Modal title. */
  title: string;
  /** Confirmation message body. */
  message: React.ReactNode;
  /** Label for the confirm button. */
  confirmLabel?: string;
  /** Label for the cancel button. */
  cancelLabel?: string;
  /** Callback when the user confirms. */
  onConfirm: () => void;
  /** Whether the confirm action is in progress. */
  isConfirming?: boolean;
  /** Whether to disable the confirm button. */
  confirmDisabled?: boolean;
  /** Optional icon rendered in the header. */
  icon?: React.ReactNode;
  /** Size of the modal. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names. */
  className?: string;
  /** Variant affecting color treatment. */
  variant?: 'neutral' | 'primary' | 'accent';
}

const variantConfirmClasses: Record<string, string> = {
  neutral: 'bg-steel-200 text-steel-950 hover:bg-white',
  primary: 'bg-amber-500 text-steel-950 hover:bg-amber-400',
  accent: 'bg-sky-500 text-white hover:bg-sky-400',
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isConfirming,
  confirmDisabled,
  icon,
  size = 'sm',
  className,
  variant = 'primary',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      title={title}
      className={cn('tf-confirm-modal', className)}
    >
      <ModalHeader
        title={title}
        icon={icon}
        onClose={onClose}
        showCloseButton={!isConfirming}
      />
      <ModalBody>
        <ConfirmModalMessage>{message}</ConfirmModalMessage>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          onClick={onClose}
          disabled={isConfirming}
          className={cn(
            'tf-confirm-modal__cancel',
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
            'tf-confirm-modal__confirm',
            'rounded px-3 py-1.5 text-sm font-medium',
            variantConfirmClasses[variant],
            'disabled:opacity-50 disabled:pointer-events-none',
            'transition-colors duration-150'
          )}
        >
          {isConfirming ? 'Processing...' : confirmLabel}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
