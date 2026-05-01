/**
 * @fileoverview GraphCommentThread — Threaded comment discussion on the canvas.
 * A collapsible thread of replies to a parent comment.
 */

import React, { useState } from 'react';
import type { CommentData, GraphComponentProps } from './types';

export interface GraphCommentThreadProps extends GraphComponentProps {
  /** Parent comment */
  parentComment: CommentData;
  /** Reply comments */
  replies: CommentData[];
  /** Whether the thread is expanded */
  expanded?: boolean;
  /** Callback when a reply is added */
  onReply?: (parentId: string, text: string) => void;
  /** Callback when a comment is resolved */
  onResolve?: (commentId: string) => void;
  /** Callback when a comment is deleted */
  onDelete?: (commentId: string) => void;
  /** Callback when expand/collapse is toggled */
  onToggleExpand?: (commentId: string) => void;
}

/**
 * GraphCommentThread — Comment thread.
 *
 * A threaded discussion view for graph annotations showing a
 * parent comment with collapsible reply comments.
 *
 * @example
 * <GraphCommentThread
 *   parentComment={parent}
 *   replies={replies}
 *   expanded={true}
 *   onReply={(id, text) => addReply(id, text)}
 * />
 */
export const GraphCommentThread: React.FC<GraphCommentThreadProps> = ({
  className = '',
  style,
  parentComment,
  replies,
  expanded = true,
  onReply,
  onResolve,
  onDelete,
  onToggleExpand,
  ...rest
}) => {
  const [replyText, setReplyText] = useState('');
  const [showReply, setShowReply] = useState(false);

  return (
    <div
      className={`tf-graph-comment-thread ${expanded ? 'tf-graph-comment-thread--expanded' : ''} ${className}`}
      style={{
        position: 'absolute',
        left: parentComment.position.x,
        top: parentComment.position.y,
        width: 240,
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 35,
        ...style,
      }}
      {...rest}
    >
      {/* Parent comment */}
      <div
        className="tf-graph-comment-thread__parent"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          padding: '8px 10px',
          borderBottom: replies.length > 0 ? '1px solid #1a2332' : 'none',
          cursor: onToggleExpand ? 'pointer' : 'default',
        }}
        onClick={() => onToggleExpand?.(parentComment.id)}
      >
        <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#2a4a6f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#c8d6e5', flexShrink: 0 }}>
          {(parentComment.author || 'A')[0].toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#c8d6e5' }}>{parentComment.author || 'Anonymous'}</span>
            <span style={{ fontSize: 8, color: '#3a5274' }}>
              {new Date(parentComment.timestamp).toLocaleDateString()}
            </span>
          </div>
          <div style={{ fontSize: 11, color: '#c8d6e5', marginTop: 2, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {parentComment.text}
          </div>
        </div>
        {replies.length > 0 && (
          <span style={{ fontSize: 9, color: '#6b7f9e' }}>
            {replies.length}
          </span>
        )}
      </div>

      {/* Replies */}
      {expanded && replies.length > 0 && (
        <div className="tf-graph-comment-thread__replies">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="tf-graph-comment-thread__reply"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                padding: '6px 10px 6px 36px',
                borderBottom: '1px solid #1a2332',
              }}
            >
              <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#1a3a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#c8d6e5', flexShrink: 0 }}>
                {(reply.author || 'A')[0].toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: '#c8d6e5' }}>{reply.author || 'Anonymous'}</span>
                  <span style={{ fontSize: 8, color: '#3a5274' }}>
                    {new Date(reply.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#c8d6e5', marginTop: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {reply.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply input */}
      {expanded && (
        <div style={{ padding: '6px 10px' }}>
          {showReply ? (
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && replyText.trim()) {
                    onReply?.(parentComment.id, replyText.trim());
                    setReplyText('');
                    setShowReply(false);
                  }
                }}
                style={{
                  flex: 1,
                  padding: '4px 8px',
                  background: '#1a2332',
                  border: '1px solid #2a3a4e',
                  borderRadius: 4,
                  color: '#c8d6e5',
                  fontSize: 10,
                  outline: 'none',
                }}
              />
              <button
                onClick={() => {
                  if (replyText.trim()) {
                    onReply?.(parentComment.id, replyText.trim());
                    setReplyText('');
                    setShowReply(false);
                  }
                }}
                type="button"
                style={{ padding: '4px 8px', background: '#2a4a6f', border: 'none', borderRadius: 4, color: '#c8d6e5', cursor: 'pointer', fontSize: 10 }}
              >
                Reply
              </button>
            </div>
          ) : (
            <button
              className="tf-graph-comment-thread__reply-btn"
              onClick={() => setShowReply(true)}
              type="button"
              style={{
                width: '100%',
                padding: '4px 8px',
                background: 'transparent',
                border: '1px dashed #2a3a4e',
                borderRadius: 4,
                color: '#6b7f9e',
                cursor: 'pointer',
                fontSize: 10,
              }}
            >
              + Reply
            </button>
          )}
        </div>
      )}
    </div>
  );
};

GraphCommentThread.displayName = 'GraphCommentThread';
export default GraphCommentThread;
