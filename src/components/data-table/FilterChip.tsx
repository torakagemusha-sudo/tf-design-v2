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

export interface FilterChipProps extends TorafirmaComponentBaseProps {
  field: string;
  fieldLabel?: string;
  operator: string;
  value: unknown;
  valueTo?: unknown;
  variant?: TableVariant;
  density?: TableDensity;
  onRemove?: () => void;
  onEdit?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  id,
  testId,
  field,
  fieldLabel,
  operator,
  value,
  valueTo,
  variant = 'neutral',
  density = 'compact',
  onRemove,
  onEdit,
  state = 'idle',
  traceId,
  disabled,
}) => {
  return (
    <span id={id} data-testid={testId} data-state={state} data-field={field} data-trace-id={traceId} className={`tf-filter-chip tf-filter-chip--variant-${variant} tf-filter-chip--density-${density}`}>
      <button className="tf-filter-chip__content" onClick={onEdit} disabled={disabled} title="Edit filter">
        <span className="tf-filter-chip__field">{fieldLabel || field}</span>
        <span className="tf-filter-chip__operator">{operator}</span>
        <span className="tf-filter-chip__value">{String(value)}</span>
        {valueTo !== undefined && <><span className="tf-filter-chip__range-sep">&ndash;</span><span className="tf-filter-chip__value-to">{String(valueTo)}</span></>}
      </button>
      <button className="tf-filter-chip__remove" onClick={onRemove} disabled={disabled} aria-label={`Remove filter on ${fieldLabel || field}`}>&#x2715;</button>
    </span>
  );
};

FilterChip.displayName = 'FilterChip';
export default FilterChip;
