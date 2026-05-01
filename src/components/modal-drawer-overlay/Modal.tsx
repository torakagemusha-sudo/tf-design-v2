import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useKeyPress } from '@/hooks/useKeyPress';

/**
 * Modal dialog component — the root element for all modal presentations.
 * Provides focus trapping, scroll locking, keyboard dismissal, and
 * panel-steel surfacing consistent with the Torafirma operational aesthetic.
 *
 * @example
 * ```tsx
 * <Modal isOpen={open} onClose={handleClose} size="md" role="dialog">
 *   <ModalHeader title="Configuration" />
 *   <ModalBody>Content</ModalBody>
 *   <ModalFooter />
 * </Modal>
 * ```
 */
export interface ModalProps {
  /** Whether the modal is currently visible. */
  isOpen: boolean;
  /** Callback invoked when the modal requests closure. */
  onClose: () => void;
  /** Size variant controlling modal width. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Optional explicit width override. */
  width?: number | string;
  /** Modal title used for aria-label if not header present. */
  title?: string;
  /** ARIA role for the modal dialog. */
  role?: 'dialog' | 'alertdialog';
  /** Whether clicking the overlay dismisses the modal. */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape dismisses the modal. */
  closeOnEscape?: boolean;
  /** Custom z-index override. */
  zIndex?: number;
  /** Additional class names applied to the modal panel. */
  className?: string;
  /** Child elements rendered inside the modal. */
  children: React.ReactNode;
  /** Optional unique identifier for the modal. */
  id?: string;
  /** Optional portal container ref. */
  portalRef?: React.RefObject<HTMLElement | null>;
  /** Optional onOpen callback. */
  onOpen?: () => void;
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[calc(100vw-2rem)]',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = 'md',
  width,
  title = 'Modal dialog',
  role = 'dialog',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  zIndex,
  className,
  children,
  id,
  onOpen,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useFocusTrap(panelRef, isOpen);
  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
      const timer = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(timer);
    } else {
      setEntered(false);
    }
  }, [isOpen, onOpen]);

  useKeyPress('Escape', () => {
    if (isOpen && closeOnEscape) onClose();
  });

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className={cn('tf-modal-overlay', entered && 'tf-modal-overlay--entered')}
      onClick={handleOverlayClick}
      role="presentation"
      style={{ zIndex }}
      data-testid="modal-overlay"
    >
      <div
        ref={panelRef}
        id={id}
        role={role}
        aria-modal="true"
        aria-label={title}
        className={cn(
          'tf-modal',
          'fixed inset-0 z-modal flex items-center justify-center p-4',
          'bg-black/70 backdrop-blur-sm',
          'transition-opacity duration-200',
          entered ? 'opacity-100' : 'opacity-0',
          className
        )}
        onClick={handleOverlayClick}
        data-testid="modal"
      >
        <div
          className={cn(
            'tf-modal__panel',
            'relative w-full rounded-md border border-steel-700 bg-steel-900 shadow-2xl',
            'flex flex-col max-h-[calc(100vh-2rem)]',
            sizeClasses[size],
            entered && 'tf-modal__panel--entered',
            className
          )}
          style={width ? { width, maxWidth: width } : undefined}
          onClick={(e) => e.stopPropagation()}
          data-testid="modal-panel"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
