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

export interface TableContextMenuProps extends TorafirmaComponentBaseProps {
  items: { id: string; label: string; variant?: TableVariant; shortcut?: string; authority?: AuthorityLevel; disabled?: boolean; disabledReason?: string; onAction: () => void; separator?: boolean }[];
  x: number;
  y: number;
  visible: boolean;
  density?: TableDensity;
  onClose?: () => void;
}

const TableContextMenu: React.FC<TableContextMenuProps> = ({
  id,
  testId,
  items,
  x,
  y,
  visible,
  density = 'compact',
  onClose,
  state = 'idle',
  traceId,
}) => {
  React.useEffect(() => {
    if (!visible) return;
    const handler = () => onClose?.();
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-table-context-menu tf-table-context-menu--density-${density}`} style={{ position: 'fixed', left: x, top: y, zIndex: 9999 }} role="menu">
      {items.map((item) => (
        <React.Fragment key={item.id}>
          {item.separator && <div className="tf-table-context-menu__separator" role="separator" />}
          <button className={`tf-table-context-menu__item tf-table-context-menu__item--${item.variant || 'neutral'} ${item.disabled ? 'tf-table-context-menu__item--disabled' : ''}`} onClick={() => { if (!item.disabled) { item.onAction(); onClose?.(); } }} disabled={item.disabled} role="menuitem" title={item.disabled ? item.disabledReason : item.shortcut ? `Shortcut: ${item.shortcut}` : undefined}>
            <span className="tf-table-context-menu__label">{item.label}</span>
            {item.shortcut && <span className="tf-table-context-menu__shortcut">{item.shortcut}</span>}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

TableContextMenu.displayName = 'TableContextMenu';
export default TableContextMenu;
