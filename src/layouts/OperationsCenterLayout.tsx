/**
 * @fileoverview OperationsCenterLayout — Operations Monitoring Center
 *
 * Live operations monitoring with system health trees, service status lists,
 * dashboard grids of metric tiles, event streams, and incident tracking.
 *
 * Layout Diagram:
 * ```
 * +----------+-------------------------------------------+-------------+
 * |AlertBanner| CRITICAL: Service degradation detected    | Acknowledge |  TOP
 * +----------+--------------------+------+---------------+-------------+
 * |SystemTree| DashboardGrid      |      | EventStream                 |  MAIN
 * | - Health | - MetricTiles      |      | - Live events               |
 * | - Nodes  | - StatusCards      |      | - Log entries               |
 * |Service  |                    |      |                             |
 * |List     |                    |      | Incidents                   |
 * +----------+--------------------+------+---------------+-------------+
 * | Timeline: [====●====] 00:00:00 UTC | Uptime | Region | Sync State |  BOTTOM
 * +----------+-------------------------------------------+-------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export interface OperationsCenterLayoutProps extends LayoutBaseProps {
  alertBanner?: React.ReactNode;
  acknowledgeControl?: React.ReactNode;
  systemTree?: React.ReactNode;
  serviceList?: React.ReactNode;
  dashboardGrid?: React.ReactNode;
  metricTiles?: React.ReactNode;
  eventStream?: React.ReactNode;
  incidentsPanel?: React.ReactNode;
  timeline?: React.ReactNode;
  statusBar?: React.ReactNode;
}

function useOpsCenterStyles(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '200px 1fr auto',
    gridTemplateAreas: `
      "alert alert alert"
      "sidebar main right"
      "timeline timeline timeline"
    `,
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 13,
    overflow: 'hidden',
  } as React.CSSProperties;
}

export const OperationsCenterLayout: React.FC<OperationsCenterLayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  alertBanner,
  acknowledgeControl,
  systemTree,
  serviceList,
  dashboardGrid,
  metricTiles,
  eventStream,
  incidentsPanel,
  timeline,
  statusBar,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };
  const baseStyles = useOpsCenterStyles(theme);

  return (
    <div
      className={`tf-layout tf-operations-center ${className ?? ''}`}
      data-testid={testId}
      data-layout="operations-center"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Alert Banner */}
      {alertBanner && (
        <div
          style={{
            gridArea: 'alert',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 12px',
            background: t.warningColor ?? '#F2B84B',
            color: t.background,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
            zIndex: 60,
          }}
          data-panel="alert"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {alertBanner}
          </div>
          {acknowledgeControl}
        </div>
      )}

      {/* Left Sidebar: SystemTree + ServiceList */}
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
              padding: 8,
              borderBottom: `1px solid ${t.borderColor}`,
            }}
            data-subpanel="system-tree"
          >
            {systemTree}
          </div>
          <div style={{ height: 240, overflow: 'auto', padding: 8 }} data-subpanel="service-list">
            {serviceList}
          </div>
        </div>
      )}

      {/* Main Content: DashboardGrid + MetricTiles */}
      <div
        style={{
          gridArea: 'main',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: t.background,
        }}
        data-panel="main"
      >
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 12,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
            alignContent: 'start',
          }}
          data-subpanel="dashboard-grid"
        >
          {dashboardGrid ?? metricTiles ?? children}
        </div>
      </div>

      {/* Right Panel: EventStream + Incidents */}
      {visibility.rightPanel && (
        <div
          style={{
            gridArea: 'right',
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
              fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
              fontSize: 11,
            }}
            data-subpanel="event-stream"
          >
            {eventStream}
          </div>
          <div style={{ height: 200, overflow: 'auto', padding: 8 }} data-subpanel="incidents">
            {incidentsPanel}
          </div>
        </div>
      )}

      {/* Bottom Timeline */}
      {visibility.bottomPanel && (
        <div
          style={{
            gridArea: 'timeline',
            height: sizing.bottomPanelHeight,
            background: t.raisedPanelBg,
            borderTop: `1px solid ${t.borderColor}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
          data-panel="bottom"
        >
          {timeline}
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
                textTransform: 'uppercase' as const,
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
export const OperationsCenterDark: React.FC<OperationsCenterLayoutProps> = (props) => (
  <OperationsCenterLayout {...props} theme="command-dark" />
);
OperationsCenterDark.displayName = 'OperationsCenterDark';

export const OperationsCenterGreen: React.FC<OperationsCenterLayoutProps> = (props) => (
  <OperationsCenterLayout {...props} theme="field-green" />
);
OperationsCenterGreen.displayName = 'OperationsCenterGreen';

export const OperationsCenterBlue: React.FC<OperationsCenterLayoutProps> = (props) => (
  <OperationsCenterLayout {...props} theme="deep-blue" />
);
OperationsCenterBlue.displayName = 'OperationsCenterBlue';

export const OperationsCenterForge: React.FC<OperationsCenterLayoutProps> = (props) => (
  <OperationsCenterLayout {...props} theme="forge" />
);
OperationsCenterForge.displayName = 'OperationsCenterForge';

export const OperationsCenterRedline: React.FC<OperationsCenterLayoutProps> = (props) => (
  <OperationsCenterLayout {...props} theme="redline" />
);
OperationsCenterRedline.displayName = 'OperationsCenterRedline';

export default OperationsCenterLayout;
