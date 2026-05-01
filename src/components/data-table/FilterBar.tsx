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

export interface FilterBarProps extends TorafirmaComponentBaseProps {
  filters: TableFilter[];
  columns: { key: string; label: string; type?: string }[];
  density?: TableDensity;
  variant?: TableVariant;
  onFilterChange?: (filters: TableFilter[]) => void;
  onFilterAdd?: (filter: TableFilter) => void;
  onFilterRemove?: (index: number) => void;
  onFilterClear?: () => void;
  children?: React.ReactNode;
}

/**
 * Filter controls bar for managing active filters on table data.
 * Supports adding, removing, and clearing filters with authority awareness.
 */
const FilterBar: React.FC<FilterBarProps> = ({
  id,
  testId,
  filters,
  columns,
  density = 'compact',
  variant = 'neutral',
  onFilterChange,
  onFilterAdd,
  onFilterRemove,
  onFilterClear,
  children,
  state = 'idle',
  traceId,
  disabled,
}) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-filter-bar tf-filter-bar--density-${density} tf-filter-bar--variant-${variant}`} role="toolbar" aria-label="Filter controls">
      <div className="tf-filter-bar__chips">
        {filters.map((filter, index) => {
          const col = columns.find((c) => c.key === filter.field);
          return (
            <span key={index} className="tf-filter-bar__chip">
              <span className="tf-filter-bar__chip-field">{col?.label || filter.field}</span>
              <span className="tf-filter-bar__chip-operator">{filter.operator}</span>
              <span className="tf-filter-bar__chip-value">{String(filter.value)}</span>
              <button className="tf-filter-bar__chip-remove" onClick={() => onFilterRemove?.(index)} disabled={disabled} aria-label={`Remove filter ${col?.label || filter.field}`}>&#x2715;</button>
            </span>
          );
        })}
      </div>
      {children}
      {filters.length > 0 && (
        <button className="tf-filter-bar__clear-btn" onClick={onFilterClear} disabled={disabled}>Clear all</button>
      )}
      <span className="tf-filter-bar__count">{filters.length} filter{filters.length !== 1 ? 's' : ''}</span>
    </div>
  );
};

FilterBar.displayName = 'FilterBar';
export default FilterBar;
