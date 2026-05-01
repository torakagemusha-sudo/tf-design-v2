import React from 'react';
import { cn } from '@/utils/cn';

/**
 * PopoverBody — content area of a popover panel.
 * Provides consistent padding and text styling.
 *
 * @example
 * ```tsx
 * <PopoverBody>
 *   <p>Configure the settings below.</p>
 * </PopoverBody>
 * ```
 */
export interface PopoverBodyProps {
  /** Content inside the popover body. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to use compact padding. */
  compact?: boolean;
}

export const PopoverBody: React.FC<PopoverBodyProps> = ({
  children,
  className,
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'tf-popover-body',
        'text-sm text-steel-200',
        compact ? 'px-3 py-2' : 'px-3 py-3',
        className
      )}
      data-testid="popover-body"
    >
      {children}
    </div>
  );
};

export default PopoverBody;
