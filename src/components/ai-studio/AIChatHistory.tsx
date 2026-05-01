/**
 * ============================================================================
 * Torafirma Design System — AIChatHistory
 * ============================================================================
 * AI-Assisted Studio component — AI ChatHistory.
 *
 * @module   ai-studio/AIChatHistory
 * @system   ai-studio
 * ============================================================================
 */

import React from 'react';
import type { ComponentSize, ConfidenceLevel } from './types';

/** Props for the AIChatHistory component */
export interface AIChatHistoryProps {
  sessions: { id: string; title: string; timestamp: Date; messageCount: number }[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNewChat: () => void;
  activeId?: string;
}

/**
 * AIChatHistory
 * ------------------------------------------------------------------------
 * AI Studio component for the Torafirma Design System.
 *
 * @category AI-Studio
 */
const AIChatHistory: React.FC<AIChatHistoryProps> = ({
  sessions,
  onSelect,
  onDelete,
  onNewChat,
  activeId,
}) => {
  return (
    <div className="tf-ai-chat-history">
      <div className="tf-ai-chat-history__header">
        <h3 className="tf-ai-chat-history__title">Chat History</h3>
        <button className="tf-ai-chat-history__new" onClick={onNewChat} type="button">
          + New Chat
        </button>
      </div>
      <div className="tf-ai-chat-history__list" role="list">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`tf-ai-chat-history__item${activeId === session.id ? ' tf-ai-chat-history__item--active' : ''}`}
            onClick={() => onSelect(session.id)}
            role="listitem"
          >
            <span className="tf-ai-chat-history__session-title">{session.title}</span>
            <div className="tf-ai-chat-history__session-meta">
              <span className="tf-ai-chat-history__count">{session.messageCount} msgs</span>
              <time className="tf-ai-chat-history__time" dateTime={session.timestamp.toISOString()}>
                {session.timestamp.toLocaleDateString()}
              </time>
              <button
                className="tf-ai-chat-history__delete"
                onClick={(e) => { e.stopPropagation(); onDelete(session.id); }}
                type="button"
                aria-label="Delete session"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIChatHistory;
