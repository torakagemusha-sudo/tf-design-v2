import React from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * Props for the BatchActionBar component.
 * Select + apply actions to multiple items.
 */
export interface BatchActionBarProps extends TorafirmaComponentBaseProps {
  /** Number of currently selected items */
  selectionCount: number;
  /** Available batch actions */
  actions: CommandDescriptor[];
  /** Callback fired when a batch action is activated */
  onAction: (action: CommandDescriptor, count: number) => void;
}

/**
 * BatchActionBar — select + apply actions to multiple items.
 *
 * Displays a contextual action bar that appears when multiple
 * items are selected. Shows the selection count and exposes
 * batch-appropriate actions. Separates destructive batch
 * operations from safe ones.
 *
 * @example
 * ```tsx
 * <BatchActionBar
 *   selectionCount={5}
 *   actions={[
 *     { id: 'batch-run', label: 'Run selected', operation: 'batch-run', commandClass: 'execute', state: 'available' },
 *     { id: 'batch-delete', label: 'Delete selected', operation: 'batch-delete', commandClass: 'destructive', state: 'available', destructive: true },
 *   ]}
 *   onAction={(action, count) => console.log(action.label, count)}
 * />
 * ```
 */
const BatchActionBar: React.FC<BatchActionBarProps> = ({
  selectionCount,
  actions,
  onAction,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  if (selectionCount === 0) return null;

  const standard = actions.filter((a) => !a.destructive);
  const destructive = actions.filter((a) => a.destructive);

  return (
    <div
      className={`tf-batch-action-bar ${className}`}
      role="toolbar"
      aria-label={`Batch actions for ${selectionCount} selected items`}
      data-testid={testId}
      {...rest}
    >
      <div className="tf-batch-action-bar__count">
        <span className="tf-batch-action-bar__count-badge">{selectionCount}</span>
        <span className="tf-batch-action-bar__count-label">
          {selectionCount === 1 ? 'item selected' : 'items selected'}
        </span>
      </div>
      <div className="tf-batch-action-bar__actions">
        {standard.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`tf-batch-action-bar__button tf-batch-action-bar__button--${action.commandClass}`}
            onClick={() => onAction(action, selectionCount)}
            disabled={action.state === 'disabled'}
            aria-label={`${action.label} (${selectionCount} items)`}
          >
            {action.label}
          </button>
        ))}
        {destructive.length > 0 && (
          <div className="tf-batch-action-bar__destructive-zone">
            {destructive.map((action) => (
              <button
                key={action.id}
                type="button"
                className="tf-batch-action-bar__button tf-batch-action-bar__button--danger"
                onClick={() => onAction(action, selectionCount)}
                disabled={action.state === 'disabled'}
                aria-label={`${action.label} (${selectionCount} items)`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchActionBar;
