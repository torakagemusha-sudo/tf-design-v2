import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * DrawerContainer — the visual panel that wraps drawer content.
 * Defines the steel surface, border, shadow, and flex layout for drawers.
 *
 * @example
 * ```tsx
 * <DrawerContainer placement="right" width={480}>
 *   <DrawerHeader title="Panel" />
 *   <DrawerBody>Content</DrawerBody>
 * </DrawerContainer>
 * ```
 */
export interface DrawerContainerProps {
  /** Edge the drawer originates from. */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer width for horizontal placements. */
  width?: number | string;
  /** Drawer height for vertical placements. */
  height?: number | string;
  /** Whether the container is currently visible (controls transform). */
  isOpen?: boolean;
  /** Additional class names. */
  className?: string;
  /** Child elements. */
  children: React.ReactNode;
}

const placementClasses: Record<string, string> = {
  left: 'left-0 top-0 bottom-0 h-full border-r',
  right: 'right-0 top-0 bottom-0 h-full border-l',
  top: 'top-0 left-0 right-0 w-full border-b',
  bottom: 'bottom-0 left-0 right-0 w-full border-t',
};

const transformMap: Record<string, { open: string; closed: string }> = {
  left: { open: 'translate-x-0', closed: '-translate-x-full' },
  right: { open: 'translate-x-0', closed: 'translate-x-full' },
  top: { open: 'translate-y-0', closed: '-translate-y-full' },
  bottom: { open: 'translate-y-0', closed: 'translate-y-full' },
};

export const DrawerContainer = forwardRef<HTMLDivElement, DrawerContainerProps>(
  (
    { placement = 'right', width = 420, height = 360, isOpen = true, className, children },
    ref
  ) => {
    const isHorizontal = placement === 'left' || placement === 'right';
    const t = transformMap[placement];

    return (
      <div
        ref={ref}
        className={cn(
          'tf-drawer-container',
          'fixed bg-steel-900 shadow-2xl flex flex-col border-steel-700',
          placementClasses[placement],
          isOpen ? t.open : t.closed,
          'transition-transform duration-300 ease-out',
          className
        )}
        style={isHorizontal ? { width } : { height }}
        data-testid="drawer-container"
      >
        {children}
      </div>
    );
  }
);

DrawerContainer.displayName = 'DrawerContainer';

export default DrawerContainer;
