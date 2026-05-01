/**
 * @fileoverview ForgeIDELayout — IDE/Forge Development Environment
 *
 * Classic IDE layout with file tree, symbol navigation, code editor with
 * split-pane capability, integrated terminal, property panels, and outline view.
 * Optimized for long-form code editing with minimal distractions.
 *
 * Layout Diagram:
 * ```
 * +----------+-------------------------------------------+-------------+
 * |TabBar    | Breadcrumb > Path > File          CommandBar| Actions    |  TOP
 * +----------+--------------------+------+---------------+-------------+
 * |FileTree  | CodePane           |      | PropertyPanel               |  MAIN
 * |          | - Editor           |      | - File props                |
 * |          | - Line numbers     |Split | - Git status                |
 * |Symbol    |                    |Pane  |                             |
 * |List      | SplitPane          |      | Outline                     |
 * |          | (secondary file)   |      | - Symbols                   |
 * +----------+--------------------+------+---------------+-------------+
 * | TerminalPane                                    | StatusBar        |  BOTTOM
 * +----------+-------------------------------------------+-------------+
 * ```
 */

import React, { useState } from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export interface ForgeIDELayoutProps extends LayoutBaseProps {
  tabBar?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  commandBar?: React.ReactNode;
  actions?: React.ReactNode;
  fileTree?: React.ReactNode;
  symbolList?: React.ReactNode;
  codePane?: React.ReactNode;
  splitPane?: React.ReactNode;
  terminalPane?: React.ReactNode;
  propertyPanel?: React.ReactNode;
  outlinePanel?: React.ReactNode;
  statusBar?: React.ReactNode;
  /** Enable split pane (editor + secondary view) */
  splitEnabled?: boolean;
  /** Split direction */
  splitDirection?: 'horizontal' | 'vertical';
}

function useForgeIDEStyles(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '48px 1fr auto',
    gridTemplateColumns: '240px 1fr auto',
    gridTemplateAreas: `
      "topbar topbar topbar"
      "sidebar editor props"
      "terminal terminal terminal"
    `,
    background: t.background,
    color: t.textPrimary,
    fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
    fontSize: 12,
    overflow: 'hidden',
  } as React.CSSProperties;
}

export const ForgeIDELayout: React.FC<ForgeIDELayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  tabBar,
  breadcrumb,
  commandBar,
  actions,
  fileTree,
  symbolList,
  codePane,
  splitPane,
  terminalPane,
  propertyPanel,
  outlinePanel,
  statusBar,
  splitEnabled = false,
  splitDirection = 'vertical',
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };
  const baseStyles = useForgeIDEStyles(theme);

  const editorContainerStyle: React.CSSProperties = {
    gridArea: 'editor',
    display: 'flex',
    flexDirection: splitDirection === 'vertical' ? 'row' : 'column',
    overflow: 'hidden',
    background: t.background,
    gap: splitEnabled ? 1 : 0,
  };

  const paneStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    background: t.background,
    display: 'flex',
    flexDirection: 'column',
  };

  const secondaryPaneStyle: React.CSSProperties = {
    ...paneStyle,
    borderLeft: splitDirection === 'vertical' ? `1px solid ${t.borderColor}` : 'none',
    borderTop: splitDirection === 'horizontal' ? `1px solid ${t.borderColor}` : 'none',
  };

  return (
    <div
      className={`tf-layout tf-forge-ide ${className ?? ''}`}
      data-testid={testId}
      data-layout="forge-ide"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Top Bar: TabBar + Breadcrumb + CommandBar */}
      {visibility.topBar && (
        <div
          style={{
            gridArea: 'topbar',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            background: t.panelBg,
            borderBottom: `1px solid ${t.borderColor}`,
            gap: 8,
            zIndex: 50,
          }}
          data-panel="topbar"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {tabBar}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flex: 1,
              justifyContent: 'center',
              fontSize: 11,
              color: t.textMuted,
            }}
          >
            {breadcrumb}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {commandBar}
            {actions}
          </div>
        </div>
      )}

      {/* Left Sidebar: FileTree + SymbolList */}
      {visibility.leftPanel && (
        <div
          style={{
            gridArea: 'sidebar',
            display: 'flex',
            flexDirection: 'column',
            width: sizing.leftPanelWidth,
            background: t.panelBg,
            borderRight: `1px solid ${t.borderColor}`,
            overflow: 'hidden',
          }}
          data-panel="left"
        >
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: 4,
              borderBottom: `1px solid ${t.borderColor}`,
              fontSize: 12,
            }}
            data-subpanel="file-tree"
          >
            {fileTree}
          </div>
          <div
            style={{
              height: 200,
              overflow: 'auto',
              padding: 4,
              fontSize: 12,
            }}
            data-subpanel="symbol-list"
          >
            {symbolList}
          </div>
        </div>
      )}

      {/* Main Editor Area: CodePane + SplitPane */}
      <div style={editorContainerStyle} data-panel="main">
        <div style={paneStyle} data-subpanel="code-pane">
          {codePane ?? children}
        </div>
        {splitEnabled && splitPane && (
          <div style={secondaryPaneStyle} data-subpanel="split-pane">
            {splitPane}
          </div>
        )}
      </div>

      {/* Right Panel: PropertyPanel + Outline */}
      {visibility.rightPanel && (
        <div
          style={{
            gridArea: 'props',
            width: sizing.rightPanelWidth,
            background: t.panelBg,
            borderLeft: `1px solid ${t.borderColor}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
          data-panel="right"
        >
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: 8,
              borderBottom: `1px solid ${t.borderColor}`,
            }}
            data-subpanel="property-panel"
          >
            {propertyPanel}
          </div>
          <div style={{ height: 200, overflow: 'auto', padding: 8 }} data-subpanel="outline">
            {outlinePanel}
          </div>
        </div>
      )}

      {/* Bottom: TerminalPane + StatusBar */}
      {visibility.bottomPanel && (
        <div
          style={{
            gridArea: 'terminal',
            display: 'flex',
            flexDirection: 'column',
            height: sizing.bottomPanelHeight,
            background: t.raisedPanelBg,
            borderTop: `1px solid ${t.borderColor}`,
            overflow: 'hidden',
          }}
          data-panel="bottom"
        >
          <div style={{ flex: 1, overflow: 'auto', fontSize: 12, padding: 4 }} data-subpanel="terminal">
            {terminalPane}
          </div>
          {statusBar && (
            <div
              style={{
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
                borderTop: `1px solid ${t.borderColor}`,
                fontSize: 10,
                letterSpacing: '0.06em',
                color: t.textMuted,
              }}
            >
              {statusBar}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Theme Variants
export const ForgeIDEDark: React.FC<ForgeIDELayoutProps> = (props) => (
  <ForgeIDELayout {...props} theme="command-dark" />
);
ForgeIDEDark.displayName = 'ForgeIDEDark';

export const ForgeIDEGreen: React.FC<ForgeIDELayoutProps> = (props) => (
  <ForgeIDELayout {...props} theme="field-green" />
);
ForgeIDEGreen.displayName = 'ForgeIDEGreen';

export const ForgeIDEBlue: React.FC<ForgeIDELayoutProps> = (props) => (
  <ForgeIDELayout {...props} theme="deep-blue" />
);
ForgeIDEBlue.displayName = 'ForgeIDEBlue';

export const ForgeIDEForge: React.FC<ForgeIDELayoutProps> = (props) => (
  <ForgeIDELayout {...props} theme="forge" />
);
ForgeIDEForge.displayName = 'ForgeIDEForge';

export const ForgeIDERedline: React.FC<ForgeIDELayoutProps> = (props) => (
  <ForgeIDELayout {...props} theme="redline" />
);
ForgeIDERedline.displayName = 'ForgeIDERedline';

export default ForgeIDELayout;
