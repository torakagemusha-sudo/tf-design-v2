import React, { useState } from 'react';
import { CommandDescriptor, TorafirmaComponentBaseProps } from '../../types';

/**
 * A selectable item for bulk operations.
 */
export interface BulkItem {
  id: string;
  label: string;
  type: string;
  selected?: boolean;
}

/**
 * Props for the BulkActionPanel component.
 * Full panel for bulk operations.
 */
export interface BulkActionPanelProps extends TorafirmaComponentBaseProps {
  /** Items eligible for bulk operations */
  items: BulkItem[];
  /** Available actions for the selected items */
  availableActions: CommandDescriptor[];
  /** Callback fired when a bulk action is executed */
  onAction: (action: CommandDescriptor, selectedIds: string[]) => void;
  /** Callback fired when selection changes */
  onSelectionChange?: (selectedIds: string[]) => void;
}

/**
 * BulkActionPanel — full panel for bulk operations.
 *
 * Provides a comprehensive interface for selecting multiple
 * items and applying actions to the selection. Shows item
 * list with checkboxes, selection count, and available batch
 * actions. Separates destructive bulk operations visually.
 *
 * @example
 * ```tsx
 * <BulkActionPanel
 *   items={[
 *     { id: '1', label: 'Node A', type: 'node', selected: true },
 *     { id: '2', label: 'Node B', type: 'node' },
 *   ]}
 *   availableActions={[
 *     { id: 'batch-delete', label: 'Delete selected', operation: 'batch-delete', commandClass: 'destructive', state: 'available', destructive: true },
 *   ]}
 *   onAction={(action, ids) => console.log(action.label, ids)}
 * />
 * ```
 */
const BulkActionPanel: React.FC<BulkActionPanelProps> = ({
  items,
  availableActions,
  onAction,
  onSelectionChange,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(items.filter((i) => i.selected).map((i) => i.id))
  );

  const toggleItem = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
    onSelectionChange?.(Array.from(next));
  };

  const toggleAll = () => {
    const next = selectedIds.size === items.length ? new Set<string>() : new Set(items.map((i) => i.id));
    setSelectedIds(next);
    onSelectionChange?.(Array.from(next));
  };

  const standardActions = availableActions.filter((a) => !a.destructive);
  const destructiveActions = availableActions.filter((a) => a.destructive);

  return (
    <div className={`tf-bulk-action-panel ${className}`} data-testid={testId} {...rest}>
      <div className="tf-bulk-action-panel__header">
        <label className="tf-bulk-action-panel__select-all">
          <input
            type="checkbox"
            checked={selectedIds.size === items.length && items.length > 0}
            onChange={toggleAll}
          />
          <span>Select all ({items.length})</span>
        </label>
        <span className="tf-bulk-action-panel__count">{selectedIds.size} selected</span>
      </div>

      <ul className="tf-bulk-action-panel__items">
        {items.map((item) => (
          <li key={item.id} className="tf-bulk-action-panel__item">
            <label className="tf-bulk-action-panel__item-label">
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                onChange={() => toggleItem(item.id)}
              />
              <span className="tf-bulk-action-panel__item-name">{item.label}</span>
              <span className="tf-bulk-action-panel__item-type">{item.type}</span>
            </label>
          </li>
        ))}
      </ul>

      {selectedIds.size > 0 && (
        <div className="tf-bulk-action-panel__actions">
          {standardActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={`tf-bulk-action-panel__action tf-bulk-action-panel__action--${action.commandClass}`}
              onClick={() => onAction(action, Array.from(selectedIds))}
              disabled={action.state === 'disabled'}
            >
              {action.label} ({selectedIds.size})
            </button>
          ))}
          {destructiveActions.length > 0 && (
            <div className="tf-bulk-action-panel__destructive">
              {destructiveActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className="tf-bulk-action-panel__action tf-bulk-action-panel__action--danger"
                  onClick={() => onAction(action, Array.from(selectedIds))}
                  disabled={action.state === 'disabled'}
                >
                  {action.label} ({selectedIds.size})
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkActionPanel;
