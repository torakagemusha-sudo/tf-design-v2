import React from 'react';
import { cn } from '@/utils/cn';
import { Drawer, DrawerProps } from './Drawer';

/**
 * DrawerTop — convenience wrapper for top-edge drawer panels.
 * Pre-configures placement to 'top' with sensible defaults.
 *
 * @example
 * ```tsx
 * <DrawerTop isOpen={open} onClose={close} height={200}>
 *   <DrawerHeader title="Notification Bar" onClose={close} />
 *   <DrawerBody>Alert content</DrawerBody>
 * </DrawerTop>
 * ```
 */
export interface DrawerTopProps extends Omit<DrawerProps, 'placement' | 'width'> {}

export const DrawerTop: React.FC<DrawerTopProps> = ({
  height = 240,
  className,
  children,
  ...props
}) => {
  return (
    <Drawer
      {...props}
      placement="top"
      height={height}
      className={cn('tf-drawer-top', className)}
    >
      {children}
    </Drawer>
  );
};

export default DrawerTop;
