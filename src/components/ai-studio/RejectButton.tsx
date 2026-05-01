/**
 * ============================================================================
 * Torafirma Design System — RejectButton
 * ============================================================================
 * AI-Assisted Studio component — RejectButton.
 *
 * @module   ai-studio/RejectButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ComponentSize } from './types';

/** Props for the RejectButton component */
export interface RejectButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  size?: ComponentSize;
  label?: string;
}

/**
 * RejectButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const RejectButton: React.FC<RejectButtonProps> = ({
  onClick,
  disabled,
  size,
  label,
}) => {
  return (
    <button
      className={`tf-reject-btn tf-reject-btn--${size || 'md'}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label={label || 'Reject'}
    >
      <span className="tf-reject-btn__icon" aria-hidden="true">✕</span>
      <span className="tf-reject-btn__label">{label || 'Reject'}</span>
    </button>
  );
};

export default RejectButton;
