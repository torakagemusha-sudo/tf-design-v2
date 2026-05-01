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

export interface TableColumnChooserProps extends TorafirmaComponentBaseProps {
  columns: { key: string; label: string; type?: string; hidden?: boolean; required?: boolean; order?: number; description?: string }[];
  density?: TableDensity;
  open?: boolean;
  onVisibilityChange?: (key: string, visible: boolean) => void;
  onOrderChange?: (key: string, direction: 'up' | 'down') => void;
  onClose?: () => void;
  onApply?: (columns: TableColumnChooserProps['columns']) => void;
}

const TableColumnChooser: React.FC<TableColumnChooserProps> = ({
  id,
  testId,
  columns,
  density = 'compact',
  open = false,
  onVisibilityChange,
  onOrderChange,
  onClose,
  onApply,
  state = 'idle',
  traceId,
}) => {
  if (!open) return null;
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table-column-chooser tf-table-column-chooser--density-${density}`} role="dialog" aria-label="Column chooser">
      <div className="tf-table-column-chooser__header">
        <h3 className="tf-table-column-chooser__title">Choose Columns</h3>
        {onClose && <button className="tf-table-column-chooser__close" onClick={onClose} aria-label="Close">&#x2715;</button>}
      </div>
      <div className="tf-table-column-chooser__body">
        {columns.map((col) => (
          <div key={col.key} className={`tf-table-column-chooser__item ${col.hidden ? 'tf-table-column-chooser__item--hidden' : ''}`}>
            <label className="tf-table-column-chooser__label">
              <input type="checkbox" className="tf-table-column-chooser__checkbox" checked={!col.hidden} onChange={(e) => onVisibilityChange?.(col.key, e.target.checked)} disabled={col.required} />
              <span className="tf-table-column-chooser__name">{col.label}</span>
            </label>
            <div className="tf-table-column-chooser__reorder">
              <button className="tf-table-column-chooser__move-up" onClick={() => onOrderChange?.(col.key, 'up')} aria-label={`Move ${col.label} up`}>&#9650;</button>
              <button className="tf-table-column-chooser__move-down" onClick={() => onOrderChange?.(col.key, 'down')} aria-label={`Move ${col.label} down`}>&#9660;</button>
            </div>
          </div>
        ))}
      </div>
      {onApply && (
        <div className="tf-table-column-chooser__footer">
          <button className="tf-table-column-chooser__apply" onClick={() => onApply(columns)}>Apply</button>
        </div>
      )}
    </div>
  );
};

TableColumnChooser.displayName = 'TableColumnChooser';
export default TableColumnChooser;
