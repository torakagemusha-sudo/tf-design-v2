import { useRef, useCallback } from 'react';

/**
 * Debounce hook for action buttons and inputs.
 * @param fn Function to debounce
 * @param delay Delay in ms
 * @returns Debounced function
 */
export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  );

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  return { debounced, cancel };
}

/**
 * Throttle hook for high-frequency events.
 * @param fn Function to throttle
 * @param limit Limit in ms
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => void>(fn: T, limit = 300) {
  const inThrottle = useRef(false);

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle.current) {
        fn(...args);
        inThrottle.current = true;
        setTimeout(() => {
          inThrottle.current = false;
        }, limit);
      }
    },
    [fn, limit]
  );

  return throttled;
}
