import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

/**
 * AuthorityModal — modal for authority escalation requiring credentials.
 * Used when an operation demands elevated privileges or dual authorization.
 *
 * @example
 * ```tsx
 * <AuthorityModal
 *   isOpen={escalate}
 *   onClose={close}
 *   title="Authority Escalation"
 *   requiredLevel={3}
 *   onEscalate={handleEscalate}
 * />
 * ```
 */
export interface AuthorityModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Callback when modal is dismissed. */
  onClose: () => void;
  /** Modal title. */
  title?: string;
  /** Required authority level for this operation. */
  requiredLevel?: number;
  /** Description of why escalation is needed. */
  reason?: string;
  /** Callback when user submits credentials. */
  onEscalate: (credentials: AuthorityCredentials) => void;
  /** Whether an escalation request is in progress. */
  isLoading?: boolean;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Additional class names. */
  className?: string;
}

export interface AuthorityCredentials {
  identifier: string;
  passphrase: string;
  authorityLevel?: number;
}

export const AuthorityModal: React.FC<AuthorityModalProps> = ({
  isOpen,
  onClose,
  title = 'Authority Escalation Required',
  requiredLevel = 2,
  reason,
  onEscalate,
  isLoading,
  size = 'md',
  className,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [passphrase, setPassphrase] = useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setIdentifier('');
      setPassphrase('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !passphrase.trim()) return;
    onEscalate({ identifier, passphrase, authorityLevel: requiredLevel });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      title={title}
      className={cn('tf-authority-modal', className)}
    >
      <ModalHeader
        title={title}
        subtitle={`Level ${requiredLevel} clearance required`}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-500">
            <path d="M12 15v3m-6 4h12a2 2 0 002-2v-6a2 2 0 00-.6-1.4l-8-8a2 2 0 00-2.8 0l-8 8A2 2 0 002 11v6a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        onClose={isLoading ? undefined : onClose}
        showCloseButton={!isLoading}
      />
      <ModalBody>
        <form id="authority-form" onSubmit={handleSubmit}>
          <AuthorityModalForm
            identifier={identifier}
            passphrase={passphrase}
            onIdentifierChange={setIdentifier}
            onPassphraseChange={setPassphrase}
            requiredLevel={requiredLevel}
            reason={reason}
            disabled={isLoading}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="rounded px-3 py-1.5 text-sm font-medium border border-steel-600 text-steel-300 hover:bg-steel-800 hover:text-white disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="authority-form"
          disabled={isLoading || !identifier.trim() || !passphrase.trim()}
          className={cn(
            'tf-authority-modal__submit rounded px-3 py-1.5 text-sm font-medium',
            'bg-amber-500 text-steel-950 hover:bg-amber-400',
            'disabled:opacity-50 disabled:pointer-events-none',
            'transition-colors duration-150'
          )}
        >
          {isLoading ? 'Authenticating...' : 'Escalate'}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AuthorityModal;
