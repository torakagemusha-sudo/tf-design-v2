import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';

/**
 * ScrollLock — prevents scrolling on the document body when active.
 * Used when modals, drawers, or overlays are open.
 *
 * @example
 * ```tsx
 * <ScrollLock isLocked={modalOpen}>
 *   <ModalContent />
 * </ScrollLock>
 * ```
 */
export interface ScrollLockProps {
  /** Whether to lock scrolling on the body. */
  isLocked: boolean;
  /** Child elements. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to preserve the scroll bar gutter (prevents layout shift). */
  preserveScrollbar?: boolean;
}

export const ScrollLock: React.FC<ScrollLockProps> = ({
  isLocked,
  children,
  className,
  preserveScrollbar = true,
}) => {
  useEffect(() => {
    if (!isLocked) return;

    const body = document.body;
    const html = document.documentElement;
    const originalOverflow = body.style.overflow;
    const originalHtmlOverflow = html.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    const scrollbarWidth = preserveScrollbar
      ? window.innerWidth - html.clientWidth
      : 0;

    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = originalOverflow;
      html.style.overflow = originalHtmlOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked, preserveScrollbar]);

  return (
    <div
      className={cn('tf-scroll-lock', className)}
      data-locked={isLocked}
      data-testid="scroll-lock"
    >
      {children}
    </div>
  );
};

export default ScrollLock;
