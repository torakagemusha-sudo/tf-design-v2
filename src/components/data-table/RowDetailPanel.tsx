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

export interface RowDetailPanelProps<T = unknown> extends TorafirmaComponentBaseProps {
  row: T;
  fields?: { key: string; label: string; type?: string }[];
  children?: React.ReactNode;
  density?: TableDensity;
}

const RowDetailPanel = <T extends Record<string, unknown>>({
  id,
  testId,
  row,
  fields,
  children,
  density = 'compact',
  state = 'idle',
  traceId,
}: RowDetailPanelProps<T>) => {
  const displayFields = React.useMemo(() => {
    if (fields) return fields;
    return Object.keys(row).map((k) => ({ key: k, label: k, type: 'text' }));
  }, [fields, row]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-row-detail-panel tf-row-detail-panel--density-${density}`}>
      {children || (
        <div className="tf-row-detail-panel__fields">
          {displayFields.map((field) => (
            <div key={field.key} className="tf-row-detail-panel__field">
              <label className="tf-row-detail-panel__field-label">{field.label}</label>
              <span className={`tf-row-detail-panel__field-value tf-row-detail-panel__field-value--${field.type || 'text'}`}>
                {row[field.key] === null || row[field.key] === undefined ? <em className="tf-row-detail-panel__null">&mdash;</em> : String(row[field.key])}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

RowDetailPanel.displayName = 'RowDetailPanel';
export default RowDetailPanel;
