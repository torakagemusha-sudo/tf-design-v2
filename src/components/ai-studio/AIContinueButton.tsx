/**
 * ============================================================================
 * Torafirma Design System — AIContinueButton
 * ============================================================================
 * AI-Assisted Studio component — AI ContinueButton.
 *
 * @module   ai-studio/AIContinueButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIContinueButton component */
export interface AIContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  canContinue?: boolean;
}

/**
 * AIContinueButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIContinueButton: React.FC<AIContinueButtonProps> = ({
  onClick,
  disabled,
  canContinue,
}) => {
  if (!canContinue) return null;

  return (
    <button
      className="tf-ai-continue-btn"
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label="Continue generation"
    >
      <span className="tf-ai-continue-btn__icon" aria-hidden="true">▶</span>
      <span className="tf-ai-continue-btn__label">Continue</span>
    </button>
  );
};

export default AIContinueButton;
