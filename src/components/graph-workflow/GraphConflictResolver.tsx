/**
 * @fileoverview GraphConflictResolver — Merge conflict resolution UI for collaborative editing.
 * Shows conflicting changes side by side with resolution options.
 */

import React, { useState } from 'react';
import type { ConflictEntry, GraphComponentProps } from './types';

export interface GraphConflictResolverProps extends GraphComponentProps {
  /** Conflicts to resolve */
  conflicts: ConflictEntry[];
  /** Whether the resolver is visible */
  visible?: boolean;
  /** Callback when a conflict is resolved */
  onResolve: (conflictId: string, resolution: 'local' | 'remote' | 'merged', mergedValue?: unknown) => void;
  /** Callback when all conflicts are resolved */
  onResolveAll?: (resolution: 'local' | 'remote') => void;
  /** Callback when the resolver is closed */
  onClose?: () => void;
}

/**
 * GraphConflictResolver — Merge conflict resolver.
 *
 * Displays merge conflicts from collaborative editing with
 * side-by-side comparison and options to accept local, remote,
 * or a merged value for each conflict.
 *
 * @example
 * <GraphConflictResolver
 *   conflicts={conflictList}
 *   onResolve={(id, res, val) => resolveConflict(id, res, val)}
 * />
 */
export const GraphConflictResolver: React.FC<GraphConflictResolverProps> = ({
  className = '',
  style,
  conflicts,
  visible = true,
  onResolve,
  onResolveAll,
  onClose,
  ...rest
}) => {
  const [selectedMerged, setSelectedMerged] = useState<Record<string, unknown>>({});

  if (!visible || conflicts.length === 0) return null;

  const unresolved = conflicts.filter((c) => !c.resolved);

  return (
    <div
      className={`tf-graph-conflict-resolver ${className}`}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 560,
        maxHeight: '80vh',
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 8,
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <div
        className="tf-graph-conflict-resolver__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <div>
          <span style={{ fontWeight: 600, fontSize: 14, color: '#c8d6e5' }}>Resolve Conflicts</span>
          <span style={{ marginLeft: 10, fontSize: 11, color: '#f39c12' }}>
            {unresolved.length} remaining
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => onResolveAll?.('local')}
            type="button"
            style={{ padding: '4px 10px', background: '#1a3050', border: '1px solid #4a6fa5', borderRadius: 4, color: '#c8d6e5', cursor: 'pointer', fontSize: 11 }}
          >
            Accept All Local
          </button>
          <button
            onClick={() => onResolveAll?.('remote')}
            type="button"
            style={{ padding: '4px 10px', background: '#1a3050', border: '1px solid #4a6fa5', borderRadius: 4, color: '#c8d6e5', cursor: 'pointer', fontSize: 11 }}
          >
            Accept All Remote
          </button>
          <button
            className="tf-graph-conflict-resolver__close"
            onClick={onClose}
            type="button"
            style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 14 }}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="tf-graph-conflict-resolver__list" style={{ overflowY: 'auto', flex: 1, padding: '8px 16px' }}>
        {conflicts.map((conflict) => {
          const isResolved = conflict.resolved;
          const resolution = conflict.resolution;

          return (
            <div
              key={conflict.id}
              className={`tf-graph-conflict-resolver__item ${isResolved ? 'tf-graph-conflict-resolver__item--resolved' : ''}`}
              style={{
                marginBottom: 12,
                padding: 10,
                backgroundColor: isResolved ? 'rgba(46, 204, 113, 0.05)' : '#1a2332',
                border: `1px solid ${isResolved ? '#2a5a3a' : '#2a3a4e'}`,
                borderRadius: 6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: '#6b7f9e', textTransform: 'uppercase', fontWeight: 600 }}>
                  {conflict.type}
                </span>
                <span style={{ fontSize: 10, color: '#3a5274' }}>{conflict.elementId}</span>
                {isResolved && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: '#2ecc71' }}>
                    ✓ {resolution}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1, padding: 8, backgroundColor: '#0b0f19', borderRadius: 4, border: '1px solid #1a3050' }}>
                  <div style={{ fontSize: 9, color: '#4a6fa5', marginBottom: 4, fontWeight: 600 }}>LOCAL</div>
                  <div style={{ fontSize: 11, color: '#c8d6e5' }}>{JSON.stringify(conflict.localValue)}</div>
                </div>
                <div style={{ flex: 1, padding: 8, backgroundColor: '#0b0f19', borderRadius: 4, border: '1px solid #1a3a1a' }}>
                  <div style={{ fontSize: 9, color: '#2ecc71', marginBottom: 4, fontWeight: 600 }}>REMOTE</div>
                  <div style={{ fontSize: 11, color: '#c8d6e5' }}>{JSON.stringify(conflict.remoteValue)}</div>
                </div>
              </div>

              {!isResolved && (
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => onResolve(conflict.id, 'local')}
                    type="button"
                    style={{ flex: 1, padding: '4px 8px', background: '#1a3050', border: '1px solid #4a6fa5', borderRadius: 4, color: '#c8d6e5', cursor: 'pointer', fontSize: 10 }}
                  >
                    Accept Local
                  </button>
                  <button
                    onClick={() => onResolve(conflict.id, 'remote')}
                    type="button"
                    style={{ flex: 1, padding: '4px 8px', background: '#1a3a1a', border: '1px solid #2a5a3a', borderRadius: 4, color: '#c8d6e5', cursor: 'pointer', fontSize: 10 }}
                  >
                    Accept Remote
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

GraphConflictResolver.displayName = 'GraphConflictResolver';
export default GraphConflictResolver;
