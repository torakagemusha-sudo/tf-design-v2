/**
 * ============================================================================
 * Torafirma Design System — IntentInputVoiceButton
 * ============================================================================
 * AI-Assisted Studio component — IntentInputVoiceButton.
 *
 * @module   ai-studio/IntentInputVoiceButton
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { IntentInputVoiceButton } from './types';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the IntentInputVoiceButton component */
export interface IntentInputVoiceButtonProps {
  isListening: boolean;
  onToggle: () => void;
  disabled?: boolean;
  transcript?: string;
}

/**
 * IntentInputVoiceButton
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 * @example
 * ```tsx
 * <IntentInputVoiceButton />
 * ```
 */
const IntentInputVoiceButton: React.FC<IntentInputVoiceButtonProps> = ({
  isListening,
onToggle,
disabled?,
transcript?,
}) => {
  return (
    <button
      className={\`tf-intent-input-voice-btn\${isListening ? ' tf-intent-input-voice-btn--listening' : ''}\${disabled ? ' tf-intent-input-voice-btn--disabled' : ''}\`}
      onClick={onToggle}
      disabled={disabled}
      type="button"
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      title={isListening ? 'Listening...' : 'Voice input'}
    >
      <span className="tf-intent-input-voice-btn__icon" aria-hidden="true">
        {isListening ? '◼' : '🎤'}
      </span>
      {isListening && transcript && (
        <span className="tf-intent-input-voice-btn__transcript">{transcript}</span>
      )}
      {isListening && (
        <span className="tf-intent-input-voice-btn__wave" aria-hidden="true">
          <span className="tf-intent-input-voice-btn__wave-bar" />
          <span className="tf-intent-input-voice-btn__wave-bar" />
          <span className="tf-intent-input-voice-btn__wave-bar" />
          <span className="tf-intent-input-voice-btn__wave-bar" />
        </span>
      )}
    </button>
  );
};

export default IntentInputVoiceButton;
