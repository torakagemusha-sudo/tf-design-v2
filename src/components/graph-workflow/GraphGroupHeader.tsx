/**
 * @fileoverview GraphGroupHeader — Group header bar with label, collapse, and lock controls.
 * The labeled header bar for a visual node group.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphGroupHeaderProps extends GraphComponentProps {
  /** Display label */
  label: string;
  /** Whether the group is collapsed */
  collapsed?: boolean;
  /** Whether the group is locked */
  locked?: boolean;
  /** Number of nodes in the group */
  nodeCount?: number;
  /** Header background color */
  color?: string;
  /** Callback when collapse is toggled */
  onToggleCollapse?: () => void;
  /** Callback when the header is clicked */
  onClick?: () => void;
}

/**
 * GraphGroupHeader — Group header bar.
 *
 * The labeled header bar for a visual node group showing the
 * group name, collapse toggle, node count, and lock indicator.
 *
 * @example
 * <GraphGroupHeader
 *   label="Authentication Flow"
 *   collapsed={false}
 *   nodeCount={5}
 *   color="#3498db"
 *   onToggleCollapse={() => toggleCollapse()}
 * />
 */
export const GraphGroupHeader: React.FC<GraphGroupHeaderProps> = ({
  className = '',
  style,
  label,
  collapsed = false,
  locked = false,
  nodeCount,
  color = '#4a6fa5',
  onToggleCollapse,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-group-header ${collapsed ? 'tf-graph-group-header--collapsed' : ''} ${locked ? 'tf-graph-group-header--locked' : ''} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 8px',
        height: 28,
        backgroundColor: `${color}22`,
        borderBottom: `1px solid ${color}44`,
        cursor: onToggleCollapse || onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
      {...rest}
    >
      <button
        className="tf-graph-group-header__toggle"
        onClick={(e) => {
          e.stopPropagation();
          onToggleCollapse?.();
        }}
        type="button"
        style={{ background: 'none', border: 'none', color, cursor: 'pointer', fontSize: 8, padding: 0 }}
      >
        {collapsed ? '▸' : '▾'}
      </button>
      <span style={{ fontSize: 11, fontWeight: 600, color }}>{label}</span>
      {typeof nodeCount === 'number' && (
        <span style={{ marginLeft: 6, fontSize: 9, color: `${color}aa`, background: `${color}11`, padding: '1px 5px', borderRadius: 8 }}>
          {nodeCount}
        </span>
      )}
      {locked && <span style={{ marginLeft: 'auto', fontSize: 9, color: `${color}88` }}>🔒</span>}
    </div>
  );
};

GraphGroupHeader.displayName = 'GraphGroupHeader';
export default GraphGroupHeader;
