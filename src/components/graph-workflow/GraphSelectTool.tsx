/**
 * @fileoverview GraphSelectTool — Selection tool for clicking and selecting nodes/edges.
 * The default tool for normal selection and multi-select operations.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphSelectToolProps extends GraphComponentProps {
  /** Whether the select tool is currently active */
  active?: boolean;
  /** Whether multi-select mode (Ctrl/Cmd) is enabled */
  multiSelect?: boolean;
  /** Callback when the tool is activated */
  onActivate: () => void;
  /** Callback when multi-select is toggled */
  onToggleMultiSelect?: () => void;
}

/**
 * GraphSelectTool — Selection tool.
 *
 * The default interaction tool that enables clicking to select
 * nodes and edges. Supports box selection when dragging on empty
 * canvas and multi-select with modifier keys.
 *
 * @example
 * <GraphSelectTool
 *   active={tool === 'select'}
 *   onActivate={() => setTool('select')}
 * />
 */
export const GraphSelectTool: React.FC<GraphSelectToolProps> = ({
  className = '',
  style,
  active = true,
  multiSelect = false,
  onActivate,
  onToggleMultiSelect,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-select-tool ${active ? 'tf-graph-select-tool--active' : ''} ${multiSelect ? 'tf-graph-select-tool--multi' : ''} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        ...style,
      }}
      {...rest}
    >
      <button
        className="tf-graph-select-tool__button"
        onClick={onActivate}
        title="Select tool (V)"
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
        ↖
      </button>

      {onToggleMultiSelect && (
        <button
          className={`tf-graph-select-tool__multi ${multiSelect ? 'tf-graph-select-tool__multi--active' : ''}`}
          onClick={onToggleMultiSelect}
          title="Multi-select"
          type="button"
          style={{
            width: 24,
            height: 32,
            background: multiSelect ? '#2a4a6f' : 'transparent',
            border: `1px solid ${multiSelect ? '#4a6fa5' : 'transparent'}`,
            borderRadius: 4,
            color: multiSelect ? '#c8d6e5' : '#6b7f9e',
            cursor: 'pointer',
            fontSize: 10,
          }}
        >
          +Ctrl
        </button>
      )}
    </div>
  );
};

GraphSelectTool.displayName = 'GraphSelectTool';
export default GraphSelectTool;
