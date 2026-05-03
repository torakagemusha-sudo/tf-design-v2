/**
 * ============================================================================
 * Torafirma Design System — AIChatMessage
 * ============================================================================
 * AI-Assisted Studio component — AI ChatMessage.
 *
 * @module   ai-studio/AIChatMessage
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ChatMessage } from './types';
import AIFeedbackButton from './AIFeedbackButton';

/** Props for the AIChatMessage component */
export interface AIChatMessageProps {
  message: ChatMessage;
  onFeedback?: (rating: 'positive' | 'negative') => void;
}

/**
 * AIChatMessage
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIChatMessage: React.FC<AIChatMessageProps> = ({
  message,
  onFeedback,
}) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <div className={`tf-ai-chat-message tf-ai-chat-message--${message.role}${message.isStreaming ? ' tf-ai-chat-message--streaming' : ''}`}>
      {!isUser && (
        <div className="tf-ai-chat-message__avatar" aria-hidden="true">
          {isSystem ? '⚙' : '🤖'}
        </div>
      )}
      <div className="tf-ai-chat-message__content">
        {message.model && (
          <span className="tf-ai-chat-message__model">{message.model}</span>
        )}
        <div className="tf-ai-chat-message__bubble">
          <p className="tf-ai-chat-message__text">{message.content}</p>
        </div>
        <time className="tf-ai-chat-message__time" dateTime={message.timestamp.toISOString()}>
          {message.timestamp.toLocaleTimeString()}
        </time>
        {!isUser && onFeedback && (
          <div className="tf-ai-chat-message__feedback">
            <AIFeedbackButton onFeedback={onFeedback} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatMessage;
