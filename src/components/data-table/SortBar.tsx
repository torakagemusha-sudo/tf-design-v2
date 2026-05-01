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

export interface SortBarProps extends TorafirmaComponentBaseProps {
  columns: { key: string; label: string }[];
  sorts: TableSort[];
  density?: TableDensity;
  onSortChange?: (sorts: TableSort[]) => void;
  onSortAdd?: (field: string) => void;
  onSortRemove?: (field: string) => void;
  onSortClear?: () => void;
}

const SortBar: React.FC<SortBarProps> = ({
  id,
  testId,
  columns,
  sorts,
  density = 'compact',
  onSortChange,
  onSortAdd,
  onSortRemove,
  onSortClear,
  state = 'idle',
  traceId,
  disabled,
}) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-sort-bar tf-sort-bar--density-${density}`} role="toolbar" aria-label="Sort controls">
      <div className="tf-sort-bar__active">
        {sorts.map((sort) => {
          const col = columns.find((c) => c.key === sort.field);
          return (
            <span key={sort.field} className="tf-sort-bar__chip">
              <span className="tf-sort-bar__chip-field">{col?.label || sort.field}</span>
              <button className="tf-sort-bar__chip-dir" onClick={() => onSortChange?.(sorts.map((s) => s.field === sort.field ? { ...s, direction: s.direction === 'asc' ? 'desc' : 'asc' } : s))}>
                {sort.direction === 'asc' ? '▲' : '▼'}
              </button>
              <button className="tf-sort-bar__chip-remove" onClick={() => onSortRemove?.(sort.field)} disabled={disabled} aria-label={`Remove sort on ${col?.label || sort.field}`}>&#x2715;</button>
            </span>
          );
        })}
      </div>
      {sorts.length > 0 && <button className="tf-sort-bar__clear" onClick={onSortClear} disabled={disabled}>Clear sort</button>}
      <span className="tf-sort-bar__count">{sorts.length} sort{sorts.length !== 1 ? 's' : ''}</span>
    </div>
  );
};

SortBar.displayName = 'SortBar';
export default SortBar;
