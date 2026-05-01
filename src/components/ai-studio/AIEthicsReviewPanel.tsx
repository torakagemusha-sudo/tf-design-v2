/**
 * ============================================================================
 * Torafirma Design System — AIEthicsReviewPanel
 * ============================================================================
 * AI-Assisted Studio component — AI EthicsReviewPanel.
 *
 * @module   ai-studio/AIEthicsReviewPanel
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { EthicsReviewItem } from './types';

/** Props for the AIEthicsReviewPanel component */
export interface AIEthicsReviewPanelProps {
  items: EthicsReviewItem[];
  onUpdate: (id: string, status: EthicsReviewItem['status']) => void;
  onAddEvidence: (id: string, evidence: string) => void;
  onSubmitReview: () => void;
}

/**
 * AIEthicsReviewPanel
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIEthicsReviewPanel: React.FC<AIEthicsReviewPanelProps> = ({
  items,
  onUpdate,
  onAddEvidence,
  onSubmitReview,
}) => {
  const passed = items.filter((i) => i.status === 'passed').length;
  const failed = items.filter((i) => i.status === 'failed').length;

  return (
    <div className="tf-ai-ethics-review-panel">
      <div className="tf-ai-ethics-review-panel__header">
        <h4 className="tf-ai-ethics-review-panel__title">Ethics Review</h4>
        <div className="tf-ai-ethics-review-panel__summary">
          <span className="tf-ai-ethics-review-panel__passed">{passed} passed</span>
          {failed > 0 && (
            <span className="tf-ai-ethics-review-panel__failed">{failed} failed</span>
          )}
        </div>
      </div>
      <div className="tf-ai-ethics-review-panel__list">
        {items.map((item) => (
          <div
            key={item.id}
            className={`tf-ai-ethics-review-panel__item tf-ai-ethics-review-panel__item--${item.status}`}
          >
            <div className="tf-ai-ethics-review-panel__principle">
              <span className="tf-ai-ethics-review-panel__principle-name">{item.principle}</span>
              <span className="tf-ai-ethics-review-panel__status">{item.status}</span>
            </div>
            <p className="tf-ai-ethics-review-panel__question">{item.question}</p>
            <div className="tf-ai-ethics-review-panel__actions">
              {(['pending', 'passed', 'failed', 'na'] as const).map((s) => (
                <button
                  key={s}
                  className={`tf-ai-ethics-review-panel__status-btn tf-ai-ethics-review-panel__status-btn--${s}${item.status === s ? ' tf-ai-ethics-review-panel__status-btn--active' : ''}`}
                  onClick={() => onUpdate(item.id, s)}
                  type="button"
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
            {item.evidence && (
              <p className="tf-ai-ethics-review-panel__evidence">{item.evidence}</p>
            )}
            {item.notes && (
              <p className="tf-ai-ethics-review-panel__notes">{item.notes}</p>
            )}
          </div>
        ))}
      </div>
      <button className="tf-ai-ethics-review-panel__submit" onClick={onSubmitReview} type="button">
        Submit Ethics Review
      </button>
    </div>
  );
};

export default AIEthicsReviewPanel;
