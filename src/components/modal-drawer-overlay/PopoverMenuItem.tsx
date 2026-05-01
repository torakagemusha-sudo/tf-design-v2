import React from 'react';
import { cn } from '@/utils/cn';

/**
 * PopoverMenuItem — an individual selectable item within a PopoverMenu.
 * Supports icons, keyboard shortcuts, and danger styling.
 *
 * @example
 * ```tsx
 * <PopoverMenuItem label="Edit" icon={<EditIcon />} shortcut="Ctrl+E" onClick={handleEdit} />
 * ```
 */
export interface PopoverMenuItemProps {
  /** Item label. */
  label: React.ReactNode;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  /** Keyboard shortcut text. */
  shortcut?: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Whether this is a destructive action item. */
  danger?: boolean;
  /** Click handler. */
  onClick: () => void;
  /** Additional class names. */
  className?: string;
  /** Whether the item is currently selected/highlighted. */
  selected?: boolean;
}

export const PopoverMenuItem: React.FC<PopoverMenuItemProps> = ({
  label,
  icon,
  shortcut,
  disabled,
  danger,
  onClick,
  className,
  selected,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'tf-popover-menu-item w-full flex items-center gap-2 px-3 py-2 text-left text-sm',
        'transition-colors duration-75 focus:outline-none',
        danger
          ? 'text-red-400 hover:bg-red-950/30 focus:bg-red-950/30'
          : 'text-steel-200 hover:bg-steel-800 focus:bg-steel-800',
        selected && !danger && 'bg-steel-800',
        disabled && 'opacity-40 pointer-events-none',
        className
      )}
      role="menuitem"
      data-testid="popover-menu-item"
    >
      {icon && (
        <span className="tf-popover-menu-item__icon shrink-0 text-steel-400">
          {icon}
        </span>
      )}
      <span className="tf-popover-menu-item__label flex-1 min-w-0 truncate">
        {label}
      </span>
      {shortcut && (
        <kbd className="tf-popover-menu-item__shortcut shrink-0 text-[10px] font-mono text-steel-500 bg-steel-800 rounded px-1 py-0.5">
          {shortcut}
        </kbd>
      )}
    </button>
  );
};

export default PopoverMenuItem;
