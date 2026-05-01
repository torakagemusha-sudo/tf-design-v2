import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * TooltipTrigger — wraps the element that triggers a tooltip.
 * Provides event forwarding and accessibility attributes.
 *
 * @example
 * ```tsx
 * <TooltipTrigger>
 *   <Button>Hover me</Button>
 * </TooltipTrigger>
 * ```
 */
export interface TooltipTriggerProps {
  /** Trigger element(s). */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to merge props onto child element. */
  asChild?: boolean;
}

export const TooltipTrigger = forwardRef<HTMLSpanElement, TooltipTriggerProps>(
  ({ children, className, asChild = false }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn((children as React.ReactElement).props.className, className),
      });
    }

    return (
      <span ref={ref} className={cn('tf-tooltip-trigger inline-block', className)} data-testid="tooltip-trigger">
        {children}
      </span>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

export default TooltipTrigger;
