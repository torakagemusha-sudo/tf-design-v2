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

export interface DatasetStatsProps extends TorafirmaComponentBaseProps {
  stats: DatasetStatistic[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  density?: TableDensity;
  variant?: TableVariant;
}

const DatasetStats: React.FC<DatasetStatsProps> = ({
  id,
  testId,
  stats,
  layout = 'horizontal',
  density = 'compact',
  variant = 'neutral',
  state = 'idle',
  traceId,
}) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-dataset-stats tf-dataset-stats--layout-${layout} tf-dataset-stats--density-${density} tf-dataset-stats--variant-${variant}`}>
      {stats.map((stat, index) => (
        <div key={index} className={`tf-dataset-stats__item tf-dataset-stats__item--${stat.state || 'idle'}`}>
          <span className="tf-dataset-stats__label">{stat.label}</span>
          <span className="tf-dataset-stats__value">{stat.value}</span>
          {stat.delta !== undefined && (
            <span className={`tf-dataset-stats__delta ${stat.delta > 0 ? 'tf-dataset-stats__delta--positive' : stat.delta < 0 ? 'tf-dataset-stats__delta--negative' : ''}`}>
              {stat.delta > 0 ? '+' : ''}{stat.delta}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

DatasetStats.displayName = 'DatasetStats';
export default DatasetStats;
