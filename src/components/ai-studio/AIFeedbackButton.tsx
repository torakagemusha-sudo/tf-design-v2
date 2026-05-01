/**
 * ============================================================================
 * Torafirma Design System — AIFeedbackButton
 * ============================================================================
 * AI-Assisted Studio component — AI FeedbackButton.
 *
 * @module   ai-studio/AIFeedbackButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIFeedbackButton component */
export interface AIFeedbackButtonProps {
  onFeedback: (rating: 'positive' | 'negative') => void;
  disabled?: boolean;
}

/**
 * AIFeedbackButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIFeedbackButton: React.FC<AIFeedbackButtonProps> = ({
  onFeedback,
  disabled,
}) => {
  return (
    <div className="tf-ai-feedback-button" role="group" aria-label="Rate this response">
      <button
        className="tf-ai-feedback-button__btn tf-ai-feedback-button__btn--up"
        onClick={() => onFeedback('positive')}
        disabled={disabled}
        type="button"
        aria-label="Thumbs up"
        title="Helpful"
      >
        <span className="tf-ai-feedback-button__icon" aria-hidden="true">👍</span>
      </button>
      <button
        className="tf-ai-feedback-button__btn tf-ai-feedback-button__btn--down"
        onClick={() => onFeedback('negative')}
        disabled={disabled}
        type="button"
        aria-label="Thumbs down"
        title="Not helpful"
      >
        <span className="tf-ai-feedback-button__icon" aria-hidden="true">👎</span>
      </button>
    </div>
  );
};

export default AIFeedbackButton;
