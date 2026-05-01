import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

/**
 * ContextMenuItem definition.
 */
export interface ContextMenuItemDef {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

/**
 * ContextMenuOverlay — a right-click context menu overlay.
 * Appears at the cursor position on right-click events.
 *
 * @example
 * ```tsx
 * <ContextMenuOverlay
 *   isOpen={open}
 *   position={{ x: 100, y: 200 }}
 *   items={contextItems}
 *   onClose={close}
 * />
 * ```
 */
export interface ContextMenuOverlayProps {
  /** Whether the context menu is visible. */
  isOpen: boolean;
  /** Screen position where the menu appears. */
  position: { x: number; y: number };
  /** Menu items. */
  items: ContextMenuItemDef[];
  /** Callback when the menu is closed. */
  onClose: () => void;
  /** Additional class names. */
  className?: string;
}

export const ContextMenuOverlay: React.FC<ContextMenuOverlayProps> = ({
  isOpen,
  position,
  items,
  onClose,
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPos, setAdjustedPos] = useState(position);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      let x = position.x;
      let y = position.y;

      if (x + rect.width > window.innerWidth) {
        x = window.innerWidth - rect.width - 8;
      }
      if (y + rect.height > window.innerHeight) {
        y = window.innerHeight - rect.height - 8;
      }

      setAdjustedPos({ x: Math.max(8, x), y: Math.max(8, y) });
    }
  }, [isOpen, position]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={menuRef}
      className={cn(
        'tf-context-menu-overlay',
        'fixed z-overlay min-w-[10rem] rounded-md border border-steel-700 bg-steel-900 shadow-xl py-1',
        'animate-in fade-in zoom-in-95 duration-100',
        className
      )}
      style={{ top: adjustedPos.y, left: adjustedPos.x }}
      role="menu"
      data-testid="context-menu-overlay"
    >
      {items.map((item, idx) =>
        item.divider ? (
          <div key={`div-${idx}`} className="my-1 border-t border-steel-700/60" role="separator" />
        ) : (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            onClick={() => {
              item.onClick?.();
              onClose();
            }}
            disabled={item.disabled}
            className={cn(
              'tf-context-menu-overlay__item w-full flex items-center gap-2 px-3 py-2 text-left text-sm',
              'transition-colors duration-75',
              item.danger
                ? 'text-red-400 hover:bg-red-950/30'
                : 'text-steel-200 hover:bg-steel-800',
              item.disabled && 'opacity-40 pointer-events-none'
            )}
          >
            {item.icon && <span className="shrink-0 text-steel-400">{item.icon}</span>}
            <span className="flex-1 min-w-0 truncate">{item.label}</span>
            {item.shortcut && (
              <kbd className="shrink-0 text-[10px] font-mono text-steel-500 bg-steel-800 rounded px-1 py-0.5">
                {item.shortcut}
              </kbd>
            )}
          </button>
        )
      )}
    </div>,
    document.body
  );
};

export default ContextMenuOverlay;
