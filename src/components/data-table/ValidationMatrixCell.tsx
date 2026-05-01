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

export interface ValidationMatrixCellProps extends TorafirmaComponentBaseProps {
  row: string;
  column: string;
  data?: ValidationCellData;
  onClick?: (row: string, column: string, data: ValidationCellData) => void;
}

const ValidationMatrixCell: React.FC<ValidationMatrixCellProps> = ({
  id,
  testId,
  row,
  column,
  data = { status: 'unchecked' },
  onClick,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const handleClick = React.useCallback(() => {
    if (!disabled) onClick?.(row, column, data);
  }, [disabled, onClick, row, column, data]);

  return (
    <td id={id} data-testid={testId} data-state={state} data-validation-status={data.status} data-trace-id={traceId} className={`tf-validation-matrix-cell tf-validation-matrix-cell--${data.status} ${data.reasonCode ? 'tf-validation-matrix-cell--has-reason' : ''}`} onClick={handleClick} role="gridcell" title={data.message || data.status}>
      <span className="tf-validation-matrix-cell__indicator">
        {data.status === 'valid' && '✓'}
        {data.status === 'faulted' && '✗'}
        {data.status === 'warning' && '⚠'}
        {data.status === 'blocked' && '⛔'}
        {data.status === 'validating' && '◯'}
        {data.status === 'unchecked' && '□'}
      </span>
      {data.reasonCode && <span className="tf-validation-matrix-cell__code">{data.reasonCode}</span>}
    </td>
  );
};

ValidationMatrixCell.displayName = 'ValidationMatrixCell';
export default ValidationMatrixCell;
