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

export interface TableSkeletonProps extends TorafirmaComponentBaseProps {
  rows?: number;
  columns?: number;
  density?: TableDensity;
  showHeader?: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  id,
  testId,
  rows = 5,
  columns = 4,
  density = 'compact',
  showHeader = true,
  state = 'idle',
  traceId,
}) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table-skeleton tf-table-skeleton--density-${density}`} aria-busy="true" aria-live="polite">
      <table className="tf-table-skeleton__table">
        {showHeader && (
          <thead className="tf-table-skeleton__head">
            <tr className="tf-table-skeleton__header-row">
              {Array.from({ length: columns }, (_, i) => (
                <th key={i} className="tf-table-skeleton__header-cell" scope="col"><span className="tf-table-skeleton__shimmer" style={{ width: `${40 + Math.random() * 40}%` }} /></th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="tf-table-skeleton__body">
          {Array.from({ length: rows }, (_, r) => (
            <tr key={r} className="tf-table-skeleton__row">
              {Array.from({ length: columns }, (_, c) => (
                <td key={c} className="tf-table-skeleton__cell"><span className="tf-table-skeleton__shimmer" style={{ width: `${30 + Math.random() * 50}%` }} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableSkeleton.displayName = 'TableSkeleton';
export default TableSkeleton;
