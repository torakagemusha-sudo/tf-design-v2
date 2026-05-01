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

export interface GroupedTableFooterProps extends TorafirmaComponentBaseProps {
  groupValue: unknown;
  rowCount: number;
  aggregates?: Record<string, { sum?: number; avg?: number; min?: number; max?: number; count?: number }>;
  columns?: { key: string; label: string }[];
  density?: TableDensity;
}

const GroupedTableFooter: React.FC<GroupedTableFooterProps> = ({
  id,
  testId,
  groupValue,
  rowCount,
  aggregates = {},
  columns = [],
  density = 'compact',
  state = 'idle',
  traceId,
}) => {
  return (
    <tr id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-grouped-table-footer tf-grouped-table-footer--density-${density}`}>
      <td className="tf-grouped-table-footer__cell tf-grouped-table-footer__cell--label" colSpan={columns.length > 0 ? 1 : 1000}>
        <span className="tf-grouped-table-footer__label">{String(groupValue)} total</span>
        <span className="tf-grouped-table-footer__count">({rowCount})</span>
      </td>
      {columns.map((col) => {
        const agg = aggregates[col.key];
        return agg ? (
          <td key={col.key} className="tf-grouped-table-footer__cell tf-grouped-table-footer__cell--aggregate">
            {agg.sum !== undefined && <span className="tf-grouped-table-footer__agg tf-grouped-table-footer__agg--sum">&Sigma; {agg.sum}</span>}
            {agg.avg !== undefined && <span className="tf-grouped-table-footer__agg tf-grouped-table-footer__agg--avg">&mu; {agg.avg.toFixed(2)}</span>}
          </td>
        ) : <td key={col.key} className="tf-grouped-table-footer__cell" />;
      })}
    </tr>
  );
};

GroupedTableFooter.displayName = 'GroupedTableFooter';
export default GroupedTableFooter;
