/**
 * @fileoverview GraphBreadcrumb — Graph navigation breadcrumb for nested/subgraph navigation.
 * Shows the hierarchy of nested graphs for breadcrumb navigation.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface BreadcrumbItem {
  id: string;
  label: string;
  icon?: string;
}

export interface GraphBreadcrumbProps extends GraphComponentProps {
  /** Breadcrumb items from root to current */
  items: BreadcrumbItem[];
  /** Callback when an item is clicked (navigates to that level) */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  /** Callback when home/root is clicked */
  onHomeClick?: () => void;
}

/**
 * GraphBreadcrumb — Graph navigation breadcrumb.
 *
 * Displays a breadcrumb trail for navigating nested subgraphs.
 * Each segment represents a level in the graph hierarchy, and
 * clicking a segment navigates up to that level.
 *
 * @example
 * <GraphBreadcrumb
 *   items={[
 *     { id: 'root', label: 'Main Flow', icon: '🏠' },
 *     { id: 'sub1', label: 'Auth Flow' },
 *     { id: 'sub2', label: 'Token Validation' },
 *   ]}
 *   onItemClick={(item) => navigateToGraph(item.id)}
 * />
 */
export const GraphBreadcrumb: React.FC<GraphBreadcrumbProps> = ({
  className = '',
  style,
  items,
  onItemClick,
  onHomeClick,
  ...rest
}) => {
  if (items.length === 0) return null;

  return (
    <div
      className={`tf-graph-breadcrumb ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 12px',
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 50,
        ...style,
      }}
      {...rest}
    >
      <button
        className="tf-graph-breadcrumb__home"
        onClick={onHomeClick}
        title="Root graph"
        type="button"
        style={{
          background: 'none',
          border: 'none',
          color: '#8b9db8',
          cursor: 'pointer',
          fontSize: 12,
          padding: '2px 4px',
        }}
      >
        🏠
      </button>

      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <span style={{ color: '#3a5274', fontSize: 10 }}>/</span>
          <button
            className={`tf-graph-breadcrumb__item ${index === items.length - 1 ? 'tf-graph-breadcrumb__item--current' : ''}`}
            onClick={() => onItemClick?.(item, index)}
            disabled={index === items.length - 1}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: index === items.length - 1 ? '#c8d6e5' : '#8b9db8',
              cursor: index === items.length - 1 ? 'default' : 'pointer',
              fontSize: 12,
              fontWeight: index === items.length - 1 ? 600 : 400,
              padding: '2px 4px',
            }}
          >
            {item.icon && <span style={{ marginRight: 4 }}>{item.icon}</span>}
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

GraphBreadcrumb.displayName = 'GraphBreadcrumb';
export default GraphBreadcrumb;
