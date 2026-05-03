/**
 * ============================================================================
 * Torafirma Design System — SuggestionQueue
 * ============================================================================
 * AI-Assisted Studio component — SuggestionQueue.
 *
 * @module   ai-studio/SuggestionQueue
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AISuggestion } from './types';
import SuggestionQueueActions from './SuggestionQueueActions';
import SuggestionQueueItem from './SuggestionQueueItem';

/** Props for the SuggestionQueue component */
export interface SuggestionQueueProps {
  suggestions: AISuggestion[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onDefer: (id: string) => void;
  onSelect: (suggestion: AISuggestion) => void;
  selectedId?: string;
  title?: string;
}

/**
 * SuggestionQueue
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const SuggestionQueue: React.FC<SuggestionQueueProps> = ({
  suggestions,
  onAccept,
  onReject,
  onDefer,
  onSelect,
  selectedId,
  title,
}) => {
  return (
    <div className="tf-suggestion-queue">
      <div className="tf-suggestion-queue__header">
        <h3 className="tf-suggestion-queue__title">{title || 'Suggestions'}</h3>
        <span className="tf-suggestion-queue__count">{suggestions.length}</span>
      </div>
      <SuggestionQueueActions
        suggestions={suggestions}
        onAcceptAll={() => suggestions.filter((s) => s.status === 'new').forEach((s) => onAccept(s.id))}
        onRejectAll={() => suggestions.filter((s) => s.status === 'new').forEach((s) => onReject(s.id))}
      />
      <div className="tf-suggestion-queue__list" role="list">
        {suggestions.map((suggestion) => (
          <SuggestionQueueItem
            key={suggestion.id}
            suggestion={suggestion}
            isSelected={selectedId === suggestion.id}
            onAccept={() => onAccept(suggestion.id)}
            onReject={() => onReject(suggestion.id)}
            onDefer={() => onDefer(suggestion.id)}
            onClick={() => onSelect(suggestion)}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionQueue;
