import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the CommandGroupHeader component.
 * Collapsible header for command groups.
 */
export interface CommandGroupHeaderProps extends TorafirmaComponentBaseProps {
  /** Title of the command group */
  title: string;
  /** Number of commands in the group */
  count: number;
  /** Whether the group is currently collapsed */
  collapsed: boolean;
  /** Callback fired when the group is toggled */
  onToggle: () => void;
  /** Optional icon element */
  icon?: React.ReactNode;
}

/**
 * CommandGroupHeader — collapsible header for command groups.
 *
 * Renders a section header for a group of commands with a
 * collapse/expand toggle. Displays the group title and a
 * count badge showing the number of commands within the group.
 *
 * @example
 * ```tsx
 * <CommandGroupHeader
 *   title="Execute Commands"
 *   count={5}
 *   collapsed={false}
 *   onToggle={() => console.log('Toggled')}
 * />
 * ```
 */
const CommandGroupHeader: React.FC<CommandGroupHeaderProps> = ({
  title,
  count,
  collapsed,
  onToggle,
  icon,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`tf-command-group-header ${collapsed ? 'tf-command-group-header--collapsed' : 'tf-command-group-header--expanded'} ${className}`}
      onClick={onToggle}
      aria-expanded={!collapsed}
      aria-label={`${title} (${count} commands)`}
      data-testid={testId}
      {...rest}
    >
      {icon && <span className="tf-command-group-header__icon">{icon}</span>}
      <span className="tf-command-group-header__title">{title}</span>
      <span className="tf-command-group-header__count">{count}</span>
      <span className="tf-command-group-header__toggle" aria-hidden="true">
        {collapsed ? '+' : '−'}
      </span>
    </button>
  );
};

export default CommandGroupHeader;
