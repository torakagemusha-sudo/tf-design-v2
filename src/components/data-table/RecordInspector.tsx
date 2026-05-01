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

export interface RecordInspectorProps extends TorafirmaComponentBaseProps {
  title?: string;
  recordId: string;
  recordType?: string;
  fields: RecordField[];
  actions?: { id: string; label: string; variant?: TableVariant; onAction: () => void; authority?: AuthorityLevel; disabled?: boolean }[];
  sections?: { id: string; label: string; fields: string[] }[];
  density?: TableDensity;
  collapsible?: boolean;
  onClose?: () => void;
  onFieldChange?: (key: string, value: unknown) => void;
  onAction?: (actionId: string) => void;
}

/**
 * Detailed record view panel with field display, section grouping,
 * authority-aware actions, and trace support.
 */
const RecordInspector: React.FC<RecordInspectorProps> = ({
  id,
  testId,
  title = 'Record Inspector',
  recordId,
  recordType,
  fields,
  actions = [],
  sections = [],
  density = 'compact',
  collapsible = true,
  onClose,
  onFieldChange,
  state = 'idle',
  authority,
  traceId,
  disabled,
}) => {
  const [collapsedSections, setCollapsedSections] = React.useState<Set<string>>(new Set());
  const toggleSection = React.useCallback((sectionId: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId); else next.add(sectionId);
      return next;
    });
  }, []);

  return (
    <aside id={id} data-testid={testId} data-state={state} data-density={density} data-trace-id={traceId} className={`tf-record-inspector tf-record-inspector--density-${density} tf-record-inspector--state-${state}`} role="complementary" aria-label={`Inspect ${recordType || 'record'} ${recordId}`}>
      <header className="tf-record-inspector__header">
        <div className="tf-record-inspector__title-group">
          <h2 className="tf-record-inspector__title">{title}</h2>
          <span className="tf-record-inspector__record-id" title={recordId}>{recordId}</span>
          {recordType && <span className="tf-record-inspector__record-type">{recordType}</span>}
        </div>
        <div className="tf-record-inspector__header-actions">
          {actions.map((action) => (
            <button key={action.id} className={`tf-record-inspector__action-btn tf-record-inspector__action-btn--${action.variant || 'neutral'}`} onClick={() => onAction?.(action.id) ?? action.onAction()} disabled={action.disabled || disabled} title={action.disabled ? 'Action requires higher authority' : action.label}>{action.label}</button>
          ))}
          {onClose && <button className="tf-record-inspector__close-btn" onClick={onClose} aria-label="Close inspector">&#x2715;</button>}
        </div>
      </header>
      <div className="tf-record-inspector__body">
        {sections.length > 0 ? sections.map((section) => (
          <div key={section.id} className={`tf-record-inspector__section ${collapsedSections.has(section.id) ? 'tf-record-inspector__section--collapsed' : ''}`}>
            {collapsible && (
              <button className="tf-record-inspector__section-toggle" onClick={() => toggleSection(section.id)} aria-expanded={!collapsedSections.has(section.id)}>
                <span className="tf-record-inspector__section-icon">{collapsedSections.has(section.id) ? '▶' : '▼'}</span>
                <span className="tf-record-inspector__section-label">{section.label}</span>
              </button>
            )}
            {!collapsedSections.has(section.id) && (
              <div className="tf-record-inspector__section-fields">
                {section.fields.map((fieldKey) => {
                  const field = fields.find((f) => f.key === fieldKey);
                  if (!field) return null;
                  return (
                    <div key={field.key} className={`tf-record-inspector__field ${field.isDirty ? 'tf-record-inspector__field--dirty' : ''} ${field.validation ? `tf-record-inspector__field--${field.validation.status}` : ''}`}>
                      <label className="tf-record-inspector__field-label">{field.label}</label>
                      <div className="tf-record-inspector__field-value">
                        {field.isDirty && <span className="tf-record-inspector__dirty-marker" title={`Original: ${String(field.originalValue ?? '')}`}>*</span>}
                        <span className={`tf-record-inspector__field-data tf-record-inspector__field-data--${field.type || 'text'}`}>{field.value === null || field.value === undefined ? <em className="tf-record-inspector__null">&mdash;</em> : String(field.value)}</span>
                      </div>
                      {field.validation && <span className={`tf-record-inspector__validation tf-record-inspector__validation--${field.validation.status}`}>{field.validation.message}</span>}
                      {field.isComputed && <span className="tf-record-inspector__computed-badge" title="Computed field">&#931;</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )) : (
          <div className="tf-record-inspector__fields">
            {fields.map((field) => (
              <div key={field.key} className={`tf-record-inspector__field ${field.isDirty ? 'tf-record-inspector__field--dirty' : ''}`}>
                <label className="tf-record-inspector__field-label">{field.label}</label>
                <div className="tf-record-inspector__field-value">
                  <span className={`tf-record-inspector__field-data tf-record-inspector__field-data--${field.type || 'text'}`}>{field.value === null || field.value === undefined ? <em className="tf-record-inspector__null">&mdash;</em> : String(field.value)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

RecordInspector.displayName = 'RecordInspector';
export default RecordInspector;
