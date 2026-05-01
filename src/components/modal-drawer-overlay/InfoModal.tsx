import React from 'react';
import { cn } from '@/utils/cn';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

/**
 * InfoModal — informational modal for displaying non-critical messages,
 * announcements, or help content. Includes a branded info icon by default.
 *
 * @example
 * ```tsx
 * <InfoModal
 *   isOpen={showInfo}
 *   onClose={close}
 *   title="New Features Available"
 * >
 *   <p>Version 2.1 includes improved clustering...</p>
 * </InfoModal>
 * ```
 */
export interface InfoModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Callback when modal is dismissed. */
  onClose: () => void;
  /** Modal title. */
  title: string;
  /** Modal content — can be any React node. */
  children: React.ReactNode;
  /** Optional icon override. */
  icon?: React.ReactNode;
  /** Label for the acknowledge button. */
  acknowledgeLabel?: string;
  /** Callback when user acknowledges (defaults to onClose). */
  onAcknowledge?: () => void;
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names. */
  className?: string;
  /** Whether the modal can be dismissed by clicking overlay. */
  dismissible?: boolean;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  icon,
  acknowledgeLabel = 'Got it',
  onAcknowledge,
  size = 'md',
  className,
  dismissible = true,
}) => {
  const defaultIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-sky-500">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      title={title}
      closeOnOverlayClick={dismissible}
      closeOnEscape={dismissible}
      className={cn('tf-info-modal', className)}
    >
      <ModalHeader
        title={title}
        icon={icon ?? defaultIcon}
        onClose={dismissible ? onClose : undefined}
        showCloseButton={dismissible}
      />
      <ModalBody>
        <InfoModalContent>{children}</InfoModalContent>
      </ModalBody>
      <ModalFooter align="center">
        <button
          type="button"
          onClick={onAcknowledge ?? onClose}
          className={cn(
            'tf-info-modal__acknowledge rounded px-4 py-1.5 text-sm font-medium',
            'bg-steel-200 text-steel-950 hover:bg-white',
            'transition-colors duration-150'
          )}
        >
          {acknowledgeLabel}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default InfoModal;
