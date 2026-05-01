import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useScrollLock } from '@/hooks/useScrollLock';

/**
 * Drawer — a slide-out panel overlay that appears from an edge of the viewport.
 * Supports four placement positions, customizable width/height, and resizable mode.
 *
 * @example
 * ```tsx
 * <Drawer isOpen={open} onClose={close} placement="right" width={480}>
 *   <DrawerHeader title="Settings" onClose={close} />
 *   <DrawerBody>Content</DrawerBody>
 *   <DrawerFooter />
 * </Drawer>
 * ```
 */
export interface DrawerProps {
  /** Whether the drawer is visible. */
  isOpen: boolean;
  /** Callback when the drawer is dismissed. */
  onClose: () => void;
  /** Edge of the screen the drawer slides from. */
  placement?: 'left' | 'right' | 'top' | 'bottom';
  /** Drawer width (for left/right placement). */
  width?: number | string;
  /** Drawer height (for top/bottom placement). */
  height?: number | string;
  /** Whether clicking the overlay closes the drawer. */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes the drawer. */
  closeOnEscape?: boolean;
  /** Additional class names for the drawer panel. */
  className?: string;
  /** Child elements rendered inside the drawer. */
  children: React.ReactNode;
  /** Z-index override. */
  zIndex?: number;
  /** Whether the drawer is resizable. */
  resizable?: boolean;
  /** Optional drawer title for aria. */
  title?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  width = 420,
  height = 360,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  children,
  zIndex,
  resizable = false,
  title = 'Drawer panel',
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useFocusTrap(panelRef, isOpen);
  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(timer);
    } else {
      setEntered(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeOnEscape) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) onClose();
    },
    [closeOnOverlayClick, onClose]
  );

  if (!isOpen) return null;

  const isHorizontal = placement === 'left' || placement === 'right';

  const placementClasses: Record<string, string> = {
    left: 'left-0 top-0 bottom-0 h-full',
    right: 'right-0 top-0 bottom-0 h-full',
    top: 'top-0 left-0 right-0 w-full',
    bottom: 'bottom-0 left-0 right-0 w-full',
  };

  const transformMap: Record<string, string> = {
    left: entered ? 'translate-x-0' : '-translate-x-full',
    right: entered ? 'translate-x-0' : 'translate-x-full',
    top: entered ? 'translate-y-0' : '-translate-y-full',
    bottom: entered ? 'translate-y-0' : 'translate-y-full',
  };

  return (
    <div
      role="presentation"
      onClick={handleOverlayClick}
      className={cn(
        'tf-drawer-overlay fixed inset-0 z-drawer bg-black/70 backdrop-blur-sm',
        'transition-opacity duration-300',
        entered ? 'opacity-100' : 'opacity-0'
      )}
      style={{ zIndex }}
      data-testid="drawer-overlay"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'tf-drawer',
          'fixed bg-steel-900 shadow-2xl flex flex-col',
          'border-steel-700',
          placement === 'left' && 'border-r',
          placement === 'right' && 'border-l',
          placement === 'top' && 'border-b',
          placement === 'bottom' && 'border-t',
          placementClasses[placement],
          'transition-transform duration-300 ease-out',
          transformMap[placement],
          className
        )}
        style={isHorizontal ? { width } : { height }}
        onClick={(e) => e.stopPropagation()}
        data-testid="drawer"
        data-placement={placement}
      >
        {children}
        {resizable && isHorizontal && (
          <DrawerResizer placement={placement} />
        )}
      </div>
    </div>
  );
};

// Import at bottom to avoid circular reference during module init
import { DrawerResizer } from './DrawerResizer';

export default Drawer;
