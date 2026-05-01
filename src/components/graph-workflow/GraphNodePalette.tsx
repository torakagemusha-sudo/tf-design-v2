/**
 * @fileoverview GraphNodePalette — Draggable node palette for creating new nodes.
 * A sidebar of node types that can be dragged onto the canvas.
 */

import React, { useState } from 'react';
import type { GraphNodeType, GraphComponentProps } from './types';

export interface GraphNodePaletteProps extends GraphComponentProps {
  /** Available node types to display */
  nodeTypes?: GraphNodeType[];
  /** Custom labels for node types */
  nodeLabels?: Record<GraphNodeType, string>;
  /** Custom icons for node types */
  nodeIcons?: Record<GraphNodeType, string>;
  /** Grouped categories of node types */
  categories?: Array<{ label: string; types: GraphNodeType[] }>;
  /** Callback when a node type is dragged */
  onDragStart?: (nodeType: GraphNodeType, e: React.DragEvent) => void;
  /** Callback when a node type is clicked */
  onNodeTypeClick?: (nodeType: GraphNodeType) => void;
  /** Whether the palette is visible */
  visible?: boolean;
  /** Whether the palette is collapsed */
  collapsed?: boolean;
  /** Callback when collapse is toggled */
  onToggleCollapse?: () => void;
}

const DEFAULT_NODE_TYPES: GraphNodeType[] = [
  'start', 'end', 'process', 'decision', 'data', 'input', 'output',
  'timer', 'parallel', 'join', 'subgraph', 'event', 'message',
  'error', 'manual', 'service', 'script', 'query', 'gateway',
  'condition', 'loop', 'apiCall', 'webhook', 'email', 'schedule',
];

const DEFAULT_LABELS: Partial<Record<GraphNodeType, string>> = {
  start: 'Start', end: 'End', process: 'Process', decision: 'Decision',
  data: 'Data Store', input: 'Input', output: 'Output', timer: 'Timer',
  parallel: 'Parallel', join: 'Join', subgraph: 'Subgraph', event: 'Event',
  message: 'Message', error: 'Error', manual: 'Manual Task', service: 'Service',
  script: 'Script', query: 'Query', gateway: 'Gateway', condition: 'Condition',
  loop: 'Loop', apiCall: 'API Call', webhook: 'Webhook', email: 'Email',
  schedule: 'Schedule',
};

const DEFAULT_ICONS: Partial<Record<GraphNodeType, string>> = {
  start: '▶', end: '■', process: '⚙', decision: '◇', data: '🗄',
  input: '↓', output: '↑', timer: '◷', parallel: '⫚', join: '∩',
  subgraph: '▣', event: '⚡', message: '✉', error: '⚠', manual: '✋',
  service: '🔗', script: '{}', query: '🔍', gateway: '◇', condition: '?',
  loop: '⟳', apiCall: '⚡', webhook: '⚓', email: '✉', schedule: '🕐',
};

/**
 * GraphNodePalette — Draggable node palette.
 *
 * A sidebar panel containing draggable node type items. Users can
 * drag items onto the canvas to create new nodes of that type.
 *
 * @example
 * <GraphNodePalette
 *   onDragStart={(type, e) => e.dataTransfer.setData('nodeType', type)}
 * />
 */
export const GraphNodePalette: React.FC<GraphNodePaletteProps> = ({
  className = '',
  style,
  nodeTypes = DEFAULT_NODE_TYPES,
  nodeLabels = DEFAULT_LABELS as Record<GraphNodeType, string>,
  nodeIcons = DEFAULT_ICONS as Record<GraphNodeType, string>,
  categories,
  onDragStart,
  onNodeTypeClick,
  visible = true,
  collapsed = false,
  onToggleCollapse,
  ...rest
}) => {
  const [search, setSearch] = useState('');

  if (!visible) return null;

  const filteredTypes = nodeTypes.filter((t) =>
    (nodeLabels[t] ?? t).toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = (type: GraphNodeType) => (
    <div
      key={type}
      className={`tf-graph-node-palette__item tf-graph-node-palette__item--${type}`}
      draggable
      onDragStart={(e) => onDragStart?.(type, e)}
      onClick={() => onNodeTypeClick?.(type)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 4,
        cursor: 'grab',
        userSelect: 'none',
        transition: 'background-color 0.1s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '#1a3050';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      <span className="tf-graph-node-palette__icon" style={{ fontSize: 14, width: 20, textAlign: 'center' }}>
        {nodeIcons[type] || '◆'}
      </span>
      <span className="tf-graph-node-palette__label" style={{ fontSize: 12, color: '#c8d6e5' }}>
        {nodeLabels[type] ?? type}
      </span>
    </div>
  );

  return (
    <div
      className={`tf-graph-node-palette ${collapsed ? 'tf-graph-node-palette--collapsed' : ''} ${className}`}
      style={{
        position: 'absolute',
        top: 12,
        left: 56,
        width: collapsed ? 36 : 180,
        maxHeight: 'calc(100% - 24px)',
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 50,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-node-palette__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        {!collapsed && (
          <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Nodes</span>
        )}
        <button
          className="tf-graph-node-palette__collapse"
          onClick={onToggleCollapse}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 10 }}
        >
          {collapsed ? '▸' : '◂'}
        </button>
      </div>

      {!collapsed && (
        <>
          <div style={{ padding: '6px 10px', borderBottom: '1px solid #1a2332' }}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '4px 8px',
                background: '#1a2332',
                border: '1px solid #2a3a4e',
                borderRadius: 4,
                color: '#c8d6e5',
                fontSize: 11,
                outline: 'none',
              }}
            />
          </div>

          <div
            className="tf-graph-node-palette__items"
            style={{ overflowY: 'auto', padding: '4px 6px', flex: 1 }}
          >
            {categories
              ? categories.map((cat) => (
                  <div key={cat.label} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#6b7f9e', padding: '4px 4px', textTransform: 'uppercase' }}>
                      {cat.label}
                    </div>
                    {cat.types.filter((t) => filteredTypes.includes(t)).map(renderItem)}
                  </div>
                ))
              : filteredTypes.map(renderItem)}
          </div>
        </>
      )}
    </div>
  );
};

GraphNodePalette.displayName = 'GraphNodePalette';

export default GraphNodePalette;
