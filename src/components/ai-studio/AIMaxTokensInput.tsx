/**
 * ============================================================================
 * Torafirma Design System — AIMaxTokensInput
 * ============================================================================
 * AI-Assisted Studio component — AI MaxTokensInput.
 *
 * @module   ai-studio/AIMaxTokensInput
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIMaxTokensInput component */
export interface AIMaxTokensInputProps {
  value: number;
  onChange: (value: number) => void;
  maxLimit?: number;
  disabled?: boolean;
}

/**
 * AIMaxTokensInput
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIMaxTokensInput: React.FC<AIMaxTokensInputProps> = ({
  value,
  onChange,
  maxLimit,
  disabled,
}) => {
  return (
    <div className="tf-ai-max-tokens-input">
      <label className="tf-ai-max-tokens-input__label" htmlFor="ai-max-tokens">
        Max Tokens
      </label>
      <input
        id="ai-max-tokens"
        type="number"
        className="tf-ai-max-tokens-input__field"
        min={1}
        max={maxLimit}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        disabled={disabled}
        aria-label="Maximum tokens"
      />
      {maxLimit && (
        <span className="tf-ai-max-tokens-input__hint">/ {maxLimit.toLocaleString()} max</span>
      )}
    </div>
  );
};

export default AIMaxTokensInput;
