import React from 'react';
import { cn } from '@/utils/cn';
import { Drawer, DrawerProps } from './Drawer';

/**
 * DrawerLeft — convenience wrapper for left-side drawer panels.
 * Pre-configures placement to 'left' with sensible defaults.
 *
 * @example
 * ```tsx
 * <DrawerLeft isOpen={open} onClose={close} width={360}>
 *   <DrawerHeader title="Navigation" onClose={close} />
 *   <DrawerBody>Menu items</DrawerBody>
 * </DrawerLeft>
 * ```
 */
export interface DrawerLeftProps extends Omit<DrawerProps, 'placement'> {}

export const DrawerLeft: React.FC<DrawerLeftProps> = ({
  width = 320,
  className,
  children,
  ...props
}) => {
  return (
    <Drawer
      {...props}
      placement="left"
      width={width}
      className={cn('tf-drawer-left', className)}
    >
      {children}
    </Drawer>
  );
};

export default DrawerLeft;
