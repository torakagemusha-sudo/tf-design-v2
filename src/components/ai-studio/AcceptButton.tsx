/**
 * ============================================================================
 * Torafirma Design System — AcceptButton
 * ============================================================================
 * AI-Assisted Studio component — AcceptButton.
 *
 * @module   ai-studio/AcceptButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ComponentSize } from './types';

/** Props for the AcceptButton component */
export interface AcceptButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  size?: ComponentSize;
  label?: string;
}

/**
 * AcceptButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AcceptButton: React.FC<AcceptButtonProps> = ({
  onClick,
  disabled,
  size,
  label,
}) => {
  return (
    <button
      className={`tf-accept-btn tf-accept-btn--${size || 'md'}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label={label || 'Accept'}
    >
      <span className="tf-accept-btn__icon" aria-hidden="true">✓</span>
      <span className="tf-accept-btn__label">{label || 'Accept'}</span>
    </button>
  );
};

export default AcceptButton;
