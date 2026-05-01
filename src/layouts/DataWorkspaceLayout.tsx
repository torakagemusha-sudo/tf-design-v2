/**
 * @fileoverview DataWorkspaceLayout — Data Quality and Management Workspace
 *
 * Purpose-built for data quality operations: table browsing, schema inspection,
 * validation rule review, record-level editing, and correction workflows.
 *
 * Layout Diagram:
 * ```
 * +----------+-------------------------------------------+-------------+
 * |CommandBar| DatasetName                    [Status]   | Actions     |  TOP
 * +----------+--------------------+------+---------------+-------------+
 * |TableList | DenseTable         |      | RecordInspector             |  MAIN
 * |          | - Sortable cols    |      | - Field values              |
 * |Schema    | - Row selection    |      | - Validation state          |
 * |Panel     | - Inline editing   |      | - History                   |
 * |          | ValidationMatrix   |      | - Correction panel          |
 * +----------+--------------------+------+---------------+-------------+
 * | TraceConsole: Connection | Rows | Quality Score | Last Sync        |  BOTTOM
 * +----------+-------------------------------------------+-------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export interface DataWorkspaceLayoutProps extends LayoutBaseProps {
  commandBar?: React.ReactNode;
  datasetName?: React.ReactNode;
  connectionStatus?: React.ReactNode;
  actions?: React.ReactNode;
  tableList?: React.ReactNode;
  schemaPanel?: React.ReactNode;
  denseTable?: React.ReactNode;
  validationMatrix?: React.ReactNode;
  recordInspector?: React.ReactNode;
  traceConsole?: React.ReactNode;
}

function useDataWorkspaceStyles(theme: TorafirmaTheme): React.CSSProperties {
  const t = THEME_TOKENS[theme];
  return {
    ...buildThemeCSS(theme),
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: '48px 1fr auto',
    gridTemplateColumns: '220px 1fr auto',
    gridTemplateAreas: `
      "topbar topbar topbar"
      "sidebar main inspector"
      "console console console"
    `,
    background: t.background,
    color: t.textPrimary,
    fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
    fontSize: 12,
    overflow: 'hidden',
  } as React.CSSProperties;
}

export const DataWorkspaceLayout: React.FC<DataWorkspaceLayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  commandBar,
  datasetName,
  connectionStatus,
  actions,
  tableList,
  schemaPanel,
  denseTable,
  validationMatrix,
  recordInspector,
  traceConsole,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };
  const baseStyles = useDataWorkspaceStyles(theme);

  return (
    <div
      className={`tf-layout tf-data-workspace ${className ?? ''}`}
      data-testid={testId}
      data-layout="data-workspace"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Top Command Bar */}
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
            {commandBar}
            {datasetName && (
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                  color: t.textPrimary,
                }}
              >
                {datasetName}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {connectionStatus}
            {actions}
          </div>
        </div>
      )}

      {/* Left Sidebar: TableList + SchemaPanel */}
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
            data-subpanel="table-list"
          >
            {tableList}
          </div>
          <div style={{ height: 200, overflow: 'auto', padding: 8 }} data-subpanel="schema-panel">
            {schemaPanel}
          </div>
        </div>
      )}

      {/* Main Content: DenseTable + ValidationMatrix */}
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
            padding: 0,
            fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
            fontSize: 12,
          }}
          data-subpanel="dense-table"
        >
          {denseTable ?? children}
        </div>
        {validationMatrix && (
          <div
            style={{
              height: 160,
              borderTop: `1px solid ${t.borderColor}`,
              background: t.panelBg,
              overflow: 'auto',
              padding: 8,
            }}
            data-subpanel="validation-matrix"
          >
            {validationMatrix}
          </div>
        )}
      </div>

      {/* Right Panel: RecordInspector */}
      {visibility.rightPanel && (
        <div
          style={{
            gridArea: 'inspector',
            width: sizing.rightPanelWidth,
            background: t.panelBg,
            borderLeft: `1px solid ${t.borderColor}`,
            overflow: 'auto',
            padding: 8,
          }}
          data-panel="right"
        >
          {recordInspector}
        </div>
      )}

      {/* Bottom Trace Console */}
      {visibility.bottomPanel && (
        <div
          style={{
            gridArea: 'console',
            height: sizing.bottomPanelHeight,
            background: t.raisedPanelBg,
            borderTop: `1px solid ${t.borderColor}`,
            overflow: 'hidden',
            fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
            fontSize: 11,
          }}
          data-panel="bottom"
        >
          {traceConsole}
        </div>
      )}
    </div>
  );
};

// Theme Variants
export const DataWorkspaceDark: React.FC<DataWorkspaceLayoutProps> = (props) => (
  <DataWorkspaceLayout {...props} theme="command-dark" />
);
DataWorkspaceDark.displayName = 'DataWorkspaceDark';

export const DataWorkspaceGreen: React.FC<DataWorkspaceLayoutProps> = (props) => (
  <DataWorkspaceLayout {...props} theme="field-green" />
);
DataWorkspaceGreen.displayName = 'DataWorkspaceGreen';

export const DataWorkspaceBlue: React.FC<DataWorkspaceLayoutProps> = (props) => (
  <DataWorkspaceLayout {...props} theme="deep-blue" />
);
DataWorkspaceBlue.displayName = 'DataWorkspaceBlue';

export const DataWorkspaceForge: React.FC<DataWorkspaceLayoutProps> = (props) => (
  <DataWorkspaceLayout {...props} theme="forge" />
);
DataWorkspaceForge.displayName = 'DataWorkspaceForge';

export const DataWorkspaceRedline: React.FC<DataWorkspaceLayoutProps> = (props) => (
  <DataWorkspaceLayout {...props} theme="redline" />
);
DataWorkspaceRedline.displayName = 'DataWorkspaceRedline';

export default DataWorkspaceLayout;
