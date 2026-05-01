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
 * Page number navigator with direct page input and boundary controls.
 *
 * @since 1.0.0
 */

export interface TablePageNavigatorProps extends TorafirmaComponentBaseProps {
  page: number;
  totalPages: number;
  maxVisiblePages?: number;
  density?: TableDensity;
  onPageChange?: (page: number) => void;
}

const TablePageNavigator: React.FC<TablePageNavigatorProps> = ({
  id,
  testId,
  page,
  totalPages,
  maxVisiblePages = 7,
  density = 'compact',
  onPageChange,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const pages = React.useMemo(() => {
    const arr: (number | 'ellipsis')[] = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      const left = Math.max(2, page - 1);
      const right = Math.min(totalPages - 1, page + 1);
      if (left > 2) arr.push('ellipsis');
      for (let i = left; i <= right; i++) arr.push(i);
      if (right < totalPages - 1) arr.push('ellipsis');
      arr.push(totalPages);
    }
    return arr;
  }, [page, totalPages, maxVisiblePages]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-page-navigator tf-page-navigator--density-${density}`} role="navigation" aria-label="Page navigator">
      <button className="tf-page-navigator__btn tf-page-navigator__btn--prev" onClick={() => onPageChange?.(page - 1)} disabled={page <= 1 || disabled} aria-label="Previous page">&#x25C0;</button>
      {pages.map((p, i) => p === 'ellipsis' ? (
        <span key={`ellipsis-${i}`} className="tf-page-navigator__ellipsis">&hellip;</span>
      ) : (
        <button key={p} className={`tf-page-navigator__btn tf-page-navigator__btn--page ${p === page ? 'tf-page-navigator__btn--active' : ''}`} onClick={() => onPageChange?.(p)} disabled={disabled} aria-label={`Page ${p}`} aria-current={p === page ? 'page' : undefined}>{p}</button>
      ))}
      <button className="tf-page-navigator__btn tf-page-navigator__btn--next" onClick={() => onPageChange?.(page + 1)} disabled={page >= totalPages || disabled} aria-label="Next page">&#x25B6;</button>
    </div>
  );
};

TablePageNavigator.displayName = 'TablePageNavigator';
export default TablePageNavigator;
