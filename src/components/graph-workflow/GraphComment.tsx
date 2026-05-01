/**
 * @fileoverview GraphComment — Floating comment/annotation on the canvas.
 * A draggable note that can be attached to nodes or placed freely.
 */

import React, { useState } from 'react';
import type { Point2D, GraphComponentProps } from './types';

export interface GraphCommentProps extends GraphComponentProps {
  /** Comment unique identifier */
  id: string;
  /** Comment text content */
  text: string;
  /** Canvas position */
  position: Point2D;
  /** Comment author */
  author?: string;
  /** Creation timestamp */
  timestamp?: number;
  /** Whether the comment is resolved */
  resolved?: boolean;
  /** Whether the comment is being edited */
  editing?: boolean;
  /** Background color */
  color?: string;
  /** Callback when text changes */
  onTextChange?: (id: string, text: string) => void;
  /** Callback when position changes */
  onPositionChange?: (id: string, position: Point2D) => void;
  /** Callback when resolved is toggled */
  onResolveToggle?: (id: string) => void;
  /** Callback when delete is requested */
  onDelete?: (id: string) => void;
  /** Callback when edit mode is toggled */
  onEditToggle?: (id: string) => void;
}

/**
 * GraphComment — Floating comment/annotation.
 *
 * A draggable sticky-note style comment that can be placed on
 * the canvas or attached to nodes. Supports editing, resolving,
 * and deletion.
 *
 * @example
 * <GraphComment
 *   id="comment-1"
 *   text="Review this logic before production"
 *   position={{ x: 200, y: 150 }}
 *   author="Jane Smith"
 *   onTextChange={(id, text) => updateComment(id, text)}
 * />
 */
export const GraphComment: React.FC<GraphCommentProps> = ({
  className = '',
  style,
  id,
  text,
  position,
  author,
  timestamp,
  resolved = false,
  editing = false,
  color = '#f39c12',
  onTextChange,
  onPositionChange,
  onResolveToggle,
  onDelete,
  onEditToggle,
  ...rest
}) => {
  const [editText, setEditText] = useState(text);

  return (
    <div
      className={`tf-graph-comment ${resolved ? 'tf-graph-comment--resolved' : ''} ${editing ? 'tf-graph-comment--editing' : ''} ${className}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 200,
        backgroundColor: resolved ? '#1a2a1a' : '#2a2a1a',
        border: `2px solid ${resolved ? '#2a5a2a' : color}`,
        borderRadius: 6,
        zIndex: 30,
        ...style,
      }}
      {...rest}
    >
      {/* Header */}
      <div
        className="tf-graph-comment__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 8px',
          backgroundColor: `${color}22`,
          borderBottom: `1px solid ${color}44`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, color }}>💬</span>
          <span style={{ fontSize: 9, color: '#6b7f9e' }}>
            {author || 'Anonymous'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            className="tf-graph-comment__resolve"
            onClick={() => onResolveToggle?.(id)}
            title={resolved ? 'Unresolve' : 'Resolve'}
            type="button"
            style={{ background: 'none', border: 'none', color: resolved ? '#2ecc71' : '#6b7f9e', cursor: 'pointer', fontSize: 10 }}
          >
            {resolved ? '✓' : '○'}
          </button>
          <button
            className="tf-graph-comment__edit"
            onClick={() => {
              if (editing) {
                onTextChange?.(id, editText);
              }
              onEditToggle?.(id);
            }}
            title="Edit"
            type="button"
            style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 10 }}
          >
            {editing ? '✓' : '✎'}
          </button>
          <button
            className="tf-graph-comment__delete"
            onClick={() => onDelete?.(id)}
            title="Delete"
            type="button"
            style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 10 }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="tf-graph-comment__body" style={{ padding: '6px 8px' }}>
        {editing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              minHeight: 60,
              background: '#1a2332',
              border: '1px solid #2a3a4e',
              borderRadius: 3,
              color: '#c8d6e5',
              fontSize: 11,
              padding: 4,
              outline: 'none',
              resize: 'vertical',
            }}
          />
        ) : (
          <div style={{ fontSize: 11, color: '#c8d6e5', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {text}
          </div>
        )}
      </div>

      {timestamp && (
        <div className="tf-graph-comment__footer" style={{ padding: '2px 8px 4px', fontSize: 9, color: '#3a5274', textAlign: 'right' }}>
          {new Date(timestamp).toLocaleString()}
        </div>
      )}
    </div>
  );
};

GraphComment.displayName = 'GraphComment';
export default GraphComment;
