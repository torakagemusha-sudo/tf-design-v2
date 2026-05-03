import { useEffect, type RefObject } from 'react';

/**
 * Invoke `handler` when a pointer event occurs outside `ref`'s DOM subtree.
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) {
        return;
      }
      const target = event.target as Node | null;
      if (target && !el.contains(target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [ref, handler, enabled]);
}
