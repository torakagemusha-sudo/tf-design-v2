/**
 * ============================================================================
 * Torafirma Design System — AIFeedbackForm
 * ============================================================================
 * AI-Assisted Studio component — AI FeedbackForm.
 *
 * @module   ai-studio/AIFeedbackForm
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIFeedbackForm component */
export interface AIFeedbackFormProps {
  onSubmit: (feedback: { rating: 'positive' | 'negative' | 'neutral'; comment: string; categories: string[] }) => void;
  categories?: string[];
  isSubmitting?: boolean;
}

/**
 * AIFeedbackForm
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIFeedbackForm: React.FC<AIFeedbackFormProps> = ({
  onSubmit,
  categories,
  isSubmitting,
}) => {
  const [rating, setRating] = React.useState<'positive' | 'negative' | 'neutral'>('neutral');
  const [comment, setComment] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="tf-ai-feedback-form">
      <h4 className="tf-ai-feedback-form__title">Feedback</h4>
      <div className="tf-ai-feedback-form__rating" role="radiogroup" aria-label="Rating">
        {(['positive', 'neutral', 'negative'] as const).map((r) => (
          <button
            key={r}
            className={`tf-ai-feedback-form__rating-btn tf-ai-feedback-form__rating-btn--${r}${rating === r ? ' tf-ai-feedback-form__rating-btn--active' : ''}`}
            onClick={() => setRating(r)}
            role="radio"
            aria-checked={rating === r}
            type="button"
          >
            {r === 'positive' ? '👍' : r === 'negative' ? '👎' : '—'}
          </button>
        ))}
      </div>
      {categories && categories.length > 0 && (
        <div className="tf-ai-feedback-form__categories">
          {categories.map((cat) => (
            <label key={cat} className="tf-ai-feedback-form__category">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      )}
      <textarea
        className="tf-ai-feedback-form__comment"
        placeholder="Additional comments..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      <button
        className="tf-ai-feedback-form__submit"
        onClick={() => onSubmit({ rating, comment, categories: selectedCategories })}
        disabled={isSubmitting}
        type="button"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </div>
  );
};

export default AIFeedbackForm;
