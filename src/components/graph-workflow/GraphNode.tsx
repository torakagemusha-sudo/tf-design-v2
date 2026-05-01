/**
 * @fileoverview GraphNode — Base graph node component.
 * All specialized node types extend this foundation with shape, icon, and behavior.
 */

import React, { useCallback } from 'react';
import type {
  Point2D,
  GraphNodeData,
  GraphComponentProps,
  GraphNodeStatus,
} from './types';

export interface GraphNodeProps extends GraphComponentProps {
  /** Node data model */
  node: GraphNodeData;
  /** Whether the node is currently selected */
  selected?: boolean;
  /** Whether the node is being hovered */
  hovered?: boolean;
  /** Whether the node is being dragged */
  dragging?: boolean;
  /** Whether the node is locked (non-interactive) */
  locked?: boolean;
  /** Whether ports are visible */
  showPorts?: boolean;
  /** Whether to show the status badge */
  showStatus?: boolean;
  /** Scale factor for rendering */
  scale?: number;
  /** Callback when node is clicked */
  onSelect?: (nodeId: string) => void;
  /** Callback when node is double-clicked */
  onDoubleClick?: (nodeId: string) => void;
  /** Callback when context menu is triggered */
  onContextMenu?: (nodeId: string, event: React.MouseEvent) => void;
  /** Callback when drag starts */
  onDragStart?: (nodeId: string, position: Point2D) => void;
  /** Callback during drag */
  onDrag?: (nodeId: string, position: Point2D) => void;
  /** Callback when drag ends */
  onDragEnd?: (nodeId: string, position: Point2D) => void;
  /** Callback when a port is clicked */
  onPortClick?: (nodeId: string, portId: string) => void;
  /** Custom status badge renderer */
  renderStatusBadge?: (status: GraphNodeStatus) => React.ReactNode;
  /** Custom icon renderer */
  renderIcon?: (node: GraphNodeData) => React.ReactNode;
  /** Node content (children override) */
  children?: React.ReactNode;
}

/**
 * GraphNode — Base graph node component.
 *
 * Provides the foundational node shell with selection state, drag handling,
 * status badges, and port integration. All specialized node types build
 * upon this base.
 *
 * @example
 * <GraphNode
 *   node={nodeData}
 *   selected={isSelected}
 *   onSelect={(id) => handleSelect(id)}
 * />
 */
export const GraphNode: React.FC<GraphNodeProps> = ({
  className = '',
  style,
  node,
  selected = false,
  hovered = false,
  dragging = false,
  locked = false,
  showPorts = true,
  showStatus = true,
  scale = 1,
  onSelect,
  onDoubleClick,
  onContextMenu,
  onDragStart,
  onDrag,
  onDragEnd,
  onPortClick,
  renderStatusBadge,
  renderIcon,
  children,
  ...rest
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect?.(node.id);
    },
    [node.id, onSelect]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDoubleClick?.(node.id);
    },
    [node.id, onDoubleClick]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onContextMenu?.(node.id, e);
    },
    [node.id, onContextMenu]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (locked) return;
      e.stopPropagation();
      onDragStart?.(node.id, { x: node.position.x, y: node.position.y });
    },
    [locked, node.id, node.position, onDragStart]
  );

  const statusClass = node.status ? `tf-graph-node--status-${node.status}` : '';
  const typeClass = `tf-graph-node--type-${node.type}`;
  const selectedClass = selected ? 'tf-graph-node--selected' : '';
  const hoveredClass = hovered ? 'tf-graph-node--hovered' : '';
  const draggingClass = dragging ? 'tf-graph-node--dragging' : '';
  const lockedClass = locked ? 'tf-graph-node--locked' : '';
  const collapsedClass = node.collapsed ? 'tf-graph-node--collapsed' : '';

  const width = node.size?.width ?? 160;
  const height = node.size?.height ?? 64;

  return (
    <div
      className={`tf-graph-node ${typeClass} ${statusClass} ${selectedClass} ${hoveredClass} ${draggingClass} ${lockedClass} ${collapsedClass} ${className}`}
      style={{
        position: 'absolute',
        left: node.position.x,
        top: node.position.y,
        width,
        height,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        cursor: locked ? 'not-allowed' : dragging ? 'grabbing' : 'grab',
        zIndex: selected ? 10 : hovered ? 5 : 1,
        ...style,
      }}
      data-node-id={node.id}
      data-node-type={node.type}
      data-testid={`graph-node-${node.id}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      {...rest}
    >
      {/* Node body */}
      <div className="tf-graph-node__body">
        {/* Status badge */}
        {showStatus && node.status && (
          <div className="tf-graph-node__status">
            {renderStatusBadge
              ? renderStatusBadge(node.status)
              : <span className={`tf-graph-node__status-dot tf-graph-node__status-dot--${node.status}`} />}
          </div>
        )}

        {/* Node icon */}
        {node.icon && (
          <div className="tf-graph-node__icon">
            {renderIcon ? renderIcon(node) : node.icon}
          </div>
        )}

        {/* Node label */}
        <div className="tf-graph-node__label" title={node.tooltip || node.label}>
          {node.label}
        </div>

        {/* Node badge */}
        {node.badge && (
          <div className="tf-graph-node__badge">{node.badge}</div>
        )}

        {/* Custom content */}
        {children}
      </div>

      {/* Ports container */}
      {showPorts && node.ports && node.ports.length > 0 && (
        <div className="tf-graph-node__ports">
          {node.ports.map((port) => (
            <button
              key={port.id}
              className={`tf-graph-node__port tf-graph-node__port--${port.type} tf-graph-node__port--${port.position}`}
              data-port-id={port.id}
              data-port-type={port.type}
              onClick={(e) => {
                e.stopPropagation();
                onPortClick?.(node.id, port.id);
              }}
              title={port.label || port.id}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

GraphNode.displayName = 'GraphNode';

export default GraphNode;
