/**
 * ============================================================================
 * Torafirma Design System — IntentInputHistory
 * ============================================================================
 * AI-Assisted Studio component — IntentInputHistory.
 *
 * @module   ai-studio/IntentInputHistory
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { IntentInputHistory } from './types';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the IntentInputHistory component */
export interface IntentInputHistoryProps {
  entries: IntentHistoryEntry[];
  onSelect: (entry: IntentHistoryEntry) => void;
  onClear: () => void;
  maxVisible?: number;
}

/**
 * IntentInputHistory
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 * @example
 * ```tsx
 * <IntentInputHistory />
 * ```
 */
const IntentInputHistory: React.FC<IntentInputHistoryProps> = ({
  entries,
onSelect,
onClear,
maxVisible?,
}) => {
  const visible = maxVisible ? entries.slice(0, maxVisible) : entries;

  return (
    <div className="tf-intent-input-history">
      <div className="tf-intent-input-history__header">
        <span className="tf-intent-input-history__title">Recent Intents</span>
        {entries.length > 0 && (
          <button className="tf-intent-input-history__clear" onClick={onClear} type="button">
            Clear
          </button>
        )}
      </div>
      {visible.length === 0 ? (
        <div className="tf-intent-input-history__empty">No recent intents</div>
      ) : (
        <ul className="tf-intent-input-history__list" role="list">
          {visible.map((entry) => (
            <li key={entry.id} className="tf-intent-input-history__item">
              <button
                className="tf-intent-input-history__btn"
                onClick={() => onSelect(entry)}
                type="button"
              >
                <span className="tf-intent-input-history__text">{entry.text}</span>
                <span className={\`tf-intent-input-history__status tf-intent-input-history__status--\${entry.status}\`}>
                  {entry.status}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IntentInputHistory;
