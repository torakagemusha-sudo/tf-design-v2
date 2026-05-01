import React from 'react';
import { cn } from '@/utils/cn';
import { Drawer, DrawerProps } from './Drawer';

/**
 * DrawerBottom — convenience wrapper for bottom-edge drawer panels.
 * Pre-configures placement to 'bottom' with sensible defaults.
 *
 * @example
 * ```tsx
 * <DrawerBottom isOpen={open} onClose={close} height={400}>
 *   <DrawerHeader title="Terminal" onClose={close} />
 *   <DrawerBody>Console output</DrawerBody>
 * </DrawerBottom>
 * ```
 */
export interface DrawerBottomProps extends Omit<DrawerProps, 'placement' | 'width'> {}

export const DrawerBottom: React.FC<DrawerBottomProps> = ({
  height = 360,
  className,
  children,
  ...props
}) => {
  return (
    <Drawer
      {...props}
      placement="bottom"
      height={height}
      className={cn('tf-drawer-bottom', className)}
    >
      {children}
    </Drawer>
  );
};

export default DrawerBottom;
