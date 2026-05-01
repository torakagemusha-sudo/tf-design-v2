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
 * Primary data table with high density for operational data display. Supports row selection, column configuration, and authority-aware actions.
 *
 * @since 1.0.0
 */

export interface DenseTableProps<T = unknown> extends TorafirmaComponentBaseProps {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: string;
  selectable?: boolean;
  selection?: TableSelectionState<T>;
  rowActions?: TableRowAction<T>[];
  expandable?: boolean;
  expandedRowKeys?: string[];
  resizableColumns?: boolean;
  reorderableColumns?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  error?: string | null;
  density?: TableDensity;
  stickyHeader?: boolean;
  striped?: boolean;
  variant?: TableVariant;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selection: TableSelectionState<T>) => void;
  onExpandToggle?: (rowKey: string) => void;
  onSort?: (sort: TableSort) => void;
  onFilter?: (filters: TableFilter[]) => void;
  onColumnResize?: (key: string, width: number) => void;
  onColumnReorder?: (columns: TableColumn<T>[]) => void;
  sort?: TableSort;
  filters?: TableFilter[];
  rowActionAuthority?: AuthorityLevel;
}

const DenseTable = <T extends Record<string, unknown>>({
  id,
  testId,
  columns,
  data,
  rowKey = 'id',
  selectable = false,
  selection,
  rowActions,
  expandable = false,
  expandedRowKeys = [],
  resizableColumns = false,
  reorderableColumns = false,
  loading = false,
  emptyMessage = 'No records',
  error = null,
  density = 'compact',
  stickyHeader = true,
  striped = true,
  variant = 'neutral',
  onRowClick,
  onSelectionChange,
  onExpandToggle,
  onSort,
  onFilter,
  onColumnResize,
  onColumnReorder,
  sort,
  filters = [],
  rowActionAuthority,
  traceId,
  state = 'idle',
  authority,
  disabled,
  disabledReason,
  criticality = 'operational',
}: DenseTableProps<T>) => {
  const tableRef = React.useRef<HTMLTableElement>(null);
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);
  const className = `tf-table tf-table--density-${density} tf-table--variant-${variant} ${striped ? 'tf-table--striped' : ''} ${stickyHeader ? 'tf-table--sticky-header' : ''} tf-table--state-${state} ${loading ? 'tf-table--loading' : ''}`;

  return (
    <div id={id} data-testid={testId} data-state={state} data-density={density} data-variant={variant} data-trace-id={traceId} className="tf-table-wrapper">
      {error && (
        <div className="tf-table-error" role="alert">
          <span className="tf-table-error__icon">&#x26A0;</span>
          <span className="tf-table-error__message">{error}</span>
        </div>
      )}
      {loading && (
        <div className="tf-table-loading-overlay" aria-live="polite">
          <span className="tf-table-loading-overlay__spinner" />
          <span className="tf-table-loading-overlay__label">Loading data...</span>
        </div>
      )}
      <table ref={tableRef} className={className} role="grid" aria-busy={loading}>
        <thead className="tf-table__head">
          <tr className="tf-table__header-row">
            {selectable && (
              <th className="tf-table__header-cell tf-table__header-cell--selection" scope="col">
                <input type="checkbox" className="tf-table__select-all" checked={selection?.selectAll} ref={(el) => { if (el) el.indeterminate = selection?.indeterminate ?? false; }} aria-label="Select all" />
              </th>
            )}
            {expandable && <th className="tf-table__header-cell tf-table__header-cell--expand" scope="col" />}
            {visibleColumns.map((col) => (
              <th key={col.key} className={`tf-table__header-cell tf-table__header-cell--${col.type || 'text'} ${col.sortable ? 'tf-table__header-cell--sortable' : ''}`} style={{ width: col.width, minWidth: col.minWidth }} scope="col" aria-sort={sort?.field === col.key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
                <span className="tf-table__header-label">{col.label}</span>
                {col.sortable && sort?.field === col.key && <span className="tf-table__sort-indicator">{sort.direction === 'asc' ? '▲' : '▼'}</span>}
              </th>
            ))}
            {rowActions && rowActions.length > 0 && <th className="tf-table__header-cell tf-table__header-cell--actions" scope="col">Actions</th>}
          </tr>
        </thead>
        <tbody className="tf-table__body">
          {data.length === 0 ? (
            <tr className="tf-table__empty-row">
              <td colSpan={visibleColumns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)} className="tf-table__empty-cell">
                <div className="tf-table__empty-state"><span className="tf-table__empty-message">{emptyMessage}</span></div>
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const key = String(row[rowKey as keyof T] ?? index);
              const isExpanded = expandedRowKeys.includes(key);
              const isSelected = selection?.selectedIds.includes(key);
              return (
                <React.Fragment key={key}>
                  <tr className={`tf-table__row ${isSelected ? 'tf-table__row--selected' : ''} ${index % 2 === 1 && striped ? 'tf-table__row--alt' : ''} ${onRowClick ? 'tf-table__row--clickable' : ''}`} onClick={() => !disabled && onRowClick?.(row)} role="row" aria-selected={isSelected}>
                    {selectable && <td className="tf-table__cell tf-table__cell--selection" role="gridcell"><input type="checkbox" className="tf-table__row-checkbox" checked={isSelected} aria-label="Select row" /></td>}
                    {expandable && <td className="tf-table__cell tf-table__cell--expand" role="gridcell"><button className="tf-table__expand-btn" onClick={() => onExpandToggle?.(key)} aria-expanded={isExpanded}>{isExpanded ? '▼' : '▶'}</button></td>}
                    {visibleColumns.map((col) => <td key={col.key} className={`tf-table__cell tf-table__cell--${col.type || 'text'} tf-table__cell--align-${col.align || 'left'}`} role="gridcell">{col.formatter ? col.formatter(row[col.key as keyof T], row) : String(row[col.key as keyof T] ?? '')}</td>)}
                    {rowActions && rowActions.length > 0 && <td className="tf-table__cell tf-table__cell--actions" role="gridcell"><div className="tf-table__row-actions">{rowActions.map((action) => <button key={action.id} className={`tf-table__action-btn tf-table__action-btn--${action.variant || 'neutral'}`} onClick={() => action.onAction(row)} disabled={action.disabled} title={action.disabled ? action.disabledReason : action.label}>{action.label}</button>)}</div></td>}
                  </tr>
                  {isExpanded && (
                    <tr className="tf-table__detail-row">
                      <td colSpan={visibleColumns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)} className="tf-table__detail-cell"><div className="tf-table__detail-panel">Row detail</div></td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

DenseTable.displayName = 'DenseTable';
export default DenseTable;
