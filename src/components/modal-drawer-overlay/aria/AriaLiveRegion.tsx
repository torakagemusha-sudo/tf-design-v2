import { useEffect, useRef } from 'react';

/**
 * Global aria-live region for screen-reader announcements.
 *
 * Other components can dispatch a custom `announce` event on
 * `window` with `{ detail: { message: string } }` to queue
 * a polite announcement.
 */
export default function AriaLiveRegion() {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ message: string }>;
      const message = custom.detail?.message;
      if (regionRef.current && message) {
        regionRef.current.textContent = message;
        // Clear after a delay so the same message can be re-announced
        setTimeout(() => {
          if (regionRef.current) regionRef.current.textContent = '';
        }, 1000);
      }
    };
    window.addEventListener('announce', handler);
    return () => window.removeEventListener('announce', handler);
  }, []);

  return (
    <div
      ref={regionRef}
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      style={{
        position: 'absolute',
        left: -10000,
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    />
  );
}

/** Helper to dispatch an accessible announcement. */
export function announce(message: string) {
  window.dispatchEvent(new CustomEvent('announce', { detail: { message } }));
}
