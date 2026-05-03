import { useEffect } from 'react';

/**
 * Prevent background scrolling while a modal or overlay is open.
 */
export function useScrollLock(locked: boolean = true): void {
  useEffect(() => {
    if (!locked) {
      return;
    }
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previous;
    };
  }, [locked]);
}
