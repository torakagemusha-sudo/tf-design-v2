import React from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

/**
 * WarningModal — displays cautionary messages that require user attention
 * but may not need immediate action. Uses amber color treatment.
 *
 * @example
 * ```tsx
 * <WarningModal
 *   isOpen={showWarning}
 *   onClose={close}
 *   title="Configuration Mismatch"
 *   message="The local config differs from the remote."
 *   onAction={syncConfig}
 *   actionLabel="Sync Now"
 * />
 * ```
 */
export interface WarningModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Callback when modal is dismissed. */
  onClose: () => void;
  /** Modal title. */
  title: string;
  /** Warning message body. */
  message: React.ReactNode;
  /** Label for primary action button. */
  actionLabel?: string;
  /** Callback for primary action. */
  onAction?: () => void;
  /** Whether action is in progress. */
  isProcessing?: boolean;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional class names. */
  className?: string;
  /** Icon override. */
  icon?: React.ReactNode;
}

export const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  actionLabel = 'Acknowledge',
  onAction,
  isProcessing,
  size = 'md',
  className,
  icon,
}) => {
  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-500">
      <path d="M10.615 4.765L3.314 17.5A2 2 0 005.052 20.5h13.896a2 2 0 001.738-3l-7.3-12.735a2 2 0 00-3.477 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 10v3m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      title={title}
      className={cn('tf-warning-modal', className)}
    >
      <ModalHeader
        title={title}
        icon={icon ?? defaultIcon}
        onClose={isProcessing ? undefined : onClose}
        showCloseButton={!isProcessing}
      />
      <ModalBody>
        <div className="tf-warning-modal__message text-sm text-steel-200 leading-relaxed">
          {message}
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="rounded px-3 py-1.5 text-sm font-medium border border-steel-600 text-steel-300 hover:bg-steel-800 hover:text-white disabled:opacity-50 transition-colors"
        >
          Close
        </button>
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            disabled={isProcessing}
            className={cn(
              'tf-warning-modal__action rounded px-3 py-1.5 text-sm font-medium',
              'bg-amber-500 text-steel-950 hover:bg-amber-400',
              'disabled:opacity-50 disabled:pointer-events-none',
              'transition-colors duration-150'
            )}
          >
            {isProcessing ? 'Processing...' : actionLabel}
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default WarningModal;
