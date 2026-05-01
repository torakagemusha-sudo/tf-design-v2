/**
 * @fileoverview GraphSnapshotList — Snapshot gallery showing saved snapshots.
 * Lists all saved snapshots with restore and delete actions.
 */

import React from 'react';
import type { GraphSnapshot, GraphComponentProps } from './types';

export interface GraphSnapshotListProps extends GraphComponentProps {
  /** Saved snapshots */
  snapshots: GraphSnapshot[];
  /** Whether the panel is visible */
  visible?: boolean;
  /** Callback when a snapshot is selected for restore */
  onRestore?: (snapshotId: string) => void;
  /** Callback when a snapshot is deleted */
  onDelete?: (snapshotId: string) => void;
  /** Callback when a snapshot is renamed */
  onRename?: (snapshotId: string, newLabel: string) => void;
  /** Callback when the panel is closed */
  onClose?: () => void;
}

/**
 * GraphSnapshotList — Snapshot gallery.
 *
 * Displays a list of saved graph snapshots with the ability to
 * restore a previous state, rename, or delete snapshots.
 *
 * @example
 * <GraphSnapshotList
 *   snapshots={savedSnapshots}
 *   onRestore={(id) => restoreSnapshot(id)}
 *   onDelete={(id) => deleteSnapshot(id)}
 * />
 */
export const GraphSnapshotList: React.FC<GraphSnapshotListProps> = ({
  className = '',
  style,
  snapshots,
  visible = true,
  onRestore,
  onDelete,
  onRename,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-snapshot-list ${className}`}
      style={{
        position: 'absolute',
        top: 60,
        right: 16,
        width: 280,
        maxHeight: 360,
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
        className="tf-graph-snapshot-list__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Snapshots</span>
        <button
          className="tf-graph-snapshot-list__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-snapshot-list__items" style={{ overflowY: 'auto', flex: 1 }}>
        {snapshots.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: '#6b7f9e', fontSize: 12 }}>
            No snapshots saved
          </div>
        )}

        {snapshots.map((snapshot) => (
          <div
            key={snapshot.id}
            className="tf-graph-snapshot-list__item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderBottom: '1px solid #1a2332',
            }}
          >
            {snapshot.thumbnail && (
              <img
                src={snapshot.thumbnail}
                alt=""
                style={{ width: 48, height: 36, borderRadius: 3, objectFit: 'cover', backgroundColor: '#1a2332' }}
              />
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: '#c8d6e5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {snapshot.label}
              </div>
              <div style={{ fontSize: 9, color: '#3a5274', marginTop: 2 }}>
                {snapshot.nodeCount} nodes · {snapshot.edgeCount} edges · {new Date(snapshot.timestamp).toLocaleTimeString()}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 4 }}>
              <button
                className="tf-graph-snapshot-list__restore"
                onClick={() => onRestore?.(snapshot.id)}
                title="Restore"
                type="button"
                style={{ background: 'none', border: 'none', color: '#2ecc71', cursor: 'pointer', fontSize: 12, padding: '2px 4px' }}
              >
                ↺
              </button>
              <button
                className="tf-graph-snapshot-list__delete"
                onClick={() => onDelete?.(snapshot.id)}
                title="Delete"
                type="button"
                style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: 12, padding: '2px 4px' }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

GraphSnapshotList.displayName = 'GraphSnapshotList';
export default GraphSnapshotList;
