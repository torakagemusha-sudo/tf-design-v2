import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

/**
 * HoverCard — a card that appears when hovering over a trigger element.
 * Useful for previewing content without clicking.
 *
 * @example
 * ```tsx
 * <HoverCard placement="top" delay={300}>
 *   <HoverCardTrigger>
 *     <span>Hover me</span>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <h4>Preview</h4>
 *     <p>Details about this item...</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
export interface HoverCardProps {
  /** Trigger element wrapper. */
  children: React.ReactNode;
  /** Card content shown on hover. */
  content: React.ReactNode;
  /** Placement relative to trigger. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms). */
  delay?: number;
  /** Delay before hiding (ms). */
  hideDelay?: number;
  /** Additional class names for the card. */
  className?: string;
  /** Whether the hover card is disabled. */
  disabled?: boolean;
  /** Max width of the card. */
  maxWidth?: number;
  /** Offset from the trigger. */
  offset?: number;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  content,
  placement = 'top',
  delay = 300,
  hideDelay = 200,
  className,
  disabled = false,
  maxWidth = 320,
  offset = 8,
}) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const showTimer = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const card = cardRef.current;
    if (!trigger || !card) return;
    const tRect = trigger.getBoundingClientRect();
    const cRect = card.getBoundingClientRect();
    const positions: Record<string, { top: number; left: number }> = {
      top: { top: tRect.top - cRect.height - offset, left: tRect.left + tRect.width / 2 - cRect.width / 2 },
      bottom: { top: tRect.bottom + offset, left: tRect.left + tRect.width / 2 - cRect.width / 2 },
      left: { top: tRect.top + tRect.height / 2 - cRect.height / 2, left: tRect.left - cRect.width - offset },
      right: { top: tRect.top + tRect.height / 2 - cRect.height / 2, left: tRect.right + offset },
    };
    const pos = positions[placement];
    // Clamp to viewport
    setPosition({
      top: Math.max(8, Math.min(pos.top, window.innerHeight - cRect.height - 8)),
      left: Math.max(8, Math.min(pos.left, window.innerWidth - cRect.width - 8)),
    });
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

  const card = visible ? (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        clearTimeout(hideTimer.current);
        setVisible(true);
      }}
      onMouseLeave={hide}
      className={cn(
        'tf-hover-card fixed z-tooltip',
        'rounded-lg border border-steel-700 bg-steel-800 shadow-xl p-4',
        'animate-in fade-in zoom-in-95 duration-150',
        className
      )}
      style={{ top: position.top, left: position.left, maxWidth, width: maxWidth }}
      data-testid="hover-card"
    >
      {content}
    </div>
  ) : null;

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        className="tf-hover-card-trigger inline-block"
        data-testid="hover-card-trigger"
      >
        {children}
      </span>
      {card && createPortal(card, document.body)}
    </>
  );
};

export default HoverCard;
