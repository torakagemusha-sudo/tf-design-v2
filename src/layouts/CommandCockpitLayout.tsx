/**
 * @fileoverview CommandCockpitLayout — Operational Command Center
 *
 * The canonical Torafirma command surface. Five-panel layout optimized for
 * issuing commands, monitoring runtime state, inspecting objects, and reviewing
 * execution traces.
 *
 * Layout Diagram:
 * ```
 * +----------+-------------------------------------------+-------------+
 * |CommandBar| RuntimeSelector                    Status | Authority   |  TOP
 * +----------+--------------------+------+---------------+-------------+
 * |NavRail   | WorkspaceTabs      |      | InspectorPanel              |  MAIN
 * |          |                    |      | - Properties                |
 * |Command   | PrimaryContent     |      | - Contracts                 |
 * |Palette   |                    |      | - Validation                |
 * |          |                    |      | - History                   |
 * +----------+--------------------+------+---------------+-------------+
 * | TraceConsole (minimized)                                           |  BOTTOM
 * +----------+-------------------------------------------+-------------+
 * ```
 *
 * @variants CommandCockpitDark, CommandCockpitGreen, CommandCockpitBlue,
 *           CommandCockpitForge, CommandCockpitRedline
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

// ───────────────────────────────────────────
// Component Interfaces
// ───────────────────────────────────────────

export interface CommandCockpitLayoutProps extends LayoutBaseProps {
  /** CommandBar content (top-left) */
  commandBar?: React.ReactNode;
  /** Runtime/environment selector (top-center) */
  runtimeSelector?: React.ReactNode;
  /** System status indicators (top-right) */
  statusBar?: React.ReactNode;
  /** Navigation rail (left-top) */
  navRail?: React.ReactNode;
  /** Command palette / quick actions (left-bottom) */
  commandPalette?: React.ReactNode;
  /** Workspace tab strip (main-top) */
  workspaceTabs?: React.ReactNode;
  /** Primary workspace content (main-center) */
  primaryContent?: React.ReactNode;
  /** Inspector panel content (right) */
  inspectorPanel?: React.ReactNode;
  /** Trace console content (bottom, can be minimized) */
  traceConsole?: React.ReactNode;
  /** Authority indicator content */
  authorityIndicator?: React.ReactNode;
}

// ───────────────────────────────────────────
// Theme Style Builder
// ───────────────────────────────────────────

function useCockpitStyles(theme: TorafirmaTheme): React.CSSProperties {
  const tokens = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '48px 1fr auto',
    gridTemplateColumns: '48px 1fr auto',
    gridTemplateAreas: `
      "topbar topbar topbar"
      "sidebar main inspector"
      "console console console"
    `,
    background: tokens.background,
    color: tokens.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 13,
    overflow: 'hidden',
  } as React.CSSProperties;
}

// ───────────────────────────────────────────
// Layout Component
// ───────────────────────────────────────────

export const CommandCockpitLayout: React.FC<CommandCockpitLayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  commandBar,
  runtimeSelector,
  statusBar,
  navRail,
  commandPalette,
  workspaceTabs,
  primaryContent,
  inspectorPanel,
  traceConsole,
  authorityIndicator,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const tokens = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };

  const baseStyles = useCockpitStyles(theme);

  const topBarStyle: React.CSSProperties = {
    gridArea: 'topbar',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    background: tokens.panelBg,
    borderBottom: `1px solid ${tokens.borderColor}`,
    gap: 8,
    zIndex: 50,
  };

  const sidebarStyle: React.CSSProperties = {
    gridArea: 'sidebar',
    display: 'flex',
    flexDirection: 'column',
    width: visibility.leftPanel ? sizing.leftPanelWidth : 0,
    background: tokens.panelBg,
    borderRight: `1px solid ${tokens.borderColor}`,
    overflow: 'hidden',
    transition: 'width 0.2s ease',
  };

  const mainStyle: React.CSSProperties = {
    gridArea: 'main',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: tokens.background,
  };

  const inspectorStyle: React.CSSProperties = {
    gridArea: 'inspector',
    width: visibility.rightPanel && !state.rightPanelCollapsed ? sizing.rightPanelWidth : 0,
    background: tokens.panelBg,
    borderLeft: `1px solid ${tokens.borderColor}`,
    overflow: 'hidden',
    transition: 'width 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
  };

  const consoleStyle: React.CSSProperties = {
    gridArea: 'console',
    height: visibility.bottomPanel && !state.bottomPanelCollapsed ? sizing.bottomPanelHeight : 28,
    background: tokens.raisedPanelBg,
    borderTop: `1px solid ${tokens.borderColor}`,
    overflow: 'hidden',
    transition: 'height 0.2s ease',
  };

  const tabStripStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    height: 36,
    background: tokens.panelBg,
    borderBottom: `1px solid ${tokens.borderColor}`,
    gap: 4,
    overflowX: 'auto',
  };

  const workspaceStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: 12,
  };

  const navRailStyle: React.CSSProperties = {
    width: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 8,
    gap: 4,
    borderRight: `1px solid ${tokens.borderColor}`,
    flexShrink: 0,
  };

  const commandPaletteStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: 8,
    borderRight: `1px solid ${tokens.borderColor}`,
    minWidth: 0,
  };

  return (
    <div
      className={`tf-layout tf-command-cockpit ${className ?? ''}`}
      data-testid={testId}
      data-layout="command-cockpit"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Top Command Bar */}
      {visibility.topBar && (
        <div style={topBarStyle} data-panel="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {commandBar}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center' }}>
            {runtimeSelector}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {statusBar}
            {authorityIndicator}
          </div>
        </div>
      )}

      {/* Left Panel: NavRail + CommandPalette */}
      {visibility.leftPanel && (
        <div style={sidebarStyle} data-panel="left">
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={navRailStyle} data-subpanel="nav-rail">
              {navRail}
            </div>
            <div style={commandPaletteStyle} data-subpanel="command-palette">
              {commandPalette}
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div style={mainStyle} data-panel="main">
        <div style={tabStripStyle} data-subpanel="workspace-tabs">
          {workspaceTabs}
        </div>
        <div style={workspaceStyle} data-subpanel="primary-content">
          {primaryContent ?? children}
        </div>
      </div>

      {/* Right Inspector */}
      {visibility.rightPanel && (
        <div style={inspectorStyle} data-panel="right">
          {inspectorPanel}
        </div>
      )}

      {/* Bottom Trace Console */}
      {visibility.bottomPanel && (
        <div style={consoleStyle} data-panel="bottom">
          {traceConsole}
        </div>
      )}
    </div>
  );
};

// ───────────────────────────────────────────
// Theme Variant Exports
// ───────────────────────────────────────────

/** CommandCockpitLayout with Command Dark theme */
export const CommandCockpitDark: React.FC<CommandCockpitLayoutProps> = (props) => (
  <CommandCockpitLayout {...props} theme="command-dark" />
);
CommandCockpitDark.displayName = 'CommandCockpitDark';

/** CommandCockpitLayout with Field Green theme */
export const CommandCockpitGreen: React.FC<CommandCockpitLayoutProps> = (props) => (
  <CommandCockpitLayout {...props} theme="field-green" />
);
CommandCockpitGreen.displayName = 'CommandCockpitGreen';

/** CommandCockpitLayout with Deep Blue theme */
export const CommandCockpitBlue: React.FC<CommandCockpitLayoutProps> = (props) => (
  <CommandCockpitLayout {...props} theme="deep-blue" />
);
CommandCockpitBlue.displayName = 'CommandCockpitBlue';

/** CommandCockpitLayout with Forge theme */
export const CommandCockpitForge: React.FC<CommandCockpitLayoutProps> = (props) => (
  <CommandCockpitLayout {...props} theme="forge" />
);
CommandCockpitForge.displayName = 'CommandCockpitForge';

/** CommandCockpitLayout with Redline theme */
export const CommandCockpitRedline: React.FC<CommandCockpitLayoutProps> = (props) => (
  <CommandCockpitLayout {...props} theme="redline" />
);
CommandCockpitRedline.displayName = 'CommandCockpitRedline';

export default CommandCockpitLayout;
