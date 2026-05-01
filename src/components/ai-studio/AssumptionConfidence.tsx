/**
 * ============================================================================
 * Torafirma Design System — AssumptionConfidence
 * ============================================================================
 * AI-Assisted Studio component — AssumptionConfidence.
 *
 * @module   ai-studio/AssumptionConfidence
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AssumptionConfidence component */
export interface AssumptionConfidenceProps {
  confidence: number;
  showValue?: boolean;
}

/**
 * AssumptionConfidence
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AssumptionConfidence: React.FC<AssumptionConfidenceProps> = ({
  confidence,
  showValue,
}) => {
  const level = confidence >= 80 ? 'high' : confidence >= 50 ? 'medium' : 'low';

  return (
    <span className={`tf-assumption-confidence tf-assumption-confidence--${level}`} title={`${confidence}% confidence`}>
      <span className="tf-assumption-confidence__badge">
        {showValue ? `${confidence}%` : level}
      </span>
    </span>
  );
};

export default AssumptionConfidence;
