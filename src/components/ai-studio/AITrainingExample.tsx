/**
 * ============================================================================
 * Torafirma Design System — AITrainingExample
 * ============================================================================
 * AI-Assisted Studio component — AI TrainingExample.
 *
 * @module   ai-studio/AITrainingExample
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { TrainingExample } from './types';

/** Props for the AITrainingExample component */
export interface AITrainingExampleProps {
  example: TrainingExample;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onValidate: (id: string) => void;
}

/**
 * AITrainingExample
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AITrainingExample: React.FC<AITrainingExampleProps> = ({
  example,
  onEdit,
  onDelete,
  onValidate,
}) => {
  return (
    <div className={`tf-ai-training-example tf-ai-training-example--${example.isValidated ? 'validated' : 'pending'}`}>
      <div className="tf-ai-training-example__content">
        <div className="tf-ai-training-example__field">
          <span className="tf-ai-training-example__label">Input</span>
          <pre className="tf-ai-training-example__input">{example.input}</pre>
        </div>
        <div className="tf-ai-training-example__field">
          <span className="tf-ai-training-example__label">Expected Output</span>
          <pre className="tf-ai-training-example__output">{example.expectedOutput}</pre>
        </div>
      </div>
      <div className="tf-ai-training-example__actions">
        <span className={`tf-ai-training-example__status tf-ai-training-example__status--${example.isValidated ? 'validated' : 'pending'}`}>
          {example.isValidated ? '✓ Validated' : 'Pending'}
        </span>
        <button className="tf-ai-training-example__btn" onClick={() => onEdit(example.id)} type="button">Edit</button>
        <button className="tf-ai-training-example__btn" onClick={() => onDelete(example.id)} type="button">Delete</button>
        {!example.isValidated && (
          <button className="tf-ai-training-example__btn tf-ai-training-example__btn--validate" onClick={() => onValidate(example.id)} type="button">
            Validate
          </button>
        )}
      </div>
    </div>
  );
};

export default AITrainingExample;
