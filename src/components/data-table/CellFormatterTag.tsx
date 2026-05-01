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

export interface CellFormatterTagProps extends TorafirmaComponentBaseProps {
  tags?: string[] | null;
  variantMap?: Record<string, TableVariant>;
  maxVisible?: number;
  density?: TableDensity;
  onTagClick?: (tag: string) => void;
}

const CellFormatterTag: React.FC<CellFormatterTagProps> = ({
  id,
  testId,
  tags = [],
  variantMap = {},
  maxVisible = 3,
  density = 'compact',
  onTagClick,
  state = 'idle',
  traceId,
}) => {
  if (!tags || tags.length === 0) return <span id={id} data-testid={testId} className="tf-cell-formatter-tag tf-cell-formatter-tag--null">&mdash;</span>;
  const visible = tags.slice(0, maxVisible);
  const remaining = tags.length - maxVisible;
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-cell-formatter-tag tf-cell-formatter-tag--density-${density}`}>
      {visible.map((tag) => (
        <span key={tag} className={`tf-cell-formatter-tag__item tf-cell-formatter-tag__item--${variantMap[tag] || 'neutral'} ${onTagClick ? 'tf-cell-formatter-tag__item--clickable' : ''}`} onClick={() => onTagClick?.(tag)}>
          {tag}
        </span>
      ))}
      {remaining > 0 && <span className="tf-cell-formatter-tag__more" title={tags.slice(maxVisible).join(', ')}>+{remaining}</span>}
    </div>
  );
};

CellFormatterTag.displayName = 'CellFormatterTag';
export default CellFormatterTag;
