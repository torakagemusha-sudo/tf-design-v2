/**
 * ============================================================================
 * Torafirma Design System — IntentInputToolbar
 * ============================================================================
 * AI-Assisted Studio component — IntentInputToolbar.
 *
 * @module   ai-studio/IntentInputToolbar
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { IntentInputToolbar } from './types';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the IntentInputToolbar component */
export interface IntentInputToolbarProps {
  onAttachFile?: () => void;
  onAddContext?: () => void;
  onToggleVoice?: () => void;
  onShowTemplates?: () => void;
  onSubmit?: () => void;
  isVoiceEnabled?: boolean;
  hasAttachment?: boolean;
  canSubmit?: boolean;
}

/**
 * IntentInputToolbar
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 * @example
 * ```tsx
 * <IntentInputToolbar />
 * ```
 */
const IntentInputToolbar: React.FC<IntentInputToolbarProps> = ({
  onAttachFile?,
onAddContext?,
onToggleVoice?,
onShowTemplates?,
onSubmit?,
isVoiceEnabled?,
hasAttachment?,
canSubmit?,
}) => {
  return (
    <div className="tf-intent-input-toolbar" role="toolbar" aria-label="Intent input tools">
      <button
        className={\`tf-intent-input-toolbar__btn\${hasAttachment ? ' tf-intent-input-toolbar__btn--active' : ''}\`}
        onClick={onAttachFile}
        type="button"
        aria-label="Attach file"
        title="Attach file"
      >
        <span className="tf-intent-input-toolbar__icon tf-intent-input-toolbar__icon--attach" aria-hidden="true" />
        <span className="tf-intent-input-toolbar__label">Attach</span>
      </button>
      <button
        className="tf-intent-input-toolbar__btn"
        onClick={onAddContext}
        type="button"
        aria-label="Add context"
        title="Add context"
      >
        <span className="tf-intent-input-toolbar__icon tf-intent-input-toolbar__icon--context" aria-hidden="true" />
        <span className="tf-intent-input-toolbar__label">Context</span>
      </button>
      <button
        className={\`tf-intent-input-toolbar__btn tf-intent-input-toolbar__btn--voice\${isVoiceEnabled ? ' tf-intent-input-toolbar__btn--active' : ''}\`}
        onClick={onToggleVoice}
        type="button"
        aria-label="Toggle voice input"
        title="Toggle voice input"
      >
        <span className="tf-intent-input-toolbar__icon tf-intent-input-toolbar__icon--voice" aria-hidden="true" />
        <span className="tf-intent-input-toolbar__label">Voice</span>
      </button>
      <button
        className="tf-intent-input-toolbar__btn"
        onClick={onShowTemplates}
        type="button"
        aria-label="Prompt templates"
        title="Prompt templates"
      >
        <span className="tf-intent-input-toolbar__icon tf-intent-input-toolbar__icon--template" aria-hidden="true" />
        <span className="tf-intent-input-toolbar__label">Templates</span>
      </button>
      {onSubmit && (
        <button
          className="tf-intent-input-toolbar__btn tf-intent-input-toolbar__btn--submit"
          onClick={onSubmit}
          disabled={!canSubmit}
          type="button"
          aria-label="Submit intent"
        >
          <span className="tf-intent-input-toolbar__icon tf-intent-input-toolbar__icon--send" aria-hidden="true" />
          <span className="tf-intent-input-toolbar__label">Send</span>
        </button>
      )}
    </div>
  );
};

export default IntentInputToolbar;
