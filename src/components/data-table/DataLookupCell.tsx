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

export interface DataLookupCellProps extends TorafirmaComponentBaseProps {
  referenceId: string;
  referenceTable?: string;
  displayValue?: string;
  resolution?: 'resolved' | 'pending' | 'unresolved' | 'orphaned';
  onResolve?: (id: string) => void;
  onNavigate?: (id: string) => void;
}

const DataLookupCell: React.FC<DataLookupCellProps> = ({
  id,
  testId,
  referenceId,
  referenceTable,
  displayValue,
  resolution = 'resolved',
  onResolve,
  onNavigate,
  state = 'idle',
  traceId,
}) => {
  return (
    <span id={id} data-testid={testId} data-state={state} data-resolution={resolution} data-trace-id={traceId} className={`tf-data-lookup-cell tf-data-lookup-cell--${resolution}`}>
      <span className="tf-data-lookup-cell__status" title={resolution}>
        {resolution === 'resolved' ? '✓' : resolution === 'pending' ? '◯' : resolution === 'unresolved' ? '?' : '⚠'}
      </span>
      {referenceTable && <span className="tf-data-lookup-cell__table">{referenceTable}</span>}
      {onNavigate ? (
        <button className="tf-data-lookup-cell__link" onClick={() => onNavigate(referenceId)}>{displayValue || referenceId}</button>
      ) : (
        <span className="tf-data-lookup-cell__value">{displayValue || referenceId}</span>
      )}
      {resolution === 'unresolved' && onResolve && <button className="tf-data-lookup-cell__resolve-btn" onClick={() => onResolve(referenceId)}>Resolve</button>}
    </span>
  );
};

DataLookupCell.displayName = 'DataLookupCell';
export default DataLookupCell;
