/**
 * @fileoverview ErrorStateLayout — Error/Fault State Layout
 *
 * Comprehensive error display for application fault states. Variants for
 * common error codes (404, 500), auth failures, timeouts, and degraded
 * operation. Provides actionable recovery paths and diagnostic context.
 *
 * ```
 * +----------------------------------------------+
 * |                                               |
 * |   ERROR_CODE                                  |
 * |   Error Title                                 |
 * |                                               |
 * |   Detailed explanation of what went wrong     |
 * |   and what the operator should do next.       |
 * |                                               |
 * |   Diagnostic: trace-id | timestamp | node     |
 * |                                               |
 * |   [ Retry ]  [ Inspect Logs ]  [ Abort ]       |
 * |                                               |
 * +----------------------------------------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type ErrorVariant = '404' | '500' | 'authfailed' | 'timeout' | 'degraded';

export interface ErrorStateLayoutProps extends LayoutBaseProps {
  variant?: ErrorVariant;
  /** Error code display (e.g., "404", "FAULT_001") */
  errorCode?: string;
  /** Error title */
  title?: string;
  /** Detailed error description */
  description?: string;
  /** Diagnostic trace ID */
  traceId?: string;
  /** Timestamp of error */
  timestamp?: string;
  /** Affected node/service */
  node?: string;
  /** Retry callback */
  onRetry?: () => void;
  /** Inspect logs callback */
  onInspectLogs?: () => void;
  /** Abort/return callback */
  onAbort?: () => void;
  /** Custom actions */
  customActions?: React.ReactNode;
}

const ERROR_DEFAULTS: Record<ErrorVariant, { code: string; title: string; description: string; color: string }> = {
  '404': {
    code: '404',
    title: 'RESOURCE NOT FOUND',
    description: 'The requested resource does not exist or has been relocated. Verify the identifier and retry.',
    color: '#4BA3F2',
  },
  '500': {
    code: '500',
    title: 'INTERNAL FAULT',
    description: 'An unhandled exception occurred in the operational node. The system has logged the fault. Retry or inspect logs.',
    color: '#F24B4B',
  },
  authfailed: {
    code: 'AUTH_FAIL',
    title: 'AUTHENTICATION FAILED',
    description: 'Credential verification failed or session has expired. Re-authenticate to continue.',
    color: '#D6A84F',
  },
  timeout: {
    code: 'TIMEOUT',
    title: 'OPERATION TIMED OUT',
    description: 'The operation exceeded its maximum execution window. The system state is unknown. Review status before retrying.',
    color: '#F2B84B',
  },
  degraded: {
    code: 'DEGRADED',
    title: 'DEGRADED OPERATION',
    description: 'The system is operating in degraded mode. Core functions available but performance or accuracy may be reduced.',
    color: '#F07A2A',
  },
};

export const ErrorStateLayout: React.FC<ErrorStateLayoutProps> = ({
  theme: propTheme,
  variant = '500',
  errorCode,
  title,
  description,
  traceId,
  timestamp,
  node,
  onRetry,
  onInspectLogs,
  onAbort,
  customActions,
  className,
  style,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const defaults = ERROR_DEFAULTS[variant];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    textAlign: 'center',
    gap: 16,
    ...style,
  };

  const codeStyle: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
    fontSize: 48,
    fontWeight: 800,
    color: defaults.color,
    letterSpacing: '0.04em',
    lineHeight: 1,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: t.textPrimary,
  };

  const descStyle: React.CSSProperties = {
    fontSize: 13,
    lineHeight: 1.6,
    maxWidth: 480,
    color: t.textMuted,
  };

  const diagnosticStyle: React.CSSProperties = {
    display: 'flex',
    gap: 16,
    padding: '8px 16px',
    background: t.panelBg,
    border: `1px solid ${t.borderColor}`,
    borderRadius: 2,
    fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
    fontSize: 11,
    color: t.textMuted,
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const buttonStyle = (color: string): React.CSSProperties => ({
    padding: '8px 16px',
    background: t.panelBg,
    color,
    border: `1px solid ${color}`,
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
  });

  return (
    <div
      className={`tf-layout tf-error-state tf-error-state--${variant} ${className ?? ''}`}
      data-testid={testId}
      data-layout="error-state"
      data-variant={variant}
      data-theme={theme}
      style={containerStyle}
    >
      <div style={codeStyle} data-element="error-code">
        {errorCode ?? defaults.code}
      </div>
      <div style={titleStyle} data-element="title">
        {title ?? defaults.title}
      </div>
      <div style={descStyle} data-element="description">
        {description ?? defaults.description}
      </div>

      {/* Diagnostics */}
      {(traceId || timestamp || node) && (
        <div style={diagnosticStyle} data-element="diagnostics">
          {traceId && <span>trace: {traceId}</span>}
          {timestamp && <span>ts: {timestamp}</span>}
          {node && <span>node: {node}</span>}
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        data-element="actions"
      >
        {customActions ?? (
          <>
            {onRetry && (
              <button onClick={onRetry} style={buttonStyle(t.successColor)}>
                Retry
              </button>
            )}
            {onInspectLogs && (
              <button onClick={onInspectLogs} style={buttonStyle(t.infoColor)}>
                Inspect Logs
              </button>
            )}
            {onAbort && (
              <button onClick={onAbort} style={buttonStyle(t.warningColor)}>
                Abort
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Variant Exports
export const Error404: React.FC<Omit<ErrorStateLayoutProps, 'variant'>> = (props) => (
  <ErrorStateLayout {...props} variant="404" />
);
Error404.displayName = 'Error404';

export const Error500: React.FC<Omit<ErrorStateLayoutProps, 'variant'>> = (props) => (
  <ErrorStateLayout {...props} variant="500" />
);
Error500.displayName = 'Error500';

export const AuthFailed: React.FC<Omit<ErrorStateLayoutProps, 'variant'>> = (props) => (
  <ErrorStateLayout {...props} variant="authfailed" />
);
AuthFailed.displayName = 'AuthFailed';

export const TimeoutError: React.FC<Omit<ErrorStateLayoutProps, 'variant'>> = (props) => (
  <ErrorStateLayout {...props} variant="timeout" />
);
TimeoutError.displayName = 'TimeoutError';

export const DegradedState: React.FC<Omit<ErrorStateLayoutProps, 'variant'>> = (props) => (
  <ErrorStateLayout {...props} variant="degraded" />
);
DegradedState.displayName = 'DegradedState';

export default ErrorStateLayout;
