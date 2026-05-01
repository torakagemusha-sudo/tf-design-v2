/**
 * ============================================================================
 * Torafirma Design System — AITokenUsage
 * ============================================================================
 * AI-Assisted Studio component — AI TokenUsage.
 *
 * @module   ai-studio/AITokenUsage
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { TokenUsage } from './types';

/** Props for the AITokenUsage component */
export interface AITokenUsageProps {
  usage: TokenUsage;
  showBreakdown?: boolean;
  showCosts?: boolean;
}

/**
 * AITokenUsage
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AITokenUsage: React.FC<AITokenUsageProps> = ({
  usage,
  showBreakdown,
  showCosts,
}) => {
  return (
    <div className="tf-ai-token-usage">
      <div className="tf-ai-token-usage__summary">
        <span className="tf-ai-token-usage__total">
          {usage.totalTokens.toLocaleString()} tokens
        </span>
      </div>
      {showBreakdown && (
        <div className="tf-ai-token-usage__breakdown">
          <span className="tf-ai-token-usage__prompt">Prompt: {usage.promptTokens.toLocaleString()}</span>
          <span className="tf-ai-token-usage__completion">Completion: {usage.completionTokens.toLocaleString()}</span>
        </div>
      )}
      {showCosts && (
        <div className="tf-ai-token-usage__costs">
          <span className="tf-ai-token-usage__cost-total">${usage.totalCost.toFixed(4)}</span>
          {showBreakdown && (
            <>
              <span className="tf-ai-token-usage__cost-prompt">In: ${usage.promptCost.toFixed(4)}</span>
              <span className="tf-ai-token-usage__cost-completion">Out: ${usage.completionCost.toFixed(4)}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AITokenUsage;
