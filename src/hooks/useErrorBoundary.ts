import { useState, useCallback } from 'react';

/**
 * Hook companion to ErrorBoundary for functional components.
 * Allows programmatic triggering of an error boundary fallback
 * without throwing an unhandled promise rejection.
 *
 * @example
 * const { error, triggerError, clearError } = useErrorBoundary();
 * if (error) throw error; // caught by nearest ErrorBoundary
 */
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const triggerError = useCallback((message: string | Error) => {
    if (message instanceof Error) {
      setError(message);
    } else {
      setError(new Error(message));
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, triggerError, clearError };
}
