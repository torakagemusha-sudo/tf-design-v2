/**
 * @fileoverview GraphConnectTool — Connection tool for drawing edges between nodes.
 * Enables click-and-drag creation of new edges from port to port.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphConnectToolProps extends GraphComponentProps {
  /** Whether the connect tool is active */
  active?: boolean;
  /** Currently dragged connection (if any) */
  dragging?: boolean;
  /** Callback when the tool is activated */
  onActivate: () => void;
  /** Callback when a connection is cancelled */
  onCancel?: () => void;
}

/**
 * GraphConnectTool — Connection tool.
 *
 * Enables drawing new edges between nodes by clicking a source
 * port and dragging to a target port. Visual feedback shows the
 * pending connection line following the cursor.
 *
 * @example
 * <GraphConnectTool
 *   active={tool === 'connect'}
 *   onActivate={() => setTool('connect')}
 *   onCancel={() => cancelConnection()}
 * />
 */
export const GraphConnectTool: React.FC<GraphConnectToolProps> = ({
  className = '',
  style,
  active = false,
  dragging = false,
  onActivate,
  onCancel,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-connect-tool ${active ? 'tf-graph-connect-tool--active' : ''} ${dragging ? 'tf-graph-connect-tool--dragging' : ''} ${className}`}
      style={{ display: 'flex', alignItems: 'center', ...style }}
      {...rest}
    >
      <button
        className="tf-graph-connect-tool__button"
        onClick={onActivate}
        title="Connect tool (C)"
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          backgroundColor: active ? '#2a4a6f' : 'transparent',
          border: `1px solid ${active ? '#4a6fa5' : 'transparent'}`,
          borderRadius: 4,
          color: active ? '#c8d6e5' : '#8b9db8',
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        →
      </button>

      {dragging && onCancel && (
        <button
          className="tf-graph-connect-tool__cancel"
          onClick={onCancel}
          title="Cancel connection"
          type="button"
          style={{
            marginLeft: 4,
            padding: '2px 6px',
            backgroundColor: '#3a1a1a',
            border: '1px solid #5a2a2a',
            borderRadius: 4,
            color: '#e74c3c',
            cursor: 'pointer',
            fontSize: 10,
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

GraphConnectTool.displayName = 'GraphConnectTool';
export default GraphConnectTool;
