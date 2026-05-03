/**
 * ============================================================================
 * Torafirma Design System — AIContextItem
 * ============================================================================
 * AI-Assisted Studio component — AI ContextItem.
 *
 * @module   ai-studio/AIContextItem
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import AIContextPriority from './AIContextPriority';

/** Props for the AIContextItem component */
export interface AIContextItemProps {
  item: {
  id: string;
  label: string;
  type: string;
  isSelected: boolean;
  priority?: number;
  description?: string;
};
  onToggle: () => void;
}

/**
 * AIContextItem
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIContextItem: React.FC<AIContextItemProps> = ({
  item,
  onToggle,
}) => {
  return (
    <div
      className={`tf-ai-context-item tf-ai-context-item--${item.type}${item.isSelected ? ' tf-ai-context-item--selected' : ''}`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={item.isSelected}
      tabIndex={0}
    >
      <span className="tf-ai-context-item__checkbox" aria-hidden="true">
        {item.isSelected ? '☑' : '☐'}
      </span>
      <div className="tf-ai-context-item__content">
        <span className="tf-ai-context-item__label">{item.label}</span>
        {item.description && (
          <span className="tf-ai-context-item__desc">{item.description}</span>
        )}
      </div>
      <AIContextPriority priority={item.priority || 0} />
      <span className="tf-ai-context-item__type">{item.type}</span>
    </div>
  );
};

export default AIContextItem;
