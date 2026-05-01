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

export interface TableKeyboardHandlerProps extends TorafirmaComponentBaseProps {
  children: React.ReactNode;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onSelect?: () => void;
  onExpand?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onEscape?: () => void;
  onEnter?: () => void;
  onPageUp?: () => void;
  onPageDown?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
  onFocusNextCell?: () => void;
  onFocusPrevCell?: () => void;
  disabled?: boolean;
}

/**
 * Keyboard navigation handler for table components.
 * Provides arrow key, Enter, Escape, PageUp/Down, Home/End navigation.
 */
const TableKeyboardHandler: React.FC<TableKeyboardHandlerProps> = ({
  children,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
  onSelect,
  onExpand,
  onEdit,
  onDelete,
  onEscape,
  onEnter,
  onPageUp,
  onPageDown,
  onHome,
  onEnd,
  onFocusNextCell,
  onFocusPrevCell,
  disabled = false,
  id,
  testId,
  traceId,
}) => {
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowUp': e.preventDefault(); onMoveUp?.(); break;
      case 'ArrowDown': e.preventDefault(); onMoveDown?.(); break;
      case 'ArrowLeft': e.preventDefault(); onMoveLeft?.(); break;
      case 'ArrowRight': e.preventDefault(); onMoveRight?.(); break;
      case 'Enter': e.preventDefault(); onEnter?.(); break;
      case 'Escape': e.preventDefault(); onEscape?.(); break;
      case ' ': e.preventDefault(); onSelect?.(); break;
      case 'PageUp': e.preventDefault(); onPageUp?.(); break;
      case 'PageDown': e.preventDefault(); onPageDown?.(); break;
      case 'Home': e.preventDefault(); if (e.ctrlKey) onHome?.(); else onFocusPrevCell?.(); break;
      case 'End': e.preventDefault(); if (e.ctrlKey) onEnd?.(); else onFocusNextCell?.(); break;
      case 'e': if (e.ctrlKey) { e.preventDefault(); onEdit?.(); } break;
      case 'Delete': onDelete?.(); break;
      case 'x': if (e.ctrlKey) { e.preventDefault(); onExpand?.(); } break;
    }
  }, [disabled, onMoveUp, onMoveDown, onMoveLeft, onMoveRight, onSelect, onExpand, onEdit, onDelete, onEscape, onEnter, onPageUp, onPageDown, onHome, onEnd, onFocusNextCell, onFocusPrevCell]);

  return (
    <div id={id} data-testid={testId} data-trace-id={traceId} className="tf-table-keyboard-handler" onKeyDown={handleKeyDown} tabIndex={0} role="application" aria-label="Table keyboard navigation">
      {children}
    </div>
  );
};

TableKeyboardHandler.displayName = 'TableKeyboardHandler';
export default TableKeyboardHandler;
