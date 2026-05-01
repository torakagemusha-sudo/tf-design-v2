/**
 * @fileoverview ResponsiveLayout — Responsive Breakpoints Layout
 *
 * Layout that adapts its structure based on viewport breakpoint.
 * Variants for Desktop, Tablet, Mobile, Wide, and Ultrawide displays.
 * Automatically adjusts panel visibility, spacing, and typography.
 *
 * Breakpoints:
 * - Mobile: < 768px
 * - Tablet: 768px - 1023px
 * - Desktop: 1024px - 1439px
 * - Wide: 1440px - 1919px
 * - Ultrawide: >= 1920px
 */

import React, { useEffect, useState } from 'react';
import type { LayoutBaseProps, TorafirmaTheme, LayoutBreakpoint } from './types';
import { BREAKPOINT_PX, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type ResponsiveVariant = 'desktop' | 'tablet' | 'mobile' | 'wide' | 'ultrawide';

export interface ResponsiveLayoutProps extends LayoutBaseProps {
  variant?: ResponsiveVariant;
  /** Content for each breakpoint (falls back to children) */
  mobileContent?: React.ReactNode;
  tabletContent?: React.ReactNode;
  desktopContent?: React.ReactNode;
  wideContent?: React.ReactNode;
  ultrawideContent?: React.ReactNode;
  /** Top bar (collapses on mobile) */
  topBar?: React.ReactNode;
  /** Navigation (becomes hamburger on mobile/tablet) */
  navigation?: React.ReactNode;
  /** Right panel (moves to bottom sheet on mobile) */
  sidePanel?: React.ReactNode;
  /** Bottom bar (becomes floating action on mobile) */
  bottomBar?: React.ReactNode;
  /** Called when breakpoint changes */
  onBreakpointChange?: (bp: LayoutBreakpoint) => void;
}

function detectBreakpoint(width: number): LayoutBreakpoint {
  if (width >= BREAKPOINT_PX.ultrawide) return 'ultrawide';
  if (width >= BREAKPOINT_PX.wide) return 'wide';
  if (width >= BREAKPOINT_PX.desktop) return 'desktop';
  if (width >= BREAKPOINT_PX.tablet) return 'tablet';
  return 'mobile';
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  theme: propTheme,
  variant: propVariant,
  mobileContent,
  tabletContent,
  desktopContent,
  wideContent,
  ultrawideContent,
  topBar,
  navigation,
  sidePanel,
  bottomBar,
  onBreakpointChange,
  className,
  style,
  children,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const [currentBreakpoint, setCurrentBreakpoint] = useState<LayoutBreakpoint>(
    typeof window !== 'undefined' ? detectBreakpoint(window.innerWidth) : 'desktop'
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      const bp = detectBreakpoint(window.innerWidth);
      setCurrentBreakpoint(bp);
      onBreakpointChange?.(bp);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onBreakpointChange]);

  const effectiveBreakpoint = propVariant ?? currentBreakpoint;
  const isMobile = effectiveBreakpoint === 'mobile';
  const isTablet = effectiveBreakpoint === 'tablet';
  const isCompact = isMobile || isTablet;

  // Select content based on breakpoint
  const getContent = (): React.ReactNode => {
    switch (effectiveBreakpoint) {
      case 'mobile': return mobileContent ?? children;
      case 'tablet': return tabletContent ?? children;
      case 'desktop': return desktopContent ?? children;
      case 'wide': return wideContent ?? children;
      case 'ultrawide': return ultrawideContent ?? children;
      default: return children;
    }
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: topBar ? (isMobile ? '48px 1fr auto' : '48px 1fr auto') : '1fr auto',
    gridTemplateColumns: isCompact ? '1fr' : navigation ? '240px 1fr auto' : '1fr auto',
    gridTemplateAreas: isCompact
      ? topBar
        ? `"topbar" "main" "bottom"`
        : `"main" "bottom"`
      : topBar
      ? `"topbar topbar topbar" "sidebar main side" "bottom bottom bottom"`
      : `"sidebar main side" "bottom bottom bottom"`,
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: isMobile ? 14 : 13,
    overflow: 'hidden',
    ...style,
  };

  const topBarStyle: React.CSSProperties = {
    gridArea: 'topbar',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0 12px' : '0 16px',
    background: t.panelBg,
    borderBottom: `1px solid ${t.borderColor}`,
    gap: 8,
    zIndex: 50,
  };

  const sidebarStyle: React.CSSProperties = {
    gridArea: 'sidebar',
    background: t.panelBg,
    borderRight: `1px solid ${t.borderColor}`,
    overflow: isCompact ? 'visible' : 'auto',
    ...(isCompact
      ? {
          position: 'fixed',
          top: 48,
          left: menuOpen ? 0 : -280,
          width: 280,
          height: 'calc(100% - 48px)',
          zIndex: 100,
          transition: 'left 0.25s ease',
        }
      : {}),
  };

  const mainStyle: React.CSSProperties = {
    gridArea: 'main',
    overflow: 'auto',
    background: t.background,
    padding: isMobile ? 8 : isTablet ? 12 : 16,
  };

  const sidePanelStyle: React.CSSProperties = {
    gridArea: 'side',
    width: isCompact ? '100%' : 300,
    background: t.panelBg,
    borderLeft: isCompact ? 'none' : `1px solid ${t.borderColor}`,
    overflow: 'auto',
    ...(isCompact
      ? {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50vh',
          zIndex: 90,
          borderTop: `1px solid ${t.borderColor}`,
          transform: menuOpen ? 'translateY(100%)' : 'translateY(0)',
        }
      : {}),
  };

  const bottomStyle: React.CSSProperties = {
    gridArea: 'bottom',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0 12px' : '0 16px',
    height: isMobile ? 48 : 28,
    background: t.raisedPanelBg,
    borderTop: `1px solid ${t.borderColor}`,
    fontSize: 11,
    color: t.textMuted,
    zIndex: 50,
  };

  return (
    <div
      className={`tf-layout tf-responsive tf-responsive--${effectiveBreakpoint} ${className ?? ''}`}
      data-testid={testId}
      data-layout="responsive"
      data-breakpoint={effectiveBreakpoint}
      data-theme={theme}
      style={containerStyle}
    >
      {/* Top Bar */}
      {topBar && (
        <div style={topBarStyle} data-panel="topbar">
          {isCompact && navigation && (
            <button
              onClick={() => setMenuOpen((p) => !p)}
              style={{
                background: 'transparent',
                border: 'none',
                color: t.textPrimary,
                fontSize: 18,
                cursor: 'pointer',
                padding: 4,
              }}
              aria-label="Toggle navigation"
            >
              &#9776;
            </button>
          )}
          {topBar}
        </div>
      )}

      {/* Navigation Sidebar */}
      {navigation && (
        <div style={sidebarStyle} data-panel="sidebar">
          {isCompact && (
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'transparent',
                border: 'none',
                color: t.textMuted,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              &#x2715;
            </button>
          )}
          {navigation}
        </div>
      )}

      {/* Main Content */}
      <div style={mainStyle} data-panel="main">
        {getContent()}
      </div>

      {/* Side Panel */}
      {sidePanel && (
        <div style={sidePanelStyle} data-panel="side">
          {sidePanel}
        </div>
      )}

      {/* Bottom Bar */}
      {bottomBar && (
        <div style={bottomStyle} data-panel="bottom">
          {bottomBar}
        </div>
      )}
    </div>
  );
};

// Variant Exports
export const DesktopLayout: React.FC<Omit<ResponsiveLayoutProps, 'variant'>> = (props) => (
  <ResponsiveLayout {...props} variant="desktop" />
);
DesktopLayout.displayName = 'DesktopLayout';

export const TabletLayout: React.FC<Omit<ResponsiveLayoutProps, 'variant'>> = (props) => (
  <ResponsiveLayout {...props} variant="tablet" />
);
TabletLayout.displayName = 'TabletLayout';

export const MobileLayout: React.FC<Omit<ResponsiveLayoutProps, 'variant'>> = (props) => (
  <ResponsiveLayout {...props} variant="mobile" />
);
MobileLayout.displayName = 'MobileLayout';

export const WideLayout: React.FC<Omit<ResponsiveLayoutProps, 'variant'>> = (props) => (
  <ResponsiveLayout {...props} variant="wide" />
);
WideLayout.displayName = 'WideLayout';

export const UltrawideLayout: React.FC<Omit<ResponsiveLayoutProps, 'variant'>> = (props) => (
  <ResponsiveLayout {...props} variant="ultrawide" />
);
UltrawideLayout.displayName = 'UltrawideLayout';

export default ResponsiveLayout;
