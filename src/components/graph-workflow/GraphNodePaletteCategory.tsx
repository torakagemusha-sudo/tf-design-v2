/**
 * @fileoverview GraphNodePaletteCategory — Collapsible category section in the node palette.
 * Groups related node types under a labeled, collapsible header.
 */

import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps } from './types';

export interface GraphNodePaletteCategoryProps extends GraphComponentProps {
  /** Category label */
  label: string;
  /** Category icon */
  icon?: string;
  /** Child palette items */
  children?: ReactNode;
  /** Whether the category is initially collapsed */
  defaultCollapsed?: boolean;
  /** Whether the category is collapsed */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onToggleCollapse?: () => void;
  /** Item count badge */
  itemCount?: number;
}

/**
 * GraphNodePaletteCategory — Palette category section.
 *
 * A labeled, collapsible section in the node palette that groups
 * related node types together (e.g., "Flow Control", "Data", "Integration").
 *
 * @example
 * <GraphNodePaletteCategory label="Flow Control" icon="⧉">
 *   <GraphNodePaletteItem nodeType="start" label="Start" />
 *   <GraphNodePaletteItem nodeType="end" label="End" />
 * </GraphNodePaletteCategory>
 */
export const GraphNodePaletteCategory: React.FC<GraphNodePaletteCategoryProps> = ({
  className = '',
  style,
  label,
  icon,
  children,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onToggleCollapse,
  itemCount,
  ...rest
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = controlledCollapsed ?? internalCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  return (
    <div
      className={`tf-graph-node-palette-category ${collapsed ? 'tf-graph-node-palette-category--collapsed' : ''} ${className}`}
      style={{ marginBottom: 4, ...style }}
      {...rest}
    >
      <div
        className="tf-graph-node-palette-category__header"
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 6px',
          cursor: 'pointer',
          userSelect: 'none',
          borderRadius: 4,
        }}
      >
        <span style={{ fontSize: 8, color: '#6b7f9e' }}>{collapsed ? '▸' : '▾'}</span>
        {icon && <span style={{ fontSize: 11 }}>{icon}</span>}
        <span style={{ fontSize: 10, fontWeight: 700, color: '#6b7f9e', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </span>
        {typeof itemCount === 'number' && (
          <span style={{ marginLeft: 'auto', fontSize: 9, color: '#3a5274', background: '#1a2332', padding: '1px 5px', borderRadius: 8 }}>
            {itemCount}
          </span>
        )}
      </div>

      {!collapsed && (
        <div className="tf-graph-node-palette-category__items" style={{ paddingLeft: 8 }}>
          {children}
        </div>
      )}
    </div>
  );
};

GraphNodePaletteCategory.displayName = 'GraphNodePaletteCategory';
export default GraphNodePaletteCategory;
