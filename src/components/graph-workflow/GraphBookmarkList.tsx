/**
 * @fileoverview GraphBookmarkList — Bookmark list panel for quick navigation.
 * Lists all bookmarks with click-to-navigate and management actions.
 */

import React from 'react';
import type { BookmarkData, GraphComponentProps } from './types';

export interface GraphBookmarkListProps extends GraphComponentProps {
  /** All bookmarks */
  bookmarks: BookmarkData[];
  /** Whether the panel is visible */
  visible?: boolean;
  /** Callback when a bookmark is selected */
  onSelect?: (bookmarkId: string) => void;
  /** Callback when a bookmark is deleted */
  onDelete?: (bookmarkId: string) => void;
  /** Callback when the panel is closed */
  onClose?: () => void;
}

/**
 * GraphBookmarkList — Bookmark list panel.
 *
 * Displays all saved bookmarks in a list. Clicking a bookmark
 * navigates to its associated node. Supports deletion and color
 * management.
 *
 * @example
 * <GraphBookmarkList
 *   bookmarks={bookmarks}
 *   onSelect={(id) => navigateToBookmark(id)}
 *   onDelete={(id) => removeBookmark(id)}
 * />
 */
export const GraphBookmarkList: React.FC<GraphBookmarkListProps> = ({
  className = '',
  style,
  bookmarks,
  visible = true,
  onSelect,
  onDelete,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-bookmark-list ${className}`}
      style={{
        position: 'absolute',
        top: 60,
        left: 16,
        width: 220,
        maxHeight: 300,
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 70,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-bookmark-list__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Bookmarks</span>
        <button
          className="tf-graph-bookmark-list__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-bookmark-list__items" style={{ overflowY: 'auto', flex: 1 }}>
        {bookmarks.length === 0 && (
          <div style={{ padding: 20, textAlign: 'center', color: '#6b7f9e', fontSize: 12 }}>
            No bookmarks
          </div>
        )}

        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="tf-graph-bookmark-list__item"
            onClick={() => onSelect?.(bookmark.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              cursor: 'pointer',
              borderBottom: '1px solid #1a2332',
            }}
          >
            <span
              className="tf-graph-bookmark-list__color"
              style={{
                width: 10,
                height: 14,
                backgroundColor: bookmark.color ?? '#f39c12',
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <span style={{ flex: 1, fontSize: 11, color: '#c8d6e5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {bookmark.label}
            </span>
            <button
              className="tf-graph-bookmark-list__delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(bookmark.id);
              }}
              type="button"
              style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 10 }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

GraphBookmarkList.displayName = 'GraphBookmarkList';
export default GraphBookmarkList;
