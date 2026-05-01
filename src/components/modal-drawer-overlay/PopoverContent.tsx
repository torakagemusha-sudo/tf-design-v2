import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * PopoverContent — the floating panel that contains popover content.
 * Renders with panel-steel surface and shadow.
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <PopoverHeader>Title</PopoverHeader>
 *   <PopoverBody>Body content</PopoverBody>
 * </PopoverContent>
 * ```
 */
export interface PopoverContentProps {
  /** Content inside the popover panel. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether the popover is open. */
  isOpen?: boolean;
  /** Width constraint. */
  width?: number | string;
  /** Max height with overflow scroll. */
  maxHeight?: number | string;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, isOpen = true, width, maxHeight }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'tf-popover-content',
          'rounded-md border border-steel-700 bg-steel-900 shadow-xl overflow-hidden',
          'py-1',
          className
        )}
        style={{ width, maxHeight }}
        data-testid="popover-content"
      >
        {children}
      </div>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
