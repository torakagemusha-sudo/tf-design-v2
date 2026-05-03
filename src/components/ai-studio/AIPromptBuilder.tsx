/**
 * ============================================================================
 * Torafirma Design System — AIPromptBuilder
 * ============================================================================
 * AI-Assisted Studio component — AI PromptBuilder.
 *
 * @module   ai-studio/AIPromptBuilder
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { PromptTemplate, PromptVariable } from './types';
import AIPromptVariableInput from './AIPromptVariableInput';

/** Props for the AIPromptBuilder component */
export interface AIPromptBuilderProps {
  template: PromptTemplate;
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
  onSubmit: () => void;
  preview?: string;
}

/**
 * AIPromptBuilder
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIPromptBuilder: React.FC<AIPromptBuilderProps> = ({
  template,
  values,
  onChange,
  onSubmit,
  preview,
}) => {
  const update = (name: string, value: string) => {
    onChange({ ...values, [name]: value });
  };

  return (
    <div className="tf-ai-prompt-builder">
      <h4 className="tf-ai-prompt-builder__title">{template.name}</h4>
      <p className="tf-ai-prompt-builder__desc">{template.description}</p>
      <div className="tf-ai-prompt-builder__variables">
        {template.variables.map((variable) => (
          <AIPromptVariableInput
            key={variable.name}
            variable={variable}
            value={values[variable.name] || ''}
            onChange={(val) => update(variable.name, val)}
          />
        ))}
      </div>
      {preview && (
        <div className="tf-ai-prompt-builder__preview">
          <h5 className="tf-ai-prompt-builder__preview-title">Preview</h5>
          <pre className="tf-ai-prompt-builder__preview-text">{preview}</pre>
        </div>
      )}
      <button className="tf-ai-prompt-builder__submit" onClick={onSubmit} type="button">
        Build Prompt
      </button>
    </div>
  );
};

export default AIPromptBuilder;
