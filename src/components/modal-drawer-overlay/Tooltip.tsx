import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

/**
 * Tooltip — a small floating label that appears on hover.
 * Provides supplementary information about a UI element.
 *
 * @example
 * ```tsx
 * <Tooltip content="Delete this item" placement="top">
 *   <button><TrashIcon /></button>
 * </Tooltip>
 * ```
 */
export interface TooltipProps {
  /** Tooltip text content. */
  content: React.ReactNode;
  /** Element that triggers the tooltip on hover/focus. */
  children: React.ReactNode;
  /** Placement relative to the trigger. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms). */
  delay?: number;
  /** Delay before hiding (ms). */
  hideDelay?: number;
  /** Additional class names for the tooltip. */
  className?: string;
  /** Whether the tooltip is disabled. */
  disabled?: boolean;
  /** Max width of the tooltip. */
  maxWidth?: number;
  /** Offset from the trigger element. */
  offset?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 200,
  hideDelay = 100,
  className,
  disabled = false,
  maxWidth = 240,
  offset = 6,
}) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const showTimer = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;
    const tRect = trigger.getBoundingClientRect();
    const ttRect = tooltip.getBoundingClientRect();
    const positions: Record<string, { top: number; left: number }> = {
      top: { top: tRect.top - ttRect.height - offset, left: tRect.left + tRect.width / 2 - ttRect.width / 2 },
      bottom: { top: tRect.bottom + offset, left: tRect.left + tRect.width / 2 - ttRect.width / 2 },
      left: { top: tRect.top + tRect.height / 2 - ttRect.height / 2, left: tRect.left - ttRect.width - offset },
      right: { top: tRect.top + tRect.height / 2 - ttRect.height / 2, left: tRect.right + offset },
    };
    setPosition(positions[placement]);
  }, [placement, offset]);

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(updatePosition);
    }, delay);
  }, [delay, updatePosition]);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), hideDelay);
  }, [hideDelay]);

  useEffect(() => {
    if (visible) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [visible, updatePosition]);

  useEffect(() => {
    return () => {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  if (disabled) return <>{children}</>;

  const tooltipEl = visible ? (
    <div
      ref={tooltipRef}
      role="tooltip"
      className={cn(
        'tf-tooltip',
        'fixed z-tooltip pointer-events-none',
        'rounded px-2.5 py-1.5 text-xs font-medium text-white',
        'bg-steel-800 border border-steel-600 shadow-lg',
        'animate-in fade-in duration-150',
        className
      )}
      style={{ top: position.top, left: position.left, maxWidth }}
      data-testid="tooltip"
      data-placement={placement}
    >
      {content}
      <TooltipArrow placement={placement} />
    </div>
  ) : null;

  return (
    <>
      <span
        ref={triggerRef}
        className="tf-tooltip-trigger inline-block"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        data-testid="tooltip-trigger"
      >
        {children}
      </span>
      {tooltipEl && createPortal(tooltipEl, document.body)}
    </>
  );
};

// Inline arrow component to avoid circular dependency
const TooltipArrow: React.FC<{ placement: string }> = ({ placement }) => {
  const arrowClasses: Record<string, string> = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-steel-800 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-steel-800 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-steel-800 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-steel-800 border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <span
      className={cn(
        'tf-tooltip-arrow absolute w-0 h-0 border-4',
        arrowClasses[placement]
      )}
      aria-hidden="true"
    />
  );
};

export default Tooltip;
