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

export interface FilterTextSearchProps extends TorafirmaComponentBaseProps {
  value?: string;
  placeholder?: string;
  debounceMs?: number;
  density?: TableDensity;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}

const FilterTextSearch: React.FC<FilterTextSearchProps> = ({
  id,
  testId,
  value = '',
  placeholder = 'Search...',
  debounceMs = 300,
  density = 'compact',
  onSearch,
  onClear,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const [input, setInput] = React.useState(value);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => { setInput(value); }, [value]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInput(v);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onSearch?.(v), debounceMs);
  }, [onSearch, debounceMs]);

  const handleClear = React.useCallback(() => {
    setInput('');
    onClear?.();
    onSearch?.('');
  }, [onClear, onSearch]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-filter-text-search tf-filter-text-search--density-${density} ${input ? 'tf-filter-text-search--active' : ''}`}>
      <span className="tf-filter-text-search__icon">&#x1F50D;</span>
      <input type="text" className="tf-filter-text-search__input" value={input} onChange={handleChange} placeholder={placeholder} disabled={disabled} aria-label="Text search filter" />
      {input && <button className="tf-filter-text-search__clear" onClick={handleClear} aria-label="Clear search">&#x2715;</button>}
    </div>
  );
};

FilterTextSearch.displayName = 'FilterTextSearch';
export default FilterTextSearch;
