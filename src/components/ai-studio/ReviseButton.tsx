/**
 * ============================================================================
 * Torafirma Design System — ReviseButton
 * ============================================================================
 * AI-Assisted Studio component — ReviseButton.
 *
 * @module   ai-studio/ReviseButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the ReviseButton component */
export interface ReviseButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  size?: ComponentSize;
  label?: string;
}

/**
 * ReviseButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const ReviseButton: React.FC<ReviseButtonProps> = ({
  onClick,
  disabled,
  size,
  label,
}) => {
  return (
    <button
      className={`tf-revise-btn tf-revise-btn--${size || 'md'}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label={label || 'Revise'}
    >
      <span className="tf-revise-btn__icon" aria-hidden="true">↻</span>
      <span className="tf-revise-btn__label">{label || 'Revise'}</span>
    </button>
  );
};

export default ReviseButton;
