import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * DrawerBody — scrollable content region of a drawer panel.
 * Provides flex-1 to fill available space and handles overflow.
 *
 * @example
 * ```tsx
 * <DrawerBody>
 *   <form>...</form>
 * </DrawerBody>
 * ```
 */
export interface DrawerBodyProps {
  /** Content rendered inside the drawer body. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether the body should scroll on overflow. */
  scrollable?: boolean;
  /** Padding variant. */
  padding?: 'none' | 'normal' | 'spacious';
}

const paddingMap: Record<string, string> = {
  none: '',
  normal: 'px-5 py-4',
  spacious: 'px-5 py-6',
};

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, scrollable = true, padding = 'normal' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'tf-drawer-body',
          'flex-1 text-sm text-steel-200',
          scrollable && 'overflow-y-auto',
          paddingMap[padding],
          className
        )}
        data-testid="drawer-body"
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

export default DrawerBody;
