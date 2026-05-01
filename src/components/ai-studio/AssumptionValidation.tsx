/**
 * ============================================================================
 * Torafirma Design System — AssumptionValidation
 * ============================================================================
 * AI-Assisted Studio component — AssumptionValidation.
 *
 * @module   ai-studio/AssumptionValidation
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AssumptionValidation component */
export interface AssumptionValidationProps {
  isValidated: boolean;
  isValid?: boolean;
  onValidate: (isValid: boolean) => void;
}

/**
 * AssumptionValidation
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AssumptionValidation: React.FC<AssumptionValidationProps> = ({
  isValidated,
  isValid,
  onValidate,
}) => {
  return (
    <div className="tf-assumption-validation" role="group" aria-label="Validate assumption">
      {!isValidated ? (
        <>
          <button
            className="tf-assumption-validation__btn tf-assumption-validation__btn--valid"
            onClick={() => onValidate(true)}
            type="button"
          >
            ✓ Correct
          </button>
          <button
            className="tf-assumption-validation__btn tf-assumption-validation__btn--invalid"
            onClick={() => onValidate(false)}
            type="button"
          >
            ✗ Incorrect
          </button>
        </>
      ) : (
        <span className={`tf-assumption-validation__result tf-assumption-validation__result--${isValid ? 'valid' : 'invalid'}`}>
          {isValid ? '✓ Confirmed' : '✗ Refuted'}
        </span>
      )}
    </div>
  );
};

export default AssumptionValidation;
