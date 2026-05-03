/**
 * ============================================================================
 * Torafirma Design System — AIChatPanel
 * ============================================================================
 * AI-Assisted Studio component — AI ChatPanel.
 *
 * @module   ai-studio/AIChatPanel
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';
import type { ChatMessage } from './types';
import AIChatInput from './AIChatInput';
import AIChatMessage from './AIChatMessage';

/** Props for the AIChatPanel component */
export interface AIChatPanelProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  isLoading?: boolean;
  modelName?: string;
  onSelectModel?: () => void;
  onStopGeneration?: () => void;
}

/**
 * AIChatPanel
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIChatPanel: React.FC<AIChatPanelProps> = ({
  messages,
  onSend,
  isLoading,
  modelName,
  onSelectModel,
  onStopGeneration,
}) => {
  return (
    <div className="tf-ai-chat-panel">
      <div className="tf-ai-chat-panel__header">
        <h3 className="tf-ai-chat-panel__title">AI Assistant</h3>
        {modelName && (
          <button className="tf-ai-chat-panel__model" onClick={onSelectModel} type="button">
            {modelName}
          </button>
        )}
      </div>
      <div className="tf-ai-chat-panel__messages" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map((msg) => (
          <AIChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="tf-ai-chat-panel__typing">
            <span className="tf-ai-chat-panel__typing-dot" />
            <span className="tf-ai-chat-panel__typing-dot" />
            <span className="tf-ai-chat-panel__typing-dot" />
          </div>
        )}
      </div>
      <AIChatInput onSend={onSend} isLoading={isLoading} onStop={onStopGeneration} />
    </div>
  );
};

export default AIChatPanel;
