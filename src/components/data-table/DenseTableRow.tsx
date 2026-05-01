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
 * Individual data row with selection, expansion, and authority-aware action rendering.
 *
 * @since 1.0.0
 */

export interface DenseTableRowProps<T = unknown> extends TorafirmaComponentBaseProps {
  row: T;
  columns: TableColumn<T>[];
  rowKey?: string;
  index?: number;
  selectable?: boolean;
  selected?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  rowActions?: TableRowAction<T>[];
  striped?: boolean;
  clickable?: boolean;
  density?: TableDensity;
  onSelect?: (selected: boolean) => void;
  onExpandToggle?: () => void;
  onClick?: () => void;
}

const DenseTableRow = <T extends Record<string, unknown>>({
  row,
  columns,
  index = 0,
  selectable = false,
  selected = false,
  expandable = false,
  expanded = false,
  rowActions,
  striped = true,
  clickable = false,
  density = 'compact',
  onSelect,
  onExpandToggle,
  onClick,
  id,
  testId,
  state = 'idle',
  traceId,
  disabled,
}: DenseTableRowProps<T>) => {
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);
  return (
    <tr id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table__row ${selected ? 'tf-table__row--selected' : ''} ${index % 2 === 1 && striped ? 'tf-table__row--alt' : ''} ${clickable ? 'tf-table__row--clickable' : ''}`} onClick={() => !disabled && onClick?.()} role="row" aria-selected={selected}>
      {selectable && <td className="tf-table__cell tf-table__cell--selection" role="gridcell"><input type="checkbox" className="tf-table__row-checkbox" checked={selected} onChange={() => onSelect?.(!selected)} disabled={disabled} aria-label="Select row" /></td>}
      {expandable && <td className="tf-table__cell tf-table__cell--expand" role="gridcell"><button className="tf-table__expand-btn" onClick={() => onExpandToggle?.()} aria-expanded={expanded}>{expanded ? '▼' : '▶'}</button></td>}
      {visibleColumns.map((col) => <td key={col.key} className={`tf-table__cell tf-table__cell--${col.type || 'text'} tf-table__cell--align-${col.align || 'left'}`} role="gridcell">{col.formatter ? col.formatter(row[col.key as keyof T], row) : String(row[col.key as keyof T] ?? '')}</td>)}
      {rowActions && rowActions.length > 0 && <td className="tf-table__cell tf-table__cell--actions" role="gridcell"><div className="tf-table__row-actions">{rowActions.map((action) => <button key={action.id} className={`tf-table__action-btn tf-table__action-btn--${action.variant || 'neutral'}`} onClick={() => action.onAction(row)} disabled={action.disabled} title={action.disabled ? action.disabledReason : action.label}>{action.label}</button>)}</div></td>}
    </tr>
  );
};

DenseTableRow.displayName = 'DenseTableRow';
export default DenseTableRow;
