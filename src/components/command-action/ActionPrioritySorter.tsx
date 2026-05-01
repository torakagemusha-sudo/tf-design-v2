import React, { useState } from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * An action with priority information.
 */
export interface PrioritizedAction {
  command: CommandDescriptor;
  priority: number;
}

/**
 * Props for the ActionPrioritySorter component.
 * Sort and prioritize actions.
 */
export interface ActionPrioritySorterProps extends TorafirmaComponentBaseProps {
  /** Actions to display and reorder */
  actions: PrioritizedAction[];
  /** Callback fired when actions are reordered */
  onReorder: (actions: PrioritizedAction[]) => void;
}

/**
 * ActionPrioritySorter — sort and prioritize actions.
 *
 * Provides a drag-sortable or button-driven list for reordering
 * commands by priority. Higher-priority actions are executed
 * first. Shows current priority rank and supports incrementing
 * or decrementing individual action positions.
 *
 * @example
 * ```tsx
 * <ActionPrioritySorter
 *   actions={[
 *     { command: { id: 'run', label: 'Run', operation: 'run', commandClass: 'execute', state: 'available' }, priority: 1 },
 *     { command: { id: 'validate', label: 'Validate', operation: 'validate', commandClass: 'validate', state: 'available' }, priority: 2 },
 *   ]}
 *   onReorder={(actions) => console.log(actions)}
 * />
 * ```
 */
const ActionPrioritySorter: React.FC<ActionPrioritySorterProps> = ({
  actions: initialActions,
  onReorder,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [actions, setActions] = useState<PrioritizedAction[]>(initialActions);

  const move = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= actions.length) return;
    const next = [...actions];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    const reordered = next.map((a, i) => ({ ...a, priority: i + 1 }));
    setActions(reordered);
    onReorder(reordered);
  };

  return (
    <div className={`tf-action-priority-sorter ${className}`} data-testid={testId} {...rest}>
      <div className="tf-action-priority-sorter__header">
        <span className="tf-action-priority-sorter__title">Action Priority</span>
      </div>
      <ol className="tf-action-priority-sorter__list">
        {actions.map((action, index) => (
          <li key={action.command.id} className="tf-action-priority-sorter__item">
            <span className="tf-action-priority-sorter__rank">{action.priority}</span>
            <span className={`tf-action-priority-sorter__class tf-action-priority-sorter__class--${action.command.commandClass}`}>
              {action.command.commandClass.toUpperCase()}
            </span>
            <span className="tf-action-priority-sorter__label">{action.command.label}</span>
            <div className="tf-action-priority-sorter__controls">
              <button
                type="button"
                className="tf-action-priority-sorter__move"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move ${action.command.label} up`}
              >
                &#9650;
              </button>
              <button
                type="button"
                className="tf-action-priority-sorter__move"
                onClick={() => move(index, 1)}
                disabled={index === actions.length - 1}
                aria-label={`Move ${action.command.label} down`}
              >
                &#9660;
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ActionPrioritySorter;
