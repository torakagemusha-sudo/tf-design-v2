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
 * Individual field display within a record inspector with validation and dirty state indicators.
 *
 * @since 1.0.0
 */

export interface RecordInspectorFieldProps extends TorafirmaComponentBaseProps {
  fieldKey: string;
  label: string;
  value: unknown;
  type?: string;
  validation?: ValidationResult;
  isDirty?: boolean;
  isComputed?: boolean;
  originalValue?: unknown;
  authority?: AuthorityLevel;
  editable?: boolean;
  onEdit?: (key: string, value: unknown) => void;
}

const RecordInspectorField: React.FC<RecordInspectorFieldProps> = ({
  id,
  testId,
  fieldKey,
  label,
  value,
  type = 'text',
  validation,
  isDirty = false,
  isComputed = false,
  originalValue,
  authority,
  editable = false,
  onEdit,
  state = 'idle',
  traceId,
}) => {
  return (
    <div id={id} data-testid={testId} data-field-key={fieldKey} data-state={state} data-trace-id={traceId} className={`tf-record-inspector-field ${isDirty ? 'tf-record-inspector-field--dirty' : ''} ${validation ? `tf-record-inspector-field--${validation.status}` : ''} ${isComputed ? 'tf-record-inspector-field--computed' : ''}`}>
      <label className="tf-record-inspector-field__label">{label}</label>
      <div className="tf-record-inspector-field__value-container">
        {isDirty && <span className="tf-record-inspector-field__dirty-marker" title={`Original: ${String(originalValue ?? '')}`}>&#9679;</span>}
        <span className={`tf-record-inspector-field__value tf-record-inspector-field__value--${type}`}>
          {value === null || value === undefined ? <em className="tf-record-inspector-field__null">&mdash;</em> : String(value)}
        </span>
        {isComputed && <span className="tf-record-inspector-field__computed-badge" title="Computed field">&#x03A3;</span>}
      </div>
      {validation && (
        <div className={`tf-record-inspector-field__validation tf-record-inspector-field__validation--${validation.status}`}>
          <span className="tf-record-inspector-field__validation-icon">
            {validation.status === 'valid' ? '✓' : validation.status === 'faulted' ? '✗' : '⚠'}
          </span>
          <span className="tf-record-inspector-field__validation-message">{validation.message}</span>
          {validation.requiredAction && <span className="tf-record-inspector-field__validation-action">{validation.requiredAction}</span>}
        </div>
      )}
    </div>
  );
};

RecordInspectorField.displayName = 'RecordInspectorField';
export default RecordInspectorField;
