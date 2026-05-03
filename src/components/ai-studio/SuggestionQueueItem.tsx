/**
 * ============================================================================
 * Torafirma Design System — SuggestionQueueItem
 * ============================================================================
 * AI-Assisted Studio component — SuggestionQueueItem.
 *
 * @module   ai-studio/SuggestionQueueItem
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AISuggestion, SuggestionPriority } from './types';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';
import SuggestionQueuePriority from './SuggestionQueuePriority';

/** Props for the SuggestionQueueItem component */
export interface SuggestionQueueItemProps {
  suggestion: AISuggestion;
  isSelected?: boolean;
  onAccept: () => void;
  onReject: () => void;
  onDefer: () => void;
  onClick: () => void;
}

/**
 * SuggestionQueueItem
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const SuggestionQueueItem: React.FC<SuggestionQueueItemProps> = ({
  suggestion,
  isSelected,
  onAccept,
  onReject,
  onDefer,
  onClick,
}) => {
  return (
    <div
      className={`tf-suggestion-queue-item tf-suggestion-queue-item--${suggestion.status}${isSelected ? ' tf-suggestion-queue-item--selected' : ''}`}
      onClick={onClick}
      role="listitem"
    >
      <SuggestionQueuePriority priority={suggestion.priority} />
      <div className="tf-suggestion-queue-item__content">
        <span className="tf-suggestion-queue-item__title">{suggestion.title}</span>
        <span className="tf-suggestion-queue-item__desc">{suggestion.description}</span>
        <span className="tf-suggestion-queue-item__meta">
          <span className="tf-suggestion-queue-item__category">{suggestion.category}</span>
          <span className="tf-suggestion-queue-item__confidence">{suggestion.confidence}% confidence</span>
        </span>
      </div>
      <div className="tf-suggestion-queue-item__actions">
        <AcceptButton onClick={(e) => { e?.stopPropagation(); onAccept(); }} size="sm" />
        <RejectButton onClick={(e) => { e?.stopPropagation(); onReject(); }} size="sm" />
        <button className="tf-suggestion-queue-item__defer" onClick={(e) => { e.stopPropagation(); onDefer(); }} type="button">
          Later
        </button>
      </div>
    </div>
  );
};

export default SuggestionQueueItem;
