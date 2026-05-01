import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * ModalBody — scrollable content region of a modal dialog.
 * Provides vertical padding and overflow scrolling for lengthy content.
 *
 * @example
 * ```tsx
 * <ModalBody scrollable>
 *   <p>Long form content here...</p>
 * </ModalBody>
 * ```
 */
export interface ModalBodyProps {
  /** Content rendered inside the modal body. */
  children: React.ReactNode;
  /** Whether the body should scroll on overflow. */
  scrollable?: boolean;
  /** Additional class names. */
  className?: string;
  /** Optional id for aria-describedby linking. */
  id?: string;
  /** Whether to add extra vertical padding. */
  spacious?: boolean;
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, scrollable = true, className, id, spacious = false }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          'tf-modal-body',
          'px-5 text-sm text-steel-200 leading-relaxed',
          scrollable && 'overflow-y-auto',
          spacious ? 'py-6' : 'py-4',
          className
        )}
        data-testid="modal-body"
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

export default ModalBody;
