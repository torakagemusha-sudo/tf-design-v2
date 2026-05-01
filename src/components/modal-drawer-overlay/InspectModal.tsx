import React from 'react';
import { cn } from '@/utils/cn';
import { Modal, ModalProps } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';

/**
 * InspectModal — a read-only modal for viewing entity details, records,
 * or system state. Configured with closeOnOverlayClick for quick dismissal.
 *
 * @example
 * ```tsx
 * <InspectModal
 *   isOpen={showDetails}
 *   onClose={close}
 *   title="Node Details"
 *   subtitle="ID: node-47b3"
 * >
 *   <InspectModalContent fields={fields} />
 * </InspectModal>
 * ```
 */
export interface InspectModalProps extends Omit<ModalProps, 'role'> {
  /** Title displayed in the inspect modal header. */
  title: string;
  /** Optional subtitle shown below the title. */
  subtitle?: string;
  /** Icon rendered in the header. */
  headerIcon?: React.ReactNode;
  /** Whether the modal should close when overlay is clicked. */
  dismissible?: boolean;
  /** Content of the inspect modal. */
  children: React.ReactNode;
}

export const InspectModal: React.FC<InspectModalProps> = ({
  title,
  subtitle,
  headerIcon,
  dismissible = true,
  children,
  className,
  size = 'lg',
  ...modalProps
}) => {
  return (
    <Modal
      {...modalProps}
      size={size}
      role="dialog"
      closeOnOverlayClick={dismissible}
      closeOnEscape={dismissible}
      title={title}
      className={cn('tf-inspect-modal', className)}
    >
      <ModalHeader
        title={title}
        subtitle={subtitle}
        icon={headerIcon}
        onClose={modalProps.onClose}
        showCloseButton={dismissible}
      />
      <ModalBody scrollable>{children}</ModalBody>
    </Modal>
  );
};

export default InspectModal;
