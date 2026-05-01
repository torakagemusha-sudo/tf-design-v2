/**
 * @fileoverview GraphNodeGroup — Visual grouping container for related nodes.
 * A bounding rectangle that visually groups a set of nodes together.
 */

import React from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps, Point2D, Size2D } from './types';

export interface GraphNodeGroupProps extends GraphComponentProps {
  /** Group unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Group position */
  position: Point2D;
  /** Group dimensions */
  size: Size2D;
  /** Background color with alpha */
  color?: string;
  /** Border color */
  borderColor?: string;
  /** Whether the group is collapsed */
  collapsed?: boolean;
  /** Whether the group is selected */
  selected?: boolean;
  /** Whether the group is locked */
  locked?: boolean;
  /** Child nodes inside the group */
  children?: ReactNode;
  /** Callback when the group is selected */
  onSelect?: (id: string) => void;
  /** Callback when collapse is toggled */
  onToggleCollapse?: (id: string) => void;
}

/**
 * GraphNodeGroup — Visual node grouping.
 *
 * A bounding rectangle that visually groups related nodes together.
 * Supports collapsing to hide contained nodes, selection, and
 * custom coloring.
 *
 * @example
 * <GraphNodeGroup
 *   id="group-1"
 *   label="Authentication"
 *   position={{ x: 100, y: 100 }}
 *   size={{ width: 400, height: 300 }}
 *   color="rgba(52, 152, 219, 0.1)"
 * >
 *   {groupedNodes.map(n => <GraphNode key={n.id} node={n} />)}
 * </GraphNodeGroup>
 */
export const GraphNodeGroup: React.FC<GraphNodeGroupProps> = ({
  className = '',
  style,
  id,
  label,
  position,
  size,
  color = 'rgba(74, 111, 165, 0.1)',
  borderColor = '#4a6fa5',
  collapsed = false,
  selected = false,
  locked = false,
  children,
  onSelect,
  onToggleCollapse,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-node-group ${selected ? 'tf-graph-node-group--selected' : ''} ${collapsed ? 'tf-graph-node-group--collapsed' : ''} ${locked ? 'tf-graph-node-group--locked' : ''} ${className}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: collapsed ? 28 : size.height,
        backgroundColor: color,
        border: `2px ${selected ? 'solid' : 'dashed'} ${selected ? '#6b8cbc' : borderColor}`,
        borderRadius: 6,
        zIndex: selected ? 8 : 0,
        ...style,
      }}
      data-group-id={id}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(id);
      }}
      {...rest}
    >
      {/* Group header */}
      <div
        className="tf-graph-node-group__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '0 8px',
          height: 28,
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleCollapse?.(id);
        }}
      >
        <span style={{ fontSize: 8, color: borderColor }}>{collapsed ? '▸' : '▾'}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: borderColor }}>{label}</span>
        {locked && <span style={{ marginLeft: 'auto', fontSize: 9, color: borderColor, opacity: 0.6 }}>🔒</span>}
      </div>

      {/* Group content */}
      {!collapsed && (
        <div className="tf-graph-node-group__content" style={{ position: 'relative', width: '100%', height: size.height - 28 }}>
          {children}
        </div>
      )}
    </div>
  );
};

GraphNodeGroup.displayName = 'GraphNodeGroup';

export default GraphNodeGroup;
