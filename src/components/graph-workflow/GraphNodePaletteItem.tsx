/**
 * @fileoverview GraphNodePaletteItem — Individual draggable palette item.
 * A single node type entry in the node palette sidebar.
 */

import React from 'react';
import type { GraphNodeType, GraphComponentProps } from './types';

export interface GraphNodePaletteItemProps extends GraphComponentProps {
  /** Node type this item represents */
  nodeType: GraphNodeType;
  /** Display label */
  label: string;
  /** Display icon */
  icon?: string;
  /** Whether the item is highlighted */
  highlighted?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Callback when drag starts */
  onDragStart?: (nodeType: GraphNodeType, e: React.DragEvent) => void;
  /** Callback when item is clicked */
  onClick?: (nodeType: GraphNodeType) => void;
}

/**
 * GraphNodePaletteItem — Draggable palette item.
 *
 * A single draggable entry in the node palette representing one
 * node type. Can be dragged onto the canvas to create a new node.
 *
 * @example
 * <GraphNodePaletteItem
 *   nodeType="process"
 *   label="Process"
 *   icon="⚙"
 *   onDragStart={(type, e) => e.dataTransfer.setData('type', type)}
 * />
 */
export const GraphNodePaletteItem: React.FC<GraphNodePaletteItemProps> = ({
  className = '',
  style,
  nodeType,
  label,
  icon = '◆',
  highlighted = false,
  disabled = false,
  onDragStart,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-node-palette-item ${highlighted ? 'tf-graph-node-palette-item--highlighted' : ''} ${disabled ? 'tf-graph-node-palette-item--disabled' : ''} ${className}`}
      draggable={!disabled}
      onDragStart={(e) => onDragStart?.(nodeType, e)}
      onClick={() => onClick?.(nodeType)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'grab',
        opacity: disabled ? 0.4 : 1,
        userSelect: 'none',
        backgroundColor: highlighted ? '#1a3050' : 'transparent',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !highlighted) {
          (e.currentTarget as HTMLElement).style.backgroundColor = '#1a3050';
        }
      }}
      onMouseLeave={(e) => {
        if (!highlighted) {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
        }
      }}
      {...rest}
    >
      <span className="tf-graph-node-palette-item__icon" style={{ fontSize: 14, width: 20, textAlign: 'center' }}>
        {icon}
      </span>
      <span className="tf-graph-node-palette-item__label" style={{ fontSize: 12, color: '#c8d6e5' }}>
        {label}
      </span>
    </div>
  );
};

GraphNodePaletteItem.displayName = 'GraphNodePaletteItem';
export default GraphNodePaletteItem;
