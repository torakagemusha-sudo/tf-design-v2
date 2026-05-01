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

export interface DatasetPanelProps extends TorafirmaComponentBaseProps {
  datasetName: string;
  recordCount: number;
  schema?: { name: string; type: string; nullable?: boolean; description?: string }[];
  stats?: DatasetStatistic[];
  sampleData?: Record<string, unknown>[];
  validation?: ValidationResult;
  lastUpdated?: string;
  sourceSystem?: string;
  owner?: string;
  density?: TableDensity;
  children?: React.ReactNode;
  onRefresh?: () => void;
  onExport?: () => void;
  onValidate?: () => void;
}

/**
 * Dataset overview panel displaying record statistics, schema,
 * validation status, and data provenance metadata.
 */
const DatasetPanel: React.FC<DatasetPanelProps> = ({
  id,
  testId,
  datasetName,
  recordCount,
  schema = [],
  stats = [],
  sampleData = [],
  validation,
  lastUpdated,
  sourceSystem,
  owner,
  density = 'compact',
  children,
  onRefresh,
  onExport,
  onValidate,
  state = 'idle',
  authority,
  traceId,
  disabled,
}) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-dataset-panel tf-dataset-panel--density-${density} tf-dataset-panel--state-${state}`}>
      <header className="tf-dataset-panel__header">
        <div className="tf-dataset-panel__identity">
          <h2 className="tf-dataset-panel__name">{datasetName}</h2>
          <span className="tf-dataset-panel__record-count">{recordCount.toLocaleString()} records</span>
          {validation && <span className={`tf-dataset-panel__validation-badge tf-dataset-panel__validation-badge--${validation.status}`}>{validation.status}</span>}
        </div>
        <div className="tf-dataset-panel__meta">
          {sourceSystem && <span className="tf-dataset-panel__source">Source: {sourceSystem}</span>}
          {owner && <span className="tf-dataset-panel__owner">Owner: {owner}</span>}
          {lastUpdated && <span className="tf-dataset-panel__updated">Updated: {lastUpdated}</span>}
        </div>
        <div className="tf-dataset-panel__actions">
          {onRefresh && <button className="tf-dataset-panel__action-btn tf-dataset-panel__action-btn--refresh" onClick={onRefresh} disabled={disabled}>Refresh</button>}
          {onExport && <button className="tf-dataset-panel__action-btn tf-dataset-panel__action-btn--export" onClick={onExport} disabled={disabled}>Export</button>}
          {onValidate && <button className="tf-dataset-panel__action-btn tf-dataset-panel__action-btn--validate" onClick={onValidate} disabled={disabled}>Validate</button>}
        </div>
      </header>
      <div className="tf-dataset-panel__body">
        {children}
      </div>
    </div>
  );
};

DatasetPanel.displayName = 'DatasetPanel';
export default DatasetPanel;
