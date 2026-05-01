/**
 * @fileoverview GraphVersionControl — Version history panel for graph revisions.
 * Shows a chronological list of saved versions with restore and compare actions.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphVersion {
  id: string;
  label: string;
  author: string;
  timestamp: number;
  nodeCount: number;
  edgeCount: number;
  current?: boolean;
}

export interface GraphVersionControlProps extends GraphComponentProps {
  /** Version history */
  versions: GraphVersion[];
  /** Whether the panel is visible */
  visible?: boolean;
  /** Callback when a version is selected for restore */
  onRestore?: (versionId: string) => void;
  /** Callback when two versions are selected for comparison */
  onCompare?: (versionA: string, versionB: string) => void;
  /** Callback when the panel is closed */
  onClose?: () => void;
}

/**
 * GraphVersionControl — Version history panel.
 *
 * Displays a chronological list of saved graph versions with
 * the ability to restore a previous version or compare two versions.
 *
 * @example
 * <GraphVersionControl
 *   versions={versionHistory}
 *   onRestore={(id) => restoreVersion(id)}
 *   onCompare={(a, b) => compareVersions(a, b)}
 * />
 */
export const GraphVersionControl: React.FC<GraphVersionControlProps> = ({
  className = '',
  style,
  versions,
  visible = true,
  onRestore,
  onCompare,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-version-control ${className}`}
      style={{
        position: 'absolute',
        top: 60,
        right: 16,
        width: 300,
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
        className="tf-graph-version-control__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>Version History</span>
        <button
          className="tf-graph-version-control__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-version-control__list" style={{ overflowY: 'auto', flex: 1 }}>
        {versions.length === 0 && (
          <div style={{ padding: 20, textAlign: 'center', color: '#6b7f9e', fontSize: 12 }}>
            No saved versions
          </div>
        )}

        {versions.map((version, index) => (
          <div
            key={version.id}
            className={`tf-graph-version-control__version ${version.current ? 'tf-graph-version-control__version--current' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderBottom: '1px solid #1a2332',
              backgroundColor: version.current ? 'rgba(42, 74, 111, 0.2)' : 'transparent',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: version.current ? '#2a4a6f' : '#1a2332',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color: version.current ? '#c8d6e5' : '#6b7f9e',
                flexShrink: 0,
              }}
            >
              {versions.length - index}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#c8d6e5' }}>
                  {version.label}
                </span>
                {version.current && (
                  <span style={{ fontSize: 9, color: '#2ecc71', padding: '1px 5px', background: '#1a3a1a', borderRadius: 8 }}>
                    current
                  </span>
                )}
              </div>
              <div style={{ fontSize: 9, color: '#3a5274', marginTop: 2 }}>
                {version.author} • {new Date(version.timestamp).toLocaleString()} • {version.nodeCount}n/{version.edgeCount}e
              </div>
            </div>

            {!version.current && onRestore && (
              <button
                className="tf-graph-version-control__restore"
                onClick={() => onRestore(version.id)}
                title="Restore this version"
                type="button"
                style={{ background: 'none', border: 'none', color: '#8b9db8', cursor: 'pointer', fontSize: 12, padding: '2px 4px' }}
              >
                ↺
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

GraphVersionControl.displayName = 'GraphVersionControl';
export default GraphVersionControl;
