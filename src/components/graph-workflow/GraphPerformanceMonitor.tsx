/**
 * @fileoverview GraphPerformanceMonitor — Performance metrics overlay for the graph.
 * Displays FPS, render time, node count, and memory usage in real time.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  nodeCount: number;
  edgeCount: number;
  memoryUsage?: number;
  viewportZoom: number;
}

export interface GraphPerformanceMonitorProps extends GraphComponentProps {
  /** Current performance metrics */
  metrics: PerformanceMetrics;
  /** Whether the monitor is visible */
  visible?: boolean;
  /** FPS threshold for warning state */
  fpsWarningThreshold?: number;
  /** Position on the canvas */
  position?: 'top-right' | 'top-left';
}

/**
 * GraphPerformanceMonitor — Performance overlay.
 *
 * Displays real-time performance metrics including FPS, render
 * time, element counts, and memory usage. Useful for debugging
 * performance issues in large graphs.
 *
 * @example
 * <GraphPerformanceMonitor
 *   metrics={{ fps: 60, renderTime: 8, nodeCount: 150, edgeCount: 200, viewportZoom: 1 }}
 *   fpsWarningThreshold={30}
 * />
 */
export const GraphPerformanceMonitor: React.FC<GraphPerformanceMonitorProps> = ({
  className = '',
  style,
  metrics,
  visible = true,
  fpsWarningThreshold = 30,
  position = 'top-right',
  ...rest
}) => {
  if (!visible) return null;

  const fpsOk = metrics.fps >= fpsWarningThreshold;

  return (
    <div
      className={`tf-graph-performance-monitor ${!fpsOk ? 'tf-graph-performance-monitor--warning' : ''} ${className}`}
      style={{
        position: 'absolute',
        [position === 'top-right' ? 'right' : 'left']: 12,
        top: 12,
        padding: '6px 10px',
        backgroundColor: 'rgba(16, 22, 36, 0.9)',
        border: `1px solid ${fpsOk ? '#2a3a4e' : '#7a3a2a'}`,
        borderRadius: 4,
        zIndex: 100,
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '2px 12px', fontSize: 10, fontFamily: 'monospace' }}>
        <span style={{ color: '#6b7f9e' }}>FPS</span>
        <span style={{ color: fpsOk ? '#2ecc71' : '#e74c3c', fontWeight: 700, textAlign: 'right' }}>
          {metrics.fps}
        </span>

        <span style={{ color: '#6b7f9e' }}>Render</span>
        <span style={{ color: '#c8d6e5', textAlign: 'right' }}>{metrics.renderTime.toFixed(1)}ms</span>

        <span style={{ color: '#6b7f9e' }}>Nodes</span>
        <span style={{ color: '#c8d6e5', textAlign: 'right' }}>{metrics.nodeCount}</span>

        <span style={{ color: '#6b7f9e' }}>Edges</span>
        <span style={{ color: '#c8d6e5', textAlign: 'right' }}>{metrics.edgeCount}</span>

        <span style={{ color: '#6b7f9e' }}>Zoom</span>
        <span style={{ color: '#c8d6e5', textAlign: 'right' }}>{(metrics.viewportZoom * 100).toFixed(0)}%</span>

        {metrics.memoryUsage && (
          <>
            <span style={{ color: '#6b7f9e' }}>Memory</span>
            <span style={{ color: '#c8d6e5', textAlign: 'right' }}>{(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB</span>
          </>
        )}
      </div>
    </div>
  );
};

GraphPerformanceMonitor.displayName = 'GraphPerformanceMonitor';
export default GraphPerformanceMonitor;
