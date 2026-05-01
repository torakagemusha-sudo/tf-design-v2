/**
 * @fileoverview GraphStatsPanel — Graph statistics panel showing metrics.
 * Displays node/edge counts, type distributions, and other graph metrics.
 */

import React from 'react';
import type { GraphStats, GraphComponentProps } from './types';

export interface GraphStatsPanelProps extends GraphComponentProps {
  /** Graph statistics data */
  stats: GraphStats;
  /** Whether the panel is visible */
  visible?: boolean;
  /** Callback when the panel is closed */
  onClose?: () => void;
}

/**
 * GraphStatsPanel — Graph statistics panel.
 *
 * Displays a summary of graph metrics including node and edge
 * counts, type distributions, validation issue count, and
 * modification metadata.
 *
 * @example
 * <GraphStatsPanel
 *   stats={{
 *     nodeCount: 24,
 *     edgeCount: 31,
 *     nodeTypeCounts: { process: 8, decision: 4, start: 1, end: 1 },
 *     edgeTypeCounts: { default: 25, conditional: 6 },
 *     validationIssues: 2,
 *     lastModified: Date.now(),
 *   }}
 * />
 */
export const GraphStatsPanel: React.FC<GraphStatsPanelProps> = ({
  className = '',
  style,
  stats,
  visible = true,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  const nodeTypeEntries = Object.entries(stats.nodeTypeCounts).sort((a, b) => b[1] - a[1]);
  const edgeTypeEntries = Object.entries(stats.edgeTypeCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div
      className={`tf-graph-stats-panel ${className}`}
      style={{
        position: 'absolute',
        bottom: 60,
        right: 16,
        width: 260,
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 70,
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-stats-panel__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Statistics</span>
        <button
          className="tf-graph-stats-panel__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-stats-panel__body" style={{ padding: '10px 12px' }}>
        {/* Summary row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid #1a2332' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#6b8cbc' }}>{stats.nodeCount}</div>
            <div style={{ fontSize: 9, color: '#6b7f9e', textTransform: 'uppercase' }}>Nodes</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#6b8cbc' }}>{stats.edgeCount}</div>
            <div style={{ fontSize: 9, color: '#6b7f9e', textTransform: 'uppercase' }}>Edges</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: stats.validationIssues > 0 ? '#e74c3c' : '#2ecc71' }}>
              {stats.validationIssues}
            </div>
            <div style={{ fontSize: 9, color: '#6b7f9e', textTransform: 'uppercase' }}>Issues</div>
          </div>
        </div>

        {/* Node types */}
        {nodeTypeEntries.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#6b7f9e', textTransform: 'uppercase', marginBottom: 6 }}>
              Node Types
            </div>
            {nodeTypeEntries.map(([type, count]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', fontSize: 11 }}>
                <span style={{ color: '#8b9db8', width: 8 }}>●</span>
                <span style={{ flex: 1, color: '#c8d6e5', textTransform: 'capitalize' }}>{type}</span>
                <span style={{ color: '#6b7f9e', fontWeight: 500 }}>{count}</span>
              </div>
            ))}
          </div>
        )}

        {/* Edge types */}
        {edgeTypeEntries.length > 0 && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#6b7f9e', textTransform: 'uppercase', marginBottom: 6 }}>
              Edge Types
            </div>
            {edgeTypeEntries.map(([type, count]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', fontSize: 11 }}>
                <span style={{ color: '#8b9db8', width: 8 }}>→</span>
                <span style={{ flex: 1, color: '#c8d6e5', textTransform: 'capitalize' }}>{type}</span>
                <span style={{ color: '#6b7f9e', fontWeight: 500 }}>{count}</span>
              </div>
            ))}
          </div>
        )}

        {stats.lastModified && (
          <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid #1a2332', fontSize: 9, color: '#3a5274' }}>
            Last modified: {new Date(stats.lastModified).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

GraphStatsPanel.displayName = 'GraphStatsPanel';
export default GraphStatsPanel;
