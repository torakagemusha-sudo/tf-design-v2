import { Component, type ReactNode } from 'react';
import { Activity, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
    // Log to global state table for debugging
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-8" style={{ minHeight: '50vh', color: 'var(--tf-white)' }}>
          <Activity className="w-8 h-8" style={{ color: 'var(--tf-red)' }} />
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Component Error</h2>
          <p className="text-xs text-center" style={{ color: 'var(--tf-text-muted)', maxWidth: 400 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="tf-button tf-button--run"
            style={{ fontSize: '13px' }}
          >
            <RefreshCcw className="w-4 h-4 inline mr-2" />
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
