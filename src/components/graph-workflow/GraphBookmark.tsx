/**
 * @fileoverview GraphBookmark — Node bookmark indicator and navigation anchor.
 * A visual bookmark on a node for quick navigation.
 */

import React from 'react';
import type { BookmarkData, GraphComponentProps } from './types';

export interface GraphBookmarkProps extends GraphComponentProps {
  /** Bookmark data */
  bookmark: BookmarkData;
  /** Whether the bookmark is highlighted */
  highlighted?: boolean;
  /** Callback when the bookmark is clicked */
  onClick?: (bookmarkId: string) => void;
  /** Callback when the bookmark is deleted */
  onDelete?: (bookmarkId: string) => void;
  /** Callback when the bookmark color changes */
  onColorChange?: (bookmarkId: string, color: string) => void;
}

const BOOKMARK_COLORS = ['#f39c12', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#1abc9c'];

/**
 * GraphBookmark — Node bookmark.
 *
 * A colored bookmark indicator placed on a node. Clicking navigates
 * to the bookmarked node. Supports color coding and deletion.
 *
 * @example
 * <GraphBookmark
 *   bookmark={{ id: 'b1', label: 'Important', nodeId: 'node-5', color: '#f39c12', timestamp: Date.now() }}
 *   onClick={(id) => navigateToBookmark(id)}
 * />
 */
export const GraphBookmark: React.FC<GraphBookmarkProps> = ({
  className = '',
  style,
  bookmark,
  highlighted = false,
  onClick,
  onDelete,
  onColorChange,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-bookmark ${highlighted ? 'tf-graph-bookmark--highlighted' : ''} ${className}`}
      style={{
        position: 'absolute',
        left: bookmark.position?.x ?? 0,
        top: (bookmark.position?.y ?? 0) - 8,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        zIndex: 25,
        ...style,
      }}
      {...rest}
    >
      <button
        className="tf-graph-bookmark__flag"
        onClick={() => onClick?.(bookmark.id)}
        title={bookmark.label}
        type="button"
        style={{
          width: 16,
          height: 20,
          backgroundColor: bookmark.color ?? '#f39c12',
          border: 'none',
          borderRadius: '2px 2px 0 0',
          clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
          cursor: 'pointer',
          boxShadow: highlighted ? `0 0 6px ${bookmark.color ?? '#f39c12'}` : 'none',
        }}
      />

      {highlighted && (
        <div
          className="tf-graph-bookmark__tooltip"
          style={{
            padding: '2px 8px',
            backgroundColor: 'rgba(16, 22, 36, 0.95)',
            border: '1px solid #2a3a4e',
            borderRadius: 4,
            fontSize: 10,
            color: '#c8d6e5',
            whiteSpace: 'nowrap',
          }}
        >
          {bookmark.label}
        </div>
      )}
    </div>
  );
};

GraphBookmark.displayName = 'GraphBookmark';
export default GraphBookmark;
