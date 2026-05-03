import React from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { FaultModalError } from './FaultModalError';
import { FaultModalStackTrace } from './FaultModalStackTrace';
import { FaultModalRecovery } from './FaultModalRecovery';

/**
 * FaultModal — displays system errors, faults, and exceptions.
 * Provides a structured view of error details with optional recovery actions.
 *
 * @example
 * ```tsx
 * <FaultModal
 *   isOpen={hasError}
 *   onClose={close}
 *   title="Connection Failed"
 *   error={{ code: 'NET_001', message: 'Unable to reach upstream' }}
 *   onRetry={retry}
 * />
 * ```
 */
export interface FaultModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Callback when modal is dismissed. */
  onClose: () => void;
  /** Modal title. */
  title?: string;
  /** Error information to display. */
  error: FaultError;
  /** Optional stack trace for debugging. */
  stackTrace?: string;
  /** Callback to retry the failed operation. */
  onRetry?: () => void;
  /** Callback to dismiss and ignore the error. */
  onDismiss?: () => void;
  /** Label for the retry button. */
  retryLabel?: string;
  /** Whether a retry is in progress. */
  isRetrying?: boolean;
  /** Size variant. */
  size?: 'md' | 'lg' | 'xl';
  /** Additional class names. */
  className?: string;
  /** Recovery options to present. */
  recoveryOptions?: RecoveryOption[];
}

export interface FaultError {
  /** Error code or identifier. */
  code?: string;
  /** Human-readable error message. */
  message: string;
  /** Severity of the fault. */
  severity?: 'critical' | 'error' | 'warning';
  /** Origin module or service. */
  origin?: string;
}

export interface RecoveryOption {
  /** Label for the recovery action. */
  label: string;
  /** Callback for the recovery action. */
  action: () => void;
  /** Whether this is the primary recovery path. */
  primary?: boolean;
}

export const FaultModal: React.FC<FaultModalProps> = ({
  isOpen,
  onClose,
  title = 'System Fault',
  error,
  stackTrace,
  onRetry,
  onDismiss,
  retryLabel = 'Retry',
  isRetrying,
  size = 'lg',
  className,
  recoveryOptions,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      title={title}
      role="alertdialog"
      className={cn('tf-fault-modal', className)}
    >
      <ModalHeader
        title={title}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red-500">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
        onClose={onClose}
      />
      <ModalBody>
        <FaultModalError
          code={error.code}
          message={error.message}
          severity={error.severity}
          origin={error.origin}
        />
        {stackTrace && <FaultModalStackTrace trace={stackTrace} />}
        {recoveryOptions && recoveryOptions.length > 0 && (
          <FaultModalRecovery options={recoveryOptions} />
        )}
      </ModalBody>
      <ModalFooter>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded px-3 py-1.5 text-sm font-medium border border-steel-600 text-steel-300 hover:bg-steel-800 hover:text-white transition-colors"
          >
            Dismiss
          </button>
        )}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className={cn(
              'tf-fault-modal__retry rounded px-3 py-1.5 text-sm font-medium',
              'bg-sky-500 text-white hover:bg-sky-400',
              'disabled:opacity-50 disabled:pointer-events-none',
              'transition-colors duration-150'
            )}
          >
            {isRetrying ? 'Retrying...' : retryLabel}
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default FaultModal;
