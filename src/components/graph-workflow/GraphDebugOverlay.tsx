/**
 * @fileoverview GraphDebugOverlay — Debug info overlay showing internal state.
 * Displays viewport, selection, and internal diagnostic information.
 */

import React from 'react';
import type { ViewportState, GraphComponentProps } from './types';

export interface GraphDebugOverlayProps extends GraphComponentProps {
  /** Current viewport state */
  viewport: ViewportState;
  /** Selected node IDs */
  selectedNodes?: string[];
  /** Selected edge IDs */
  selectedEdges?: string[];
  /** Active tool */
  activeTool?: string;
  /** Whether the overlay is visible */
  visible?: boolean;
  /** Additional debug data */
  extraData?: Record<string, unknown>;
}

/**
 * GraphDebugOverlay — Debug information overlay.
 *
 * Displays internal graph state for debugging: viewport coordinates,
 * zoom level, selected elements, active tool, and any extra data.
 *
 * @example
 * <GraphDebugOverlay
 *   viewport={{ x: 100, y: 200, zoom: 1.5 }}
 *   selectedNodes={['node-1', 'node-2']}
 *   activeTool="select"
 * />
 */
export const GraphDebugOverlay: React.FC<GraphDebugOverlayProps> = ({
  className = '',
  style,
  viewport,
  selectedNodes = [],
  selectedEdges = [],
  activeTool = 'select',
  visible = false,
  extraData,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-debug-overlay ${className}`}
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        padding: '8px 12px',
        backgroundColor: 'rgba(16, 22, 36, 0.92)',
        border: '1px solid #3a1a5a',
        borderRadius: 4,
        zIndex: 150,
        fontSize: 10,
        fontFamily: 'monospace',
        color: '#c8d6e5',
        ...style,
      }}
      {...rest}
    >
      <div style={{ fontWeight: 700, color: '#9b59b6', marginBottom: 6, fontSize: 9, textTransform: 'uppercase' }}>
        Debug
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '2px 16px' }}>
        <span style={{ color: '#6b7f9e' }}>Viewport X</span>
        <span>{viewport.x.toFixed(1)}</span>

        <span style={{ color: '#6b7f9e' }}>Viewport Y</span>
        <span>{viewport.y.toFixed(1)}</span>

        <span style={{ color: '#6b7f9e' }}>Zoom</span>
        <span>{viewport.zoom.toFixed(3)}</span>

        <span style={{ color: '#6b7f9e' }}>Tool</span>
        <span>{activeTool}</span>

        <span style={{ color: '#6b7f9e' }}>Selected Nodes</span>
        <span>{selectedNodes.length}</span>

        <span style={{ color: '#6b7f9e' }}>Selected Edges</span>
        <span>{selectedEdges.length}</span>
      </div>

      {extraData && Object.keys(extraData).length > 0 && (
        <>
          <div style={{ height: 1, backgroundColor: '#3a1a5a', margin: '6px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '2px 16px' }}>
            {Object.entries(extraData).map(([key, value]) => (
              <React.Fragment key={key}>
                <span style={{ color: '#6b7f9e' }}>{key}</span>
                <span>{JSON.stringify(value).slice(0, 40)}</span>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

GraphDebugOverlay.displayName = 'GraphDebugOverlay';
export default GraphDebugOverlay;
