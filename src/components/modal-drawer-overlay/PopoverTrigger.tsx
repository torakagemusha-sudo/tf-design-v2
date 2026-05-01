import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * PopoverTrigger — wraps the element that opens a popover.
 * Provides the trigger reference and click handling.
 *
 * @example
 * ```tsx
 * <PopoverTrigger asChild>
 *   <Button>Open Menu</Button>
 * </PopoverTrigger>
 * ```
 */
export interface PopoverTriggerProps {
  /** Trigger element(s). */
  children: React.ReactNode;
  /** Whether to merge props onto the child element. */
  asChild?: boolean;
  /** Callback when trigger is clicked. */
  onClick?: () => void;
  /** Additional class names. */
  className?: string;
  /** Whether the popover is currently open (for aria). */
  isOpen?: boolean;
}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild = false, onClick, className, isOpen }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: () => {
          onClick?.();
          (children as React.ReactElement).props.onClick?.();
        },
        'aria-expanded': isOpen,
        'aria-haspopup': true,
        className: cn((children as React.ReactElement).props.className, className),
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn('tf-popover-trigger', className)}
        data-testid="popover-trigger"
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
