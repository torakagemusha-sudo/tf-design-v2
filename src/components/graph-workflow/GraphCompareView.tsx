/**
 * @fileoverview GraphCompareView — Diff/compare view for two graphs.
 * Side-by-side comparison showing added, removed, and modified elements.
 */

import React from 'react';
import type { ReactNode } from 'react';
import type { DiffEntry, GraphComponentProps } from './types';

export interface GraphCompareViewProps extends GraphComponentProps {
  /** Left/before graph content */
  beforeGraph: ReactNode;
  /** Right/after graph content */
  afterGraph: ReactNode;
  /** Diff entries highlighting changes */
  diffs: DiffEntry[];
  /** Number of additions */
  addedCount?: number;
  /** Number of removals */
  removedCount?: number;
  /** Number of modifications */
  modifiedCount?: number;
  /** Callback when a diff entry is clicked */
  onDiffClick?: (diff: DiffEntry) => void;
}

/**
 * GraphCompareView — Diff/compare view for two graphs.
 *
 * Displays two graphs side by side with visual indicators for
 * added (green), removed (red), and modified (yellow) elements.
 *
 * @example
 * <GraphCompareView
 *   beforeGraph={<GraphCanvas nodes={v1Nodes} edges={v1Edges} />}
 *   afterGraph={<GraphCanvas nodes={v2Nodes} edges={v2Edges} />}
 *   diffs={diffEntries}
 *   addedCount={3}
 *   removedCount={1}
 *   modifiedCount={2}
 * />
 */
export const GraphCompareView: React.FC<GraphCompareViewProps> = ({
  className = '',
  style,
  beforeGraph,
  afterGraph,
  diffs,
  addedCount = 0,
  removedCount = 0,
  modifiedCount = 0,
  onDiffClick,
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-compare-view ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        ...style,
      }}
      {...rest}
    >
      {/* Header */}
      <div
        className="tf-graph-compare-view__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '6px 12px',
          backgroundColor: 'rgba(16, 22, 36, 0.95)',
          borderBottom: '1px solid #2a3a4e',
          fontSize: 11,
        }}
      >
        <span style={{ fontWeight: 600, color: '#c8d6e5' }}>Compare</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ color: '#2ecc71' }}>+{addedCount} added</span>
          <span style={{ color: '#e74c3c' }}>−{removedCount} removed</span>
          <span style={{ color: '#f39c12' }}>~{modifiedCount} modified</span>
        </div>
      </div>

      {/* Graphs side by side */}
      <div
        className="tf-graph-compare-view__panes"
        style={{ display: 'flex', flex: 1, overflow: 'hidden' }}
      >
        <div
          className="tf-graph-compare-view__before"
          style={{ flex: 1, position: 'relative', borderRight: '1px solid #2a3a4e' }}
        >
          <div style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', backgroundColor: 'rgba(231, 76, 60, 0.2)', borderRadius: 3, fontSize: 10, color: '#e74c3c', zIndex: 10 }}>
            Before
          </div>
          {beforeGraph}
        </div>

        <div
          className="tf-graph-compare-view__after"
          style={{ flex: 1, position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', backgroundColor: 'rgba(46, 204, 113, 0.2)', borderRadius: 3, fontSize: 10, color: '#2ecc71', zIndex: 10 }}>
            After
          </div>
          {afterGraph}
        </div>
      </div>
    </div>
  );
};

GraphCompareView.displayName = 'GraphCompareView';
export default GraphCompareView;
