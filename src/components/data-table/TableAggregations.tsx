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

export interface TableAggregationsProps extends TorafirmaComponentBaseProps {
  fields: { key: string; label: string }[];
  activeAggregations: { field: string; type: 'sum' | 'avg' | 'min' | 'max' | 'count' }[];
  density?: TableDensity;
  onAggregationAdd?: (field: string, type: 'sum' | 'avg' | 'min' | 'max' | 'count') => void;
  onAggregationRemove?: (field: string) => void;
}

const TableAggregations: React.FC<TableAggregationsProps> = ({
  id,
  testId,
  fields,
  activeAggregations,
  density = 'compact',
  onAggregationAdd,
  onAggregationRemove,
  state = 'idle',
  traceId,
}) => {
  const types: ('sum' | 'avg' | 'min' | 'max' | 'count')[] = ['sum', 'avg', 'min', 'max', 'count'];
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table-aggregations tf-table-aggregations--density-${density}`}>
      <span className="tf-table-aggregations__label">Aggregations:</span>
      {activeAggregations.map((agg) => (
        <span key={agg.field} className="tf-table-aggregations__chip">
          <span className="tf-table-aggregations__field">{fields.find((f) => f.key === agg.field)?.label || agg.field}</span>
          <span className="tf-table-aggregations__type">{agg.type}</span>
          <button className="tf-table-aggregations__remove" onClick={() => onAggregationRemove?.(agg.field)} aria-label={`Remove ${agg.field} aggregation`}>&#x2715;</button>
        </span>
      ))}
      <select className="tf-table-aggregations__add" onChange={(e) => { const [field, type] = e.target.value.split(':'); if (field && type) onAggregationAdd?.(field, type as 'sum'); e.target.value = ''; }} defaultValue="">
        <option value="">+ Add</option>
        {fields.flatMap((f) => types.map((t) => (
          <option key={`${f.key}:${t}`} value={`${f.key}:${t}`}>{f.label} ({t})</option>
        )))}
      </select>
    </div>
  );
};

TableAggregations.displayName = 'TableAggregations';
export default TableAggregations;
