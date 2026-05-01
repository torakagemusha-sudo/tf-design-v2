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
 * Table body container that renders data rows with selection, expansion, and action support.
 *
 * @since 1.0.0
 */

export interface DenseTableBodyProps<T = unknown> extends TorafirmaComponentBaseProps {
  data: T[];
  columns: TableColumn<T>[];
  rowKey?: string;
  selectable?: boolean;
  selection?: TableSelectionState<T>;
  expandable?: boolean;
  expandedRowKeys?: string[];
  rowActions?: TableRowAction<T>[];
  striped?: boolean;
  emptyMessage?: string;
  density?: TableDensity;
  variant?: TableVariant;
  onRowClick?: (row: T) => void;
  onRowSelect?: (row: T, selected: boolean) => void;
  onExpandToggle?: (rowKey: string) => void;
}

const DenseTableBody = <T extends Record<string, unknown>>({
  id,
  testId,
  data,
  columns,
  rowKey = 'id',
  selectable = false,
  selection,
  expandable = false,
  expandedRowKeys = [],
  rowActions,
  striped = true,
  emptyMessage = 'No records',
  density = 'compact',
  variant = 'neutral',
  onRowClick,
  onRowSelect,
  onExpandToggle,
  state = 'idle',
  traceId,
  disabled,
}: DenseTableBodyProps<T>) => {
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);

  if (data.length === 0) {
    return (
      <tbody id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table__body tf-table__body--empty tf-table__body--density-${density}`}>
        <tr className="tf-table__empty-row"><td colSpan={visibleColumns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)} className="tf-table__empty-cell"><div className="tf-table__empty-state"><span className="tf-table__empty-icon">&#128451;</span><span className="tf-table__empty-message">{emptyMessage}</span></div></td></tr>
      </tbody>
    );
  }

  return (
    <tbody id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table__body tf-table__body--density-${density} tf-table__body--variant-${variant}`}>
      {data.map((row, index) => {
        const key = String(row[rowKey as keyof T] ?? index);
        const isExpanded = expandedRowKeys.includes(key);
        const isSelected = selection?.selectedIds.includes(key);
        return (
          <React.Fragment key={key}>
            <tr className={`tf-table__row ${isSelected ? 'tf-table__row--selected' : ''} ${index % 2 === 1 && striped ? 'tf-table__row--alt' : ''} ${onRowClick ? 'tf-table__row--clickable' : ''}`} onClick={() => !disabled && onRowClick?.(row)} role="row" aria-selected={isSelected} data-row-key={key}>
              {selectable && <td className="tf-table__cell tf-table__cell--selection" role="gridcell"><input type="checkbox" className="tf-table__row-checkbox" checked={isSelected} onChange={() => onRowSelect?.(row, !isSelected)} disabled={disabled} aria-label={`Select row ${key}`} /></td>}
              {expandable && <td className="tf-table__cell tf-table__cell--expand" role="gridcell"><button className="tf-table__expand-btn" onClick={() => onExpandToggle?.(key)} aria-expanded={isExpanded} aria-label={isExpanded ? 'Collapse' : 'Expand'}>{isExpanded ? '▼' : '▶'}</button></td>}
              {visibleColumns.map((col) => <td key={col.key} className={`tf-table__cell tf-table__cell--${col.type || 'text'} tf-table__cell--align-${col.align || 'left'}`} role="gridcell">{col.formatter ? col.formatter(row[col.key as keyof T], row) : String(row[col.key as keyof T] ?? '')}</td>)}
              {rowActions && rowActions.length > 0 && <td className="tf-table__cell tf-table__cell--actions" role="gridcell"><div className="tf-table__row-actions">{rowActions.map((action) => <button key={action.id} className={`tf-table__action-btn tf-table__action-btn--${action.variant || 'neutral'}`} onClick={() => action.onAction(row)} disabled={action.disabled} title={action.disabled ? action.disabledReason : action.label}>{action.label}</button>)}</div></td>}
            </tr>
            {isExpanded && <tr className="tf-table__detail-row"><td colSpan={visibleColumns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)} className="tf-table__detail-cell"><div className="tf-table__detail-panel">Detail panel</div></td></tr>}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

DenseTableBody.displayName = 'DenseTableBody';
export default DenseTableBody;
