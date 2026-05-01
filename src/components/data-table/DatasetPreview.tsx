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

export interface DatasetPreviewProps extends TorafirmaComponentBaseProps {
  columns: { key: string; label: string; type?: string }[];
  data: Record<string, unknown>[];
  maxRows?: number;
  density?: TableDensity;
  onRowClick?: (row: Record<string, unknown>, index: number) => void;
  onCellClick?: (value: unknown, column: string, rowIndex: number) => void;
}

const DatasetPreview: React.FC<DatasetPreviewProps> = ({
  id,
  testId,
  columns,
  data,
  maxRows = 10,
  density = 'compact',
  onRowClick,
  onCellClick,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const previewData = React.useMemo(() => data.slice(0, maxRows), [data, maxRows]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-dataset-preview tf-dataset-preview--density-${density}`}>
      <table className="tf-dataset-preview__table" role="grid">
        <thead className="tf-dataset-preview__head">
          <tr className="tf-dataset-preview__header-row">
            {columns.map((col) => <th key={col.key} className="tf-dataset-preview__header-cell" scope="col">{col.label}</th>)}
          </tr>
        </thead>
        <tbody className="tf-dataset-preview__body">
          {previewData.map((row, rowIndex) => (
            <tr key={rowIndex} className={`tf-dataset-preview__row ${onRowClick ? 'tf-dataset-preview__row--clickable' : ''}`} onClick={() => onRowClick?.(row, rowIndex)}>
              {columns.map((col) => (
                <td key={col.key} className={`tf-dataset-preview__cell tf-dataset-preview__cell--${col.type || 'text'}`} onClick={() => onCellClick?.(row[col.key], col.key, rowIndex)}>
                  {row[col.key] === null || row[col.key] === undefined ? <em className="tf-dataset-preview__null">&mdash;</em> : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > maxRows && (
        <div className="tf-dataset-preview__truncated">
          <span className="tf-dataset-preview__truncated-label">Showing {maxRows} of {data.length} rows</span>
        </div>
      )}
    </div>
  );
};

DatasetPreview.displayName = 'DatasetPreview';
export default DatasetPreview;
