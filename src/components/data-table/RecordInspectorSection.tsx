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
 * Collapsible section within the record inspector for grouping related fields.
 *
 * @since 1.0.0
 */

export interface RecordInspectorSectionProps extends TorafirmaComponentBaseProps {
  sectionId: string;
  label: string;
  collapsed?: boolean;
  collapsible?: boolean;
  fieldCount?: number;
  density?: TableDensity;
  children: React.ReactNode;
  onToggle?: (sectionId: string, collapsed: boolean) => void;
}

const RecordInspectorSection: React.FC<RecordInspectorSectionProps> = ({
  id,
  testId,
  sectionId,
  label,
  collapsed: propCollapsed = false,
  collapsible = true,
  fieldCount,
  density = 'compact',
  children,
  onToggle,
  state = 'idle',
  traceId,
}) => {
  const [collapsed, setCollapsed] = React.useState(propCollapsed);
  const handleToggle = React.useCallback(() => {
    const next = !collapsed;
    setCollapsed(next);
    onToggle?.(sectionId, next);
  }, [collapsed, sectionId, onToggle]);

  React.useEffect(() => setCollapsed(propCollapsed), [propCollapsed]);

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-record-inspector-section tf-record-inspector-section--density-${density} ${collapsed ? 'tf-record-inspector-section--collapsed' : ''}`}>
      {collapsible ? (
        <button className="tf-record-inspector-section__toggle" onClick={handleToggle} aria-expanded={!collapsed}>
          <span className="tf-record-inspector-section__icon">{collapsed ? '▶' : '▼'}</span>
          <span className="tf-record-inspector-section__label">{label}</span>
          {fieldCount !== undefined && <span className="tf-record-inspector-section__count">({fieldCount})</span>}
        </button>
      ) : (
        <div className="tf-record-inspector-section__header">
          <span className="tf-record-inspector-section__label">{label}</span>
          {fieldCount !== undefined && <span className="tf-record-inspector-section__count">({fieldCount})</span>}
        </div>
      )}
      {!collapsed && <div className="tf-record-inspector-section__content">{children}</div>}
    </div>
  );
};

RecordInspectorSection.displayName = 'RecordInspectorSection';
export default RecordInspectorSection;
