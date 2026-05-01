import { useState, useCallback, type ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface AsyncErrorBoundaryProps {
  children: (retry: () => void) => ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

export default function AsyncErrorBoundary({ children, fallback }: AsyncErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);
  const [key, setKey] = useState(0);

  const retry = useCallback(() => {
    setError(null);
    setKey((k) => k + 1);
  }, []);

  const handleError = useCallback((err: Error) => {
    setError(err);
  }, []);

  if (error) {
    if (fallback) return <>{fallback(error, retry)}</>;
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 rounded" style={{ background: 'var(--tf-red-glow)', border: '1px solid var(--tf-red)', color: 'var(--tf-white)' }}>
        <AlertTriangle className="w-6 h-6" style={{ color: 'var(--tf-red)' }} />
        <div className="text-sm font-medium">Load Failed</div>
        <div className="text-xs" style={{ color: 'var(--tf-text-muted)' }}>{error.message}</div>
        <button onClick={retry} className="tf-button tf-button--neutral" style={{ fontSize: '11px' }}>
          <RefreshCcw className="w-3 h-3 inline mr-1" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div key={key}>
      <ErrorCatcher onError={handleError}>
        {children(retry)}
      </ErrorCatcher>
    </div>
  );
}

function ErrorCatcher({ children, onError }: { children: ReactNode; onError: (err: Error) => void }) {
  try {
    return <>{children}</>;
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)));
    return null;
  }
}
