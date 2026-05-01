/**
 * ============================================================================
 * Torafirma Design System — AICostEstimator
 * ============================================================================
 * AI-Assisted Studio component — AI CostEstimator.
 *
 * @module   ai-studio/AICostEstimator
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { CostEstimate } from './types';

/** Props for the AICostEstimator component */
export interface AICostEstimatorProps {
  estimate: CostEstimate;
  isLoading?: boolean;
}

/**
 * AICostEstimator
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AICostEstimator: React.FC<AICostEstimatorProps> = ({
  estimate,
  isLoading,
}) => {
  return (
    <div className="tf-ai-cost-estimator">
      <span className="tf-ai-cost-estimator__label">Estimated cost:</span>
      {isLoading ? (
        <span className="tf-ai-cost-estimator__loading">Calculating...</span>
      ) : (
        <span className="tf-ai-cost-estimator__value">
          {estimate.currency === 'USD' ? '$' : estimate.currency}
          {estimate.estimatedCost.toFixed(4)}
          <span className="tf-ai-cost-estimator__range">
            ({estimate.minTokens.toLocaleString()} - {estimate.maxTokens.toLocaleString()} tokens)
          </span>
        </span>
      )}
    </div>
  );
};

export default AICostEstimator;
