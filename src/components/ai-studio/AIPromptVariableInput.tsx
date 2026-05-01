/**
 * ============================================================================
 * Torafirma Design System — AIPromptVariableInput
 * ============================================================================
 * AI-Assisted Studio component — AI PromptVariableInput.
 *
 * @module   ai-studio/AIPromptVariableInput
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { PromptVariable } from './types';

/** Props for the AIPromptVariableInput component */
export interface AIPromptVariableInputProps {
  variable: PromptVariable;
  value: string;
  onChange: (value: string) => void;
}

/**
 * AIPromptVariableInput
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIPromptVariableInput: React.FC<AIPromptVariableInputProps> = ({
  variable,
  value,
  onChange,
}) => {
  const inputId = `var-${variable.name}`;

  return (
    <div className="tf-ai-prompt-variable-input">
      <label className="tf-ai-prompt-variable-input__label" htmlFor={inputId}>
        {variable.label}
        {variable.required && <span className="tf-ai-prompt-variable-input__required">*</span>}
      </label>
      {variable.description && (
        <span className="tf-ai-prompt-variable-input__desc">{variable.description}</span>
      )}
      {variable.type === 'textarea' ? (
        <textarea
          id={inputId}
          className="tf-ai-prompt-variable-input__field tf-ai-prompt-variable-input__field--textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={variable.defaultValue}
          required={variable.required}
          rows={4}
        />
      ) : variable.type === 'select' ? (
        <select
          id={inputId}
          className="tf-ai-prompt-variable-input__field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={variable.required}
        >
          <option value="">Select...</option>
          {variable.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : variable.type === 'boolean' ? (
        <input
          id={inputId}
          type="checkbox"
          className="tf-ai-prompt-variable-input__checkbox"
          checked={value === 'true'}
          onChange={(e) => onChange(e.target.checked ? 'true' : 'false')}
        />
      ) : (
        <input
          id={inputId}
          type={variable.type === 'number' ? 'number' : 'text'}
          className="tf-ai-prompt-variable-input__field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={variable.defaultValue}
          required={variable.required}
        />
      )}
    </div>
  );
};

export default AIPromptVariableInput;
