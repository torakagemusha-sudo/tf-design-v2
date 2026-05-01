import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

/**
 * DestructiveModal — a high-friction modal for destructive operations.
 * Requires the user to type a confirmation phrase before the action is enabled.
 *
 * @example
 * ```tsx
 * <DestructiveModal
 *   isOpen={showDestroy}
 *   onClose={close}
 *   title="Delete Workspace"
 *   warning="All data will be permanently lost."
 *   confirmPhrase="DELETE"
 *   onConfirm={handleDelete}
 * />
 * ```
 */
export interface DestructiveModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Callback when modal is dismissed. */
  onClose: () => void;
  /** Modal title. */
  title: string;
  /** Warning message describing the destructive action. */
  warning: React.ReactNode;
  /** The phrase the user must type to confirm. */
  confirmPhrase: string;
  /** Label for the confirmation input. */
  confirmLabel?: string;
  /** Callback when confirmed. */
  onConfirm: () => void;
  /** Whether the action is in progress. */
  isProcessing?: boolean;
  /** Primary destructive action label. */
  actionLabel?: string;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional class names. */
  className?: string;
}

export const DestructiveModal: React.FC<DestructiveModalProps> = ({
  isOpen,
  onClose,
  title,
  warning,
  confirmPhrase,
  confirmLabel = `Type "${confirmPhrase}" to confirm`,
  onConfirm,
  isProcessing,
  actionLabel = 'Delete',
  size = 'md',
  className,
}) => {
  const [input, setInput] = useState('');
  const isConfirmed = input.trim() === confirmPhrase;

  React.useEffect(() => {
    if (!isOpen) setInput('');
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      title={title}
      className={cn('tf-destructive-modal', className)}
    >
      <ModalHeader
        title={title}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red-500">
            <path d="M12 9v4m0 4h.01M10.615 4.765L3.314 17.5A2 2 0 005.052 20.5h13.896a2 2 0 001.738-3l-7.3-12.735a2 2 0 00-3.477 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        onClose={isProcessing ? undefined : onClose}
        showCloseButton={!isProcessing}
      />
      <ModalBody>
        <DestructiveModalWarning>{warning}</DestructiveModalWarning>
        <DestructiveModalConfirm
          label={confirmLabel}
          value={input}
          onChange={setInput}
          disabled={isProcessing}
        />
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="rounded px-3 py-1.5 text-sm font-medium border border-steel-600 text-steel-300 hover:bg-steel-800 hover:text-white disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!isConfirmed || isProcessing}
          className={cn(
            'tf-destructive-modal__action rounded px-3 py-1.5 text-sm font-medium',
            'bg-red-600 text-white hover:bg-red-500',
            'disabled:opacity-50 disabled:pointer-events-none',
            'transition-colors duration-150'
          )}
        >
          {isProcessing ? 'Processing...' : actionLabel}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DestructiveModal;
