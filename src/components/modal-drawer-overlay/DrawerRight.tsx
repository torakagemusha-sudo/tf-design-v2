import React from 'react';
import { cn } from '@/utils/cn';
import { Drawer, DrawerProps } from './Drawer';

/**
 * DrawerRight — convenience wrapper for right-side drawer panels.
 * Pre-configures placement to 'right' with sensible defaults.
 *
 * @example
 * ```tsx
 * <DrawerRight isOpen={open} onClose={close} width={480}>
 *   <DrawerHeader title="Details" onClose={close} />
 *   <DrawerBody>Detail content</DrawerBody>
 * </DrawerRight>
 * ```
 */
export interface DrawerRightProps extends Omit<DrawerProps, 'placement'> {}

export const DrawerRight: React.FC<DrawerRightProps> = ({
  width = 420,
  className,
  children,
  ...props
}) => {
  return (
    <Drawer
      {...props}
      placement="right"
      width={width}
      className={cn('tf-drawer-right', className)}
    >
      {children}
    </Drawer>
  );
};

export default DrawerRight;
