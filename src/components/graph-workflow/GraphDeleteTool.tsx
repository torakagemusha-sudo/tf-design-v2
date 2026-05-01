/**
 * @fileoverview GraphDeleteTool — Delete tool for removing nodes and edges.
 * Clicking an element with this active tool deletes it immediately.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphDeleteToolProps extends GraphComponentProps {
  /** Whether the delete tool is active */
  active?: boolean;
  /** Require confirmation before deletion */
  confirmDelete?: boolean;
  /** Callback when the tool is activated */
  onActivate: () => void;
  /** Callback when the tool is deactivated */
  onDeactivate?: () => void;
}

/**
 * GraphDeleteTool — Delete tool.
 *
 * When active, clicking on any node or edge immediately deletes it.
 * Can be configured to require confirmation before deletion.
 *
 * @example
 * <GraphDeleteTool
 *   active={tool === 'delete'}
 *   confirmDelete={true}
 *   onActivate={() => setTool('delete')}
 * />
 */
export const GraphDeleteTool: React.FC<GraphDeleteToolProps> = ({
  className = '',
  style,
  active = false,
  confirmDelete = false,
  onActivate,
  onDeactivate,
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-delete-tool ${active ? 'tf-graph-delete-tool--active' : ''} ${className}`}
      onClick={active ? onDeactivate : onActivate}
      title={`Delete tool (D)${confirmDelete ? ' — confirms before delete' : ''}`}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        backgroundColor: active ? '#4a1a1a' : 'transparent',
        border: `1px solid ${active ? '#7a2a2a' : 'transparent'}`,
        borderRadius: 4,
        color: active ? '#e74c3c' : '#8b9db8',
        cursor: 'pointer',
        fontSize: 14,
        ...style,
      }}
      {...rest}
    >
      🗑
    </button>
  );
};

GraphDeleteTool.displayName = 'GraphDeleteTool';
export default GraphDeleteTool;
