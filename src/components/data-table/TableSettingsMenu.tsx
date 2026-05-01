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

export interface TableSettingsMenuProps extends TorafirmaComponentBaseProps {
  settings: { id: string; label: string; type: 'toggle' | 'select' | 'range'; value: unknown; options?: { value: string; label: string }[] }[];
  density?: TableDensity;
  onSettingChange?: (id: string, value: unknown) => void;
}

const TableSettingsMenu: React.FC<TableSettingsMenuProps> = ({
  id,
  testId,
  settings,
  density = 'compact',
  onSettingChange,
  state = 'idle',
  traceId,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table-settings tf-table-settings--density-${density} ${isOpen ? 'tf-table-settings--open' : ''}`}>
      <button className="tf-table-settings__trigger" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>&#9881; Settings</button>
      {isOpen && (
        <div className="tf-table-settings__panel">
          {settings.map((setting) => (
            <div key={setting.id} className="tf-table-settings__item">
              <label className="tf-table-settings__label">{setting.label}</label>
              {setting.type === 'toggle' && <input type="checkbox" className="tf-table-settings__toggle" checked={!!setting.value} onChange={(e) => onSettingChange?.(setting.id, e.target.checked)} />}
              {setting.type === 'select' && (
                <select className="tf-table-settings__select" value={String(setting.value)} onChange={(e) => onSettingChange?.(setting.id, e.target.value)}>
                  {setting.options?.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

TableSettingsMenu.displayName = 'TableSettingsMenu';
export default TableSettingsMenu;
