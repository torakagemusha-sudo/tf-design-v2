/**
 * ============================================================================
 * Torafirma Design System — IntentInput
 * ============================================================================
 * AI-Assisted Studio component — IntentInput.
 *
 * @module   ai-studio/IntentInput
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { IntentInput } from './types';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the IntentInput component */
export interface IntentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  isProcessing?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
}

/**
 * IntentInput
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 * @example
 * ```tsx
 * <IntentInput />
 * ```
 */
const IntentInput: React.FC<IntentInputProps> = ({
  value,
onChange,
onSubmit,
placeholder?,
isProcessing?,
disabled?,
size?,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() && !isProcessing) {
      onSubmit(value.trim());
    }
  };

  return (
    <div
      className={\`tf-intent-input tf-intent-input--\${size || 'md'}\${isFocused ? ' tf-intent-input--focused' : ''}\${isProcessing ? ' tf-intent-input--processing' : ''}\${disabled ? ' tf-intent-input--disabled' : ''}\`}
    >
      <div className="tf-intent-input__wrapper">
        <input
          type="text"
          className="tf-intent-input__field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || 'Describe what you want to build...'}
          disabled={disabled || isProcessing}
          aria-label="Intent input"
          aria-busy={isProcessing}
        />
        {isProcessing && (
          <span className="tf-intent-input__spinner" aria-hidden="true">
            <span className="tf-intent-input__spinner-dot" />
            <span className="tf-intent-input__spinner-dot" />
            <span className="tf-intent-input__spinner-dot" />
          </span>
        )}
        {value && !isProcessing && (
          <button
            className="tf-intent-input__clear"
            onClick={() => onChange('')}
            aria-label="Clear input"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default IntentInput;
