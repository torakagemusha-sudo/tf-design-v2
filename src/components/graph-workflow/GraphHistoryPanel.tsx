/**
 * @fileoverview GraphHistoryPanel — Edit history panel showing recent changes.
 * Lists undoable actions with descriptions and timestamps.
 */

import React from 'react';
import type { HistoryEntry, GraphComponentProps } from './types';

export interface GraphHistoryPanelProps extends GraphComponentProps {
  /** History entries */
  history: HistoryEntry[];
  /** Current position in history */
  currentIndex?: number;
  /** Whether the panel is visible */
  visible?: boolean;
  /** Callback when an entry is clicked (undo/redo to that point) */
  onEntryClick?: (index: number) => void;
  /** Callback when the panel is closed */
  onClose?: () => void;
  /** Maximum number of entries to show */
  maxEntries?: number;
}

const TYPE_ICONS: Record<string, string> = {
  create: '+',
  update: '✎',
  delete: '🗑',
  move: '↔',
  connect: '→',
  layout: '⬭',
  property: '⚙',
};

const TYPE_COLORS: Record<string, string> = {
  create: '#2ecc71',
  update: '#3498db',
  delete: '#e74c3c',
  move: '#f39c12',
  connect: '#9b59b6',
  layout: '#1abc9c',
  property: '#ecf0f1',
};

/**
 * GraphHistoryPanel — Edit history panel.
 *
 * Displays a chronological list of edit actions with the ability
 * to jump to any point in the history by clicking an entry.
 *
 * @example
 * <GraphHistoryPanel
 *   history={editHistory}
 *   currentIndex={historyIndex}
 *   onEntryClick={(idx) => gotoHistoryPoint(idx)}
 * />
 */
export const GraphHistoryPanel: React.FC<GraphHistoryPanelProps> = ({
  className = '',
  style,
  history,
  currentIndex = -1,
  visible = true,
  onEntryClick,
  onClose,
  maxEntries = 50,
  ...rest
}) => {
  if (!visible) return null;

  const displayEntries = history.slice(-maxEntries);

  return (
    <div
      className={`tf-graph-history-panel ${className}`}
      style={{
        position: 'absolute',
        bottom: 60,
        right: 16,
        width: 280,
        maxHeight: 320,
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
        className="tf-graph-history-panel__header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #2a3a4e',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 12, color: '#c8d6e5' }}>History</span>
        <button
          className="tf-graph-history-panel__close"
          onClick={onClose}
          type="button"
          style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      <div className="tf-graph-history-panel__list" style={{ overflowY: 'auto', flex: 1 }}>
        {displayEntries.length === 0 && (
          <div style={{ padding: 16, textAlign: 'center', color: '#6b7f9e', fontSize: 12 }}>
            No history yet
          </div>
        )}

        {displayEntries.map((entry, idx) => {
          const absoluteIdx = history.length - displayEntries.length + idx;
          const isCurrent = absoluteIdx === currentIndex;
          const isFuture = absoluteIdx > currentIndex;

          return (
            <div
              key={entry.id}
              className={`tf-graph-history-panel__entry ${isCurrent ? 'tf-graph-history-panel__entry--current' : ''} ${isFuture ? 'tf-graph-history-panel__entry--future' : ''}`}
              onClick={() => onEntryClick?.(absoluteIdx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 12px',
                cursor: 'pointer',
                backgroundColor: isCurrent ? '#2a4a6f' : 'transparent',
                opacity: isFuture ? 0.5 : 1,
                borderBottom: '1px solid #1a2332',
              }}
            >
              <span
                className="tf-graph-history-panel__type-icon"
                style={{ fontSize: 10, color: TYPE_COLORS[entry.type] ?? '#8b9db8', width: 16, textAlign: 'center' }}
              >
                {TYPE_ICONS[entry.type] ?? '•'}
              </span>
              <span style={{ flex: 1, fontSize: 11, color: '#c8d6e5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {entry.description}
              </span>
              <span style={{ fontSize: 9, color: '#3a5274' }}>
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

GraphHistoryPanel.displayName = 'GraphHistoryPanel';
export default GraphHistoryPanel;
