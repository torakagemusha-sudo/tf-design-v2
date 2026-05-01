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

export interface FilterNumericRangeProps extends TorafirmaComponentBaseProps {
  field: string;
  label?: string;
  from?: number;
  to?: number;
  min?: number;
  max?: number;
  step?: number;
  density?: TableDensity;
  onChange?: (field: string, from: number | undefined, to: number | undefined) => void;
}

const FilterNumericRange: React.FC<FilterNumericRangeProps> = ({
  id,
  testId,
  field,
  label = field,
  from,
  to,
  min,
  max,
  step = 1,
  density = 'compact',
  onChange,
  state = 'idle',
  traceId,
  disabled,
}) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-filter-numeric-range tf-filter-numeric-range--density-${density}`}>
      <span className="tf-filter-numeric-range__label">{label}</span>
      <input type="number" className="tf-filter-numeric-range__from" value={from ?? ''} min={min} max={max} step={step} onChange={(e) => onChange?.(field, e.target.value ? Number(e.target.value) : undefined, to)} disabled={disabled} aria-label={`${label} minimum`} placeholder="Min" />
      <span className="tf-filter-numeric-range__sep">&ndash;</span>
      <input type="number" className="tf-filter-numeric-range__to" value={to ?? ''} min={min} max={max} step={step} onChange={(e) => onChange?.(field, from, e.target.value ? Number(e.target.value) : undefined)} disabled={disabled} aria-label={`${label} maximum`} placeholder="Max" />
    </div>
  );
};

FilterNumericRange.displayName = 'FilterNumericRange';
export default FilterNumericRange;
