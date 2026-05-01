import React from 'react';
import { cn } from '@/utils/cn';

/**
 * DrawerFooter — action bar at the bottom of a drawer panel.
 * Provides a bordered region for primary/secondary actions.
 *
 * @example
 * ```tsx
 * <DrawerFooter>
 *   <Button variant="secondary" onClick={onCancel}>Cancel</Button>
 *   <Button variant="primary" onClick={onSave}>Save</Button>
 * </DrawerFooter>
 * ```
 */
export interface DrawerFooterProps {
  /** Action buttons or footer content. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to show a top border separator. */
  bordered?: boolean;
  /** Content alignment. */
  align?: 'left' | 'center' | 'right';
  /** Whether to use compact padding. */
  compact?: boolean;
}

const alignMap: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  children,
  className,
  bordered = true,
  align = 'right',
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'tf-drawer-footer',
        'flex items-center gap-2',
        bordered && 'border-t border-steel-700',
        compact ? 'px-4 py-3' : 'px-5 py-4',
        alignMap[align],
        className
      )}
      data-testid="drawer-footer"
    >
      {children}
    </div>
  );
};

export default DrawerFooter;
