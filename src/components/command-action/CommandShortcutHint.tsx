import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandShortcutHint component.
 * Keyboard shortcut display.
 */
export interface CommandShortcutHintProps extends TorafirmaComponentBaseProps {
  /** The keyboard shortcut to display (e.g., 'Ctrl+K') */
  shortcut: string;
  /** Whether the hint is visible */
  visible?: boolean;
  /** Platform for displaying correct modifier symbols */
  platform?: 'mac' | 'windows' | 'linux';
}

/**
 * CommandShortcutHint — keyboard shortcut display.
 *
 * Renders a styled keyboard shortcut hint using semantic kbd
 * elements. Adapts modifier key symbols to the target platform.
 * Can be conditionally shown or hidden.
 *
 * @example
 * ```tsx
 * <CommandShortcutHint shortcut="Ctrl+K" visible platform="mac" />
 * <CommandShortcutHint shortcut="Shift+Enter" />
 * ```
 */
const CommandShortcutHint: React.FC<CommandShortcutHintProps> = ({
  shortcut,
  visible = true,
  platform = 'windows',
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  if (!visible) return null;

  const formatShortcut = (s: string): string => {
    if (platform === 'mac') {
      return s
        .replace('Ctrl', '⌘')
        .replace('Alt', '⌥')
        .replace('Shift', '⇧')
        .replace('Meta', '⌘');
    }
    return s;
  };

  const keys = formatShortcut(shortcut).split('+');

  return (
    <span
      className={`tf-command-shortcut-hint ${className}`}
      aria-label={`Keyboard shortcut: ${shortcut}`}
      data-testid={testId}
      {...rest}
    >
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="tf-command-shortcut-hint__key">{key.trim()}</kbd>
          {index < keys.length - 1 && (
            <span className="tf-command-shortcut-hint__plus" aria-hidden="true">+</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

export default CommandShortcutHint;
