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
 * Pagination controls for navigating through paginated table data with state and authority awareness.
 *
 * @since 1.0.0
 */

export interface TablePaginationProps extends TorafirmaComponentBaseProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showTotal?: boolean;
  density?: TableDensity;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  id,
  testId,
  page,
  pageSize,
  total,
  totalPages,
  pageSizeOptions = [10, 25, 50, 100],
  showPageSizeSelector = true,
  showTotal = true,
  density = 'compact',
  onPageChange,
  onPageSizeChange,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-pagination tf-pagination--density-${density} ${disabled ? 'tf-pagination--disabled' : ''}`} role="navigation" aria-label="Table pagination">
      {showTotal && <span className="tf-pagination__total">{start}&ndash;{end} of {total}</span>}
      <div className="tf-pagination__controls">
        <button className="tf-pagination__btn tf-pagination__btn--first" onClick={() => onPageChange?.(1)} disabled={!canPrev || disabled} aria-label="First page">&#x23EE;</button>
        <button className="tf-pagination__btn tf-pagination__btn--prev" onClick={() => onPageChange?.(page - 1)} disabled={!canPrev || disabled} aria-label="Previous page">&#x25C0;</button>
        <span className="tf-pagination__page-indicator">Page {page} of {totalPages}</span>
        <button className="tf-pagination__btn tf-pagination__btn--next" onClick={() => onPageChange?.(page + 1)} disabled={!canNext || disabled} aria-label="Next page">&#x25B6;</button>
        <button className="tf-pagination__btn tf-pagination__btn--last" onClick={() => onPageChange?.(totalPages)} disabled={!canNext || disabled} aria-label="Last page">&#x23ED;</button>
      </div>
      {showPageSizeSelector && (
        <div className="tf-pagination__page-size">
          <label htmlFor={`${id || 'tf'}-page-size`} className="tf-pagination__page-size-label">Rows:</label>
          <select id={`${id || 'tf'}-page-size`} className="tf-pagination__page-size-select" value={pageSize} onChange={(e) => onPageSizeChange?.(Number(e.target.value))} disabled={disabled}>
            {pageSizeOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      )}
    </div>
  );
};

TablePagination.displayName = 'TablePagination';
export default TablePagination;
