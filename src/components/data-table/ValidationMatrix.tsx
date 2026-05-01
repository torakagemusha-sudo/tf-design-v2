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

export interface ValidationMatrixProps extends TorafirmaComponentBaseProps {
  rows: string[];
  columns: string[];
  results: Record<string, Record<string, ValidationCellData>>;
  summary?: { total: number; valid: number; warning: number; blocked: number; faulted: number; unchecked: number };
  density?: TableDensity;
  onCellClick?: (row: string, column: string, data: ValidationCellData) => void;
  onRowClick?: (row: string) => void;
  onColumnClick?: (column: string) => void;
}

/**
 * Validation results matrix showing cross-dimensional validation status.
 * Displays row/column intersection with color-coded status cells.
 */
const ValidationMatrix: React.FC<ValidationMatrixProps> = ({
  id,
  testId,
  rows,
  columns,
  results,
  summary,
  density = 'compact',
  onCellClick,
  onRowClick,
  onColumnClick,
  state = 'idle',
  traceId,
  disabled,
}) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-validation-matrix tf-validation-matrix--density-${density} tf-validation-matrix--state-${state}`}>
      {summary && (
        <div className="tf-validation-matrix__summary">
          <span className="tf-validation-matrix__summary-item tf-validation-matrix__summary-item--total">Total: {summary.total}</span>
          <span className="tf-validation-matrix__summary-item tf-validation-matrix__summary-item--valid">Valid: {summary.valid}</span>
          <span className="tf-validation-matrix__summary-item tf-validation-matrix__summary-item--warning">Warning: {summary.warning}</span>
          <span className="tf-validation-matrix__summary-item tf-validation-matrix__summary-item--blocked">Blocked: {summary.blocked}</span>
          <span className="tf-validation-matrix__summary-item tf-validation-matrix__summary-item--faulted">Faulted: {summary.faulted}</span>
        </div>
      )}
      <div className="tf-validation-matrix__grid-container">
        <table className="tf-validation-matrix__grid" role="grid">
          <thead>
            <tr>
              <th className="tf-validation-matrix__corner-cell" scope="col">&nbsp;</th>
              {columns.map((col) => (
                <th key={col} className="tf-validation-matrix__column-header" scope="col" onClick={() => onColumnClick?.(col)}>
                  <span className="tf-validation-matrix__column-label">{col}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row} className="tf-validation-matrix__row">
                <th className="tf-validation-matrix__row-header" scope="row" onClick={() => onRowClick?.(row)}>{row}</th>
                {columns.map((col) => {
                  const cell = results[row]?.[col];
                  return (
                    <td key={col} className={`tf-validation-matrix__cell tf-validation-matrix__cell--${cell?.status || 'unchecked'} ${cell?.status === 'faulted' || cell?.status === 'blocked' ? 'tf-validation-matrix__cell--issue' : ''}`} onClick={() => cell && onCellClick?.(row, col, cell)} role="gridcell" title={cell?.message || ''}>
                      <span className="tf-validation-matrix__cell-indicator" />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ValidationMatrix.displayName = 'ValidationMatrix';
export default ValidationMatrix;
