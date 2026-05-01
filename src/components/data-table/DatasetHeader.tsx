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

export interface DatasetHeaderProps extends TorafirmaComponentBaseProps {
  datasetName: string;
  recordCount: number;
  validation?: ValidationResult;
  lastUpdated?: string;
  sourceSystem?: string;
  owner?: string;
  authorityLevel?: AuthorityLevel;
  density?: TableDensity;
  actions?: { id: string; label: string; variant?: TableVariant; onAction: () => void }[];
  onAction?: (actionId: string) => void;
}

const DatasetHeader: React.FC<DatasetHeaderProps> = ({
  id,
  testId,
  datasetName,
  recordCount,
  validation,
  lastUpdated,
  sourceSystem,
  owner,
  authorityLevel,
  density = 'compact',
  actions = [],
  onAction,
  state = 'idle',
  traceId,
  disabled,
}) => {
  return (
    <header id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-dataset-header tf-dataset-header--density-${density}`}>
      <div className="tf-dataset-header__identity">
        <h2 className="tf-dataset-header__name">{datasetName}</h2>
        <span className="tf-dataset-header__count">{recordCount.toLocaleString()} records</span>
        {validation && <span className={`tf-dataset-header__validation tf-dataset-header__validation--${validation.status}`}>{validation.status}</span>}
      </div>
      <div className="tf-dataset-header__metadata">
        {sourceSystem && <span className="tf-dataset-header__meta-item">Source: {sourceSystem}</span>}
        {owner && <span className="tf-dataset-header__meta-item">Owner: {owner}</span>}
        {lastUpdated && <span className="tf-dataset-header__meta-item">Updated: {lastUpdated}</span>}
        {authorityLevel && <span className="tf-dataset-header__authority">{authorityLevel}</span>}
      </div>
      {actions.length > 0 && (
        <div className="tf-dataset-header__actions">
          {actions.map((action) => (
            <button key={action.id} className={`tf-dataset-header__action-btn tf-dataset-header__action-btn--${action.variant || 'neutral'}`} onClick={() => onAction?.(action.id) ?? action.onAction()} disabled={disabled}>{action.label}</button>
          ))}
        </div>
      )}
    </header>
  );
};

DatasetHeader.displayName = 'DatasetHeader';
export default DatasetHeader;
