import React from 'react';
  import { cn } from '@/utils/cn';

/**
 * ModalFooter — action bar at the bottom of a modal dialog.
 * Provides a bordered region for primary/secondary action buttons.
 *
 * @example
 * ```tsx
 * <ModalFooter>
 *   <Button variant="secondary" onClick={onCancel}>Cancel</Button>
 *   <Button variant="primary" onClick={onConfirm}>Confirm</Button>
 * </ModalFooter>
 * ```
 */
export interface ModalFooterProps {
  /** Action buttons or footer content. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to show a top border separator. */
  bordered?: boolean;
  /** Alignment of footer content. */
  align?: 'left' | 'center' | 'right';
  /** Whether to use a compact padding. */
  compact?: boolean;
}

const alignMap: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
  bordered = true,
  align = 'right',
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'tf-modal-footer',
        'flex items-center gap-2',
        bordered && 'border-t border-steel-700',
        compact ? 'px-5 py-3' : 'px-5 py-4',
        alignMap[align],
        className
      )}
      data-testid="modal-footer"
    >
      {children}
    </div>
  );
};

export default ModalFooter;
