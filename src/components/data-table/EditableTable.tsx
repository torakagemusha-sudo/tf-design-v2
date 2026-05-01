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

export interface EditableTableProps<T = unknown> extends TorafirmaComponentBaseProps {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: string;
  density?: TableDensity;
  onRowUpdate?: (row: T, key: string, value: unknown) => void;
  onRowCommit?: (row: T) => void;
  onRowRevert?: (row: T) => void;
  dirtyRows?: Set<string>;
  validationErrors?: Record<string, Record<string, ValidationResult>>;
}

/**
 * Inline-editable table allowing cell-level data modification.
 * Tracks dirty state, validates inputs, and commits changes with authority checks.
 */
const EditableTable = <T extends Record<string, unknown>>({
  id,
  testId,
  columns,
  data,
  rowKey = 'id',
  density = 'compact',
  onRowUpdate,
  onRowCommit,
  onRowRevert,
  dirtyRows = new Set(),
  validationErrors = {},
  state = 'idle',
  traceId,
  authority,
  disabled,
}: EditableTableProps<T>) => {
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-editable-table tf-editable-table--density-${density} tf-editable-table--state-${state}`}>
      <table className="tf-editable-table__table" role="grid">
        <thead className="tf-editable-table__head">
          <tr className="tf-editable-table__header-row">
            {visibleColumns.map((col) => <th key={col.key} className="tf-editable-table__header-cell" scope="col">{col.label}</th>)}
            <th className="tf-editable-table__header-cell tf-editable-table__header-cell--actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="tf-editable-table__body">
          {data.map((row) => {
            const key = String(row[rowKey as keyof T]);
            const isDirty = dirtyRows.has(key);
            const rowErrors = validationErrors[key];
            return (
              <tr key={key} className={`tf-editable-table__row ${isDirty ? 'tf-editable-table__row--dirty' : ''} ${rowErrors ? 'tf-editable-table__row--invalid' : ''}`} data-row-key={key}>
                {visibleColumns.map((col) => {
                  const error = rowErrors?.[col.key];
                  return (
                    <td key={col.key} className={`tf-editable-table__cell tf-editable-table__cell--${col.type || 'text'} ${error ? `tf-editable-table__cell--${error.status}` : ''}`} role="gridcell">
                      <input
                        type={col.type === 'number' ? 'number' : 'text'}
                        className="tf-editable-table__input"
                        defaultValue={String(row[col.key as keyof T] ?? '')}
                        onBlur={(e) => onRowUpdate?.(row, col.key, e.target.value)}
                        disabled={disabled}
                        aria-invalid={!!error}
                      />
                      {error && <span className="tf-editable-table__cell-error" title={error.message}>&#9888;</span>}
                    </td>
                  );
                })}
                <td className="tf-editable-table__cell tf-editable-table__cell--actions" role="gridcell">
                  {isDirty && (
                    <>
                      <button className="tf-editable-table__commit-btn" onClick={() => onRowCommit?.(row)} disabled={disabled || !!rowErrors}>Commit</button>
                      <button className="tf-editable-table__revert-btn" onClick={() => onRowRevert?.(row)} disabled={disabled}>Revert</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

EditableTable.displayName = 'EditableTable';
export default EditableTable;
