/**
 * @fileoverview GraphGridSnapToggle — Snap to grid toggle button.
 * Enables or disables automatic alignment of nodes to the grid.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphGridSnapToggleProps extends GraphComponentProps {
  /** Whether snap to grid is currently enabled */
  enabled?: boolean;
  /** Grid size in pixels */
  gridSize?: number;
  /** Callback when snap is toggled */
  onToggle: (enabled: boolean) => void;
  /** Tooltip text */
  tooltip?: string;
}

/**
 * GraphGridSnapToggle — Snap to grid toggle.
 *
 * A toggle button that enables or disables automatic snapping
 * of node positions to the nearest grid intersection.
 *
 * @example
 * <GraphGridSnapToggle
 *   enabled={snapToGrid}
 *   gridSize={20}
 *   onToggle={(v) => setSnapToGrid(v)}
 * />
 */
export const GraphGridSnapToggle: React.FC<GraphGridSnapToggleProps> = ({
  className = '',
  style,
  enabled = true,
  gridSize = 20,
  onToggle,
  tooltip = 'Snap to grid',
  ...rest
}) => {
  return (
    <button
      className={`tf-graph-grid-snap-toggle ${enabled ? 'tf-graph-grid-snap-toggle--enabled' : ''} ${className}`}
      onClick={() => onToggle(!enabled)}
      title={`${tooltip} (${gridSize}px)`}
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        backgroundColor: enabled ? '#2a4a6f' : 'rgba(16, 22, 36, 0.95)',
        border: `1px solid ${enabled ? '#4a6fa5' : '#2a3a4e'}`,
        borderRadius: 6,
        color: enabled ? '#c8d6e5' : '#6b7f9e',
        cursor: 'pointer',
        fontSize: 14,
        ...style,
      }}
      {...rest}
    >
      ⊞
    </button>
  );
};

GraphGridSnapToggle.displayName = 'GraphGridSnapToggle';
export default GraphGridSnapToggle;
