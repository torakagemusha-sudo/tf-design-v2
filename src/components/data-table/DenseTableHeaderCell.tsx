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
 * Individual table header cell with sorting, filtering, and resizing capabilities.
 *
 * @since 1.0.0
 */

export interface DenseTableHeaderCellProps extends TorafirmaComponentBaseProps {
  columnKey: string;
  label: string;
  type?: string;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  pinned?: 'left' | 'right';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sort?: TableSort;
  align?: 'left' | 'center' | 'right';
  onSort?: (field: string) => void;
  onFilter?: (filter: TableFilter) => void;
  onResize?: (key: string, width: number) => void;
}

const DenseTableHeaderCell: React.FC<DenseTableHeaderCellProps> = ({
  id,
  testId,
  columnKey,
  label,
  type,
  sortable = false,
  filterable = false,
  resizable = false,
  pinned,
  width,
  minWidth = 40,
  maxWidth,
  sort,
  align = 'left',
  onSort,
  onFilter,
  onResize,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const isSorted = sort?.field === columnKey;
  const sortDirection = isSorted ? sort.direction : undefined;
  const cellRef = React.useRef<HTMLTableCellElement>(null);

  const handleSort = React.useCallback(() => {
    if (disabled || !sortable) return;
    onSort?.(columnKey);
  }, [disabled, sortable, onSort, columnKey]);

  return (
    <th id={id} data-testid={testId} data-state={state} data-sort={sortDirection || 'none'} data-trace-id={traceId} ref={cellRef} className={`tf-table-header-cell tf-table-header-cell--${type || 'text'} ${sortable ? 'tf-table-header-cell--sortable' : ''} ${isSorted ? 'tf-table-header-cell--sorted' : ''} ${pinned ? `tf-table-header-cell--pinned-${pinned}` : ''} ${filterable ? 'tf-table-header-cell--filterable' : ''} tf-table-header-cell--align-${align}`} style={{ width, minWidth, maxWidth }} scope="col" aria-sort={sortDirection ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <div className="tf-table-header-cell__content" onClick={handleSort} role={sortable ? 'button' : undefined} tabIndex={sortable ? 0 : undefined}>
        <span className="tf-table-header-cell__label">{label}</span>
        {sortable && <span className="tf-table-header-cell__sort-indicator" aria-hidden="true">{sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '■'}</span>}
      </div>
      {resizable && <div className="tf-table-header-cell__resizer" role="separator" aria-label={`Resize ${label} column`} />}
    </th>
  );
};

DenseTableHeaderCell.displayName = 'DenseTableHeaderCell';
export default DenseTableHeaderCell;
