/**
 * ============================================================================
 * Torafirma Design System — AIRerunButton
 * ============================================================================
 * AI-Assisted Studio component — AI RerunButton.
 *
 * @module   ai-studio/AIRerunButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIRerunButton component */
export interface AIRerunButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isRunning?: boolean;
}

/**
 * AIRerunButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIRerunButton: React.FC<AIRerunButtonProps> = ({
  onClick,
  disabled,
  isRunning,
}) => {
  return (
    <button
      className={`tf-ai-rerun-btn${isRunning ? ' tf-ai-rerun-btn--running' : ''}`}
      onClick={onClick}
      disabled={disabled || isRunning}
      type="button"
      aria-label="Re-run with same parameters"
    >
      <span className="tf-ai-rerun-btn__icon" aria-hidden="true">↻</span>
      <span className="tf-ai-rerun-btn__label">{isRunning ? 'Running...' : 'Re-run'}</span>
    </button>
  );
};

export default AIRerunButton;
