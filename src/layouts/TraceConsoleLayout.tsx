/**
 * @fileoverview TraceConsoleLayout — Trace-Focused Debugging Layout
 *
 * Purpose-built for distributed tracing, span analysis, and execution debugging.
 * Features trace filtering, hierarchical trace tree, span list, timeline view,
 * flame graph visualization, event detail panels, and a live console.
 *
 * Layout Diagram:
 * ```
 * +----------+-------------------------------------------+-------------+
 * |TraceFilter| Search: [trace-id] | Span | Duration    | View Mode   |  TOP
 * +----------+--------------------+------+---------------+-------------+
 * |TraceTree | Timeline           |      | EventDetail                 |  MAIN
 * |          | - Gantt chart      |      | - Span info                 |
 * |Span      | - Duration bars    |      | - Tags                      |
 * |List      |                    |      | - Logs                      |
 * |          | FlameGraph         |      | Metadata                    |
 * +----------+--------------------+------+---------------+-------------+
 * | Console: > filter:service=api | level:info | tail -f               |  BOTTOM
 * +----------+-------------------------------------------+-------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export interface TraceConsoleLayoutProps extends LayoutBaseProps {
  traceFilter?: React.ReactNode;
  searchBar?: React.ReactNode;
  viewModeSelector?: React.ReactNode;
  traceTree?: React.ReactNode;
  spanList?: React.ReactNode;
  timeline?: React.ReactNode;
  flameGraph?: React.ReactNode;
  eventDetail?: React.ReactNode;
  metadataPanel?: React.ReactNode;
  console?: React.ReactNode;
}

function useTraceConsoleStyles(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '48px 1fr auto',
    gridTemplateColumns: '260px 1fr auto',
    gridTemplateAreas: `
      "topbar topbar topbar"
      "sidebar main detail"
      "console console console"
    `,
    background: t.background,
    color: t.textPrimary,
    fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
    fontSize: 12,
    overflow: 'hidden',
  } as React.CSSProperties;
}

export const TraceConsoleLayout: React.FC<TraceConsoleLayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  traceFilter,
  searchBar,
  viewModeSelector,
  traceTree,
  spanList,
  timeline,
  flameGraph,
  eventDetail,
  metadataPanel,
  console: consoleContent,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };
  const baseStyles = useTraceConsoleStyles(theme);

  return (
    <div
      className={`tf-layout tf-trace-console ${className ?? ''}`}
      data-testid={testId}
      data-layout="trace-console"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Top: TraceFilter + Search */}
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
            {traceFilter}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flex: 1,
              justifyContent: 'center',
              maxWidth: 480,
            }}
          >
            {searchBar}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {viewModeSelector}
          </div>
        </div>
      )}

      {/* Left: TraceTree + SpanList */}
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
              fontSize: 11,
            }}
            data-subpanel="trace-tree"
          >
            {traceTree}
          </div>
          <div
            style={{
              height: 240,
              overflow: 'auto',
              padding: 4,
              fontSize: 11,
            }}
            data-subpanel="span-list"
          >
            {spanList}
          </div>
        </div>
      )}

      {/* Main: Timeline + FlameGraph */}
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
            borderBottom: flameGraph ? `1px solid ${t.borderColor}` : 'none',
          }}
          data-subpanel="timeline"
        >
          {timeline ?? children}
        </div>
        {flameGraph && (
          <div
            style={{
              height: 200,
              overflow: 'auto',
              background: t.panelBg,
              padding: 4,
            }}
            data-subpanel="flame-graph"
          >
            {flameGraph}
          </div>
        )}
      </div>

      {/* Right: EventDetail + Metadata */}
      {visibility.rightPanel && (
        <div
          style={{
            gridArea: 'detail',
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
              fontSize: 11,
            }}
            data-subpanel="event-detail"
          >
            {eventDetail}
          </div>
          <div
            style={{
              height: 180,
              overflow: 'auto',
              padding: 8,
              fontSize: 11,
              color: t.textMuted,
            }}
            data-subpanel="metadata"
          >
            {metadataPanel}
          </div>
        </div>
      )}

      {/* Bottom: Console */}
      {visibility.bottomPanel && (
        <div
          style={{
            gridArea: 'console',
            height: sizing.bottomPanelHeight,
            background: t.raisedPanelBg,
            borderTop: `1px solid ${t.borderColor}`,
            overflow: 'auto',
            fontSize: 11,
            padding: 4,
            color: t.accentColor,
          }}
          data-panel="bottom"
        >
          {consoleContent}
        </div>
      )}
    </div>
  );
};

// Theme Variants
export const TraceConsoleDark: React.FC<TraceConsoleLayoutProps> = (props) => (
  <TraceConsoleLayout {...props} theme="command-dark" />
);
TraceConsoleDark.displayName = 'TraceConsoleDark';

export const TraceConsoleGreen: React.FC<TraceConsoleLayoutProps> = (props) => (
  <TraceConsoleLayout {...props} theme="field-green" />
);
TraceConsoleGreen.displayName = 'TraceConsoleGreen';

export const TraceConsoleBlue: React.FC<TraceConsoleLayoutProps> = (props) => (
  <TraceConsoleLayout {...props} theme="deep-blue" />
);
TraceConsoleBlue.displayName = 'TraceConsoleBlue';

export const TraceConsoleForge: React.FC<TraceConsoleLayoutProps> = (props) => (
  <TraceConsoleLayout {...props} theme="forge" />
);
TraceConsoleForge.displayName = 'TraceConsoleForge';

export const TraceConsoleRedline: React.FC<TraceConsoleLayoutProps> = (props) => (
  <TraceConsoleLayout {...props} theme="redline" />
);
TraceConsoleRedline.displayName = 'TraceConsoleRedline';

export default TraceConsoleLayout;
