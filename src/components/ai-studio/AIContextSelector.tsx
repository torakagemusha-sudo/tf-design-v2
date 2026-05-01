/**
 * ============================================================================
 * Torafirma Design System — AIContextSelector
 * ============================================================================
 * AI-Assisted Studio component — AI ContextSelector.
 *
 * @module   ai-studio/AIContextSelector
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIContextItem as AIContextItemType } from './types';
import AIContextItem from './AIContextItem';

/** Props for the AIContextSelector component */
export interface AIContextSelectorProps {
  items: AIContextItemType[];
  onToggle: (id: string) => void;
  onReorder: (ids: string[]) => void;
  onClearAll: () => void;
}

/**
 * AIContextSelector
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIContextSelector: React.FC<AIContextSelectorProps> = ({
  items,
  onToggle,
  onReorder,
  onClearAll,
}) => {
  const selected = items.filter((i) => i.isSelected);

  return (
    <div className="tf-ai-context-selector">
      <div className="tf-ai-context-selector__header">
        <h4 className="tf-ai-context-selector__title">Context</h4>
        <span className="tf-ai-context-selector__count">{selected.length} selected</span>
        {selected.length > 0 && (
          <button className="tf-ai-context-selector__clear" onClick={onClearAll} type="button">
            Clear all
          </button>
        )}
      </div>
      <div className="tf-ai-context-selector__list" role="list">
        {items.map((item) => (
          <AIContextItem
            key={item.id}
            item={item}
            onToggle={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AIContextSelector;
