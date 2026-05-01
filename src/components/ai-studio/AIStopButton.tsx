/**
 * ============================================================================
 * Torafirma Design System — AIStopButton
 * ============================================================================
 * AI-Assisted Studio component — AI StopButton.
 *
 * @module   ai-studio/AIStopButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIStopButton component */
export interface AIStopButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * AIStopButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIStopButton: React.FC<AIStopButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      className="tf-ai-stop-btn"
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label="Stop generation"
    >
      <span className="tf-ai-stop-btn__icon" aria-hidden="true">⏹</span>
      <span className="tf-ai-stop-btn__label">Stop</span>
    </button>
  );
};

export default AIStopButton;
