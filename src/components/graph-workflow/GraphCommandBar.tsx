/**
 * @fileoverview GraphCommandBar — Command bar for graph-specific actions.
 * A top bar with frequently used graph editing commands.
 */

import React from 'react';
import type { ReactNode } from 'react';
import type { GraphComponentProps } from './types';

export interface CommandItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  action: () => void;
}

export interface GraphCommandBarProps extends GraphComponentProps {
  /** Command items to display */
  commands: CommandItem[];
  /** Custom right-side content */
  children?: ReactNode;
  /** Whether the bar is visible */
  visible?: boolean;
}

/**
 * GraphCommandBar — Graph command bar.
 *
 * A horizontal bar at the top of the graph editor containing
 * frequently used commands with icons and keyboard shortcuts.
 *
 * @example
 * <GraphCommandBar
 *   commands={[
 *     { id: 'save', label: 'Save', icon: '💾', shortcut: 'Ctrl+S', action: () => save() },
 *     { id: 'undo', label: 'Undo', icon: '↶', shortcut: 'Ctrl+Z', action: () => undo() },
 *     { id: 'redo', label: 'Redo', icon: '↷', shortcut: 'Ctrl+Y', action: () => redo() },
 *   ]}
 * />
 */
export const GraphCommandBar: React.FC<GraphCommandBarProps> = ({
  className = '',
  style,
  commands,
  children,
  visible = true,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <div
      className={`tf-graph-command-bar ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 12px',
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        borderBottom: '1px solid #2a3a4e',
        zIndex: 55,
        ...style,
      }}
      {...rest}
    >
      {commands.map((cmd) => (
        <button
          key={cmd.id}
          className={`tf-graph-command-bar__item ${cmd.disabled ? 'tf-graph-command-bar__item--disabled' : ''}`}
          onClick={cmd.action}
          disabled={cmd.disabled}
          title={`${cmd.label}${cmd.shortcut ? ` (${cmd.shortcut})` : ''}`}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            borderRadius: 4,
            color: cmd.disabled ? '#3a5274' : '#c8d6e5',
            cursor: cmd.disabled ? 'not-allowed' : 'pointer',
            fontSize: 12,
          }}
        >
          {cmd.icon && <span style={{ fontSize: 12 }}>{cmd.icon}</span>}
          <span>{cmd.label}</span>
        </button>
      ))}

      {children && (
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {children}
        </div>
      )}
    </div>
  );
};

GraphCommandBar.displayName = 'GraphCommandBar';

export default GraphCommandBar;
