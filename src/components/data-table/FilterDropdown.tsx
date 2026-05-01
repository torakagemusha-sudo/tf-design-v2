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

export interface FilterDropdownProps extends TorafirmaComponentBaseProps {
  field: string;
  label: string;
  type?: string;
  operators?: { value: string; label: string }[];
  currentFilter?: TableFilter;
  density?: TableDensity;
  onFilterChange?: (filter: TableFilter | null) => void;
  children?: React.ReactNode;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  id,
  testId,
  field,
  label,
  type = 'text',
  operators = [{ value: 'eq', label: '=' }, { value: 'ne', label: '!=' }, { value: 'contains', label: 'contains' }],
  currentFilter,
  density = 'compact',
  onFilterChange,
  children,
  state = 'idle',
  traceId,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [operator, setOperator] = React.useState(currentFilter?.operator || operators[0]?.value || 'eq');
  const [value, setValue] = React.useState<string>(String(currentFilter?.value ?? ''));

  const handleApply = React.useCallback(() => {
    if (value) {
      onFilterChange?.({ field, operator: operator as TableFilter['operator'], value });
    } else {
      onFilterChange?.(null);
    }
    setIsOpen(false);
  }, [field, operator, value, onFilterChange]);

  const handleClear = React.useCallback(() => {
    setValue('');
    onFilterChange?.(null);
    setIsOpen(false);
  }, [onFilterChange]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-filter-dropdown tf-filter-dropdown--density-${density} ${isOpen ? 'tf-filter-dropdown--open' : ''} ${currentFilter ? 'tf-filter-dropdown--active' : ''}`}>
      <button className="tf-filter-dropdown__trigger" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <span className="tf-filter-dropdown__label">{label}</span>
        {currentFilter && <span className="tf-filter-dropdown__active-indicator">&#9679;</span>}
      </button>
      {isOpen && (
        <div className="tf-filter-dropdown__panel">
          <select className="tf-filter-dropdown__operator" value={operator} onChange={(e) => setOperator(e.target.value)}>
            {operators.map((op) => <option key={op.value} value={op.value}>{op.label}</option>)}
          </select>
          {children || <input type={type === 'number' ? 'number' : 'text'} className="tf-filter-dropdown__input" value={value} onChange={(e) => setValue(e.target.value)} placeholder={`Filter ${label}...`} />}
          <div className="tf-filter-dropdown__actions">
            <button className="tf-filter-dropdown__apply" onClick={handleApply}>Apply</button>
            <button className="tf-filter-dropdown__clear" onClick={handleClear}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

FilterDropdown.displayName = 'FilterDropdown';
export default FilterDropdown;
