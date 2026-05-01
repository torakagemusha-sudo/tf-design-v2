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

export interface DataProvenanceCellProps extends TorafirmaComponentBaseProps {
  provenanceChain: { system: string; timestamp: string; transformation?: string }[];
  onViewChain?: () => void;
}

const DataProvenanceCell: React.FC<DataProvenanceCellProps> = ({
  id,
  testId,
  provenanceChain = [],
  onViewChain,
  state = 'idle',
  traceId,
}) => {
  const first = provenanceChain[0];
  const last = provenanceChain[provenanceChain.length - 1];
  return (
    <span id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className="tf-data-provenance-cell">
      {first && <span className="tf-data-provenance-cell__origin" title={`Origin: ${first.system} @ ${first.timestamp}`}>&#x25CF; {first.system}</span>}
      {provenanceChain.length > 1 && (
        <span className="tf-data-provenance-cell__chain">&rarr; {provenanceChain.length - 1} step{provenanceChain.length > 2 ? 's' : ''} &rarr;</span>
      )}
      {last && <span className="tf-data-provenance-cell__current" title={`Current: ${last.system}`}>{last.system}</span>}
      {onViewChain && <button className="tf-data-provenance-cell__view-btn" onClick={onViewChain}>Chain</button>}
    </span>
  );
};

DataProvenanceCell.displayName = 'DataProvenanceCell';
export default DataProvenanceCell;
