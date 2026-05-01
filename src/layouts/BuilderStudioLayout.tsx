/**
 * @fileoverview BuilderStudioLayout — Builder/Studio for Creating and Configuring
 *
 * Optimized for visual building, configuration, and design work. Features a
 * maximized canvas/editor area with component palette, layer management,
 * inline property editing, and live preview.
 *
 * Layout Diagram:
 * ```
 * +----------+-------------------------------------------+-------------+
 * |CommandBar| Breadcrumb > Path > Component               | Actions   |  TOP
 * +----------+--------------------+------+---------------+-------------+
 * |Component | Canvas / Editor    |      | PreviewPanel                |  MAIN
 * |Palette   |                    |      | - Live Preview              |
 * |          | PropertyPanel      |      | - Device Selector           |
 * |Layer     | (inline)           |      | - Viewport Controls         |
 * |Panel     |                    |      |                             |
 * +----------+--------------------+------+---------------+-------------+
 * | StatusBar: Zoom | Selection | Grid | Mode              | Save State|  BOTTOM
 * +----------+-------------------------------------------+-------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

// ───────────────────────────────────────────
// Props
// ───────────────────────────────────────────

export interface BuilderStudioLayoutProps extends LayoutBaseProps {
  commandBar?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  componentPalette?: React.ReactNode;
  layerPanel?: React.ReactNode;
  canvasEditor?: React.ReactNode;
  propertyPanel?: React.ReactNode;
  previewPanel?: React.ReactNode;
  statusBar?: React.ReactNode;
}

// ───────────────────────────────────────────
// Theme Styles
// ───────────────────────────────────────────

function useStudioStyles(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '48px 1fr 28px',
    gridTemplateColumns: '240px 1fr auto',
    gridTemplateAreas: `
      "topbar topbar topbar"
      "sidebar canvas preview"
      "status status status"
    `,
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 13,
    overflow: 'hidden',
  } as React.CSSProperties;
}

// ───────────────────────────────────────────
// Component
// ───────────────────────────────────────────

export const BuilderStudioLayout: React.FC<BuilderStudioLayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  commandBar,
  breadcrumb,
  actions,
  componentPalette,
  layerPanel,
  canvasEditor,
  propertyPanel,
  previewPanel,
  statusBar,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };

  const baseStyles = useStudioStyles(theme);

  const topBarStyle: React.CSSProperties = {
    gridArea: 'topbar',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    background: t.panelBg,
    borderBottom: `1px solid ${t.borderColor}`,
    gap: 8,
    zIndex: 50,
  };

  const sidebarStyle: React.CSSProperties = {
    gridArea: 'sidebar',
    display: 'flex',
    flexDirection: 'column',
    background: t.panelBg,
    borderRight: `1px solid ${t.borderColor}`,
    overflow: 'hidden',
    width: visibility.leftPanel ? sizing.leftPanelWidth : 0,
    transition: 'width 0.2s ease',
  };

  const canvasStyle: React.CSSProperties = {
    gridArea: 'canvas',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: t.background,
  };

  const previewStyle: React.CSSProperties = {
    gridArea: 'preview',
    width: visibility.rightPanel ? sizing.rightPanelWidth : 0,
    background: t.panelBg,
    borderLeft: `1px solid ${t.borderColor}`,
    overflow: 'hidden',
    transition: 'width 0.2s ease',
  };

  const statusStyle: React.CSSProperties = {
    gridArea: 'status',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    height: sizing.statusBarHeight,
    background: t.raisedPanelBg,
    borderTop: `1px solid ${t.borderColor}`,
    fontSize: 11,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    color: t.textMuted,
  };

  const paletteStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: 8,
    borderBottom: `1px solid ${t.borderColor}`,
  };

  const layerStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: 8,
  };

  const editorWrapperStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  return (
    <div
      className={`tf-layout tf-builder-studio ${className ?? ''}`}
      data-testid={testId}
      data-layout="builder-studio"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Top Bar */}
      {visibility.topBar && (
        <div style={topBarStyle} data-panel="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {commandBar}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                color: t.textMuted,
              }}
            >
              {breadcrumb}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {actions}
          </div>
        </div>
      )}

      {/* Left Sidebar: Component Palette + Layer Panel */}
      {visibility.leftPanel && (
        <div style={sidebarStyle} data-panel="left">
          <div style={paletteStyle} data-subpanel="component-palette">
            {componentPalette}
          </div>
          <div style={layerStyle} data-subpanel="layer-panel">
            {layerPanel}
          </div>
        </div>
      )}

      {/* Main Canvas + Inline Property Panel */}
      <div style={canvasStyle} data-panel="main">
        <div style={editorWrapperStyle} data-subpanel="canvas-editor">
          {canvasEditor ?? children}
        </div>
        {propertyPanel && (
          <div
            style={{
              height: 160,
              borderTop: `1px solid ${t.borderColor}`,
              background: t.panelBg,
              overflow: 'auto',
              padding: 8,
            }}
            data-subpanel="property-panel"
          >
            {propertyPanel}
          </div>
        )}
      </div>

      {/* Right Preview Panel */}
      {visibility.rightPanel && (
        <div style={previewStyle} data-panel="right">
          {previewPanel}
        </div>
      )}

      {/* Bottom Status Bar */}
      {visibility.statusBar && (
        <div style={statusStyle} data-panel="status">
          {statusBar}
        </div>
      )}
    </div>
  );
};

// ───────────────────────────────────────────
// Theme Variants
// ───────────────────────────────────────────

export const BuilderStudioDark: React.FC<BuilderStudioLayoutProps> = (props) => (
  <BuilderStudioLayout {...props} theme="command-dark" />
);
BuilderStudioDark.displayName = 'BuilderStudioDark';

export const BuilderStudioGreen: React.FC<BuilderStudioLayoutProps> = (props) => (
  <BuilderStudioLayout {...props} theme="field-green" />
);
BuilderStudioGreen.displayName = 'BuilderStudioGreen';

export const BuilderStudioBlue: React.FC<BuilderStudioLayoutProps> = (props) => (
  <BuilderStudioLayout {...props} theme="deep-blue" />
);
BuilderStudioBlue.displayName = 'BuilderStudioBlue';

export const BuilderStudioForge: React.FC<BuilderStudioLayoutProps> = (props) => (
  <BuilderStudioLayout {...props} theme="forge" />
);
BuilderStudioForge.displayName = 'BuilderStudioForge';

export const BuilderStudioRedline: React.FC<BuilderStudioLayoutProps> = (props) => (
  <BuilderStudioLayout {...props} theme="redline" />
);
BuilderStudioRedline.displayName = 'BuilderStudioRedline';

export default BuilderStudioLayout;
