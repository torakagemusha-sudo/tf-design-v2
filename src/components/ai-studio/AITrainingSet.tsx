/**
 * ============================================================================
 * Torafirma Design System — AITrainingSet
 * ============================================================================
 * AI-Assisted Studio component — AI TrainingSet.
 *
 * @module   ai-studio/AITrainingSet
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { TrainingExample } from './types';
import AITrainingExample from './AITrainingExample';

/** Props for the AITrainingSet component */
export interface AITrainingSetProps {
  examples: TrainingExample[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onValidate: (id: string) => void;
  onImport: () => void;
  onExport: () => void;
}

/**
 * AITrainingSet
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AITrainingSet: React.FC<AITrainingSetProps> = ({
  examples,
  onAdd,
  onEdit,
  onDelete,
  onValidate,
  onImport,
  onExport,
}) => {
  const validatedCount = examples.filter((e) => e.isValidated).length;

  return (
    <div className="tf-ai-training-set">
      <div className="tf-ai-training-set__header">
        <h4 className="tf-ai-training-set__title">Training Set</h4>
        <span className="tf-ai-training-set__stats">
          {validatedCount} / {examples.length} validated
        </span>
      </div>
      <div className="tf-ai-training-set__actions">
        <button className="tf-ai-training-set__btn" onClick={onAdd} type="button">+ Add Example</button>
        <button className="tf-ai-training-set__btn" onClick={onImport} type="button">Import</button>
        <button className="tf-ai-training-set__btn" onClick={onExport} type="button">Export</button>
      </div>
      <div className="tf-ai-training-set__list">
        {examples.map((example) => (
          <AITrainingExample
            key={example.id}
            example={example}
            onEdit={onEdit}
            onDelete={onDelete}
            onValidate={onValidate}
          />
        ))}
      </div>
    </div>
  );
};

export default AITrainingSet;
