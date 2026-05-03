/**
 * @fileoverview TraceBookmark — Bookmark important trace events.
 * Toggle bookmark state and show bookmark list.
 *
 * @module @torakagemusha-sudo/tf-design-v2/components/runtime-trace-console/TraceBookmark
 */

import React, { useState } from "react";
import type { BaseComponentProps, TraceBookmark as TraceBookmarkType } from "./types";

/** Props for TraceBookmark. */
export interface TraceBookmarkProps extends BaseComponentProps {
  /** Bookmarks list. */
  bookmarks: TraceBookmarkType[];
  /** Callback to add a bookmark. */
  onAdd?: (bookmark: Omit<TraceBookmarkType, "id" | "timestamp">) => void;
  /** Callback to remove a bookmark. */
  onRemove?: (bookmarkId: string) => void;
  /** Callback when a bookmark is clicked. */
  onNavigate?: (eventId: string) => void;
  /** Whether to show the bookmark list. */
  showList?: boolean;
}

/**
 * TraceBookmark — Bookmark manager for trace events.
 *
 * @example
 * ```tsx
 * <TraceBookmark
 *   bookmarks={bookmarks}
 *   onAdd={(b) => addBookmark(b)}
 *   onRemove={(id) => removeBookmark(id)}
 *   onNavigate={(id) => scrollToEvent(id)}
 * />
 * ```
 */
export const TraceBookmark: React.FC<TraceBookmarkProps> = ({
  bookmarks,
  onAdd,
  onRemove,
  onNavigate,
  showList = true,
  className = "",
  "data-testid": dataTestId = "trace-bookmark",
}) => {
  const [newNote, setNewNote] = useState("");

  return (
    <div
      className={`tf-trace-bookmark ${className}`}
      data-testid={dataTestId}
    >
      <div className="tf-trace-bookmark__header">
        <h5 className="tf-trace-bookmark__title">
          {"★"} Bookmarks ({bookmarks.length})
        </h5>
      </div>

      {showList && (
        <div className="tf-trace-bookmark__list">
          {bookmarks.length === 0 ? (
            <p className="tf-trace-bookmark__empty">No bookmarks</p>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="tf-trace-bookmark__item"
                onClick={() => onNavigate?.(bm.eventId)}
              >
                <span className="tf-trace-bookmark__label">{bm.label}</span>
                {bm.note && (
                  <span className="tf-trace-bookmark__note">{bm.note}</span>
                )}
                <span className="tf-trace-bookmark__actor">{bm.actor}</span>
                {onRemove && (
                  <button
                    className="tf-trace-bookmark__remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(bm.id);
                    }}
                    type="button"
                    aria-label="Remove bookmark"
                  >
                    {"✕"}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

TraceBookmark.displayName = "TraceBookmark";

export default TraceBookmark;
