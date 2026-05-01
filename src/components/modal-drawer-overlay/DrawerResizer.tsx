import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

/**
 * DrawerResizer — allows users to resize a drawer panel by dragging.
 * Attaches to the edge of the drawer opposite the placement side.
 *
 * @example
 * ```tsx
 * <DrawerResizer placement="right" minWidth={320} maxWidth={800} />
 * ```
 */
export interface DrawerResizerProps {
  /** Drawer placement — determines which edge gets the handle. */
  placement?: 'left' | 'right';
  /** Minimum width in pixels. */
  minWidth?: number;
  /** Maximum width in pixels. */
  maxWidth?: number;
  /** Additional class names. */
  className?: string;
  /** Callback when width changes during resize. */
  onResize?: (width: number) => void;
}

export const DrawerResizer: React.FC<DrawerResizerProps> = ({
  placement = 'right',
  minWidth = 280,
  maxWidth = 900,
  className,
  onResize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const drawerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.clientX;
      const drawer = (e.target as HTMLElement).closest('[data-testid="drawer"]') as HTMLElement;
      drawerRef.current = drawer;
      startWidthRef.current = drawer?.offsetWidth ?? 420;
    },
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !drawerRef.current) return;
      const delta = placement === 'right'
        ? startWidthRef.current + (e.clientX - startXRef.current)
        : startWidthRef.current - (e.clientX - startXRef.current);
      const clamped = Math.max(minWidth, Math.min(maxWidth, delta));
      drawerRef.current.style.width = `${clamped}px`;
      onResize?.(clamped);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      drawerRef.current = null;
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, placement, minWidth, maxWidth, onResize]);

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize drawer"
      onMouseDown={handleMouseDown}
      className={cn(
        'tf-drawer-resizer',
        'absolute top-0 bottom-0 w-1.5 cursor-col-resize',
        'hover:bg-amber-500/30 active:bg-amber-500/50',
        'transition-colors duration-150',
        placement === 'right' ? 'left-0 -translate-x-full' : 'right-0 translate-x-full',
        isDragging && 'bg-amber-500/40',
        className
      )}
      data-testid="drawer-resizer"
    />
  );
};

export default DrawerResizer;
