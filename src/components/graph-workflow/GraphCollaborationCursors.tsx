/**
 * @fileoverview GraphCollaborationCursors — Multi-user cursor overlays for real-time collaboration.
 * Renders other users' cursors on the canvas with their names and colors.
 */

import React from 'react';
import type { UserPresence, GraphComponentProps } from './types';

export interface GraphCollaborationCursorsProps extends GraphComponentProps {
  /** Other users' presence data */
  users: UserPresence[];
  /** Current viewport for coordinate transformation */
  viewport?: { x: number; y: number; zoom: number };
  /** Callback when a user's cursor is clicked */
  onUserClick?: (userId: string) => void;
}

/**
 * GraphCollaborationCursors — Multi-user collaboration cursors.
 *
 * Renders the cursors of other collaborating users on the canvas,
 * each with a unique color and user name label.
 *
 * @example
 * <GraphCollaborationCursors
 *   users={[
 *     { userId: 'u1', userName: 'Alice', userColor: '#e74c3c', cursorPosition: { x: 200, y: 300 } },
 *     { userId: 'u2', userName: 'Bob', userColor: '#2ecc71', cursorPosition: { x: 400, y: 150 } },
 *   ]}
 *   viewport={{ x: 0, y: 0, zoom: 1 }}
 * />
 */
export const GraphCollaborationCursors: React.FC<GraphCollaborationCursorsProps> = ({
  className = '',
  style,
  users,
  viewport = { x: 0, y: 0, zoom: 1 },
  onUserClick,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-collaboration-cursors ${className}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 90, ...style }}
      {...rest}
    >
      {users.map((user) => {
        if (!user.cursorPosition) return null;
        const screenX = user.cursorPosition.x * viewport.zoom + viewport.x;
        const screenY = user.cursorPosition.y * viewport.zoom + viewport.y;

        return (
          <div
            key={user.userId}
            className="tf-graph-collaboration-cursors__cursor"
            onClick={() => onUserClick?.(user.userId)}
            style={{
              position: 'absolute',
              left: screenX,
              top: screenY,
              pointerEvents: 'auto',
              cursor: 'pointer',
              transition: 'left 0.1s linear, top 0.1s linear',
            }}
          >
            {/* Cursor arrow */}
            <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
              <path
                d="M1 1L1 16L5 12.5L9 20L12 18.5L8 11L14 10L1 1Z"
                fill={user.userColor}
                stroke="#fff"
                strokeWidth="1"
              />
            </svg>

            {/* Name label */}
            <span
              style={{
                position: 'absolute',
                top: 18,
                left: 10,
                padding: '1px 6px',
                backgroundColor: user.userColor,
                borderRadius: 3,
                fontSize: 9,
                fontWeight: 600,
                color: '#fff',
                whiteSpace: 'nowrap',
              }}
            >
              {user.userName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

GraphCollaborationCursors.displayName = 'GraphCollaborationCursors';
export default GraphCollaborationCursors;
