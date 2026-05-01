/**
 * @fileoverview GraphContextMenu — Right-click context menu for graph elements.
 * Provides actions based on the element type under the cursor.
 */

import React, { useEffect, useRef } from 'react';
import type { GraphComponentProps, Point2D } from './types';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  action: () => void;
}

export interface GraphContextMenuProps extends GraphComponentProps {
  /** Position where the menu should appear */
  position: Point2D;
  /** Menu items */
  items: ContextMenuItem[];
  /** Target element type (node, edge, canvas) */
  targetType?: string;
  /** Target element ID */
  targetId?: string;
  /** Whether the menu is visible */
  visible: boolean;
  /** Callback when the menu is dismissed */
  onDismiss: () => void;
}

/**
 * GraphContextMenu — Right-click context menu.
 *
 * A floating menu that appears on right-click, providing contextual
 * actions based on the element type (node, edge, or canvas) that
 * was clicked.
 *
 * @example
 * <GraphContextMenu
 *   position={{ x: 200, y: 150 }}
 *   visible={contextMenuOpen}
 *   items={menuItems}
 *   onDismiss={() => setContextMenuOpen(false)}
 * />
 */
export const GraphContextMenu: React.FC<GraphContextMenuProps> = ({
  className = '',
  style,
  position,
  items,
  targetType,
  targetId,
  visible,
  onDismiss,
  ...rest
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      className={`tf-graph-context-menu tf-graph-context-menu--target-${targetType || 'none'} ${className}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        minWidth: 180,
        backgroundColor: 'rgba(16, 22, 36, 0.98)',
        border: '1px solid #2a3a4e',
        borderRadius: 6,
        zIndex: 200,
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        ...style,
      }}
      {...rest}
    >
      {items.map((item) =>
        item.separator ? (
          <div
            key={item.id}
            className="tf-graph-context-menu__separator"
            style={{ height: 1, backgroundColor: '#2a3a4e', margin: '4px 0' }}
          />
        ) : (
          <button
            key={item.id}
            className={`tf-graph-context-menu__item ${item.disabled ? 'tf-graph-context-menu__item--disabled' : ''}`}
            onClick={() => {
              if (!item.disabled) {
                item.action();
                onDismiss();
              }
            }}
            disabled={item.disabled}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              padding: '6px 12px',
              background: 'transparent',
              border: 'none',
              color: item.disabled ? '#3a5274' : '#c8d6e5',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              fontSize: 12,
              textAlign: 'left',
            }}
          >
            {item.icon && <span style={{ fontSize: 11, width: 16, textAlign: 'center' }}>{item.icon}</span>}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.shortcut && (
              <span style={{ fontSize: 9, color: '#3a5274', marginLeft: 16 }}>{item.shortcut}</span>
            )}
          </button>
        )
      )}
    </div>
  );
};

GraphContextMenu.displayName = 'GraphContextMenu';
export default GraphContextMenu;
