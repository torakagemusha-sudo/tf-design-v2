import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * HoverCardContent — the content panel of a hover card.
 * Renders with panel-steel surface and shadow.
 *
 * @example
 * ```tsx
 * <HoverCardContent>
 *   <h4 className="text-sm font-semibold">User Details</h4>
 *   <p className="text-xs text-steel-400">ID: user-123</p>
 * </HoverCardContent>
 * ```
 */
export interface HoverCardContentProps {
  /** Content inside the hover card. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Max width constraint. */
  maxWidth?: number;
}

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ children, className, maxWidth = 320 }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'tf-hover-card-content',
          'rounded-lg border border-steel-700 bg-steel-800 shadow-xl p-4',
          'text-sm text-steel-200',
          className
        )}
        style={{ maxWidth }}
        data-testid="hover-card-content"
      >
        {children}
      </div>
    );
  }
);

HoverCardContent.displayName = 'HoverCardContent';

export default HoverCardContent;
