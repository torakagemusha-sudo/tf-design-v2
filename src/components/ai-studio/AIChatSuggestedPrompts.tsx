/**
 * ============================================================================
 * Torafirma Design System — AIChatSuggestedPrompts
 * ============================================================================
 * AI-Assisted Studio component — AI ChatSuggestedPrompts.
 *
 * @module   ai-studio/AIChatSuggestedPrompts
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { SuggestedPrompt } from './types';

/** Props for the AIChatSuggestedPrompts component */
export interface AIChatSuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onSelect: (prompt: SuggestedPrompt) => void;
  title?: string;
}

/**
 * AIChatSuggestedPrompts
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIChatSuggestedPrompts: React.FC<AIChatSuggestedPromptsProps> = ({
  prompts,
  onSelect,
  title,
}) => {
  if (prompts.length === 0) return null;

  return (
    <div className="tf-ai-chat-suggested-prompts">
      <h4 className="tf-ai-chat-suggested-prompts__title">{title || 'Try asking'}</h4>
      <div className="tf-ai-chat-suggested-prompts__list">
        {prompts.map((prompt) => (
          <button
            key={prompt.id}
            className="tf-ai-chat-suggested-prompts__chip"
            onClick={() => onSelect(prompt)}
            type="button"
          >
            <span className="tf-ai-chat-suggested-prompts__chip-label">{prompt.label}</span>
            {prompt.category && (
              <span className="tf-ai-chat-suggested-prompts__chip-category">{prompt.category}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIChatSuggestedPrompts;
