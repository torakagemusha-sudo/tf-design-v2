import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/utils/cn';
import { PositionedOverlay } from './PositionedOverlay';

/**
 * PopoverMenuItem definition for the menu.
 */
export interface PopoverMenuItemDef {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  divider?: boolean;
}

/**
 * PopoverMenu — a floating menu triggered by a button or action.
 * Combines trigger handling with a positioned overlay menu.
 *
 * @example
 * ```tsx
 * <PopoverMenu
 *   items={[
 *     { id: 'edit', label: 'Edit', onClick: handleEdit },
 *     { id: 'del', label: 'Delete', danger: true, divider: true, onClick: handleDelete },
 *   ]}
 * >
 *   <Button>Open Menu</Button>
 * </PopoverMenu>
 * ```
 */
export interface PopoverMenuProps {
  /** Menu items to display. */
  items: PopoverMenuItemDef[];
  /** Trigger element. */
  children: React.ReactNode;
  /** Menu placement relative to trigger. */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right';
  /** Additional class names. */
  className?: string;
  /** Callback when menu is closed. */
  onClose?: () => void;
}

export const PopoverMenu: React.FC<PopoverMenuProps> = ({
  items,
  children,
  placement = 'bottom-start',
  className,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  return (
    <div
      ref={triggerRef}
      className={cn('tf-popover-menu inline-block', className)}
      data-testid="popover-menu"
    >
      <div onClick={open} className="tf-popover-menu__trigger">
        {children}
      </div>
      <PositionedOverlay
        isOpen={isOpen}
        targetRef={triggerRef}
        placement={placement}
        offset={4}
        onClose={close}
        closeOnOutsideClick
      >
        <div className="tf-popover-menu__panel min-w-[12rem] rounded-md border border-steel-700 bg-steel-900 shadow-xl py-1">
          {items.map((item, idx) =>
            item.divider ? (
              <PopoverMenuDivider key={item.id ?? `div-${idx}`} />
            ) : (
              <PopoverMenuItem
                key={item.id}
                label={item.label}
                icon={item.icon}
                shortcut={item.shortcut}
                disabled={item.disabled}
                danger={item.danger}
                onClick={() => {
                  item.onClick?.();
                  close();
                }}
              />
            )
          )}
        </div>
      </PositionedOverlay>
    </div>
  );
};

// Inline sub-components
const PopoverMenuItem: React.FC<{
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick: () => void;
}> = ({ label, icon, shortcut, disabled, danger, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'tf-popover-menu__item w-full flex items-center gap-2 px-3 py-2 text-left text-sm',
      'transition-colors duration-75',
      danger
        ? 'text-red-400 hover:bg-red-950/30'
        : 'text-steel-200 hover:bg-steel-800',
      disabled && 'opacity-40 pointer-events-none',
      'focus:outline-none focus:bg-steel-800'
    )}
  >
    {icon && <span className="shrink-0 text-steel-400">{icon}</span>}
    <span className="flex-1 min-w-0 truncate">{label}</span>
    {shortcut && (
      <kbd className="shrink-0 text-[10px] font-mono text-steel-500 bg-steel-800 rounded px-1 py-0.5">
        {shortcut}
      </kbd>
    )}
  </button>
);

const PopoverMenuDivider: React.FC = () => (
  <div className="tf-popover-menu__divider my-1 border-t border-steel-700/60" role="separator" />
);

export default PopoverMenu;
