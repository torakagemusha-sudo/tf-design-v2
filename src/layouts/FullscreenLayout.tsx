/**
 * @fileoverview FullscreenLayout — Fullscreen Single-Pane Layout
 *
 * Maximizes a single content area to full viewport with minimal chrome.
 * Variants for charts, tables, maps, terminals, and presentations.
 * Includes optional floating controls overlay.
 *
 * ```
 * +---------------------------------------------------------------+
 * | [Exit]  [Mode]          Title                         [Menu]  |  FLOATING
 * |                                                               |
 * |                                                               |
 * |                                                               |  CONTENT
 * |                    Full-Screen Content                        |  (100%)
 * |                                                               |
 * |                                                               |
 * |                                                               |
 * +---------------------------------------------------------------+
 * ```
 */

import React, { useState, useCallback } from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export type FullscreenVariant = 'chart' | 'table' | 'map' | 'terminal' | 'presentation';

export interface FullscreenLayoutProps extends LayoutBaseProps {
  variant?: FullscreenVariant;
  /** Content title */
  title?: string;
  /** Floating controls (top-left) */
  floatingControls?: React.ReactNode;
  /** Floating menu (top-right) */
  floatingMenu?: React.ReactNode;
  /** Mode selector */
  modeSelector?: React.ReactNode;
  /** On exit fullscreen */
  onExit?: () => void;
  /** On mode change */
  onModeChange?: (mode: string) => void;
}

export const FullscreenLayout: React.FC<FullscreenLayoutProps> = ({
  theme: propTheme,
  variant = 'chart',
  title,
  floatingControls,
  floatingMenu,
  modeSelector,
  onExit,
  onModeChange,
  className,
  style,
  children,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const [showControls, setShowControls] = useState(true);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: variant === 'terminal' ? t.background : t.background,
    color: t.textPrimary,
    ...style,
  };

  const contentStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    overflow: variant === 'table' || variant === 'terminal' ? 'auto' : 'hidden',
    fontFamily:
      variant === 'terminal'
        ? '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace'
        : 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: variant === 'terminal' ? 12 : 13,
  };

  const floatingBarStyle: React.CSSProperties = {
    position: 'absolute',
    top: showControls ? 12 : -60,
    left: 12,
    right: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    background: `${t.panelBg}ee`,
    backdropFilter: 'blur(8px)',
    border: `1px solid ${t.borderColor}`,
    borderRadius: 2,
    zIndex: 50,
    transition: 'top 0.3s ease',
  };

  const toggleStyle: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 40,
    height: 4,
    background: t.borderColor,
    borderRadius: 2,
    cursor: 'pointer',
    zIndex: 51,
  };

  return (
    <div
      className={`tf-layout tf-fullscreen tf-fullscreen--${variant} ${className ?? ''}`}
      data-testid={testId}
      data-layout="fullscreen"
      data-variant={variant}
      data-theme={theme}
      style={containerStyle}
    >
      {/* Toggle handle */}
      <div
        style={toggleStyle}
        onClick={() => setShowControls((p) => !p)}
        data-element="controls-toggle"
      />

      {/* Floating Controls Bar */}
      <div style={floatingBarStyle} data-panel="floating-controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {onExit && (
            <button
              onClick={onExit}
              style={{
                padding: '4px 10px',
                background: t.borderColor,
                color: t.textPrimary,
                border: 'none',
                borderRadius: 2,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              Exit
            </button>
          )}
          {floatingControls}
          {modeSelector}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
            color: t.textPrimary,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {floatingMenu}
        </div>
      </div>

      {/* Fullscreen Content */}
      <div style={contentStyle} data-panel="content">
        {children}
      </div>
    </div>
  );
};

// Variant Exports
export const FullscreenChart: React.FC<Omit<FullscreenLayoutProps, 'variant'>> = (props) => (
  <FullscreenLayout {...props} variant="chart" />
);
FullscreenChart.displayName = 'FullscreenChart';

export const FullscreenTable: React.FC<Omit<FullscreenLayoutProps, 'variant'>> = (props) => (
  <FullscreenLayout {...props} variant="table" />
);
FullscreenTable.displayName = 'FullscreenTable';

export const FullscreenMap: React.FC<Omit<FullscreenLayoutProps, 'variant'>> = (props) => (
  <FullscreenLayout {...props} variant="map" />
);
FullscreenMap.displayName = 'FullscreenMap';

export const FullscreenTerminal: React.FC<Omit<FullscreenLayoutProps, 'variant'>> = (props) => (
  <FullscreenLayout {...props} variant="terminal" />
);
FullscreenTerminal.displayName = 'FullscreenTerminal';

export const FullscreenPresentation: React.FC<Omit<FullscreenLayoutProps, 'variant'>> = (props) => (
  <FullscreenLayout {...props} variant="presentation" />
);
FullscreenPresentation.displayName = 'FullscreenPresentation';

export default FullscreenLayout;
