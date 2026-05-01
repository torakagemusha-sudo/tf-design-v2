/**
 * ============================================================================
 * Torafirma Design System — AIPromptTemplate
 * ============================================================================
 * AI-Assisted Studio component — AI PromptTemplate.
 *
 * @module   ai-studio/AIPromptTemplate
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { PromptTemplate } from './types';

/** Props for the AIPromptTemplate component */
export interface AIPromptTemplateProps {
  templates: PromptTemplate[];
  selectedId?: string;
  onSelect: (templateId: string) => void;
  onCreateNew?: () => void;
  filterCategory?: string;
}

/**
 * AIPromptTemplate
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIPromptTemplate: React.FC<AIPromptTemplateProps> = ({
  templates,
  selectedId,
  onSelect,
  onCreateNew,
  filterCategory,
}) => {
  const filtered = filterCategory
    ? templates.filter((t) => t.category === filterCategory)
    : templates;
  const categories = [...new Set(templates.map((t) => t.category))];

  return (
    <div className="tf-ai-prompt-template">
      <div className="tf-ai-prompt-template__header">
        <h4 className="tf-ai-prompt-template__title">Prompt Templates</h4>
        {onCreateNew && (
          <button className="tf-ai-prompt-template__create" onClick={onCreateNew} type="button">
            + New
          </button>
        )}
      </div>
      <div className="tf-ai-prompt-template__categories">
        {categories.map((cat) => (
          <span key={cat} className="tf-ai-prompt-template__category">{cat}</span>
        ))}
      </div>
      <div className="tf-ai-prompt-template__list" role="list">
        {filtered.map((template) => (
          <AIPromptTemplateCard
            key={template.id}
            template={template}
            isSelected={selectedId === template.id}
            onClick={() => onSelect(template.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AIPromptTemplate;
