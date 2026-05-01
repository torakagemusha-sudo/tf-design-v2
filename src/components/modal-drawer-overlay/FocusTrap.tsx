import React, { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * FocusTrap — traps keyboard focus within a container element.
 * Used inside modals and drawers for accessibility compliance.
 *
 * @example
 * ```tsx
 * <FocusTrap isActive={modalOpen}>
 *   <ModalContent />
 * </FocusTrap>
 * ```
 */
export interface FocusTrapProps {
  /** Whether focus trapping is active. */
  isActive: boolean;
  /** Child elements to wrap. */
  children: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Whether to auto-focus first focusable element on activation. */
  autoFocus?: boolean;
  /** Callback when Escape is pressed. */
  onEscape?: () => void;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  isActive,
  children,
  className,
  autoFocus = true,
  onEscape,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;

      if (autoFocus && containerRef.current) {
        const focusable = getFocusableElements(containerRef.current);
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onEscape) {
          onEscape();
          return;
        }
        if (e.key === 'Tab' && containerRef.current) {
          const focusable = getFocusableElements(containerRef.current);
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        previouslyFocusedRef.current?.focus();
      };
    }
  }, [isActive, autoFocus, onEscape]);

  return (
    <div
      ref={containerRef}
      className={cn('tf-focus-trap', className)}
      data-active={isActive}
      data-testid="focus-trap"
    >
      {children}
    </div>
  );
};

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]',
  ].join(', ');

  return Array.from(container.querySelectorAll(selector)).filter(
    (el): el is HTMLElement => {
      const htmlEl = el as HTMLElement;
      return htmlEl.offsetParent !== null;
    }
  );
}

export default FocusTrap;
