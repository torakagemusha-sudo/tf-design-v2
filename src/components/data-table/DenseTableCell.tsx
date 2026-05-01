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
/**
 * Data cell with type-specific rendering support for the dense table.
 *
 * @since 1.0.0
 */

export interface DenseTableCellProps<T = unknown> extends TorafirmaComponentBaseProps {
  value: unknown;
  row?: T;
  column?: TableColumn<T>;
  type?: CellDataType;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: unknown, row?: T) => React.ReactNode;
  editable?: boolean;
  editing?: boolean;
  onEdit?: (value: unknown) => void;
  onEditCommit?: (value: unknown) => void;
  onEditCancel?: () => void;
}

const DenseTableCell = <T,>({
  value,
  row,
  column,
  type = 'text',
  align = 'left',
  formatter,
  editable = false,
  editing = false,
  onEdit,
  onEditCommit,
  onEditCancel,
  id,
  testId,
  state = 'idle',
  traceId,
}: DenseTableCellProps<T>) => {
  const content = React.useMemo(() => {
    if (formatter) return formatter(value, row);
    if (value === null || value === undefined) return <span className="tf-table-cell__null">&mdash;</span>;
    return String(value);
  }, [value, row, formatter]);

  return (
    <td id={id} data-testid={testId} data-state={state} data-type={type} data-trace-id={traceId} className={`tf-table-cell tf-table-cell--${type} tf-table-cell--align-${align} ${editable ? 'tf-table-cell--editable' : ''} ${editing ? 'tf-table-cell--editing' : ''}`} role="gridcell">
      <div className="tf-table-cell__content">{content}</div>
    </td>
  );
};

DenseTableCell.displayName = 'DenseTableCell';
export default DenseTableCell;
