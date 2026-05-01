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

export interface FilterMultiSelectProps extends TorafirmaComponentBaseProps {
  field: string;
  label?: string;
  options: { value: string; label: string; count?: number }[];
  selected: string[];
  density?: TableDensity;
  onChange?: (field: string, selected: string[]) => void;
}

const FilterMultiSelect: React.FC<FilterMultiSelectProps> = ({
  id,
  testId,
  field,
  label = field,
  options,
  selected,
  density = 'compact',
  onChange,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const toggle = React.useCallback((value: string) => {
    const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    onChange?.(field, next);
  }, [field, selected, onChange]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-filter-multi-select tf-filter-multi-select--density-${density}`}>
      <span className="tf-filter-multi-select__label">{label}</span>
      <div className="tf-filter-multi-select__options">
        {options.map((opt) => (
          <label key={opt.value} className={`tf-filter-multi-select__option ${selected.includes(opt.value) ? 'tf-filter-multi-select__option--selected' : ''}`}>
            <input type="checkbox" className="tf-filter-multi-select__checkbox" checked={selected.includes(opt.value)} onChange={() => toggle(opt.value)} disabled={disabled} />
            <span className="tf-filter-multi-select__option-label">{opt.label}</span>
            {opt.count !== undefined && <span className="tf-filter-multi-select__option-count">{opt.count}</span>}
          </label>
        ))}
      </div>
    </div>
  );
};

FilterMultiSelect.displayName = 'FilterMultiSelect';
export default FilterMultiSelect;
