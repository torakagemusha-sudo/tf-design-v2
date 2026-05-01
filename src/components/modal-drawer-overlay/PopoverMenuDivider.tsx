import React from 'react';
import { cn } from '@/utils/cn';

/**
 * PopoverMenuDivider — a horizontal separator line between menu items.
 *
 * @example
 * ```tsx
 * <PopoverMenuItem label="Edit" />
 * <PopoverMenuDivider />
 * <PopoverMenuItem label="Delete" danger />
 * ```
 */
export interface PopoverMenuDividerProps {
  /** Additional class names. */
  className?: string;
  /** Optional spacing override. */
  spacing?: 'tight' | 'normal' | 'loose';
}

const spacingMap: Record<string, string> = {
  tight: 'my-0.5',
  normal: 'my-1',
  loose: 'my-2',
};

export const PopoverMenuDivider: React.FC<PopoverMenuDividerProps> = ({
  className,
  spacing = 'normal',
}) => {
  return (
    <div
      className={cn(
        'tf-popover-menu-divider border-t border-steel-700/60',
        spacingMap[spacing],
        className
      )}
      role="separator"
      data-testid="popover-menu-divider"
    />
  );
};

export default PopoverMenuDivider;
