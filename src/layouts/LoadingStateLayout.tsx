/**
 * @fileoverview LoadingStateLayout — Loading Skeleton Layout
 *
 * Skeleton placeholder layout shown during initial load, page transitions,
 * and data refresh operations. Provides visual feedback that the system is
 * active and reduces perceived latency.
 *
 * ```
 * +----------------------------------------------+
 * | [====] Top Bar Skeleton                       |  TOP
 * +----------------------------------------------+
 * | [====] | [============================] | [===]|  MAIN
 * | Sidebar | Content Skeleton Area       | Right|
 * | Skeleton| ============================ | Panel|
 * | [====] | ============================ | [===]|
 * |         | ============================ |      |
 * +----------------------------------------------+
 * | [====] Status Skeleton                        |  BOTTOM
 * +----------------------------------------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type LoadingVariant = 'initial' | 'transitioning' | 'refreshing';

export interface LoadingStateLayoutProps extends LayoutBaseProps {
  variant?: LoadingVariant;
  /** Loading message */
  message?: string;
  /** Show skeleton top bar */
  skeletonTopBar?: boolean;
  /** Show skeleton sidebar */
  skeletonSidebar?: boolean;
  /** Show skeleton content area */
  skeletonContent?: boolean;
  /** Show skeleton right panel */
  skeletonRightPanel?: boolean;
  /** Show skeleton bottom panel */
  skeletonBottomPanel?: boolean;
  /** Number of content skeleton rows */
  contentRows?: number;
  /** Loading progress (0-100, -1 = indeterminate) */
  progress?: number;
}

const DEFAULT_MESSAGES: Record<LoadingVariant, string> = {
  initial: 'Initializing workspace...',
  transitioning: 'Loading module...',
  refreshing: 'Refreshing data...',
};

/** Skeleton bar component */
const SkeletonBar: React.FC<{
  width: string | number;
  height?: number;
  theme: TorafirmaTheme;
  delay?: number;
}> = ({ width, height = 14, theme, delay = 0 }) => {
  const t = THEME_TOKENS[theme];
  return (
    <div
      style={{
        width,
        height,
        background: `linear-gradient(90deg, ${t.panelBg} 25%, ${t.raisedPanelBg} 50%, ${t.panelBg} 75%)`,
        backgroundSize: '200% 100%',
        borderRadius: 2,
        animation: `skeleton-shimmer 1.5s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

/** Skeleton layout block */
const SkeletonBlock: React.FC<{
  rows?: number;
  theme: TorafirmaTheme;
}> = ({ rows = 6, theme }) => {
  const t = THEME_TOKENS[theme];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, flex: 1 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBar
          key={i}
          width={`${60 + Math.random() * 40}%`}
          theme={theme}
          delay={i * 0.1}
        />
      ))}
    </div>
  );
};

export const LoadingStateLayout: React.FC<LoadingStateLayoutProps> = ({
  theme: propTheme,
  variant = 'initial',
  message,
  skeletonTopBar = true,
  skeletonSidebar = true,
  skeletonContent = true,
  skeletonRightPanel = true,
  skeletonBottomPanel = false,
  contentRows = 8,
  progress = -1,
  className,
  style,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: skeletonTopBar ? '48px 1fr auto' : '1fr auto',
    gridTemplateColumns: skeletonSidebar ? '240px 1fr auto' : '1fr auto',
    gridTemplateAreas: skeletonTopBar
      ? `"topbar topbar topbar" "sidebar main right" "status status status"`
      : `"sidebar main right" "status status status"`,
    background: t.background,
    overflow: 'hidden',
    ...style,
  };

  const topBarStyle: React.CSSProperties = {
    gridArea: 'topbar',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    background: t.panelBg,
    borderBottom: `1px solid ${t.borderColor}`,
    gap: 12,
  };

  const sidebarStyle: React.CSSProperties = {
    gridArea: 'sidebar',
    background: t.panelBg,
    borderRight: `1px solid ${t.borderColor}`,
    overflow: 'hidden',
  };

  const mainStyle: React.CSSProperties = {
    gridArea: 'main',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: t.background,
  };

  const rightStyle: React.CSSProperties = {
    gridArea: 'right',
    width: skeletonRightPanel ? 280 : 0,
    background: t.panelBg,
    borderLeft: `1px solid ${t.borderColor}`,
    overflow: 'hidden',
    transition: 'width 0.2s ease',
  };

  const bottomStyle: React.CSSProperties = {
    gridArea: 'status',
    height: skeletonBottomPanel ? 200 : 28,
    background: t.raisedPanelBg,
    borderTop: `1px solid ${t.borderColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
    fontSize: 11,
    color: t.textMuted,
    letterSpacing: '0.04em',
    gap: 8,
  };

  return (
    <div
      className={`tf-layout tf-loading-state tf-loading-state--${variant} ${className ?? ''}`}
      data-testid={testId}
      data-layout="loading-state"
      data-variant={variant}
      data-theme={theme}
      style={containerStyle}
    >
      {/* Skeleton Top Bar */}
      {skeletonTopBar && (
        <div style={topBarStyle} data-skeleton="topbar">
          <SkeletonBar width={120} height={16} theme={theme} />
          <SkeletonBar width={200} height={16} theme={theme} delay={0.1} />
          <div style={{ flex: 1 }} />
          <SkeletonBar width={80} height={16} theme={theme} delay={0.2} />
        </div>
      )}

      {/* Skeleton Sidebar */}
      {skeletonSidebar && (
        <div style={sidebarStyle} data-skeleton="sidebar">
          <SkeletonBlock rows={8} theme={theme} />
        </div>
      )}

      {/* Skeleton Main Content */}
      {skeletonContent && (
        <div style={mainStyle} data-skeleton="main">
          <SkeletonBlock rows={contentRows} theme={theme} />
        </div>
      )}

      {/* Skeleton Right Panel */}
      {skeletonRightPanel && (
        <div style={rightStyle} data-skeleton="right">
          <SkeletonBlock rows={6} theme={theme} />
        </div>
      )}

      {/* Bottom Status */}
      <div style={bottomStyle} data-skeleton="bottom">
        {progress >= 0 && (
          <div
            style={{
              width: 120,
              height: 4,
              background: t.borderColor,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.min(progress, 100)}%`,
                height: '100%',
                background: t.accentColor,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        )}
        <span>{message ?? DEFAULT_MESSAGES[variant]}</span>
      </div>
    </div>
  );
};

// Variant Exports
export const InitialLoadState: React.FC<Omit<LoadingStateLayoutProps, 'variant'>> = (props) => (
  <LoadingStateLayout {...props} variant="initial" />
);
InitialLoadState.displayName = 'InitialLoadState';

export const TransitionState: React.FC<Omit<LoadingStateLayoutProps, 'variant'>> = (props) => (
  <LoadingStateLayout {...props} variant="transitioning" />
);
TransitionState.displayName = 'TransitionState';

export const RefreshState: React.FC<Omit<LoadingStateLayoutProps, 'variant'>> = (props) => (
  <LoadingStateLayout {...props} variant="refreshing" />
);
RefreshState.displayName = 'RefreshState';

export default LoadingStateLayout;
