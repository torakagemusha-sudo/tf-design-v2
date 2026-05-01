/**
 * @fileoverview GraphHelpOverlay — Help/shortcut overlay showing keyboard shortcuts.
 * A modal overlay displaying available keyboard shortcuts and help information.
 */

import React from 'react';
import type { GraphComponentProps } from './types';

export interface ShortcutGroup {
  name: string;
  shortcuts: Array<{ keys: string; description: string }>;
}

export interface GraphHelpOverlayProps extends GraphComponentProps {
  /** Whether the overlay is visible */
  visible: boolean;
  /** Shortcut groups to display */
  shortcuts?: ShortcutGroup[];
  /** Callback when the overlay is closed */
  onClose: () => void;
}

const DEFAULT_SHORTCUTS: ShortcutGroup[] = [
  {
    name: 'Navigation',
    shortcuts: [
      { keys: 'Space + Drag', description: 'Pan canvas' },
      { keys: 'Scroll', description: 'Zoom in/out' },
      { keys: 'Ctrl+0', description: 'Reset zoom' },
      { keys: 'Ctrl+1', description: 'Fit to screen' },
    ],
  },
  {
    name: 'Selection',
    shortcuts: [
      { keys: 'Click', description: 'Select node/edge' },
      { keys: 'Ctrl+Click', description: 'Multi-select' },
      { keys: 'Ctrl+A', description: 'Select all' },
      { keys: 'Escape', description: 'Deselect all' },
      { keys: 'Delete', description: 'Delete selected' },
    ],
  },
  {
    name: 'Editing',
    shortcuts: [
      { keys: 'Ctrl+Z', description: 'Undo' },
      { keys: 'Ctrl+Y', description: 'Redo' },
      { keys: 'Ctrl+C', description: 'Copy' },
      { keys: 'Ctrl+V', description: 'Paste' },
      { keys: 'Ctrl+S', description: 'Save' },
    ],
  },
  {
    name: 'Layout',
    shortcuts: [
      { keys: 'Ctrl+Shift+L', description: 'Auto-layout' },
      { keys: 'Ctrl+G', description: 'Group selected' },
      { keys: 'Ctrl+Shift+G', description: 'Ungroup' },
    ],
  },
];

/**
 * GraphHelpOverlay — Help/keyboard shortcuts overlay.
 *
 * A modal dialog that displays all available keyboard shortcuts
 * organized by category. Press Escape or click outside to close.
 *
 * @example
 * <GraphHelpOverlay
 *   visible={showHelp}
 *   onClose={() => setShowHelp(false)}
 * />
 */
export const GraphHelpOverlay: React.FC<GraphHelpOverlayProps> = ({
  className = '',
  style,
  visible,
  shortcuts = DEFAULT_SHORTCUTS,
  onClose,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-help-overlay ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(11, 15, 25, 0.85)',
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      onClick={onClose}
      {...rest}
    >
      <div
        className="tf-graph-help-overlay__content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 560,
          maxHeight: '80vh',
          backgroundColor: 'rgba(16, 22, 36, 0.98)',
          border: '1px solid #2a3a4e',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <div
          className="tf-graph-help-overlay__header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid #2a3a4e',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 16, color: '#c8d6e5' }}>Keyboard Shortcuts</h2>
          <button
            className="tf-graph-help-overlay__close"
            onClick={onClose}
            type="button"
            style={{ background: 'none', border: 'none', color: '#6b7f9e', cursor: 'pointer', fontSize: 16 }}
          >
            ✕
          </button>
        </div>

        <div className="tf-graph-help-overlay__body" style={{ padding: 16, overflowY: 'auto', maxHeight: '60vh' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {shortcuts.map((group) => (
              <div key={group.name}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6b8cbc', textTransform: 'uppercase', marginBottom: 10 }}>
                  {group.name}
                </div>
                {group.shortcuts.map((shortcut, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '4px 0',
                      borderBottom: '1px solid #1a2332',
                    }}
                  >
                    <span style={{ fontSize: 11, color: '#c8d6e5' }}>{shortcut.description}</span>
                    <kbd
                      style={{
                        padding: '2px 8px',
                        backgroundColor: '#1a2332',
                        border: '1px solid #2a3a4e',
                        borderRadius: 4,
                        fontSize: 10,
                        color: '#8b9db8',
                        fontFamily: 'monospace',
                      }}
                    >
                      {shortcut.keys}
                    </kbd>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

GraphHelpOverlay.displayName = 'GraphHelpOverlay';
export default GraphHelpOverlay;
