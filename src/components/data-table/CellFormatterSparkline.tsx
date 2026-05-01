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

export interface CellFormatterSparklineProps extends TorafirmaComponentBaseProps {
  data?: number[] | null;
  width?: number;
  height?: number;
  variant?: 'neutral' | 'run' | 'danger' | 'warning' | 'stream';
  showDots?: boolean;
}

const CellFormatterSparkline: React.FC<CellFormatterSparklineProps> = ({
  id,
  testId,
  data = [],
  width = 60,
  height = 20,
  variant = 'neutral',
  showDots = false,
  state = 'idle',
  traceId,
}) => {
  if (!data || data.length === 0) return <span id={id} data-testid={testId} className="tf-cell-formatter-sparkline tf-cell-formatter-sparkline--null">&mdash;</span>;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1 || 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <span id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-cell-formatter-sparkline tf-cell-formatter-sparkline--${variant}`}>
      <svg className="tf-cell-formatter-sparkline__svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <polyline className="tf-cell-formatter-sparkline__line" points={points} fill="none" />
        {showDots && data.map((v, i) => <circle key={i} className="tf-cell-formatter-sparkline__dot" cx={(i / (data.length - 1 || 1)) * width} cy={height - ((v - min) / range) * height} r={1.5} />)}
      </svg>
    </span>
  );
};

CellFormatterSparkline.displayName = 'CellFormatterSparkline';
export default CellFormatterSparkline;
