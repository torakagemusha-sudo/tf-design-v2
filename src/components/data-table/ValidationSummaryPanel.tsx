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

export interface ValidationSummaryPanelProps extends TorafirmaComponentBaseProps {
  total: number;
  valid: number;
  warning: number;
  blocked: number;
  faulted: number;
  unchecked: number;
  findings?: { severity: 'warning' | 'blocked' | 'faulted'; message: string; code: string; affectedFields: string[] }[];
  density?: TableDensity;
  onFindingClick?: (finding: ValidationSummaryPanelProps['findings'][0]) => void;
  onRevalidate?: () => void;
}

const ValidationSummaryPanel: React.FC<ValidationSummaryPanelProps> = ({
  id,
  testId,
  total,
  valid,
  warning,
  blocked,
  faulted,
  unchecked,
  findings = [],
  density = 'compact',
  onFindingClick,
  onRevalidate,
  state = 'idle',
  traceId,
  disabled,
}) => {
  const passRate = total > 0 ? Math.round((valid / total) * 100) : 0;
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-validation-summary tf-validation-summary--density-${density} ${faulted > 0 ? 'tf-validation-summary--has-faults' : blocked > 0 ? 'tf-validation-summary--has-blocks' : warning > 0 ? 'tf-validation-summary--has-warnings' : 'tf-validation-summary--clean'}`}>
      <div className="tf-validation-summary__counts">
        <div className="tf-validation-summary__count tf-validation-summary__count--total">Total: {total}</div>
        <div className="tf-validation-summary__count tf-validation-summary__count--valid">Valid: {valid}</div>
        <div className="tf-validation-summary__count tf-validation-summary__count--warning">Warning: {warning}</div>
        <div className="tf-validation-summary__count tf-validation-summary__count--blocked">Blocked: {blocked}</div>
        <div className="tf-validation-summary__count tf-validation-summary__count--faulted">Faulted: {faulted}</div>
        <div className="tf-validation-summary__count tf-validation-summary__count--unchecked">Unchecked: {unchecked}</div>
        <div className="tf-validation-summary__pass-rate">{passRate}% pass</div>
      </div>
      {onRevalidate && <button className="tf-validation-summary__revalidate-btn" onClick={onRevalidate} disabled={disabled || state === 'validating'}>Revalidate</button>}
      {findings.length > 0 && (
        <div className="tf-validation-summary__findings">
          <h4 className="tf-validation-summary__findings-title">Findings ({findings.length})</h4>
          {findings.map((finding, index) => (
            <div key={index} className={`tf-validation-summary__finding tf-validation-summary__finding--${finding.severity}`} onClick={() => onFindingClick?.(finding)}>
              <span className="tf-validation-summary__finding-severity">{finding.severity}</span>
              <span className="tf-validation-summary__finding-code">{finding.code}</span>
              <span className="tf-validation-summary__finding-message">{finding.message}</span>
              <span className="tf-validation-summary__finding-fields">{finding.affectedFields.join(', ')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ValidationSummaryPanel.displayName = 'ValidationSummaryPanel';
export default ValidationSummaryPanel;
