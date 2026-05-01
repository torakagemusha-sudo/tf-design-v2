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
 * Table header row container for the dense table. Renders sortable, filterable, and resizable header cells.
 *
 * @since 1.0.0
 */

export interface DenseTableHeaderProps<T = unknown> extends TorafirmaComponentBaseProps {
  columns: TableColumn<T>[];
  selectable?: boolean;
  expandable?: boolean;
  hasRowActions?: boolean;
  sort?: TableSort;
  density?: TableDensity;
  variant?: TableVariant;
  onSort?: (sort: TableSort) => void;
  onColumnResize?: (key: string, width: number) => void;
  onSelectAll?: () => void;
  selectionState?: 'all' | 'partial' | 'none';
}

const DenseTableHeader: React.FC<DenseTableHeaderProps> = ({
  id,
  testId,
  columns,
  selectable = false,
  expandable = false,
  hasRowActions = false,
  sort,
  density = 'compact',
  variant = 'neutral',
  onSort,
  onColumnResize,
  onSelectAll,
  selectionState = 'none',
  state = 'idle',
  traceId,
  disabled,
}) => {
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);
  return (
    <thead id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table__head tf-table__head--density-${density} tf-table__head--variant-${variant}`}>
      <tr className="tf-table__header-row">
        {selectable && (
          <th className="tf-table__header-cell tf-table__header-cell--selection" scope="col">
            <input type="checkbox" className="tf-table__select-all" checked={selectionState === 'all'} ref={(el) => { if (el) el.indeterminate = selectionState === 'partial'; }} onChange={onSelectAll} disabled={disabled} aria-label="Select all rows" />
          </th>
        )}
        {expandable && <th className="tf-table__header-cell tf-table__header-cell--expand" scope="col" />}
        {visibleColumns.map((col) => (
          <th key={col.key} className={`tf-table__header-cell tf-table__header-cell--${col.type || 'text'} ${col.sortable ? 'tf-table__header-cell--sortable' : ''} ${col.pinned ? `tf-table__header-cell--pinned-${col.pinned}` : ''}`} style={{ width: col.width, minWidth: col.minWidth }} scope="col" aria-sort={sort?.field === col.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
            <span className="tf-table__header-label">{col.label}</span>
            {col.sortable && sort?.field === col.key && <span className="tf-table__sort-indicator" aria-hidden="true">{sort.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
        ))}
        {hasRowActions && <th className="tf-table__header-cell tf-table__header-cell--actions" scope="col">Actions</th>}
      </tr>
    </thead>
  );
};

DenseTableHeader.displayName = 'DenseTableHeader';
export default DenseTableHeader;
