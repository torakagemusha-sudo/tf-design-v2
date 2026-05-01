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

export interface ColumnReorderHandleProps extends TorafirmaComponentBaseProps {
  columnKey: string;
  columnLabel?: string;
  onReorder?: (dragKey: string, dropKey: string) => void;
}

const ColumnReorderHandle: React.FC<ColumnReorderHandleProps> = ({
  id,
  testId,
  columnKey,
  columnLabel,
  onReorder,
  state = 'idle',
  traceId,
}) => {
  const [dragging, setDragging] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);

  const handleDragStart = React.useCallback((e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', columnKey);
    setDragging(true);
  }, [columnKey]);

  const handleDragEnd = React.useCallback(() => {
    setDragging(false);
  }, []);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = React.useCallback(() => {
    setDragOver(false);
  }, []);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dragKey = e.dataTransfer.getData('text/plain');
    setDragOver(false);
    if (dragKey && dragKey !== columnKey) onReorder?.(dragKey, columnKey);
  }, [columnKey, onReorder]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} draggable className={`tf-column-reorder-handle ${dragging ? 'tf-column-reorder-handle--dragging' : ''} ${dragOver ? 'tf-column-reorder-handle--over' : ''}`} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} title={`Drag to reorder ${columnLabel || columnKey}`} role="button" aria-label={`Reorder ${columnLabel || columnKey}`}>
      <span className="tf-column-reorder-handle__grip">&#8801;</span>
    </div>
  );
};

ColumnReorderHandle.displayName = 'ColumnReorderHandle';
export default ColumnReorderHandle;
