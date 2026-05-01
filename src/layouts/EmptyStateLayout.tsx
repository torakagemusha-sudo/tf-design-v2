/**
 * @fileoverview EmptyStateLayout — Empty/No-Data State Layout
 *
 * Displayed when no data is available for a given view. Multiple variants
 * for different empty-state contexts: NoData, NoAccess, Error, Loading, Offline.
 *
 * ```
 * +----------------------------------------------+
 * |                                               |
 * |              [ Icon / Graphic ]               |
 * |                                               |
 * |           HEADING                             |
 * |           Description text explaining           |
 * |           why the view is empty.               |
 * |                                               |
 * |           [ Primary Action ]                    |
 * |                                               |
 * +----------------------------------------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type EmptyStateVariant = 'nodata' | 'noaccess' | 'error' | 'loading' | 'offline';

export interface EmptyStateLayoutProps extends LayoutBaseProps {
  /** Which empty-state variant to render */
  variant?: EmptyStateVariant;
  /** Custom icon override */
  icon?: React.ReactNode;
  /** Custom heading override */
  heading?: string;
  /** Custom description override */
  description?: string;
  /** Primary action button */
  primaryAction?: React.ReactNode;
  /** Secondary action button/link */
  secondaryAction?: React.ReactNode;
}

const DEFAULT_CONTENT: Record<EmptyStateVariant, { icon: string; heading: string; description: string }> = {
  nodata: {
    icon: '\u25A1',
    heading: 'NO DATA',
    description: 'No records match the current criteria. Adjust filters or create a new record.',
  },
  noaccess: {
    icon: '\u26D4',
    heading: 'ACCESS DENIED',
    description: 'Insufficient authority level to view this resource. Escalate privileges to proceed.',
  },
  error: {
    icon: '\u26A0',
    heading: 'STATE UNKNOWN',
    description: 'The system cannot determine the current state of this resource. Retry or inspect logs.',
  },
  loading: {
    icon: '\u25EF',
    heading: 'LOADING',
    description: 'Retrieving data from operational store. Stand by.',
  },
  offline: {
    icon: '\u2716',
    heading: 'DISCONNECTED',
    description: 'Connection to operational node lost. Check network status or retry connection.',
  },
};

export const EmptyStateLayout: React.FC<EmptyStateLayoutProps> = ({
  theme: propTheme,
  variant = 'nodata',
  icon,
  heading,
  description,
  primaryAction,
  secondaryAction,
  className,
  style,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const defaults = DEFAULT_CONTENT[variant];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    background: t.background,
    color: t.textMuted,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    textAlign: 'center',
    gap: 16,
    ...style,
  };

  const iconStyle: React.CSSProperties = {
    fontSize: 48,
    lineHeight: 1,
    color: variant === 'loading' ? t.accentColor : t.textMuted,
    marginBottom: 8,
    animation: variant === 'loading' ? 'spin 1.5s linear infinite' : 'none',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: t.textPrimary,
  };

  const descStyle: React.CSSProperties = {
    fontSize: 13,
    lineHeight: 1.6,
    maxWidth: 400,
    color: t.textMuted,
  };

  return (
    <div
      className={`tf-layout tf-empty-state tf-empty-state--${variant} ${className ?? ''}`}
      data-testid={testId}
      data-layout="empty-state"
      data-variant={variant}
      data-theme={theme}
      style={containerStyle}
    >
      <div style={iconStyle} data-element="icon">
        {icon ?? <span>{defaults.icon}</span>}
      </div>
      <div style={headingStyle} data-element="heading">
        {heading ?? defaults.heading}
      </div>
      <div style={descStyle} data-element="description">
        {description ?? defaults.description}
      </div>
      {(primaryAction || secondaryAction) && (
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
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </div>
  );
};

// ───────────────────────────────────────────
// Variant Exports
// ───────────────────────────────────────────

/** EmptyStateLayout: No data available */
export const NoDataState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout {...props} variant="nodata" />
);
NoDataState.displayName = 'NoDataState';

/** EmptyStateLayout: Insufficient permissions */
export const NoAccessState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout {...props} variant="noaccess" />
);
NoAccessState.displayName = 'NoAccessState';

/** EmptyStateLayout: Error/unknown state */
export const ErrorEmptyState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout {...props} variant="error" />
);
ErrorEmptyState.displayName = 'ErrorEmptyState';

/** EmptyStateLayout: Loading state */
export const LoadingEmptyState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout {...props} variant="loading" />
);
LoadingEmptyState.displayName = 'LoadingEmptyState';

/** EmptyStateLayout: Disconnected/offline */
export const OfflineState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout {...props} variant="offline" />
);
OfflineState.displayName = 'OfflineState';

export default EmptyStateLayout;
