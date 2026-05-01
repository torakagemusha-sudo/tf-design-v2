/**
 * @fileoverview GraphLegend — Graph legend showing node/edge type color mappings.
 * Provides a visual key for interpreting node shapes, colors, and edge styles.
 */

import React, { useState } from 'react';
import type { GraphComponentProps } from './types';

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  shape?: 'circle' | 'square' | 'diamond' | 'line' | 'dashed-line' | 'dotted-line';
  icon?: string;
}

export interface GraphLegendProps extends GraphComponentProps {
  /** Legend items to display */
  items: LegendItem[];
  /** Whether the legend is visible */
  visible?: boolean;
  /** Whether the legend is collapsed */
  collapsed?: boolean;
  /** Title of the legend */
  title?: string;
  /** Callback when collapse is toggled */
  onToggleCollapse?: () => void;
  /** Callback when visibility is toggled */
  onToggleVisible?: () => void;
}

/**
 * GraphLegend — Graph legend.
 *
 * Displays a color/shape key for interpreting node types and
 * edge styles on the graph canvas. Can be collapsed to save space.
 *
 * @example
 * <GraphLegend
 *   items={[
 *     { id: 'start', label: 'Start', color: '#2ecc71', shape: 'circle' },
 *     { id: 'process', label: 'Process', color: '#3498db', shape: 'square' },
 *     { id: 'decision', label: 'Decision', color: '#f39c12', shape: 'diamond' },
 *   ]}
 * />
 */
export const GraphLegend: React.FC<GraphLegendProps> = ({
  className = '',
  style,
  items,
  visible = true,
  collapsed = false,
  title = 'Legend',
  onToggleCollapse,
  onToggleVisible,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-legend ${collapsed ? 'tf-graph-legend--collapsed' : ''} ${className}`}
      style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        width: collapsed ? 'auto' : 180,
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 50,
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-legend__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px',
          cursor: onToggleCollapse ? 'pointer' : 'default',
        }}
        onClick={onToggleCollapse}
      >
        {!collapsed && <span style={{ fontWeight: 600, fontSize: 11, color: '#c8d6e5' }}>{title}</span>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {collapsed && <span style={{ fontSize: 11, color: '#8b9db8' }}>ⓘ</span>}
          <button
            className="tf-graph-legend__toggle"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollapse?.();
            }}
            type="button"
            style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 8 }}
          >
            {collapsed ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="tf-graph-legend__items" style={{ padding: '4px 10px 8px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`tf-graph-legend__item tf-graph-legend__item--${item.shape || 'square'}`}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', fontSize: 11 }}
            >
              {item.shape === 'circle' && (
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color, display: 'inline-block' }} />
              )}
              {item.shape === 'square' && (
                <span style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: item.color, display: 'inline-block' }} />
              )}
              {item.shape === 'diamond' && (
                <span style={{ width: 8, height: 8, backgroundColor: item.color, display: 'inline-block', transform: 'rotate(45deg)' }} />
              )}
              {(item.shape === 'line' || item.shape === 'dashed-line' || item.shape === 'dotted-line') && (
                <span style={{
                  width: 14,
                  height: 0,
                  borderTop: `2px ${item.shape === 'dashed-line' ? 'dashed' : item.shape === 'dotted-line' ? 'dotted' : 'solid'} ${item.color}`,
                  display: 'inline-block',
                }} />
              )}
              {item.icon && <span style={{ fontSize: 10 }}>{item.icon}</span>}
              <span style={{ color: '#c8d6e5' }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

GraphLegend.displayName = 'GraphLegend';
export default GraphLegend;
