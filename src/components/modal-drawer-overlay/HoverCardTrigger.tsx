import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * HoverCardTrigger — wraps the element that triggers a hover card.
 *
 * @example
 * ```tsx
 * <HoverCardTrigger>
 *   <span className="cursor-help">Hover for details</span>
 * </HoverCardTrigger>
 * ```
 */
export interface HoverCardTriggerProps {
  /** Trigger element. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to merge props onto child element. */
  asChild?: boolean;
}

export const HoverCardTrigger = forwardRef<HTMLSpanElement, HoverCardTriggerProps>(
  ({ children, className, asChild = false }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn((children as React.ReactElement).props.className, className),
      });
    }

    return (
      <span
        ref={ref}
        className={cn('tf-hover-card-trigger inline-block', className)}
        data-testid="hover-card-trigger"
      >
        {children}
      </span>
    );
  }
);

HoverCardTrigger.displayName = 'HoverCardTrigger';

export default HoverCardTrigger;
