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

export interface SortDropdownProps extends TorafirmaComponentBaseProps {
  columns: { key: string; label: string; sortable?: boolean }[];
  currentSort?: TableSort;
  density?: TableDensity;
  onSortChange?: (sort: TableSort | undefined) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  id,
  testId,
  columns,
  currentSort,
  density = 'compact',
  onSortChange,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const sortableColumns = React.useMemo(() => columns.filter((c) => c.sortable !== false), [columns]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-sort-dropdown tf-sort-dropdown--density-${density} ${isOpen ? 'tf-sort-dropdown--open' : ''} ${currentSort ? 'tf-sort-dropdown--active' : ''}`}>
      <button className="tf-sort-dropdown__trigger" onClick={() => setIsOpen(!isOpen)} disabled={disabled} aria-expanded={isOpen}>
        <span className="tf-sort-dropdown__label">Sort</span>
        {currentSort && <span className="tf-sort-dropdown__active">{columns.find((c) => c.key === currentSort.field)?.label}: {currentSort.direction}</span>}
      </button>
      {isOpen && (
        <div className="tf-sort-dropdown__panel">
          <button className="tf-sort-dropdown__clear" onClick={() => { onSortChange?.(undefined); setIsOpen(false); }}>Clear sort</button>
          {sortableColumns.map((col) => (
            <div key={col.key} className="tf-sort-dropdown__item">
              <span className="tf-sort-dropdown__item-label">{col.label}</span>
              <button className={`tf-sort-dropdown__dir-btn ${currentSort?.field === col.key && currentSort?.direction === 'asc' ? 'tf-sort-dropdown__dir-btn--active' : ''}`} onClick={() => { onSortChange?.({ field: col.key, direction: 'asc' }); setIsOpen(false); }} aria-label={`Sort ${col.label} ascending`}>&#9650;</button>
              <button className={`tf-sort-dropdown__dir-btn ${currentSort?.field === col.key && currentSort?.direction === 'desc' ? 'tf-sort-dropdown__dir-btn--active' : ''}`} onClick={() => { onSortChange?.({ field: col.key, direction: 'desc' }); setIsOpen(false); }} aria-label={`Sort ${col.label} descending`}>&#9660;</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SortDropdown.displayName = 'SortDropdown';
export default SortDropdown;
