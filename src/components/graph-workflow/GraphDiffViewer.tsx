/**
 * @fileoverview GraphDiffViewer — Diff visualization for comparing two graph versions.
 * Highlights additions, removals, and modifications between graph states.
 */

import React from 'react';
import type { DiffEntry, GraphComponentProps } from './types';

export interface GraphDiffViewerProps extends GraphComponentProps {
  /** Diff entries between two versions */
  diffs: DiffEntry[];
  /** Whether the viewer is visible */
  visible?: boolean;
  /** Label for the "before" version */
  beforeLabel?: string;
  /** Label for the "after" version */
  afterLabel?: string;
  /** Callback when a diff entry is clicked */
  onDiffClick?: (diff: DiffEntry) => void;
  /** Callback when the viewer is closed */
  onClose?: () => void;
}

const DIFF_TYPE_STYLES = {
  added: { color: '#2ecc71', bg: 'rgba(46, 204, 113, 0.1)', icon: '+' },
  removed: { color: '#e74c3c', bg: 'rgba(231, 76, 60, 0.1)', icon: '−' },
  modified: { color: '#f39c12', bg: 'rgba(243, 156, 18, 0.1)', icon: '~' },
  unchanged: { color: '#6b7f9e', bg: 'transparent', icon: '=' },
};

/**
 * GraphDiffViewer — Diff visualization panel.
 *
 * Displays a structured diff between two graph versions,
 * highlighting added, removed, and modified elements with
 * color-coded indicators.
 *
 * @example
 * <GraphDiffViewer
 *   diffs={diffEntries}
 *   beforeLabel="v1.2"
 *   afterLabel="v1.3"
 *   onDiffClick={(d) => navigateToDiff(d)}
 * />
 */
export const GraphDiffViewer: React.FC<GraphDiffViewerProps> = ({
  className = '',
  style,
  diffs,
  visible = true,
  beforeLabel = 'Before',
  afterLabel = 'After',
  onDiffClick,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  const addedCount = diffs.filter((d) => d.diffType === 'added').length;
  const removedCount = diffs.filter((d) => d.diffType === 'removed').length;
  const modifiedCount = diffs.filter((d) => d.diffType === 'modified').length;

  return (
    <div
      className={`tf-graph-diff-viewer ${className}`}
      style={{
        position: 'absolute',
        top: 60,
        right: 16,
        width: 320,
        maxHeight: 400,
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 70,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-diff-viewer__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Diff</span>
          <span style={{ fontSize: 9, color: '#2ecc71' }}>+{addedCount}</span>
          <span style={{ fontSize: 9, color: '#e74c3c' }}>−{removedCount}</span>
          <span style={{ fontSize: 9, color: '#f39c12' }}>~{modifiedCount}</span>
        </div>
        <button
          className="tf-graph-diff-viewer__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-diff-viewer__list" style={{ overflowY: 'auto', flex: 1 }}>
        {diffs.length === 0 && (
          <div style={{ padding: 20, textAlign: 'center', color: '#6b7f9e', fontSize: 12 }}>
            No differences
          </div>
        )}

        {diffs.map((diff) => {
          const styles = DIFF_TYPE_STYLES[diff.diffType];
          return (
            <div
              key={diff.id}
              className={`tf-graph-diff-viewer__entry tf-graph-diff-viewer__entry--${diff.diffType}`}
              onClick={() => onDiffClick?.(diff)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                cursor: onDiffClick ? 'pointer' : 'default',
                backgroundColor: styles.bg,
                borderBottom: '1px solid #1a2332',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: styles.color, width: 16, textAlign: 'center' }}>
                {styles.icon}
              </span>
              <span style={{ fontSize: 10, color: '#6b7f9e', textTransform: 'uppercase', width: 36 }}>
                {diff.type}
              </span>
              <span style={{ flex: 1, fontSize: 11, color: '#c8d6e5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {diff.elementId}
              </span>
              {diff.propertyChanges && diff.propertyChanges.length > 0 && (
                <span style={{ fontSize: 9, color: '#3a5274' }}>
                  {diff.propertyChanges.length} fields
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

GraphDiffViewer.displayName = 'GraphDiffViewer';
export default GraphDiffViewer;
