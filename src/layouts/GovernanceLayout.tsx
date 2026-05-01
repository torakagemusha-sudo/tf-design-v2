/**
 * @fileoverview GovernanceLayout — Governance and Audit Workspace
 *
 * Purpose-built for policy management, audit review, approval workflows,
 * authority management, violation tracking, and compliance reporting.
 *
 * Layout Diagram:
 * ```
 * +----------+-------------------------------------------+-------------+
 * |Authority | PolicySelector                  [Mode]    | Actions     |  TOP
 * |Badge     |                                             |             |
 * +----------+--------------------+------+---------------+-------------+
 * |AuditTrail| ApprovalQueue      |      | AuthorityPanel              |  MAIN
 * |          | - Pending items    |      | - Role tree                 |
 * |Policy    | - Approval chains  |      | - Permissions               |
 * |List     |                    |      | - Delegations               |
 * |          | Violations         |      | Reports                     |
 * +----------+--------------------+------+---------------+-------------+
 * | StatusBar: Last audit: 2024-01-15 | Policy v2.3 | Authority: L3   |  BOTTOM
 * +----------+-------------------------------------------+-------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export interface GovernanceLayoutProps extends LayoutBaseProps {
  authorityBadge?: React.ReactNode;
  policySelector?: React.ReactNode;
  modeSelector?: React.ReactNode;
  actions?: React.ReactNode;
  auditTrail?: React.ReactNode;
  policyList?: React.ReactNode;
  approvalQueue?: React.ReactNode;
  violationsPanel?: React.ReactNode;
  authorityPanel?: React.ReactNode;
  reportsPanel?: React.ReactNode;
  statusBar?: React.ReactNode;
}

function useGovernanceStyles(theme: TorafirmaTheme): React.CSSProperties {
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
      "sidebar main authority"
      "status status status"
    `,
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 13,
    overflow: 'hidden',
  } as React.CSSProperties;
}

export const GovernanceLayout: React.FC<GovernanceLayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  authorityBadge,
  policySelector,
  modeSelector,
  actions,
  auditTrail,
  policyList,
  approvalQueue,
  violationsPanel,
  authorityPanel,
  reportsPanel,
  statusBar,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };
  const baseStyles = useGovernanceStyles(theme);

  return (
    <div
      className={`tf-layout tf-governance ${className ?? ''}`}
      data-testid={testId}
      data-layout="governance"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Top: AuthorityBadge + PolicySelector */}
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
            {authorityBadge}
            <div style={{ width: 1, height: 24, background: t.borderColor }} />
            {policySelector}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {modeSelector}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {actions}
          </div>
        </div>
      )}

      {/* Left: AuditTrail + PolicyList */}
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
            data-subpanel="audit-trail"
          >
            {auditTrail}
          </div>
          <div style={{ height: 240, overflow: 'auto', padding: 8 }} data-subpanel="policy-list">
            {policyList}
          </div>
        </div>
      )}

      {/* Main: ApprovalQueue + Violations */}
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
            borderBottom: violationsPanel ? `1px solid ${t.borderColor}` : 'none',
          }}
          data-subpanel="approval-queue"
        >
          {approvalQueue ?? children}
        </div>
        {violationsPanel && (
          <div
            style={{
              height: 200,
              overflow: 'auto',
              background: t.panelBg,
              padding: 8,
            }}
            data-subpanel="violations"
          >
            {violationsPanel}
          </div>
        )}
      </div>

      {/* Right: AuthorityPanel + Reports */}
      {visibility.rightPanel && (
        <div
          style={{
            gridArea: 'authority',
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
            data-subpanel="authority-panel"
          >
            {authorityPanel}
          </div>
          <div style={{ height: 200, overflow: 'auto', padding: 8 }} data-subpanel="reports">
            {reportsPanel}
          </div>
        </div>
      )}

      {/* Bottom StatusBar */}
      {visibility.statusBar && (
        <div
          style={{
            gridArea: 'status',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            height: sizing.statusBarHeight,
            background: t.raisedPanelBg,
            borderTop: `1px solid ${t.borderColor}`,
            fontSize: 10,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            color: t.textMuted,
          }}
          data-panel="status"
        >
          {statusBar}
        </div>
      )}
    </div>
  );
};

// Theme Variants
export const GovernanceDark: React.FC<GovernanceLayoutProps> = (props) => (
  <GovernanceLayout {...props} theme="command-dark" />
);
GovernanceDark.displayName = 'GovernanceDark';

export const GovernanceGreen: React.FC<GovernanceLayoutProps> = (props) => (
  <GovernanceLayout {...props} theme="field-green" />
);
GovernanceGreen.displayName = 'GovernanceGreen';

export const GovernanceBlue: React.FC<GovernanceLayoutProps> = (props) => (
  <GovernanceLayout {...props} theme="deep-blue" />
);
GovernanceBlue.displayName = 'GovernanceBlue';

export const GovernanceForge: React.FC<GovernanceLayoutProps> = (props) => (
  <GovernanceLayout {...props} theme="forge" />
);
GovernanceForge.displayName = 'GovernanceForge';

export const GovernanceRedline: React.FC<GovernanceLayoutProps> = (props) => (
  <GovernanceLayout {...props} theme="redline" />
);
GovernanceRedline.displayName = 'GovernanceRedline';

export default GovernanceLayout;
