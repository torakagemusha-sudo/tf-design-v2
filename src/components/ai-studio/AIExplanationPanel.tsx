/**
 * ============================================================================
 * Torafirma Design System — AIExplanationPanel
 * ============================================================================
 * AI-Assisted Studio component — AI ExplanationPanel.
 *
 * @module   ai-studio/AIExplanationPanel
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ExplainabilityResult } from './types';

/** Props for the AIExplanationPanel component */
export interface AIExplanationPanelProps {
  prediction: string;
  confidence: number;
  explanations: ExplainabilityResult[];
  method: 'shap' | 'lime' | 'attention' | 'integrated-gradients';
}

/**
 * AIExplanationPanel
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIExplanationPanel: React.FC<AIExplanationPanelProps> = ({
  prediction,
  confidence,
  explanations,
  method,
}) => {
  return (
    <div className="tf-ai-explanation-panel">
      <div className="tf-ai-explanation-panel__header">
        <h4 className="tf-ai-explanation-panel__title">Explanation</h4>
        <span className="tf-ai-explanation-panel__method">{method.toUpperCase()}</span>
      </div>
      <div className="tf-ai-explanation-panel__prediction">
        <span className="tf-ai-explanation-panel__label">Prediction:</span>
        <span className="tf-ai-explanation-panel__value">{prediction}</span>
        <span className="tf-ai-explanation-panel__confidence">{(confidence * 100).toFixed(1)}%</span>
      </div>
      <div className="tf-ai-explanation-panel__explanations">
        {explanations.map((exp) => (
          <div
            key={exp.feature}
            className={`tf-ai-explanation-panel__item tf-ai-explanation-panel__item--${exp.direction}`}
          >
            <span className="tf-ai-explanation-panel__feature">{exp.feature}</span>
            <div className="tf-ai-explanation-panel__bar">
              <div
                className="tf-ai-explanation-panel__fill"
                style={{ width: `${Math.abs(exp.importance) * 100}%` }}
                role="progressbar"
                aria-valuenow={Math.abs(exp.importance)}
                aria-valuemin={0}
                aria-valuemax={1}
              />
            </div>
            <span className="tf-ai-explanation-panel__importance">
              {(Math.abs(exp.importance) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIExplanationPanel;
