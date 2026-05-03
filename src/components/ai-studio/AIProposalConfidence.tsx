/**
 * ============================================================================
 * Torafirma Design System — AIProposalConfidence
 * ============================================================================
 * AI-Assisted Studio component — AI ProposalConfidence.
 *
 * @module   ai-studio/AIProposalConfidence
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIProposalConfidence component */
export interface AIProposalConfidenceProps {
  confidence: ConfidenceLevel;
  score: number;
  showLabel?: boolean;
  size?: ComponentSize;
}

/**
 * AIProposalConfidence
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIProposalConfidence: React.FC<AIProposalConfidenceProps> = ({
  confidence,
  score,
  showLabel,
  size,
}) => {
  const confidenceConfig = {
    high: { color: '#10b981', label: 'High Confidence' },
    medium: { color: '#f59e0b', label: 'Medium Confidence' },
    low: { color: '#ef4444', label: 'Low Confidence' },
    uncertain: { color: '#6b7280', label: 'Uncertain' },
  };
  const config = confidenceConfig[confidence];

  return (
    <div className={`tf-ai-proposal-confidence tf-ai-proposal-confidence--${size || 'md'}`}>
      {showLabel && (
        <span className="tf-ai-proposal-confidence__label">{config.label}</span>
      )}
      <div className="tf-ai-proposal-confidence__bar">
        <div
          className={`tf-ai-proposal-confidence__fill tf-ai-proposal-confidence__fill--${confidence}`}
          style={{ width: `${score}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Confidence: ${score}%`}
        />
      </div>
      <span className="tf-ai-proposal-confidence__score">{score}%</span>
    </div>
  );
};

export default AIProposalConfidence;
