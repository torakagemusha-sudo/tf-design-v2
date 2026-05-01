import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

/**
 * Portal — renders child elements into a DOM node outside the normal
 * React component tree. Uses document.body by default.
 *
 * @example
 * ```tsx
 * <Portal>
 *   <ModalOverlay />
 * </Portal>
 * ```
 */
export interface PortalProps {
  /** Elements to portal. */
  children: React.ReactNode;
  /** Target DOM element to portal into. Defaults to document.body. */
  container?: HTMLElement | null;
  /** Additional class names for the portal wrapper. */
  className?: string;
}

export const Portal: React.FC<PortalProps> = ({
  children,
  container,
  className,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const target = container ?? document.body;

  return createPortal(
    <div className={cn('tf-portal', className)} data-testid="portal">
      {children}
    </div>,
    target
  );
};

export default Portal;
