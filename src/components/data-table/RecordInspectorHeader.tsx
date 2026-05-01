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
/**
 * Inspector panel header with record identification, type badge, and action controls.
 *
 * @since 1.0.0
 */

export interface RecordInspectorHeaderProps extends TorafirmaComponentBaseProps {
  title?: string;
  recordId: string;
  recordType?: string;
  recordState?: TorafirmaComponentState;
  actions?: { id: string; label: string; variant?: TableVariant; onAction: () => void; disabled?: boolean }[];
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}

const RecordInspectorHeader: React.FC<RecordInspectorHeaderProps> = ({
  id,
  testId,
  title = 'Record Inspector',
  recordId,
  recordType,
  recordState = 'idle',
  actions = [],
  onClose,
  onAction,
  state = 'idle',
  traceId,
  disabled,
}) => {
  return (
    <header id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-record-inspector-header tf-record-inspector-header--state-${recordState}`}>
      <div className="tf-record-inspector-header__identity">
        <h2 className="tf-record-inspector-header__title">{title}</h2>
        <span className="tf-record-inspector-header__record-id" title={recordId}>{recordId}</span>
        {recordType && <span className="tf-record-inspector-header__record-type">{recordType}</span>}
        <span className={`tf-record-inspector-header__state-badge tf-record-inspector-header__state-badge--${recordState}`}>{recordState}</span>
      </div>
      <div className="tf-record-inspector-header__actions">
        {actions.map((action) => (
          <button key={action.id} className={`tf-record-inspector-header__action-btn tf-record-inspector-header__action-btn--${action.variant || 'neutral'}`} onClick={() => onAction?.(action.id) ?? action.onAction()} disabled={action.disabled || disabled}>{action.label}</button>
        ))}
        {onClose && <button className="tf-record-inspector-header__close" onClick={onClose} aria-label="Close inspector">&#x2715;</button>}
      </div>
    </header>
  );
};

RecordInspectorHeader.displayName = 'RecordInspectorHeader';
export default RecordInspectorHeader;
