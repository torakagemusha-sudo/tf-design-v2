import React from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { SuccessModalIcon } from './SuccessModalIcon';

/**
 * SuccessModal — displays a success confirmation after an operation
 * completes. Uses emerald color treatment with a checkmark icon.
 *
 * @example
 * ```tsx
 * <SuccessModal
 *   isOpen={showSuccess}
 *   onClose={close}
 *   title="Deployment Complete"
 *   message="All nodes updated successfully."
 * />
 * ```
 */
export interface SuccessModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Callback when modal is dismissed. */
  onClose: () => void;
  /** Modal title. */
  title: string;
  /** Success message body. */
  message: React.ReactNode;
  /** Label for the dismiss button. */
  dismissLabel?: string;
  /** Optional callback for a secondary action. */
  onAction?: () => void;
  /** Label for secondary action button. */
  actionLabel?: string;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional class names. */
  className?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  dismissLabel = 'Close',
  onAction,
  actionLabel = 'View Details',
  size = 'md',
  className,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      title={title}
      className={cn('tf-success-modal', className)}
    >
      <ModalHeader
        title={title}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        onClose={onClose}
      />
      <ModalBody>
        <div className="tf-success-modal__content flex flex-col items-center text-center gap-3">
          <SuccessModalIcon size="lg" />
          <div className="tf-success-modal__message text-sm text-steel-200 leading-relaxed">
            {message}
          </div>
        </div>
      </ModalBody>
      <ModalFooter align="center">
        <button
          type="button"
          onClick={onClose}
          className="rounded px-3 py-1.5 text-sm font-medium border border-steel-600 text-steel-300 hover:bg-steel-800 hover:text-white transition-colors"
        >
          {dismissLabel}
        </button>
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="rounded px-3 py-1.5 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default SuccessModal;
