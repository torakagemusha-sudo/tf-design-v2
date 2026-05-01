/**
 * @fileoverview AIStudioLayout — AI Model Development Studio
 *
 * Purpose-built for AI-assisted development: model selection, parameter tuning,
 * intent input, prompt management, chat interfaces, proposal cards, model
 * configuration, evaluation metrics, and token/cost tracking.
 *
 * Layout Diagram:
 * ```
 * +----------+-------------------------------------------+-------------+
 * |Model     | ParameterBar: Temperature | Top-p | MaxTok|  Actions     |  TOP
 * |Selector  |                                             |             |
 * +----------+--------------------+------+---------------+-------------+
 * |Intent    | ChatPanel          |      | ModelConfig                 |  MAIN
 * |Input     | - Messages         |      | - Temperature               |
 * |          | - AI responses     |      | - Top-p                     |
 * |Prompt    |                    |      | - Max tokens                |
 * |Templates | ProposalCards      |      | Evaluation                  |
 * |          | - Diff previews    |      | - Metrics                   |
 * +----------+--------------------+------+---------------+-------------+
 * | TokenUsage: 4.2K tokens | $0.0032 | Context: 78%                |  BOTTOM
 * +----------+-------------------------------------------+-------------+
 * ```
 */

import React from 'react';
import type { LayoutBaseProps, TorafirmaTheme } from './types';
import { buildThemeCSS, THEME_TOKENS } from './types';
import { useLayout } from './useLayout';

export interface AIStudioLayoutProps extends LayoutBaseProps {
  modelSelector?: React.ReactNode;
  parameterBar?: React.ReactNode;
  actions?: React.ReactNode;
  intentInput?: React.ReactNode;
  promptTemplates?: React.ReactNode;
  chatPanel?: React.ReactNode;
  proposalCards?: React.ReactNode;
  modelConfig?: React.ReactNode;
  evaluationPanel?: React.ReactNode;
  tokenUsage?: React.ReactNode;
  costBar?: React.ReactNode;
}

function useAIStudioStyles(theme: TorafirmaTheme): React.CSSProperties {
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
      "sidebar chat config"
      "tokens tokens tokens"
    `,
    background: t.background,
    color: t.textPrimary,
    fontFamily: 'Inter, "IBM Plex Sans", system-ui, sans-serif',
    fontSize: 13,
    overflow: 'hidden',
  } as React.CSSProperties;
}

export const AIStudioLayout: React.FC<AIStudioLayoutProps> = ({
  theme: propTheme,
  panelVisibility,
  panelSizing,
  className,
  style,
  children,
  modelSelector,
  parameterBar,
  actions,
  intentInput,
  promptTemplates,
  chatPanel,
  proposalCards,
  modelConfig,
  evaluationPanel,
  tokenUsage,
  costBar,
  testId,
}) => {
  const { state } = useLayout();
  const theme = propTheme ?? state.theme;
  const t = THEME_TOKENS[theme];
  const visibility = { ...state.panelVisibility, ...panelVisibility };
  const sizing = { ...state.panelSizing, ...panelSizing };
  const baseStyles = useAIStudioStyles(theme);

  return (
    <div
      className={`tf-layout tf-ai-studio ${className ?? ''}`}
      data-testid={testId}
      data-layout="ai-studio"
      data-theme={theme}
      style={{ ...baseStyles, ...style }}
    >
      {/* Top: ModelSelector + ParameterBar */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 200 }}>
            {modelSelector}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {parameterBar}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {actions}
          </div>
        </div>
      )}

      {/* Left: IntentInput + PromptTemplates */}
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
              padding: 12,
              borderBottom: `1px solid ${t.borderColor}`,
              minHeight: 80,
            }}
            data-subpanel="intent-input"
          >
            {intentInput}
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 8 }} data-subpanel="prompt-templates">
            {promptTemplates}
          </div>
        </div>
      )}

      {/* Main: ChatPanel + ProposalCards */}
      <div
        style={{
          gridArea: 'chat',
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
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
          data-subpanel="chat-panel"
        >
          {chatPanel ?? children}
        </div>
        {proposalCards && (
          <div
            style={{
              maxHeight: 240,
              overflow: 'auto',
              borderTop: `1px solid ${t.borderColor}`,
              background: t.panelBg,
              padding: 8,
            }}
            data-subpanel="proposal-cards"
          >
            {proposalCards}
          </div>
        )}
      </div>

      {/* Right: ModelConfig + Evaluation */}
      {visibility.rightPanel && (
        <div
          style={{
            gridArea: 'config',
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
            data-subpanel="model-config"
          >
            {modelConfig}
          </div>
          <div style={{ height: 200, overflow: 'auto', padding: 8 }} data-subpanel="evaluation">
            {evaluationPanel}
          </div>
        </div>
      )}

      {/* Bottom: TokenUsage + CostBar */}
      {visibility.bottomPanel && (
        <div
          style={{
            gridArea: 'tokens',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            height: sizing.bottomPanelHeight,
            background: t.raisedPanelBg,
            borderTop: `1px solid ${t.borderColor}`,
            fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace',
            fontSize: 11,
            letterSpacing: '0.04em',
          }}
          data-panel="bottom"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {tokenUsage}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {costBar}
          </div>
        </div>
      )}
    </div>
  );
};

// Theme Variants
export const AIStudioDark: React.FC<AIStudioLayoutProps> = (props) => (
  <AIStudioLayout {...props} theme="command-dark" />
);
AIStudioDark.displayName = 'AIStudioDark';

export const AIStudioGreen: React.FC<AIStudioLayoutProps> = (props) => (
  <AIStudioLayout {...props} theme="field-green" />
);
AIStudioGreen.displayName = 'AIStudioGreen';

export const AIStudioBlue: React.FC<AIStudioLayoutProps> = (props) => (
  <AIStudioLayout {...props} theme="deep-blue" />
);
AIStudioBlue.displayName = 'AIStudioBlue';

export const AIStudioForge: React.FC<AIStudioLayoutProps> = (props) => (
  <AIStudioLayout {...props} theme="forge" />
);
AIStudioForge.displayName = 'AIStudioForge';

export const AIStudioRedline: React.FC<AIStudioLayoutProps> = (props) => (
  <AIStudioLayout {...props} theme="redline" />
);
AIStudioRedline.displayName = 'AIStudioRedline';

export default AIStudioLayout;
