import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the ActionBookmarkButton component.
 * Bookmark/save an action for later.
 */
export interface ActionBookmarkButtonProps extends TorafirmaComponentBaseProps {
  /** The action ID to bookmark */
  actionId: string;
  /** Whether the action is currently bookmarked */
  bookmarked: boolean;
  /** Callback fired when the bookmark is toggled */
  onToggle: (actionId: string, bookmarked: boolean) => void;
}

/**
 * ActionBookmarkButton — bookmark/save an action for later.
 *
 * Renders a toggle button that bookmarks or unbookmarks an
 * action. Displays a filled bookmark icon when active and
 * an outline icon when inactive. Used for saving commands
 * the operator wants to revisit.
 *
 * @example
 * ```tsx
 * <ActionBookmarkButton
 *   actionId="cmd-deploy-001"
 *   bookmarked={false}
 *   onToggle={(id, isBookmarked) => console.log(id, isBookmarked)}
 * />
 * ```
 */
const ActionBookmarkButton: React.FC<ActionBookmarkButtonProps> = ({
  actionId,
  bookmarked,
  onToggle,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`tf-action-bookmark-button ${bookmarked ? 'tf-action-bookmark-button--active' : ''} ${className}`}
      onClick={() => onToggle(actionId, !bookmarked)}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      title={bookmarked ? 'Bookmarked' : 'Bookmark this action'}
      data-action-id={actionId}
      data-testid={testId}
      {...rest}
    >
      <span className="tf-action-bookmark-button__icon" aria-hidden="true">
        {bookmarked ? '&#9733;' : '&#9734;'}
      </span>
    </button>
  );
};

export default ActionBookmarkButton;
