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

export interface DataGridExportPanelProps extends TorafirmaComponentBaseProps {
  formats?: { value: string; label: string }[];
  density?: TableDensity;
  onExport?: (format: string, options: { includeHeaders?: boolean; selectedOnly?: boolean }) => void;
}

const DataGridExportPanel: React.FC<DataGridExportPanelProps> = ({
  id,
  testId,
  formats = [{ value: 'csv', label: 'CSV' }, { value: 'xlsx', label: 'Excel' }, { value: 'json', label: 'JSON' }],
  density = 'compact',
  onExport,
  state = 'idle',
  traceId,
}) => {
  const [includeHeaders, setIncludeHeaders] = React.useState(true);
  const [selectedOnly, setSelectedOnly] = React.useState(false);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-data-grid-export-panel tf-data-grid-export-panel--density-${density}`}>
      <div className="tf-data-grid-export-panel__options">
        <label className="tf-data-grid-export-panel__option">
          <input type="checkbox" checked={includeHeaders} onChange={(e) => setIncludeHeaders(e.target.checked)} /> Include headers
        </label>
        <label className="tf-data-grid-export-panel__option">
          <input type="checkbox" checked={selectedOnly} onChange={(e) => setSelectedOnly(e.target.checked)} /> Selected rows only
        </label>
      </div>
      <div className="tf-data-grid-export-panel__formats">
        {formats.map((fmt) => (
          <button key={fmt.value} className="tf-data-grid-export-panel__format-btn" onClick={() => onExport?.(fmt.value, { includeHeaders, selectedOnly })}>
            {fmt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

DataGridExportPanel.displayName = 'DataGridExportPanel';
export default DataGridExportPanel;
