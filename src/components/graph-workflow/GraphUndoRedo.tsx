/**
 * @fileoverview GraphUndoRedo — Undo/redo controls for edit history.
 * Provides buttons to step backward and forward through the edit history stack.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface GraphUndoRedoProps extends GraphComponentProps {
  /** Whether undo is available */
  canUndo?: boolean;
  /** Whether redo is available */
  canRedo?: boolean;
  /** Current history position description */
  currentDescription?: string;
  /** Callback for undo */
  onUndo: () => void;
  /** Callback for redo */
  onRedo: () => void;
  /** Undo keyboard shortcut hint */
  undoShortcut?: string;
  /** Redo keyboard shortcut hint */
  redoShortcut?: string;
}

/**
 * GraphUndoRedo — Undo/redo controls.
 *
 * Provides undo and redo buttons that navigate the edit history
 * stack. Buttons are disabled when no actions are available to
 * undo or redo.
 *
 * @example
 * <GraphUndoRedo
 *   canUndo={historyIndex > 0}
 *   canRedo={historyIndex < history.length - 1}
 *   onUndo={() => undo()}
 *   onRedo={() => redo()}
 * />
 */
export const GraphUndoRedo: React.FC<GraphUndoRedoProps> = ({
  className = '',
  style,
  canUndo = false,
  canRedo = false,
  currentDescription,
  onUndo,
  onRedo,
  undoShortcut = 'Ctrl+Z',
  redoShortcut = 'Ctrl+Y',
  ...rest
}) => {
  return (
    <div
      className={`tf-graph-undo-redo ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '2px 4px',
        backgroundColor: 'rgba(16, 22, 36, 0.95)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        ...style,
      }}
      {...rest}
    >
      <button
        className="tf-graph-undo-redo__undo"
        onClick={onUndo}
        disabled={!canUndo}
        title={`Undo ${undoShortcut}${currentDescription ? ` — ${currentDescription}` : ''}`}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          background: 'none',
          border: '1px solid transparent',
          borderRadius: 4,
          color: canUndo ? '#8b9db8' : '#3a5274',
          cursor: canUndo ? 'pointer' : 'not-allowed',
          fontSize: 14,
        }}
      >
        ↶
      </button>

      <button
        className="tf-graph-undo-redo__redo"
        onClick={onRedo}
        disabled={!canRedo}
        title={`Redo ${redoShortcut}`}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          background: 'none',
          border: '1px solid transparent',
          borderRadius: 4,
          color: canRedo ? '#8b9db8' : '#3a5274',
          cursor: canRedo ? 'pointer' : 'not-allowed',
          fontSize: 14,
        }}
      >
        ↷
      </button>
    </div>
  );
};

GraphUndoRedo.displayName = 'GraphUndoRedo';
export default GraphUndoRedo;
