/**
 * ============================================================================
 * Torafirma Design System — AIEvaluationDimension
 * ============================================================================
 * AI-Assisted Studio component — AI EvaluationDimension.
 *
 * @module   ai-studio/AIEvaluationDimension
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { FeedbackDimension } from './types';

/** Props for the AIEvaluationDimension component */
export interface AIEvaluationDimensionProps {
  dimension: FeedbackDimension;
  onChange: (score: number) => void;
}

/**
 * AIEvaluationDimension
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIEvaluationDimension: React.FC<AIEvaluationDimensionProps> = ({
  dimension,
  onChange,
}) => {
  return (
    <div className="tf-ai-evaluation-dimension">
      <div className="tf-ai-evaluation-dimension__header">
        <span className="tf-ai-evaluation-dimension__name">{dimension.name}</span>
        <span className="tf-ai-evaluation-dimension__score">
          {dimension.score} / {dimension.maxScore}
        </span>
      </div>
      {dimension.description && (
        <p className="tf-ai-evaluation-dimension__desc">{dimension.description}</p>
      )}
      <input
        type="range"
        className="tf-ai-evaluation-dimension__slider"
        min={0}
        max={dimension.maxScore}
        value={dimension.score}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        aria-label={`Score for ${dimension.name}`}
      />
    </div>
  );
};

export default AIEvaluationDimension;
