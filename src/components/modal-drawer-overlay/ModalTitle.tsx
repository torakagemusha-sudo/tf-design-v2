import React from 'react';
import { cn } from '@/utils/cn';

/**
 * ModalTitle — semantic title element for a modal dialog.
 * Renders an accessible heading with appropriate aria attributes.
 *
 * @example
 * ```tsx
 * <ModalTitle as="h3">Confirm Deletion</ModalTitle>
 * ```
 */
export interface ModalTitleProps {
  /** Title text content. */
  children: React.ReactNode;
  /** Heading level to render. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Visual size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional class names. */
  className?: string;
  /** Optional unique identifier. */
  id?: string;
}

const sizeMap: Record<string, string> = {
  sm: 'text-sm font-medium',
  md: 'text-base font-semibold',
  lg: 'text-lg font-semibold',
};

export const ModalTitle: React.FC<ModalTitleProps> = ({
  children,
  as: Component = 'h2',
  size = 'md',
  className,
  id,
}) => {
  return (
    <Component
      id={id}
      className={cn(
        'tf-modal-title',
        'text-white tracking-tight',
        sizeMap[size],
        className
      )}
      data-testid="modal-title"
    >
      {children}
    </Component>
  );
};

export default ModalTitle;
