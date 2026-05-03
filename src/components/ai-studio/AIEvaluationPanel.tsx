/**
 * ============================================================================
 * Torafirma Design System — AIEvaluationPanel
 * ============================================================================
 * AI-Assisted Studio component — AI EvaluationPanel.
 *
 * @module   ai-studio/AIEvaluationPanel
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { FeedbackDimension } from './types';
import AIEvaluationDimension from './AIEvaluationDimension';
import AIEvaluationScore from './AIEvaluationScore';

/** Props for the AIEvaluationPanel component */
export interface AIEvaluationPanelProps {
  output: string;
  scores: FeedbackDimension[];
  overallScore: number;
  onScoreChange: (dimension: string, score: number) => void;
  onSubmitFeedback: () => void;
}

/**
 * AIEvaluationPanel
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIEvaluationPanel: React.FC<AIEvaluationPanelProps> = ({
  output,
  scores,
  overallScore,
  onScoreChange,
  onSubmitFeedback,
}) => {
  return (
    <div className="tf-ai-evaluation-panel">
      <div className="tf-ai-evaluation-panel__header">
        <h4 className="tf-ai-evaluation-panel__title">Evaluate Output</h4>
        <AIEvaluationScore score={overallScore} maxScore={100} size="lg" />
      </div>
      <div className="tf-ai-evaluation-panel__output">
        <h5 className="tf-ai-evaluation-panel__output-title">Output</h5>
        <pre className="tf-ai-evaluation-panel__output-text">{output}</pre>
      </div>
      <div className="tf-ai-evaluation-panel__dimensions">
        {scores.map((dim) => (
          <AIEvaluationDimension
            key={dim.name}
            dimension={dim}
            onChange={(score) => onScoreChange(dim.name, score)}
          />
        ))}
      </div>
      <button className="tf-ai-evaluation-panel__submit" onClick={onSubmitFeedback} type="button">
        Submit Evaluation
      </button>
    </div>
  );
};

export default AIEvaluationPanel;
