import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * TooltipContent — the floating label content of a tooltip.
 * Renders the tooltip text with panel-steel surface styling.
 *
 * @example
 * ```tsx
 * <TooltipContent>Delete this configuration</TooltipContent>
 * ```
 */
export interface TooltipContentProps {
  /** Tooltip text content. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether the tooltip is visible. */
  isOpen?: boolean;
  /** Max width constraint. */
  maxWidth?: number;
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, className, isOpen = true, maxWidth = 240 }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        role="tooltip"
        className={cn(
          'tf-tooltip-content',
          'rounded px-2.5 py-1.5 text-xs font-medium text-white',
          'bg-steel-800 border border-steel-600 shadow-lg',
          'pointer-events-none',
          className
        )}
        style={{ maxWidth }}
        data-testid="tooltip-content"
      >
        {children}
      </div>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
