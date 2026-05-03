/**
 * ============================================================================
 * Torafirma Design System — AIModelComparison
 * ============================================================================
 * AI-Assisted Studio component — AI ModelComparison.
 *
 * @module   ai-studio/AIModelComparison
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import AILatencyIndicator from './AILatencyIndicator';
import AIRerunButton from './AIRerunButton';

/** Props for the AIModelComparison component */
export interface AIModelComparisonProps {
  comparisons: { modelId: string; modelName: string; output: string; latencyMs: number; tokenCount: number }[];
  onSelectWinner: (modelId: string) => void;
  onRerun: (modelId: string) => void;
}

/**
 * AIModelComparison
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIModelComparison: React.FC<AIModelComparisonProps> = ({
  comparisons,
  onSelectWinner,
  onRerun,
}) => {
  return (
    <div className="tf-ai-model-comparison">
      <h4 className="tf-ai-model-comparison__title">Model Comparison</h4>
      <div className="tf-ai-model-comparison__grid">
        {comparisons.map((comp) => (
          <div key={comp.modelId} className="tf-ai-model-comparison__card">
            <div className="tf-ai-model-comparison__header">
              <span className="tf-ai-model-comparison__name">{comp.modelName}</span>
              <AILatencyIndicator latencyMs={comp.latencyMs} showValue />
            </div>
            <div className="tf-ai-model-comparison__output">
              <pre className="tf-ai-model-comparison__text">{comp.output}</pre>
            </div>
            <div className="tf-ai-model-comparison__meta">
              <span className="tf-ai-model-comparison__tokens">{comp.tokenCount.toLocaleString()} tokens</span>
            </div>
            <div className="tf-ai-model-comparison__actions">
              <button
                className="tf-ai-model-comparison__winner"
                onClick={() => onSelectWinner(comp.modelId)}
                type="button"
              >
                Select
              </button>
              <AIRerunButton onClick={() => onRerun(comp.modelId)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIModelComparison;
