/**
 * @fileoverview FieldConsoleLayout — Mobile/Field Mission Console
 *
 * Touch-optimized layout for field operations. Large action targets, clear
 * status indicators, mission card display, and tab-based navigation.
 * Includes full-screen map overlay capability for tactical overlay mode.
 *
 * Layout Diagram:
 * ```
 * +--------------------------------------------------------------------+
 * | FieldHeader                    GPSStatus | Signal | Battery | Time  |  TOP
 * +--------------------------------------------------------------------+
 * |                                                                    |  MAIN
 * | MissionCard                                                        |
 * | - Mission objectives                                               |
 * | - Status overlay                                                   |
 * |                                                                    |
 * | [Action A]  [Action B]  [Action C]  [Emergency]                    |
 * |                                                                    |
 * | (Full-screen map overlay capability)                               |
 * |                                                                    |
 * +--------------------------------------------------------------------+
 * | [Map]  [Data]  [Comms]  [Settings]                                 |  BOTTOM
 * +--------------------------------------------------------------------+
 * ```
 */

import React, { useState, useCallback } from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export interface FieldConsoleLayoutProps extends LayoutBaseProps {
  fieldHeader?: React.ReactNode;
  gpsStatus?: React.ReactNode;
  signalIndicator?: React.ReactNode;
  batteryIndicator?: React.ReactNode;
  timeDisplay?: React.ReactNode;
  missionCard?: React.ReactNode;
  actionButtons?: React.ReactNode;
  mapOverlay?: React.ReactNode;
  tabBar?: React.ReactNode;
  /** Initial active tab */
  initialTab?: string;
  /** Available tabs */
  tabs?: { id: string; label: string; icon?: React.ReactNode; content?: React.ReactNode }[];
  /** Enable full-screen map overlay */
  mapOverlayEnabled?: boolean;
  /** Called when map overlay toggles */
  onMapOverlayToggle?: (visible: boolean) => void;
}

function useFieldConsoleStyles(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '56px 1fr 56px',
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
      "header"
      "main"
      "tabbar"
    `,
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 14,
    overflow: 'hidden',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
  } as React.CSSProperties;
}

export const FieldConsoleLayout: React.FC<FieldConsoleLayoutProps> = ({
  theme: propTheme,
  className,
  style,
  children,
  fieldHeader,
  gpsStatus,
  signalIndicator,
  batteryIndicator,
  timeDisplay,
  missionCard,
  actionButtons,
  mapOverlay,
  tabBar,
  initialTab = 'map',
  tabs = [],
  mapOverlayEnabled = true,
  onMapOverlayToggle,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const [activeTab, setActiveTab] = useState(initialTab);
  const [mapFullscreen, setMapFullscreen] = useState(false);

  const toggleMapOverlay = useCallback(() => {
    setMapFullscreen((prev) => {
      const next = !prev;
      onMapOverlayToggle?.(next);
      return next;
    });
  }, [onMapOverlayToggle]);

  const baseStyles = useFieldConsoleStyles(theme);

  const headerStyle: React.CSSProperties = {
    gridArea: 'header',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    background: t.panelBg,
    borderBottom: `1px solid ${t.borderColor}`,
    zIndex: 50,
  };

  const mainStyle: React.CSSProperties = {
    gridArea: 'main',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    background: t.background,
  };

  const tabBarStyle: React.CSSProperties = {
    gridArea: 'tabbar',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: t.panelBg,
    borderTop: `1px solid ${t.borderColor}`,
    zIndex: 50,
    height: 56,
  };

  const activeTabStyle = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: '100%',
    background: isActive ? `${t.accentColor}15` : 'transparent',
    borderBottom: isActive ? `2px solid ${t.accentColor}` : '2px solid transparent',
    color: isActive ? t.accentColor : t.textMuted,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  });

  return (
    <div
      className={`tf-layout tf-field-console ${className ?? ''}`}
      data-testid={testId}
      data-layout="field-console"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Field Header */}
      <div style={headerStyle} data-panel="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {fieldHeader}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
            fontSize: 12,
          }}
        >
          {gpsStatus}
          {signalIndicator}
          {batteryIndicator}
          {timeDisplay}
        </div>
      </div>

      {/* Main Content */}
      <div style={mainStyle} data-panel="main">
        {/* Mission Card */}
        {missionCard && (
          <div
            style={{
              padding: 12,
              borderBottom: `1px solid ${t.borderColor}`,
              background: t.panelBg,
            }}
            data-subpanel="mission-card"
          >
            {missionCard}
          </div>
        )}

        {/* Action Buttons */}
        {actionButtons && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              padding: 12,
              borderBottom: `1px solid ${t.borderColor}`,
              overflowX: 'auto',
            }}
            data-subpanel="action-buttons"
          >
            {actionButtons}
          </div>
        )}

        {/* Tab Content Area */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 12,
          }}
          data-subpanel="tab-content"
        >
          {children ?? tabs.find((t) => t.id === activeTab)?.content}
        </div>

        {/* Full-screen Map Overlay */}
        {mapOverlayEnabled && mapFullscreen && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100,
              background: t.panelBg,
              display: 'flex',
              flexDirection: 'column',
            }}
            data-overlay="map-fullscreen"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 16px',
                background: t.panelBg,
                borderBottom: `1px solid ${t.borderColor}`,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em' }}>
                Tactical Map
              </span>
              <button
                onClick={toggleMapOverlay}
                style={{
                  padding: '6px 12px',
                  background: t.borderColor,
                  color: t.textPrimary,
                  border: 'none',
                  borderRadius: 2,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
            <div style={{ flex: 1 }}>
              {mapOverlay}
            </div>
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div style={tabBarStyle} data-panel="tabbar">
        {tabBar ??
          tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'map' && mapOverlayEnabled) {
                  toggleMapOverlay();
                }
                setActiveTab(tab.id);
              }}
              style={activeTabStyle(activeTab === tab.id)}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

// Theme Variants
export const FieldConsoleDark: React.FC<FieldConsoleLayoutProps> = (props) => (
  <FieldConsoleLayout {...props} theme="command-dark" />
);
FieldConsoleDark.displayName = 'FieldConsoleDark';

export const FieldConsoleGreen: React.FC<FieldConsoleLayoutProps> = (props) => (
  <FieldConsoleLayout {...props} theme="field-green" />
);
FieldConsoleGreen.displayName = 'FieldConsoleGreen';

export const FieldConsoleBlue: React.FC<FieldConsoleLayoutProps> = (props) => (
  <FieldConsoleLayout {...props} theme="deep-blue" />
);
FieldConsoleBlue.displayName = 'FieldConsoleBlue';

export const FieldConsoleForge: React.FC<FieldConsoleLayoutProps> = (props) => (
  <FieldConsoleLayout {...props} theme="forge" />
);
FieldConsoleForge.displayName = 'FieldConsoleForge';

export const FieldConsoleRedline: React.FC<FieldConsoleLayoutProps> = (props) => (
  <FieldConsoleLayout {...props} theme="redline" />
);
FieldConsoleRedline.displayName = 'FieldConsoleRedline';

export default FieldConsoleLayout;
