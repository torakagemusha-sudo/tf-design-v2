/**
 * @fileoverview AnalysisDashboardLayout — Data Analysis Workspace
 *
 * Purpose-built for data exploration, analysis, and visualization. Features
 * filter controls, dataset selection, chart grids, data tables, metric panels,
 * and note-taking capabilities.
 *
 * Layout Diagram:
 * ```
 * +-----------+------------------------------------------+-------------+
 * |FilterBar  | GlobalSearch                        Mode  | User        |  TOP
 * +-----------+---------------------+------+---------------+-------------+
 * |Dataset    | ChartGrid           |      | MetricPanel                 |  MAIN
 * |Selector   | - Charts, Graphs    |      | - KPI Tiles                 |
 * |           | - Visualizations    |      | - Summary Stats             |
 * |SavedViews |                     |      | Notes                       |
 * |           | Tables              |      |                             |
 * +-----------+---------------------+------+---------------+-------------+
 * | ExportBar: Export | Format | Schedule | Share         | Refresh     |  BOTTOM
 * +-----------+------------------------------------------+-------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

// ───────────────────────────────────────────
// Props
// ───────────────────────────────────────────

export interface AnalysisDashboardLayoutProps extends LayoutBaseProps {
  filterBar?: React.ReactNode;
  globalSearch?: React.ReactNode;
  modeSelector?: React.ReactNode;
  userControls?: React.ReactNode;
  datasetSelector?: React.ReactNode;
  savedViews?: React.ReactNode;
  chartGrid?: React.ReactNode;
  tables?: React.ReactNode;
  metricPanel?: React.ReactNode;
  notesPanel?: React.ReactNode;
  exportBar?: React.ReactNode;
}

// ───────────────────────────────────────────
// Theme Styles
// ───────────────────────────────────────────

function useDashboardStyles(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '48px 1fr 36px',
    gridTemplateColumns: '220px 1fr auto',
    gridTemplateAreas: `
      "topbar topbar topbar"
      "sidebar main metrics"
      "export export export"
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

export const AnalysisDashboardLayout: React.FC<AnalysisDashboardLayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  filterBar,
  globalSearch,
  modeSelector,
  userControls,
  datasetSelector,
  savedViews,
  chartGrid,
  tables,
  metricPanel,
  notesPanel,
  exportBar,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };
  const baseStyles = useDashboardStyles(theme);

  return (
    <div
      className={`tf-layout tf-analysis-dashboard ${className ?? ''}`}
      data-testid={testId}
      data-layout="analysis-dashboard"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Top Bar: FilterBar + GlobalSearch */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            {filterBar}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 240 }}>
            {globalSearch}
            {modeSelector}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {userControls}
          </div>
        </div>
      )}

      {/* Left Sidebar: DatasetSelector + SavedViews */}
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
          <div style={{ flex: 1, overflow: 'auto', padding: 8, borderBottom: `1px solid ${t.borderColor}` }} data-subpanel="dataset-selector">
            {datasetSelector}
          </div>
          <div style={{ height: 160, overflow: 'auto', padding: 8 }} data-subpanel="saved-views">
            {savedViews}
          </div>
        </div>
      )}

      {/* Main Content: ChartGrid + Tables */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 12,
          }}
          data-subpanel="chart-grid"
        >
          {chartGrid ?? children}
        </div>
        {tables && (
          <div
            style={{
              height: 280,
              borderTop: `1px solid ${t.borderColor}`,
              background: t.panelBg,
              overflow: 'auto',
              padding: 8,
            }}
            data-subpanel="tables"
          >
            {tables}
          </div>
        )}
      </div>

      {/* Right Panel: MetricPanel + Notes */}
      {visibility.rightPanel && (
        <div
          style={{
            gridArea: 'metrics',
            width: sizing.rightPanelWidth,
            background: t.panelBg,
            borderLeft: `1px solid ${t.borderColor}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
          data-panel="right"
        >
          <div style={{ flex: 1, overflow: 'auto', padding: 8, borderBottom: `1px solid ${t.borderColor}` }} data-subpanel="metric-panel">
            {metricPanel}
          </div>
          <div style={{ height: 200, overflow: 'auto', padding: 8 }} data-subpanel="notes">
            {notesPanel}
          </div>
        </div>
      )}

      {/* Bottom Export Bar */}
      {visibility.bottomPanel && (
        <div
          style={{
            gridArea: 'export',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            height: 36,
            background: t.raisedPanelBg,
            borderTop: `1px solid ${t.borderColor}`,
            fontSize: 11,
            letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
          }}
          data-panel="bottom"
        >
          {exportBar}
        </div>
      )}
    </div>
  );
};

// ───────────────────────────────────────────
// Theme Variants
// ───────────────────────────────────────────

export const AnalysisDashboardDark: React.FC<AnalysisDashboardLayoutProps> = (props) => (
  <AnalysisDashboardLayout {...props} theme="command-dark" />
);
AnalysisDashboardDark.displayName = 'AnalysisDashboardDark';

export const AnalysisDashboardGreen: React.FC<AnalysisDashboardLayoutProps> = (props) => (
  <AnalysisDashboardLayout {...props} theme="field-green" />
);
AnalysisDashboardGreen.displayName = 'AnalysisDashboardGreen';

export const AnalysisDashboardBlue: React.FC<AnalysisDashboardLayoutProps> = (props) => (
  <AnalysisDashboardLayout {...props} theme="deep-blue" />
);
AnalysisDashboardBlue.displayName = 'AnalysisDashboardBlue';

export const AnalysisDashboardForge: React.FC<AnalysisDashboardLayoutProps> = (props) => (
  <AnalysisDashboardLayout {...props} theme="forge" />
);
AnalysisDashboardForge.displayName = 'AnalysisDashboardForge';

export const AnalysisDashboardRedline: React.FC<AnalysisDashboardLayoutProps> = (props) => (
  <AnalysisDashboardLayout {...props} theme="redline" />
);
AnalysisDashboardRedline.displayName = 'AnalysisDashboardRedline';

export default AnalysisDashboardLayout;
