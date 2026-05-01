/**
 * @fileoverview GraphPropertiesPanel — Selected node/edge properties editor panel.
 * Displays and allows editing of the currently selected element's properties.
 */

import React from 'react';
import type { GraphNodeData, GraphEdgeData, GraphComponentProps } from './types';

export interface GraphPropertiesPanelProps extends GraphComponentProps {
  /** Currently selected node (if any) */
  selectedNode?: GraphNodeData | null;
  /** Currently selected edge (if any) */
  selectedEdge?: GraphEdgeData | null;
  /** Whether the panel is visible */
  visible?: boolean;
  /** Whether the panel is in read-only mode */
  readOnly?: boolean;
  /** Callback when a property value changes */
  onPropertyChange?: (key: string, value: unknown) => void;
  /** Callback when the panel is closed */
  onClose?: () => void;
  /** Panel width in pixels */
  width?: number;
}

/**
 * GraphPropertiesPanel — Selected element properties panel.
 *
 * A side panel that displays the properties of the currently
 * selected node or edge and allows inline editing of values.
 *
 * @example
 * <GraphPropertiesPanel
 *   selectedNode={selectedNode}
 *   visible={true}
 *   onPropertyChange={(key, val) => updateProperty(key, val)}
 * />
 */
export const GraphPropertiesPanel: React.FC<GraphPropertiesPanelProps> = ({
  className = '',
  style,
  selectedNode,
  selectedEdge,
  visible = true,
  readOnly = false,
  onPropertyChange,
  onClose,
  width = 260,
  ...rest
}) => {
  if (!visible || (!selectedNode && !selectedEdge)) return null;

  const element = selectedNode ?? selectedEdge;
  const elementType = selectedNode ? 'node' : 'edge';

  const renderProperties = () => {
    if (!element) return null;
    const entries: [string, unknown][] = [];

    entries.push(['id', element.id]);
    entries.push(['type', element.type]);

    if (selectedNode) {
      entries.push(['label', selectedNode.label]);
      entries.push([
        'position',
        `(${selectedNode.position.x}, ${selectedNode.position.y})`,
      ]);
      if (selectedNode.size) {
        entries.push([
          'size',
          `${selectedNode.size.width} × ${selectedNode.size.height}`,
        ]);
      }
      if (selectedNode.status) entries.push(['status', selectedNode.status]);
      if (selectedNode.description) entries.push(['description', selectedNode.description]);
    }

    if (selectedEdge) {
      if (selectedEdge.label) entries.push(['label', selectedEdge.label]);
      entries.push(['source', selectedEdge.source]);
      entries.push(['target', selectedEdge.target]);
      if (selectedEdge.condition) entries.push(['condition', selectedEdge.condition]);
      entries.push(['style', selectedEdge.style ?? 'solid']);
    }

    return entries.map(([key, value]) => (
      <div
        key={key}
        className="tf-graph-properties__row"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 0',
          borderBottom: '1px solid #1a2332',
        }}
      >
        <span
          className="tf-graph-properties__key"
          style={{ width: 90, fontSize: 11, color: '#6b7f9e', textTransform: 'capitalize' }}
        >
          {key}
        </span>
        {readOnly || key === 'id' ? (
          <span
            className="tf-graph-properties__value"
            style={{ flex: 1, fontSize: 12, color: '#c8d6e5', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {String(value)}
          </span>
        ) : (
          <input
            className="tf-graph-properties__input"
            type="text"
            value={String(value)}
            onChange={(e) => onPropertyChange?.(key, e.target.value)}
            style={{
              flex: 1,
              background: '#1a2332',
              border: '1px solid #2a3a4e',
              borderRadius: 3,
              padding: '2px 6px',
              color: '#c8d6e5',
              fontSize: 12,
              outline: 'none',
            }}
          />
        )}
      </div>
    ));
  };

  return (
    <div
      className={`tf-graph-properties ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width,
        height: '100%',
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        borderLeft: '1px solid #2a3a4e',
        zIndex: 60,
        overflowY: 'auto',
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-properties__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 13, color: '#c8d6e5' }}>
          {elementType === 'node' ? 'Node Properties' : 'Edge Properties'}
        </span>
        <button
          className="tf-graph-properties__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-properties__body" style={{ padding: '8px 12px' }}>
        {renderProperties()}
      </div>
    </div>
  );
};

GraphPropertiesPanel.displayName = 'GraphPropertiesPanel';
export default GraphPropertiesPanel;
