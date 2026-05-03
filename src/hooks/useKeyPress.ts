import { useEffect } from 'react';

/**
 * Invoke `handler` when `key` is pressed (keydown).
 */
export function useKeyPress(key: string, handler: () => void): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [key, handler]);
}
