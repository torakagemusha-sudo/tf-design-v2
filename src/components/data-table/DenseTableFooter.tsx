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
 * Table footer row for displaying totals, summaries, and metadata.
 *
 * @since 1.0.0
 */

export interface DenseTableFooterProps<T = unknown> extends TorafirmaComponentBaseProps {
  columns: TableColumn<T>[];
  summary?: Record<string, unknown>;
  selectable?: boolean;
  expandable?: boolean;
  hasRowActions?: boolean;
  density?: TableDensity;
  variant?: TableVariant;
  footerContent?: React.ReactNode;
}

const DenseTableFooter: React.FC<DenseTableFooterProps> = ({
  id,
  testId,
  columns,
  summary,
  selectable = false,
  expandable = false,
  hasRowActions = false,
  density = 'compact',
  variant = 'neutral',
  footerContent,
  state = 'idle',
  traceId,
}) => {
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);
  return (
    <tfoot id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table__foot tf-table__foot--density-${density} tf-table__foot--variant-${variant}`}>
      <tr className="tf-table__footer-row">
        {selectable && <td className="tf-table__cell tf-table__cell--selection" />}
        {expandable && <td className="tf-table__cell tf-table__cell--expand" />}
        {visibleColumns.map((col) => (
          <td key={col.key} className={`tf-table__cell tf-table__cell--${col.type || 'text'} tf-table__cell--footer`}>
            {summary?.[col.key] !== undefined ? String(summary[col.key]) : ''}
          </td>
        ))}
        {hasRowActions && <td className="tf-table__cell tf-table__cell--actions tf-table__cell--footer">{footerContent}</td>}
      </tr>
    </tfoot>
  );
};

DenseTableFooter.displayName = 'DenseTableFooter';
export default DenseTableFooter;
