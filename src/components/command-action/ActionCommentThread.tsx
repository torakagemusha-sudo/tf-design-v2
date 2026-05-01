import React, { useState } from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single comment entry.
 */
export interface ActionComment {
  id: string;
  author: string;
  timestamp: string;
  text: string;
  replyTo?: string;
}

/**
 * Props for the ActionCommentThread component.
 * Inline comments on actions.
 */
export interface ActionCommentThreadProps extends TorafirmaComponentBaseProps {
  /** Array of comments */
  comments: ActionComment[];
  /** Callback fired when a comment is added */
  onAdd: (text: string) => void;
  /** Callback fired when a reply is added */
  onReply?: (commentId: string, text: string) => void;
}

/**
 * ActionCommentThread — inline comments on actions.
 *
 * Displays a threaded comment stream attached to an action.
 * Supports adding top-level comments and replying to existing
 * ones. Each comment shows the author, timestamp, and text.
 *
 * @example
 * ```tsx
 * <ActionCommentThread
 *   comments={[
 *     { id: 'c1', author: 'operator-1', timestamp: '2024-01-01T10:00:00Z', text: 'Verify target before deploying' },
 *   ]}
 *   onAdd={(text) => console.log('Added', text)}
 *   onReply={(id, text) => console.log('Reply to', id, text)}
 * />
 * ```
 */
const ActionCommentThread: React.FC<ActionCommentThreadProps> = ({
  comments,
  onAdd,
  onReply,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAdd = () => {
    if (!newComment.trim()) return;
    onAdd(newComment.trim());
    setNewComment('');
  };

  const handleReply = (commentId: string) => {
    if (!replyText.trim()) return;
    onReply?.(commentId, replyText.trim());
    setReplyText('');
    setReplyTo(null);
  };

  return (
    <div className={`tf-action-comment-thread ${className}`} data-testid={testId} {...rest}>
      <div className="tf-action-comment-thread__header">
        <span className="tf-action-comment-thread__title">Comments</span>
        <span className="tf-action-comment-thread__count">{comments.length}</span>
      </div>

      <ul className="tf-action-comment-thread__list">
        {comments.map((comment) => (
          <li key={comment.id} className="tf-action-comment-thread__comment">
            <div className="tf-action-comment-thread__meta">
              <span className="tf-action-comment-thread__author">{comment.author}</span>
              <time className="tf-action-comment-thread__time" dateTime={comment.timestamp}>
                {new Date(comment.timestamp).toLocaleString()}
              </time>
            </div>
            <p className="tf-action-comment-thread__text">{comment.text}</p>
            {onReply && (
              <button
                type="button"
                className="tf-action-comment-thread__reply-trigger"
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              >
                Reply
              </button>
            )}
            {replyTo === comment.id && (
              <div className="tf-action-comment-thread__reply-form">
                <textarea
                  className="tf-action-comment-thread__reply-input"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  rows={2}
                />
                <button
                  type="button"
                  className="tf-action-comment-thread__reply-submit"
                  onClick={() => handleReply(comment.id)}
                  disabled={!replyText.trim()}
                >
                  Post Reply
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="tf-action-comment-thread__compose">
        <textarea
          className="tf-action-comment-thread__input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={2}
        />
        <button
          type="button"
          className="tf-action-comment-thread__submit"
          onClick={handleAdd}
          disabled={!newComment.trim()}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default ActionCommentThread;
