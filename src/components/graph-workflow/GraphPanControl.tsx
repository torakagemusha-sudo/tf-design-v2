/**
 * @fileoverview GraphPanControl — Pan/drag mode toggle for the canvas.
 * Switches between panning (hand tool) and the current active tool.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphPanControlProps extends GraphComponentProps {
  /** Whether pan mode is currently active */
  active?: boolean;
  /** Callback when pan mode is toggled */
  onToggle: (active: boolean) => void;
  /** Button tooltip */
  tooltip?: string;
}

/**
 * GraphPanControl — Pan/drag mode toggle.
 *
 * A toggle button that switches the canvas interaction mode to
 * panning (hand cursor) when active, allowing the user to drag
 * the canvas viewport.
 *
 * @example
 * <GraphPanControl
 *   active={tool === 'pan'}
 *   onToggle={(active) => setTool(active ? 'pan' : 'select')}
 * />
 */
export const GraphPanControl: React.FC<GraphPanControlProps> = ({
  className = '',
  style,
  active = false,
  onToggle,
  tooltip = 'Pan mode (Space)',
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-pan-control ${active ? 'tf-graph-pan-control--active' : ''} ${className}`}
      onClick={() => onToggle(!active)}
      title={tooltip}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        backgroundColor: active ? '#2a4a6f' : 'rgba(16, 22, 36, 0.95)',
        border: `1px solid ${active ? '#4a6fa5' : '#2a3a4e'}`,
        borderRadius: 6,
        color: active ? '#c8d6e5' : '#8b9db8',
        cursor: 'pointer',
        fontSize: 14,
        ...style,
      }}
      {...rest}
    >
      ✋
    </button>
  );
};

GraphPanControl.displayName = 'GraphPanControl';
export default GraphPanControl;
