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

export interface CellFormatterRatingProps extends TorafirmaComponentBaseProps {
  value?: number | null;
  max?: number;
  readonly?: boolean;
  onRate?: (value: number) => void;
}

const CellFormatterRating: React.FC<CellFormatterRatingProps> = ({
  id,
  testId,
  value,
  max = 5,
  readonly = true,
  onRate,
  state = 'idle',
  traceId,
}) => {
  if (value === null || value === undefined) return <span id={id} data-testid={testId} className="tf-cell-formatter-rating tf-cell-formatter-rating--null">&mdash;</span>;
  return (
    <span id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-cell-formatter-rating ${readonly ? 'tf-cell-formatter-rating--readonly' : ''}`} role="img" aria-label={`Rating: ${value} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <button key={i} className={`tf-cell-formatter-rating__star ${i < value ? 'tf-cell-formatter-rating__star--filled' : 'tf-cell-formatter-rating__star--empty'}`} onClick={() => !readonly && onRate?.(i + 1)} disabled={readonly} aria-label={`Rate ${i + 1}`}>
          {i < value ? '★' : '☆'}
        </button>
      ))}
    </span>
  );
};

CellFormatterRating.displayName = 'CellFormatterRating';
export default CellFormatterRating;
