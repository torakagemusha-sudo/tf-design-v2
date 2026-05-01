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

export interface GroupedTableRowProps<T = unknown> extends TorafirmaComponentBaseProps {
  row: T;
  columns: TableColumn<T>[];
  index?: number;
  groupLevel?: number;
  striped?: boolean;
  onClick?: (row: T) => void;
}

const GroupedTableRow = <T extends Record<string, unknown>>({
  row,
  columns,
  index = 0,
  groupLevel = 1,
  striped = true,
  onClick,
  id,
  testId,
  state = 'idle',
  traceId,
  disabled,
}: GroupedTableRowProps<T>) => {
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);
  return (
    <tr id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-grouped-table-row ${index % 2 === 1 && striped ? 'tf-grouped-table-row--alt' : ''} ${onClick ? 'tf-grouped-table-row--clickable' : ''}`} onClick={() => !disabled && onClick?.(row)} data-group-level={groupLevel} role="row">
      <td className="tf-grouped-table-row__indent" style={{ paddingLeft: `${groupLevel * 16}px` }} />
      {visibleColumns.map((col) => (
        <td key={col.key} className={`tf-grouped-table-row__cell tf-grouped-table-row__cell--${col.type || 'text'}`} role="gridcell">
          {col.formatter ? col.formatter(row[col.key as keyof T], row) : String(row[col.key as keyof T] ?? '')}
        </td>
      ))}
    </tr>
  );
};

GroupedTableRow.displayName = 'GroupedTableRow';
export default GroupedTableRow;
