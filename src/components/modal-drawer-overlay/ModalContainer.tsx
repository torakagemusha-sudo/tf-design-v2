import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * ModalContainer — the visual panel that wraps modal content.
 * Defines the panel-steel surface, border radius, shadow depth,
 * and max-height constraints. Can be used standalone for custom
 * modal implementations.
 *
 * @example
 * ```tsx
 * <ModalContainer size="lg" className="custom-modal">
 *   <ModalHeader title="Custom" />
 *   <ModalBody>Content</ModalBody>
 * </ModalContainer>
 * ```
 */
export interface ModalContainerProps {
  /** Size preset for the modal width. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Explicit width override. */
  width?: number | string;
  /** Max-height constraint. */
  maxHeight?: number | string;
  /** Additional class names. */
  className?: string;
  /** Child elements inside the modal panel. */
  children: React.ReactNode;
  /** Whether the modal is in a loading state. */
  isLoading?: boolean;
  /** Test id for the container. */
  'data-testid'?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[calc(100vw-2rem)]',
};

export const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  (
    {
      size = 'md',
      width,
      maxHeight = 'calc(100vh - 2rem)',
      className,
      children,
      isLoading,
      'data-testid': testId,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'tf-modal-container',
          'relative w-full rounded-md border border-steel-700 bg-steel-900 shadow-2xl',
          'flex flex-col overflow-hidden',
          sizeClasses[size],
          isLoading && 'tf-modal-container--loading',
          className
        )}
        style={{ width, maxHeight }}
        data-testid={testId ?? 'modal-container'}
      >
        {children}
      </div>
    );
  }
);

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
