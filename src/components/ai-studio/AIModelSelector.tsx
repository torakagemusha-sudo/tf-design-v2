/**
 * ============================================================================
 * Torafirma Design System — AIModelSelector
 * ============================================================================
 * AI-Assisted Studio component — AI ModelSelector.
 *
 * @module   ai-studio/AIModelSelector
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIModel } from './types';

/** Props for the AIModelSelector component */
export interface AIModelSelectorProps {
  models: AIModel[];
  selectedId?: string;
  onSelect: (modelId: string) => void;
  disabled?: boolean;
  showDetails?: boolean;
}

/**
 * AIModelSelector
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIModelSelector: React.FC<AIModelSelectorProps> = ({
  models,
  selectedId,
  onSelect,
  disabled,
  showDetails,
}) => {
  return (
    <div className="tf-ai-model-selector">
      <label className="tf-ai-model-selector__label" htmlFor="ai-model-select">Model</label>
      <select
        id="ai-model-select"
        className="tf-ai-model-selector__dropdown"
        value={selectedId || ''}
        onChange={(e) => onSelect(e.target.value)}
        disabled={disabled}
        aria-label="Select AI model"
      >
        <option value="">Select a model...</option>
        {models.map((model) => (
          <option key={model.id} value={model.id} disabled={model.status === 'unavailable'}>
            {model.name} ({model.provider}) {model.status === 'degraded' ? '⚠' : ''}
          </option>
        ))}
      </select>
      {showDetails && selectedId && (
        <div className="tf-ai-model-selector__details">
          {models
            .filter((m) => m.id === selectedId)
            .map((model) => (
              <AIModelInfo key={model.id} model={model} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AIModelSelector;
