/**
 * @fileoverview GraphUserPresence — User presence indicator showing active collaborators.
 * Avatar list of currently active users in the graph editor.
 */

import React from 'react';
import type { UserPresence, GraphComponentProps } from './types';

export interface GraphUserPresenceProps extends GraphComponentProps {
  /** Active users */
  users: UserPresence[];
  /** Current user ID */
  currentUserId?: string;
  /** Maximum number of avatars to show */
  maxAvatars?: number;
  /** Callback when a user avatar is clicked */
  onUserClick?: (userId: string) => void;
  /** Callback when the user list expand is clicked */
  onExpandClick?: () => void;
}

/**
 * GraphUserPresence — User presence indicator.
 *
 * Displays avatars of all currently active collaborating users.
 * Shows a count overflow when there are more users than the max.
 *
 * @example
 * <GraphUserPresence
 *   users={[
 *     { userId: 'u1', userName: 'Alice', userColor: '#e74c3c' },
 *     { userId: 'u2', userName: 'Bob', userColor: '#2ecc71' },
 *   ]}
 *   currentUserId="u1"
 *   maxAvatars={5}
 * />
 */
export const GraphUserPresence: React.FC<GraphUserPresenceProps> = ({
  className = '',
  style,
  users,
  currentUserId,
  maxAvatars = 5,
  onUserClick,
  onExpandClick,
  ...rest
}) => {
  const displayUsers = users.slice(0, maxAvatars);
  const overflow = users.length - maxAvatars;

  return (
    <div
      className={`tf-graph-user-presence ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: -4,
        ...style,
      }}
      {...rest}
    >
      {displayUsers.map((user) => (
        <div
          key={user.userId}
          className={`tf-graph-user-presence__avatar ${user.userId === currentUserId ? 'tf-graph-user-presence__avatar--me' : ''}`}
          onClick={() => onUserClick?.(user.userId)}
          title={`${user.userName}${user.userId === currentUserId ? ' (you)' : ''}`}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: user.userColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            marginLeft: -6,
            border: `2px solid ${user.userId === currentUserId ? '#c8d6e5' : '#1a2332'}`,
            cursor: onUserClick ? 'pointer' : 'default',
            zIndex: 1,
          }}
        >
          {user.userName.charAt(0).toUpperCase()}
        </div>
      ))}

      {overflow > 0 && (
        <button
          className="tf-graph-user-presence__overflow"
          onClick={onExpandClick}
          type="button"
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: '#2a3a4e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 600,
            color: '#c8d6e5',
            marginLeft: -6,
            border: '2px solid #1a2332',
            cursor: 'pointer',
          }}
        >
          +{overflow}
        </button>
      )}
    </div>
  );
};

GraphUserPresence.displayName = 'GraphUserPresence';
export default GraphUserPresence;
