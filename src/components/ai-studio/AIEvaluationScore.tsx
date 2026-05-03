/**
 * ============================================================================
 * Torafirma Design System — AIEvaluationScore
 * ============================================================================
 * AI-Assisted Studio component — AI EvaluationScore.
 *
 * @module   ai-studio/AIEvaluationScore
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIEvaluationScore component */
export interface AIEvaluationScoreProps {
  score: number;
  maxScore: number;
  size?: ComponentSize;
  showLabel?: boolean;
}

/**
 * AIEvaluationScore
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIEvaluationScore: React.FC<AIEvaluationScoreProps> = ({
  score,
  maxScore,
  size,
  showLabel,
}) => {
  const percentage = Math.round((score / maxScore) * 100);
  const level = percentage >= 80 ? 'high' : percentage >= 50 ? 'medium' : 'low';

  return (
    <div className={`tf-ai-evaluation-score tf-ai-evaluation-score--${size || 'md'}`}>
      <div className={`tf-ai-evaluation-score__ring tf-ai-evaluation-score__ring--${level}`}>
        <span className="tf-ai-evaluation-score__value">{percentage}</span>
        <span className="tf-ai-evaluation-score__pct">%</span>
      </div>
      {showLabel && (
        <span className="tf-ai-evaluation-score__label">Quality Score</span>
      )}
    </div>
  );
};

export default AIEvaluationScore;
