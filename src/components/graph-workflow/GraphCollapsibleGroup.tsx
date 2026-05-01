/**
 * @fileoverview GraphCollapsibleGroup — Collapsible group with expand/collapse animation.
 * A node group that can be expanded or collapsed with animated transitions.
 */

import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps, Point2D, Size2D } from './types';

export interface GraphCollapsibleGroupProps extends GraphComponentProps {
  /** Group unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Group position */
  position: Point2D;
  /** Group dimensions when expanded */
  size: Size2D;
  /** Background color */
  color?: string;
  /** Border color */
  borderColor?: string;
  /** Whether the group starts collapsed */
  defaultCollapsed?: boolean;
  /** Whether the group is collapsed (controlled) */
  collapsed?: boolean;
  /** Child nodes */
  children?: ReactNode;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (id: string, collapsed: boolean) => void;
  /** Callback when the group is selected */
  onSelect?: (id: string) => void;
}

/**
 * GraphCollapsibleGroup — Collapsible node group.
 *
 * A visual node group that supports animated expand/collapse.
 * When collapsed, only the header is shown hiding all contained nodes.
 *
 * @example
 * <GraphCollapsibleGroup
 *   id="auth-group"
 *   label="Authentication"
 *   position={{ x: 100, y: 100 }}
 *   size={{ width: 400, height: 300 }}
 *   defaultCollapsed={false}
 * >
 *   {authNodes.map(n => <GraphNode key={n.id} node={n} />)}
 * </GraphCollapsibleGroup>
 */
export const GraphCollapsibleGroup: React.FC<GraphCollapsibleGroupProps> = ({
  className = '',
  style,
  id,
  label,
  position,
  size,
  color = 'rgba(74, 111, 165, 0.1)',
  borderColor = '#4a6fa5',
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  children,
  onCollapsedChange,
  onSelect,
  ...rest
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = controlledCollapsed ?? internalCollapsed;

  const handleToggle = () => {
    const next = !collapsed;
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(next);
    }
    onCollapsedChange?.(id, next);
  };

  return (
    <div
      className={`tf-graph-collapsible-group ${collapsed ? 'tf-graph-collapsible-group--collapsed' : ''} ${className}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: collapsed ? 28 : size.height,
        backgroundColor: collapsed ? 'transparent' : color,
        border: `2px dashed ${borderColor}`,
        borderRadius: 6,
        transition: 'height 0.2s ease, background-color 0.2s ease',
        overflow: 'hidden',
        ...style,
      }}
      data-group-id={id}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(id);
      }}
      {...rest}
    >
      <div
        className="tf-graph-collapsible-group__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '0 8px',
          height: 28,
          cursor: 'pointer',
        }}
        onClick={handleToggle}
      >
        <span style={{ fontSize: 8, color: borderColor }}>{collapsed ? '▸' : '▾'}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: borderColor }}>{label}</span>
      </div>

      {!collapsed && (
        <div className="tf-graph-collapsible-group__content" style={{ position: 'relative', width: '100%', height: size.height - 28 }}>
          {children}
        </div>
      )}
    </div>
  );
};

GraphCollapsibleGroup.displayName = 'GraphCollapsibleGroup';
export default GraphCollapsibleGroup;
