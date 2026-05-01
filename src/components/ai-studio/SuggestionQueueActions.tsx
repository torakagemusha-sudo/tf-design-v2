/**
 * ============================================================================
 * Torafirma Design System — SuggestionQueueActions
 * ============================================================================
 * AI-Assisted Studio component — SuggestionQueueActions.
 *
 * @module   ai-studio/SuggestionQueueActions
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AISuggestion } from './types';

/** Props for the SuggestionQueueActions component */
export interface SuggestionQueueActionsProps {
  suggestions: AISuggestion[];
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

/**
 * SuggestionQueueActions
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const SuggestionQueueActions: React.FC<SuggestionQueueActionsProps> = ({
  suggestions,
  onAcceptAll,
  onRejectAll,
}) => {
  const newCount = suggestions.filter((s) => s.status === 'new').length;

  return (
    <div className="tf-suggestion-queue-actions" role="group" aria-label="Batch suggestion actions">
      <span className="tf-suggestion-queue-actions__count">{newCount} pending</span>
      <button
        className="tf-suggestion-queue-actions__btn tf-suggestion-queue-actions__btn--accept"
        onClick={onAcceptAll}
        disabled={newCount === 0}
        type="button"
      >
        Accept All
      </button>
      <button
        className="tf-suggestion-queue-actions__btn tf-suggestion-queue-actions__btn--reject"
        onClick={onRejectAll}
        disabled={newCount === 0}
        type="button"
      >
        Reject All
      </button>
    </div>
  );
};

export default SuggestionQueueActions;
