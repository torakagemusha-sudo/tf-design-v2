/**
 * ============================================================================
 * Torafirma Design System — AIChatInput
 * ============================================================================
 * AI-Assisted Studio component — AI ChatInput.
 *
 * @module   ai-studio/AIChatInput
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIChatInput component */
export interface AIChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  onStop?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * AIChatInput
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIChatInput: React.FC<AIChatInputProps> = ({
  onSend,
  isLoading,
  onStop,
  placeholder,
  disabled,
}) => {
  const [value, setValue] = React.useState('');

  const handleSend = () => {
    if (value.trim() && !isLoading) {
      onSend(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="tf-ai-chat-input">
      <textarea
        className="tf-ai-chat-input__field"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Type a message...'}
        disabled={disabled}
        rows={2}
        aria-label="Chat message"
      />
      <div className="tf-ai-chat-input__actions">
        {isLoading && onStop ? (
          <button className="tf-ai-chat-input__stop" onClick={onStop} type="button" aria-label="Stop generation">
            ⏹ Stop
          </button>
        ) : (
          <button
            className="tf-ai-chat-input__send"
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            type="button"
            aria-label="Send message"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default AIChatInput;
