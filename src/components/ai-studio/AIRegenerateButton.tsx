/**
 * ============================================================================
 * Torafirma Design System — AIRegenerateButton
 * ============================================================================
 * AI-Assisted Studio component — AI RegenerateButton.
 *
 * @module   ai-studio/AIRegenerateButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIRegenerateButton component */
export interface AIRegenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isRegenerating?: boolean;
}

/**
 * AIRegenerateButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIRegenerateButton: React.FC<AIRegenerateButtonProps> = ({
  onClick,
  disabled,
  isRegenerating,
}) => {
  return (
    <button
      className={`tf-ai-regenerate-btn${isRegenerating ? ' tf-ai-regenerate-btn--running' : ''}`}
      onClick={onClick}
      disabled={disabled || isRegenerating}
      type="button"
      aria-label="Regenerate response"
    >
      <span className="tf-ai-regenerate-btn__icon" aria-hidden="true">⟳</span>
      <span className="tf-ai-regenerate-btn__label">{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
    </button>
  );
};

export default AIRegenerateButton;
