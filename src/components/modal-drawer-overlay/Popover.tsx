import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { useClickOutside } from '@/hooks/useClickOutside';

/**
 * Popover — a floating content panel anchored to a trigger element.
 * Supports multiple placement positions and keyboard dismissal.
 *
 * @example
 * ```tsx
 * <Popover isOpen={open} onClose={close} placement="bottom-start">
 *   <PopoverTrigger>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeader>Options</PopoverHeader>
 *     <PopoverBody>Content here</PopoverBody>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export interface PopoverProps {
  /** Whether the popover is visible. */
  isOpen: boolean;
  /** Callback when popover should close. */
  onClose: () => void;
  /** Trigger element that anchors the popover. */
  children: React.ReactNode;
  /** Placement relative to the trigger. */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right';
  /** Offset in pixels from the trigger. */
  offset?: number;
  /** Whether clicking outside closes the popover. */
  closeOnOutsideClick?: boolean;
  /** Additional class names. */
  className?: string;
  /** Whether to use a portal for rendering. */
  usePortal?: boolean;
  /** Z-index override. */
  zIndex?: number;
  /** Popover content — rendered in the floating panel. */
  content?: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({
  isOpen,
  onClose,
  children,
  placement = 'bottom-start',
  offset = 8,
  closeOnOutsideClick = true,
  className,
  usePortal = true,
  zIndex = 50,
  content,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const placements: Record<string, () => { top: number; left: number }> = {
      'top': () => ({ top: rect.top - offset, left: rect.left + rect.width / 2 }),
      'top-start': () => ({ top: rect.top - offset, left: rect.left }),
      'top-end': () => ({ top: rect.top - offset, left: rect.right }),
      'bottom': () => ({ top: rect.bottom + offset, left: rect.left + rect.width / 2 }),
      'bottom-start': () => ({ top: rect.bottom + offset, left: rect.left }),
      'bottom-end': () => ({ top: rect.bottom + offset, left: rect.right }),
      'left': () => ({ top: rect.top + rect.height / 2, left: rect.left - offset }),
      'right': () => ({ top: rect.top + rect.height / 2, left: rect.right + offset }),
    };
    setPosition(placements[placement]?.() ?? placements['bottom-start']());
  }, [placement, offset]);

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

  useClickOutside(contentRef, onClose, isOpen && closeOnOutsideClick);

  const transformOrigin = placement.startsWith('top')
    ? 'bottom'
    : placement.startsWith('bottom')
    ? 'top'
    : placement === 'left'
    ? 'right'
    : 'left';

  const popoverPanel = isOpen ? (
    <div
      ref={contentRef}
      className={cn(
        'tf-popover',
        'fixed rounded-md border border-steel-700 bg-steel-900 shadow-xl',
        'py-1 min-w-[12rem]',
        'animate-in fade-in zoom-in-95 duration-150',
        className
      )}
      style={{
        zIndex,
        top: position.top,
        left: position.left,
        transform: `translate(${placement.includes('end') ? '-100%' : placement === 'bottom' || placement === 'top' ? '-50%' : '0'}, ${placement.startsWith('bottom') ? '0' : placement.startsWith('top') ? '-100%' : placement === 'left' || placement === 'right' ? '-50%' : '0'})`,
      }}
      data-testid="popover"
      data-placement={placement}
    >
      {content}
    </div>
  ) : null;

  return (
    <>
      <div ref={triggerRef} className="tf-popover-trigger-wrapper inline-block" data-testid="popover-trigger-wrapper">
        {children}
      </div>
      {usePortal && popoverPanel
        ? createPortal(popoverPanel, document.body)
        : popoverPanel}
    </>
  );
};

export default Popover;
