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

export interface TableQuickFilterProps extends TorafirmaComponentBaseProps {
  value?: string;
  placeholder?: string;
  debounceMs?: number;
  density?: TableDensity;
  columns?: { key: string; label: string }[];
  onSearch?: (query: string) => void;
  onColumnFilter?: (columnKey: string, query: string) => void;
  onClear?: () => void;
}

const TableQuickFilter: React.FC<TableQuickFilterProps> = ({
  id,
  testId,
  value = '',
  placeholder = 'Quick filter...',
  debounceMs = 250,
  density = 'compact',
  columns = [],
  onSearch,
  onColumnFilter,
  onClear,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const [input, setInput] = React.useState(value);
  const [activeColumn, setActiveColumn] = React.useState<string>('all');
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => { setInput(value); }, [value]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInput(v);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (activeColumn === 'all') onSearch?.(v); else onColumnFilter?.(activeColumn, v);
    }, debounceMs);
  }, [activeColumn, onSearch, onColumnFilter, debounceMs]);

  const handleClear = React.useCallback(() => {
    setInput('');
    onClear?.();
    onSearch?.('');
  }, [onClear, onSearch]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table-quick-filter tf-table-quick-filter--density-${density} ${input ? 'tf-table-quick-filter--active' : ''}`}>
      <span className="tf-table-quick-filter__icon">&#x1F50D;</span>
      <input type="text" className="tf-table-quick-filter__input" value={input} onChange={handleChange} placeholder={placeholder} disabled={disabled} aria-label="Quick filter" />
      {columns.length > 0 && (
        <select className="tf-table-quick-filter__column" value={activeColumn} onChange={(e) => setActiveColumn(e.target.value)} disabled={disabled}>
          <option value="all">All columns</option>
          {columns.map((col) => <option key={col.key} value={col.key}>{col.label}</option>)}
        </select>
      )}
      {input && <button className="tf-table-quick-filter__clear" onClick={handleClear} aria-label="Clear filter">&#x2715;</button>}
    </div>
  );
};

TableQuickFilter.displayName = 'TableQuickFilter';
export default TableQuickFilter;
