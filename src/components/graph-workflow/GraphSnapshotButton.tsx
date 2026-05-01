/**
 * @fileoverview GraphSnapshotButton — Save snapshot button for capturing graph state.
 * Captures the current graph state as a named snapshot for later restoration.
 */

import React, { useState } from 'react';
import type { GraphComponentProps } from './types';

export interface GraphSnapshotButtonProps extends GraphComponentProps {
  /** Callback when snapshot is requested */
  onSnapshot: (label: string) => void;
  /** Whether a snapshot is being saved */
  saving?: boolean;
  /** Default label for the snapshot */
  defaultLabel?: string;
  /** Button tooltip */
  tooltip?: string;
}

/**
 * GraphSnapshotButton — Save snapshot button.
 *
 * A button that captures the current graph state as a named
 * snapshot. Clicking prompts for a label or uses an auto-generated one.
 *
 * @example
 * <GraphSnapshotButton
 *   onSnapshot={(label) => saveSnapshot(label)}
 *   defaultLabel="Auto-save"
 * />
 */
export const GraphSnapshotButton: React.FC<GraphSnapshotButtonProps> = ({
  className = '',
  style,
  onSnapshot,
  saving = false,
  defaultLabel,
  tooltip = 'Save snapshot',
  ...rest
}) => {
  const [label, setLabel] = useState(defaultLabel || '');
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }
    const snapshotLabel = label.trim() || `Snapshot ${new Date().toLocaleTimeString()}`;
    onSnapshot(snapshotLabel);
    setShowInput(false);
    setLabel('');
  };

  return (
    <div
      className={`tf-graph-snapshot-button ${showInput ? 'tf-graph-snapshot-button--input' : ''} ${className}`}
      style={{ display: 'flex', alignItems: 'center', gap: 6, ...style }}
      {...rest}
    >
      {showInput && (
        <input
          className="tf-graph-snapshot-button__input"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Snapshot name..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleClick();
            if (e.key === 'Escape') setShowInput(false);
          }}
          style={{
            width: 140,
            padding: '4px 8px',
            background: '#1a2332',
            border: '1px solid #2a3a4e',
            borderRadius: 4,
            color: '#c8d6e5',
            fontSize: 11,
            outline: 'none',
          }}
        />
      )}
      <button
        className="tf-graph-snapshot-button__btn"
        onClick={handleClick}
        disabled={saving}
        title={tooltip}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          backgroundColor: 'rgba(16, 22, 36, 0.95)',
          border: '1px solid #2a3a4e',
          borderRadius: 6,
          color: saving ? '#3a5274' : '#8b9db8',
          cursor: saving ? 'wait' : 'pointer',
          fontSize: 14,
        }}
      >
        📷
      </button>
    </div>
  );
};

GraphSnapshotButton.displayName = 'GraphSnapshotButton';
export default GraphSnapshotButton;
