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

export interface DataGridProps<T = unknown> extends TorafirmaComponentBaseProps {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: string;
  title?: string;
  toolbar?: React.ReactNode;
  filterPanel?: React.ReactNode;
  columnPanel?: React.ReactNode;
  exportPanel?: React.ReactNode;
  footer?: React.ReactNode;
  pagination?: TablePaginationState;
  selectable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  resizableColumns?: boolean;
  reorderableColumns?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  error?: string | null;
  density?: TableDensity;
  onRowClick?: (row: T) => void;
  onSort?: (sort: TableSort) => void;
  onFilter?: (filters: TableFilter[]) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSelectionChange?: (selection: TableSelectionState<T>) => void;
  onColumnResize?: (key: string, width: number) => void;
  onColumnReorder?: (columns: TableColumn<T>[]) => void;
}

/**
 * Full-featured data grid combining DenseTable with toolbar, filter panel,
 * column configuration, pagination, and export capabilities.
 */
const DataGrid = <T extends Record<string, unknown>>({
  id,
  testId,
  columns,
  data,
  rowKey = 'id',
  title,
  toolbar,
  filterPanel,
  columnPanel,
  exportPanel,
  footer,
  pagination,
  selectable = true,
  sortable = true,
  filterable = true,
  resizableColumns = true,
  reorderableColumns = true,
  loading = false,
  emptyMessage = 'No records',
  error = null,
  density = 'compact',
  onRowClick,
  onSort,
  onFilter,
  onPageChange,
  onPageSizeChange,
  onSelectionChange,
  onColumnResize,
  onColumnReorder,
  state = 'idle',
  authority,
  traceId,
}: DataGridProps<T>) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-density={density} data-trace-id={traceId} className={`tf-data-grid tf-data-grid--density-${density} tf-data-grid--state-${state}`}>
      {(title || toolbar) && (
        <header className="tf-data-grid__header">
          {title && <h2 className="tf-data-grid__title">{title}</h2>}
          {toolbar && <div className="tf-data-grid__toolbar">{toolbar}</div>}
        </header>
      )}
      {filterPanel && <div className="tf-data-grid__filter-panel">{filterPanel}</div>}
      {columnPanel && <div className="tf-data-grid__column-panel">{columnPanel}</div>}
      {exportPanel && <div className="tf-data-grid__export-panel">{exportPanel}</div>}
      <div className="tf-data-grid__body">
        <DenseTable<T>
          columns={columns}
          data={data}
          rowKey={rowKey}
          selectable={selectable}
          resizableColumns={resizableColumns}
          reorderableColumns={reorderableColumns}
          loading={loading}
          emptyMessage={emptyMessage}
          error={error}
          density={density}
          onRowClick={onRowClick}
          onSort={onSort}
          onFilter={onFilter}
          onColumnResize={onColumnResize}
          onColumnReorder={onColumnReorder}
          onSelectionChange={onSelectionChange}
          state={state}
          traceId={traceId}
        />
      </div>
      {(pagination || footer) && (
        <footer className="tf-data-grid__footer">
          {footer}
          {pagination && (
            <TablePagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              total={pagination.total}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          )}
        </footer>
      )}
    </div>
  );
};

DataGrid.displayName = 'DataGrid';
export default DataGrid;
