/**
 * ============================================================================
 * Torafirma Design System — AssumptionItem
 * ============================================================================
 * AI-Assisted Studio component — AssumptionItem.
 *
 * @module   ai-studio/AssumptionItem
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { AIAssumption } from './types';

/** Props for the AssumptionItem component */
export interface AssumptionItemProps {
  assumption: AIAssumption;
  onValidate: (isValid: boolean) => void;
  onRemove: () => void;
}

/**
 * AssumptionItem
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AssumptionItem: React.FC<AssumptionItemProps> = ({
  assumption,
  onValidate,
  onRemove,
}) => {
  return (
    <div className={`tf-assumption-item tf-assumption-item--${assumption.isValidated ? (assumption.isValid ? 'valid' : 'invalid') : 'pending'}`}>
      <div className="tf-assumption-item__main">
        <span className="tf-assumption-item__text">{assumption.text}</span>
        <AssumptionConfidence confidence={assumption.confidence} />
      </div>
      <AssumptionValidation
        isValidated={assumption.isValidated}
        isValid={assumption.isValid}
        onValidate={onValidate}
      />
      {assumption.evidence && assumption.evidence.length > 0 && (
        <ul className="tf-assumption-item__evidence">
          {assumption.evidence.map((ev, i) => (
            <li key={i} className="tf-assumption-item__evidence-item">{ev}</li>
          ))}
        </ul>
      )}
      <button className="tf-assumption-item__remove" onClick={onRemove} type="button" aria-label="Remove assumption">
        ×
      </button>
    </div>
  );
};

export default AssumptionItem;
