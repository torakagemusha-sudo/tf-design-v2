/**
 * ============================================================================
 * Torafirma Design System — AILimeExplanation
 * ============================================================================
 * AI-Assisted Studio component — AI LimeExplanation.
 *
 * @module   ai-studio/AILimeExplanation
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AILimeExplanation component */
export interface AILimeExplanationProps {
  features: { name: string; weight: number }[];
  intercept: number;
  prediction: string;
}

/**
 * AILimeExplanation
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AILimeExplanation: React.FC<AILimeExplanationProps> = ({
  features,
  intercept,
  prediction,
}) => {
  const sorted = [...features].sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));

  return (
    <div className="tf-ai-lime-explanation">
      <div className="tf-ai-lime-explanation__header">
        <h4 className="tf-ai-lime-explanation__title">LIME Explanation</h4>
        <span className="tf-ai-lime-explanation__prediction">Prediction: {prediction}</span>
        <span className="tf-ai-lime-explanation__intercept">Intercept: {intercept.toFixed(4)}</span>
      </div>
      <div className="tf-ai-lime-explanation__features">
        {sorted.map((feature) => (
          <div
            key={feature.name}
            className={`tf-ai-lime-explanation__feature tf-ai-lime-explanation__feature--${feature.weight >= 0 ? 'positive' : 'negative'}`}
          >
            <span className="tf-ai-lime-explanation__name">{feature.name}</span>
            <div className="tf-ai-lime-explanation__bar">
              <div
                className="tf-ai-lime-explanation__fill"
                style={{ width: `${Math.min(Math.abs(feature.weight) * 100, 100)}%` }}
              />
            </div>
            <span className="tf-ai-lime-explanation__weight">
              {feature.weight >= 0 ? '+' : ''}{feature.weight.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AILimeExplanation;
