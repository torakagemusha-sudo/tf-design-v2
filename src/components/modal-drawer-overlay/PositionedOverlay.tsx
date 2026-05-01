import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

/**
 * PositionedOverlay — a generic floating overlay positioned relative
 * to a target element or coordinates. Supports placement and offset.
 *
 * @example
 * ```tsx
 * <PositionedOverlay
 *   isOpen={open}
 *   targetRef={buttonRef}
 *   placement="bottom-start"
 * >
 *   <DropdownMenu />
 * </PositionedOverlay>
 * ```
 */
export interface PositionedOverlayProps {
  /** Whether the overlay is visible. */
  isOpen: boolean;
  /** Target element ref to position against. */
  targetRef?: React.RefObject<HTMLElement | null>;
  /** Explicit coordinates if no target ref. */
  coordinates?: { x: number; y: number };
  /** Placement relative to target. */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right';
  /** Offset in pixels from the target. */
  offset?: number;
  /** Child content rendered in the overlay. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Z-index override. */
  zIndex?: number;
  /** Whether to close when clicking outside. */
  closeOnOutsideClick?: boolean;
  /** Callback when outside click occurs. */
  onClose?: () => void;
  /** Whether to use a portal. */
  usePortal?: boolean;
}

export const PositionedOverlay: React.FC<PositionedOverlayProps> = ({
  isOpen,
  targetRef,
  coordinates,
  placement = 'bottom-start',
  offset = 4,
  children,
  className,
  zIndex = 50,
  closeOnOutsideClick,
  onClose,
  usePortal = true,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    let targetRect: DOMRect | undefined;

    if (targetRef?.current) {
      targetRect = targetRef.current.getBoundingClientRect();
    } else if (coordinates) {
      targetRect = new DOMRect(coordinates.x, coordinates.y, 0, 0);
    }

    if (!targetRect) return;

    const placements: Record<string, { top: number; left: number }> = {
      top: { top: targetRect.top - offset, left: targetRect.left + targetRect.width / 2 },
      'top-start': { top: targetRect.top - offset, left: targetRect.left },
      'top-end': { top: targetRect.top - offset, left: targetRect.right },
      bottom: { top: targetRect.bottom + offset, left: targetRect.left + targetRect.width / 2 },
      'bottom-start': { top: targetRect.bottom + offset, left: targetRect.left },
      'bottom-end': { top: targetRect.bottom + offset, left: targetRect.right },
      left: { top: targetRect.top + targetRect.height / 2, left: targetRect.left - offset },
      right: { top: targetRect.top + targetRect.height / 2, left: targetRect.right + offset },
    };

    setPosition(placements[placement] ?? placements['bottom-start']);
  }, [targetRef, coordinates, placement, offset]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!closeOnOutsideClick || !onClose || !isOpen) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        overlayRef.current &&
        !overlayRef.current.contains(target) &&
        (!targetRef?.current || !targetRef.current.contains(target))
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeOnOutsideClick, onClose, isOpen, targetRef]);

  if (!isOpen) return null;

  const translateX = placement.includes('end')
    ? '-100%'
    : placement === 'bottom' || placement === 'top'
    ? '-50%'
    : '0';
  const translateY = placement.startsWith('bottom')
    ? '0'
    : placement.startsWith('top')
    ? '-100%'
    : placement === 'left' || placement === 'right'
    ? '-50%'
    : '0';

  const overlay = (
    <div
      ref={overlayRef}
      className={cn(
        'tf-positioned-overlay fixed',
        'transition-opacity duration-150',
        className
      )}
      style={{
        zIndex,
        top: position.top,
        left: position.left,
        transform: `translate(${translateX}, ${translateY})`,
      }}
      data-testid="positioned-overlay"
      data-placement={placement}
    >
      {children}
    </div>
  );

  if (usePortal) {
    return createPortal(overlay, document.body);
  }

  return overlay;
};

export default PositionedOverlay;
