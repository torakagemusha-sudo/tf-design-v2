/**
 * @fileoverview GraphEdgeWaypoint — Edge waypoint handle for routing control.
 * A draggable point on an edge for custom routing paths.
 */

import React, { useCallback, useState } from 'react';
import type { GraphComponentProps, Point2D } from './types';

export interface GraphEdgeWaypointProps extends GraphComponentProps {
  /** Waypoint unique identifier */
  id: string;
  /** Waypoint position */
  position: Point2D;
  /** Whether the waypoint is selected */
  selected?: boolean;
  /** Whether the waypoint is being hovered */
  hovered?: boolean;
  /** Scale factor */
  scale?: number;
  /** Callback when the waypoint is dragged */
  onMove?: (waypointId: string, position: Point2D) => void;
  /** Callback when the waypoint is clicked */
  onClick?: (waypointId: string) => void;
  /** Callback when the waypoint is deleted */
  onDelete?: (waypointId: string) => void;
}

/**
 * GraphEdgeWaypoint — Edge waypoint handle.
 *
 * A draggable circular handle on an edge that allows custom
 * routing by adding intermediate points to the edge path.
 *
 * @example
 * <GraphEdgeWaypoint
 *   id="wp-1"
 *   position={{ x: 200, y: 150 }}
 *   onMove={(id, pos) => moveWaypoint(id, pos)}
 *   onDelete={(id) => removeWaypoint(id)}
 * />
 */
export const GraphEdgeWaypoint: React.FC<GraphEdgeWaypointProps> = ({
  className = '',
  style,
  id,
  position,
  selected = false,
  hovered = false,
  scale = 1,
  onMove,
  onClick,
  onDelete,
  ...rest
}) => {
  const size = selected ? 10 : 6;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick?.(id);

      const startX = e.clientX;
      const startY = e.clientY;
      const startWpX = position.x;
      const startWpY = position.y;

      const handleMove = (ev: MouseEvent) => {
        const dx = (ev.clientX - startX) / scale;
        const dy = (ev.clientY - startY) / scale;
        onMove?.(id, { x: startWpX + dx, y: startWpY + dy });
      };

      const handleUp = () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };

      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    },
    [id, position, scale, onMove, onClick]
  );

  return (
    <div
      className={`tf-graph-edge-waypoint ${selected ? 'tf-graph-edge-waypoint--selected' : ''} ${hovered ? 'tf-graph-edge-waypoint--hovered' : ''} ${className}`}
      style={{
        position: 'absolute',
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: selected ? '#f39c12' : hovered ? '#6b8cbc' : '#4a6fa5',
        border: `2px solid ${selected ? '#f39c12' : '#fff'}`,
        cursor: 'move',
        zIndex: 20,
        pointerEvents: 'auto',
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => {
        e.preventDefault();
        onDelete?.(id);
      }}
      title={selected ? 'Right-click to delete' : ''}
      {...rest}
    />
  );
};

GraphEdgeWaypoint.displayName = 'GraphEdgeWaypoint';
export default GraphEdgeWaypoint;
