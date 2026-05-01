import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

/**
 * Toast position on screen.
 */
export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

/**
 * ToastContainer — manages a stack of toast notifications positioned
 * at a corner or edge of the screen. Uses a React portal for overlay rendering.
 *
 * @example
 * ```tsx
 * <ToastContainer position="top-right">
 *   {toasts.map(t => <ToastItem key={t.id} {...t} />)}
 * </ToastContainer>
 * ```
 */
export interface ToastContainerProps {
  /** Toast elements to render in the stack. */
  children: React.ReactNode;
  /** Screen position of the toast stack. */
  position?: ToastPosition;
  /** Gap between stacked toasts. */
  gap?: number;
  /** Additional class names. */
  className?: string;
  /** Whether to render in a portal. */
  usePortal?: boolean;
  /** Z-index for the container. */
  zIndex?: number;
}

const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4 items-start',
  'top-right': 'top-4 right-4 items-end',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position = 'top-right',
  gap = 8,
  className,
  usePortal = true,
  zIndex = 100,
}) => {
  const container = (
    <div
      className={cn(
        'tf-toast-container',
        'fixed flex flex-col',
        positionClasses[position],
        className
      )}
      style={{ zIndex, gap }}
      data-testid="toast-container"
      data-position={position}
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </div>
  );

  if (usePortal) {
    return createPortal(container, document.body);
  }

  return container;
};

export default ToastContainer;
