import React from 'react';
import type {
  TorafirmaComponentState,
  AuthorityLevel,
  ComponentDensity,
  ComponentCriticality,
  TorafirmaComponentBaseProps,
  ValidationResult,
} from '../../types';

export type TableDensity = 'compact' | 'standard' | 'field';

export type TableVariant =
  | 'neutral'
  | 'inspect'
  | 'run'
  | 'warning'
  | 'instability'
  | 'danger'
  | 'stream'
  | 'model'
  | 'authority';

export interface TableColumn<T = unknown> {
  key: string;
  label: string;
  type?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  hidden?: boolean;
  pinned?: 'left' | 'right';
  formatter?: (value: unknown, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  authority?: AuthorityLevel;
  description?: string;
}

export interface TableRowAction<T = unknown> {
  id: string;
  label: string;
  variant?: TableVariant;
  authority?: AuthorityLevel;
  criticality?: ComponentCriticality;
  onAction: (row: T) => void;
  disabled?: boolean;
  disabledReason?: string;
  confirmMessage?: string;
  icon?: string;
  traceId?: string;
}

export interface TableFilter {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'between' | 'isNull' | 'isNotNull';
  value: unknown;
  valueTo?: unknown;
}

export interface TableSort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface TablePaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface TableSelectionState<T = unknown> {
  selectedIds: string[];
  selectedRows: T[];
  selectAll: boolean;
  indeterminate: boolean;
}

export interface ValidationCellData {
  status: 'unchecked' | 'validating' | 'valid' | 'warning' | 'blocked' | 'faulted';
  reasonCode?: string;
  message?: string;
  requiredAction?: string;
}

export interface RecordField {
  key: string;
  label: string;
  value: unknown;
  type?: string;
  validation?: ValidationResult;
  authority?: AuthorityLevel;
  isComputed?: boolean;
  isDirty?: boolean;
  originalValue?: unknown;
}

export interface DatasetStatistic {
  label: string;
  value: string | number;
  delta?: number;
  state?: TorafirmaComponentState;
}

export type CellDataType =
  | 'text'
  | 'number'
  | 'currency'
  | 'percent'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'badge'
  | 'link'
  | 'json'
  | 'code'
  | 'image'
  | 'color'
  | 'rating'
  | 'icon'
  | 'sparkline'
  | 'tag'
  | 'action'
  | 'status'
  | 'progress'
  | 'avatar';

export interface TableBulkActionBarProps extends TorafirmaComponentBaseProps {
  selectedCount: number;
  totalCount: number;
  actions: { id: string; label: string; variant?: TableVariant; criticality?: ComponentCriticality; authority?: AuthorityLevel; disabled?: boolean; disabledReason?: string; confirmMessage?: string; onAction: () => void }[];
  density?: TableDensity;
  onSelectAll?: () => void;
  onClearSelection?: () => void;
}

const TableBulkActionBar: React.FC<TableBulkActionBarProps> = ({
  id,
  testId,
  selectedCount,
  totalCount,
  actions,
  density = 'compact',
  onSelectAll,
  onClearSelection,
  state = 'idle',
  traceId,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table-bulk-action-bar tf-table-bulk-action-bar--density-${density}`} role="toolbar" aria-label="Bulk actions">
      <div className="tf-table-bulk-action-bar__selection">
        <span className="tf-table-bulk-action-bar__count">{selectedCount} selected</span>
        {selectedCount < totalCount && onSelectAll && <button className="tf-table-bulk-action-bar__select-all" onClick={onSelectAll}>Select all {totalCount}</button>}
        {onClearSelection && <button className="tf-table-bulk-action-bar__clear" onClick={onClearSelection}>Clear</button>}
      </div>
      <div className="tf-table-bulk-action-bar__actions">
        {actions.map((action) => (
          <button
            key={action.id}
            className={`tf-table-bulk-action-bar__btn tf-table-bulk-action-bar__btn--${action.variant || 'neutral'}`}
            onClick={action.onAction}
            disabled={action.disabled}
            title={action.disabled ? action.disabledReason : action.label}
            data-confirm={action.confirmMessage}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

TableBulkActionBar.displayName = 'TableBulkActionBar';
export default TableBulkActionBar;
