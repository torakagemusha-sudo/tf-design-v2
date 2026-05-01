/**
 * ============================================================================
 * Torafirma Design System — IntentInputSuggestion
 * ============================================================================
 * AI-Assisted Studio component — IntentInputSuggestion.
 *
 * @module   ai-studio/IntentInputSuggestion
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { IntentInputSuggestion } from './types';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the IntentInputSuggestion component */
export interface IntentInputSuggestionProps {
  suggestions: IntentSuggestion[];
  onSelect: (suggestion: IntentSuggestion) => void;
  highlightedIndex?: number;
  visible?: boolean;
}

/**
 * IntentInputSuggestion
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 * @example
 * ```tsx
 * <IntentInputSuggestion />
 * ```
 */
const IntentInputSuggestion: React.FC<IntentInputSuggestionProps> = ({
  suggestions,
onSelect,
highlightedIndex?,
visible?,
}) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="tf-intent-input-suggestion" role="listbox" aria-label="Intent suggestions">
      <ul className="tf-intent-input-suggestion__list">
        {suggestions.map((s, i) => (
          <li
            key={s.id}
            className={\`tf-intent-input-suggestion__item\${i === highlightedIndex ? ' tf-intent-input-suggestion__item--highlighted' : ''}\`}
            role="option"
            aria-selected={i === highlightedIndex}
            onClick={() => onSelect(s)}
          >
            {s.icon && (
              <span className="tf-intent-input-suggestion__icon" aria-hidden="true">
                {s.icon}
              </span>
            )}
            <div className="tf-intent-input-suggestion__content">
              <span className="tf-intent-input-suggestion__label">{s.label}</span>
              {s.description && (
                <span className="tf-intent-input-suggestion__desc">{s.description}</span>
              )}
            </div>
            {s.category && (
              <span className="tf-intent-input-suggestion__category">{s.category}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IntentInputSuggestion;
