/**
 * @fileoverview GraphStatusBar — Status bar at the bottom showing graph state.
 * Displays zoom level, selection count, dimensions, and status messages.
 */

import React from 'react';
import type { GraphStats, GraphComponentProps } from './types';

export interface GraphStatusBarProps extends GraphComponentProps {
  /** Current zoom percentage */
  zoom?: number;
  /** Number of selected nodes */
  selectedNodeCount?: number;
  /** Number of selected edges */
  selectedEdgeCount?: number;
  /** Status message */
  message?: string;
  /** Graph statistics */
  stats?: Partial<GraphStats>;
  /** Read-only mode indicator */
  readOnly?: boolean;
  /** Children for custom content */
  children?: React.ReactNode;
}

/**
 * GraphStatusBar — Graph status bar.
 *
 * A horizontal bar at the bottom of the editor displaying
 * current zoom level, selection counts, status messages, and
 * graph statistics.
 *
 * @example
 * <GraphStatusBar
 *   zoom={1.5}
 *   selectedNodeCount={3}
 *   selectedEdgeCount={2}
 *   message="Ready"
 *   readOnly={false}
 * />
 */
export const GraphStatusBar: React.FC<GraphStatusBarProps> = ({
  className = '',
  style,
  zoom = 1,
  selectedNodeCount = 0,
  selectedEdgeCount = 0,
  message = '',
  stats,
  readOnly = false,
  children,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-status-bar ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '3px 12px',
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        borderTop: '1px solid #2a3a4e',
        fontSize: 10,
        color: '#6b7f9e',
        zIndex: 55,
        ...style,
      }}
      {...rest}
    >
      {/* Zoom */}
      <span className="tf-graph-status-bar__zoom">
        {Math.round(zoom * 100)}%
      </span>

      {/* Selection */}
      {(selectedNodeCount > 0 || selectedEdgeCount > 0) && (
        <span className="tf-graph-status-bar__selection">
          {selectedNodeCount > 0 && `${selectedNodeCount} node${selectedNodeCount > 1 ? 's' : ''}`}
          {selectedNodeCount > 0 && selectedEdgeCount > 0 && ', '}
          {selectedEdgeCount > 0 && `${selectedEdgeCount} edge${selectedEdgeCount > 1 ? 's' : ''}`}
        </span>
      )}

      {/* Stats */}
      {stats && (
        <span className="tf-graph-status-bar__stats">
          {stats.nodeCount !== undefined && `${stats.nodeCount} nodes`}
          {stats.edgeCount !== undefined && ` / ${stats.edgeCount} edges`}
        </span>
      )}

      {/* Read-only indicator */}
      {readOnly && (
        <span className="tf-graph-status-bar__readonly" style={{ color: '#f39c12', fontWeight: 600 }}>
          READ-ONLY
        </span>
      )}

      {/* Message */}
      {message && (
        <span className="tf-graph-status-bar__message" style={{ flex: 1, textAlign: 'center' }}>
          {message}
        </span>
      )}

      {children}
    </div>
  );
};

GraphStatusBar.displayName = 'GraphStatusBar';

export default GraphStatusBar;
