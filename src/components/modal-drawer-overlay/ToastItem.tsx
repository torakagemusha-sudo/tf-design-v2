import React from 'react';
import { cn } from '@/utils/cn';
import { Toast, ToastProps } from './Toast';

/**
 * ToastItem — a single toast entry within a ToastContainer stack.
 * Wraps the Toast component with list-item semantics.
 *
 * @example
 * ```tsx
 * <ToastItem id="toast-1" type="success" message="Done!" onClose={remove} />
 * ```
 */
export interface ToastItemProps extends ToastProps {
  /** Unique identifier for the toast item. */
  id: string;
}

export const ToastItem: React.FC<ToastItemProps> = ({ id, className, ...toastProps }) => {
  return (
    <div
      className={cn('tf-toast-item', className)}
      data-testid="toast-item"
      data-toast-id={id}
    >
      <Toast {...toastProps} />
    </div>
  );
};

export default ToastItem;
