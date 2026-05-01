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

export interface SavedView {
  id: string;
  name: string;
  description?: string;
  filters?: TableFilter[];
  sorts?: TableSort[];
  columns?: string[];
  columnWidths?: Record<string, number>;
  density?: TableDensity;
  pageSize?: number;
  isDefault?: boolean;
  modifiedAt?: string;
}

export interface TableSavedViewSelectorProps extends TorafirmaComponentBaseProps {
  views: SavedView[];
  currentViewId?: string;
  density?: TableDensity;
  onViewSelect?: (viewId: string) => void;
  onViewSave?: (name: string) => void;
  onViewDelete?: (viewId: string) => void;
  onViewSetDefault?: (viewId: string) => void;
}

const TableSavedViewSelector: React.FC<TableSavedViewSelectorProps> = ({
  id,
  testId,
  views,
  currentViewId,
  density = 'compact',
  onViewSelect,
  onViewSave,
  onViewDelete,
  onViewSetDefault,
  state = 'idle',
  traceId,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [saveName, setSaveName] = React.useState('');

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table-saved-view tf-table-saved-view--density-${density} ${isOpen ? 'tf-table-saved-view--open' : ''}`}>
      <button className="tf-table-saved-view__trigger" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        Views ({views.length})
      </button>
      {isOpen && (
        <div className="tf-table-saved-view__panel">
          {views.map((view) => (
            <div key={view.id} className={`tf-table-saved-view__item ${view.id === currentViewId ? 'tf-table-saved-view__item--active' : ''}`}>
              <button className="tf-table-saved-view__select" onClick={() => { onViewSelect?.(view.id); setIsOpen(false); }}>
                {view.name} {view.isDefault && <span className="tf-table-saved-view__default-badge">Default</span>}
              </button>
              {!view.isDefault && onViewSetDefault && <button className="tf-table-saved-view__set-default" onClick={() => onViewSetDefault(view.id)} title="Set as default">&#9734;</button>}
              {onViewDelete && <button className="tf-table-saved-view__delete" onClick={() => onViewDelete(view.id)} title="Delete view">&#x2715;</button>}
            </div>
          ))}
          {onViewSave && (
            <div className="tf-table-saved-view__save">
              {saving ? (
                <>
                  <input type="text" className="tf-table-saved-view__save-input" value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder="View name" autoFocus />
                  <button className="tf-table-saved-view__save-confirm" onClick={() => { if (saveName) onViewSave(saveName); setSaving(false); setSaveName(''); }}>Save</button>
                  <button className="tf-table-saved-view__save-cancel" onClick={() => setSaving(false)}>Cancel</button>
                </>
              ) : (
                <button className="tf-table-saved-view__save-trigger" onClick={() => setSaving(true)}>+ Save current view</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

TableSavedViewSelector.displayName = 'TableSavedViewSelector';
export default TableSavedViewSelector;
