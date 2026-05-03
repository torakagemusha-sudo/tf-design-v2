/**
 * ============================================================================
 * Torafirma Design System — AIModelInfo
 * ============================================================================
 * AI-Assisted Studio component — AI ModelInfo.
 *
 * @module   ai-studio/AIModelInfo
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIModel } from './types';
import AIModelCapabilities from './AIModelCapabilities';
import AIModelStatus from './AIModelStatus';

/** Props for the AIModelInfo component */
export interface AIModelInfoProps {
  model: AIModel;
  compact?: boolean;
}

/**
 * AIModelInfo
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIModelInfo: React.FC<AIModelInfoProps> = ({
  model,
  compact,
}) => {
  return (
    <div className={`tf-ai-model-info tf-ai-model-info--${compact ? 'compact' : 'full'}`}>
      <div className="tf-ai-model-info__header">
        <h4 className="tf-ai-model-info__name">{model.name}</h4>
        <AIModelStatus status={model.status} />
      </div>
      <p className="tf-ai-model-info__desc">{model.description}</p>
      <div className="tf-ai-model-info__specs">
        <span className="tf-ai-model-info__spec">Provider: {model.provider}</span>
        <span className="tf-ai-model-info__spec">Version: {model.version}</span>
        <span className="tf-ai-model-info__spec">Context: {model.contextWindow.toLocaleString()} tokens</span>
        <span className="tf-ai-model-info__spec">Max: {model.maxTokens.toLocaleString()} tokens</span>
      </div>
      {!compact && (
        <AIModelCapabilities capabilities={model.capabilities} />
      )}
    </div>
  );
};

export default AIModelInfo;
