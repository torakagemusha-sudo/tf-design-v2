import React from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';
import { ModalBody } from './ModalBody';

/**
 * LoadingModal — displays an indeterminate or determinate loading state
 * within a modal overlay. Blocks interaction while operations are in progress.
 *
 * @example
 * ```tsx
 * <LoadingModal
 *   isOpen={isLoading}
 *   title="Syncing Data"
 *   message="Uploading configuration to cluster..."
 *   progress={67}
 * />
 * ```
 */
export interface LoadingModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Title displayed above the spinner. */
  title?: string;
  /** Descriptive message below the spinner. */
  message?: string;
  /** Progress percentage (0-100) for determinate loading. */
  progress?: number;
  /** Whether the progress value is indeterminate. */
  indeterminate?: boolean;
  /** Whether to show a cancel button. */
  cancellable?: boolean;
  /** Callback when user cancels. */
  onCancel?: () => void;
  /** Cancel button label. */
  cancelLabel?: string;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional class names. */
  className?: string;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  title = 'Loading',
  message,
  progress,
  indeterminate = progress === undefined,
  cancellable,
  onCancel,
  cancelLabel = 'Cancel',
  size = 'sm',
  className,
}) => {
  const showProgress = !indeterminate && progress !== undefined;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      size={size}
      title={title}
      closeOnOverlayClick={false}
      closeOnEscape={false}
      className={cn('tf-loading-modal', className)}
    >
      <ModalBody className="flex flex-col items-center text-center py-8">
        <LoadingModalSpinner size="lg" className="mb-4" />
        {title && (
          <h3 className="tf-loading-modal__title text-base font-semibold text-white mb-2">
            {title}
          </h3>
        )}
        {message && (
          <LoadingModalMessage>{message}</LoadingModalMessage>
        )}
        {showProgress && (
          <div className="tf-loading-modal__progress w-full mt-4">
            <LoadingModalProgress progress={progress} />
          </div>
        )}
        {cancellable && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-4 rounded px-3 py-1.5 text-sm font-medium border border-steel-600 text-steel-300 hover:bg-steel-800 hover:text-white transition-colors"
          >
            {cancelLabel}
          </button>
        )}
      </ModalBody>
    </Modal>
  );
};

export default LoadingModal;
