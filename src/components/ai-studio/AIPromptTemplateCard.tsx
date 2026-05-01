/**
 * ============================================================================
 * Torafirma Design System — AIPromptTemplateCard
 * ============================================================================
 * AI-Assisted Studio component — AI PromptTemplateCard.
 *
 * @module   ai-studio/AIPromptTemplateCard
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { PromptTemplate } from './types';

/** Props for the AIPromptTemplateCard component */
export interface AIPromptTemplateCardProps {
  template: PromptTemplate;
  isSelected?: boolean;
  onClick: () => void;
}

/**
 * AIPromptTemplateCard
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIPromptTemplateCard: React.FC<AIPromptTemplateCardProps> = ({
  template,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`tf-ai-prompt-template-card${isSelected ? ' tf-ai-prompt-template-card--selected' : ''}`}
      onClick={onClick}
      role="listitem"
      tabIndex={0}
    >
      <h5 className="tf-ai-prompt-template-card__name">{template.name}</h5>
      <p className="tf-ai-prompt-template-card__desc">{template.description}</p>
      <div className="tf-ai-prompt-template-card__meta">
        <span className="tf-ai-prompt-template-card__vars">
          {template.variables.length} variable{template.variables.length !== 1 ? 's' : ''}
        </span>
        <span className="tf-ai-prompt-template-card__category">{template.category}</span>
        {template.isSystem && (
          <span className="tf-ai-prompt-template-card__badge tf-ai-prompt-template-card__badge--system">
            System
          </span>
        )}
      </div>
    </div>
  );
};

export default AIPromptTemplateCard;
