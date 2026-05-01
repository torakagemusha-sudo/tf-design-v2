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

export interface TreeTableNodeProps<T = unknown> extends TorafirmaComponentBaseProps {
  node: { id: string; data: T; children?: TreeTableNodeProps<T>['node'][]; expanded?: boolean; level?: number };
  columns: TableColumn<T>[];
  selectable?: boolean;
  selected?: boolean;
  onClick?: (node: TreeTableNodeProps<T>['node']) => void;
  onToggle?: (nodeId: string) => void;
  onSelect?: (nodeId: string, selected: boolean) => void;
}

const TreeTableNode = <T extends Record<string, unknown>>({
  node,
  columns,
  selectable = false,
  selected = false,
  onClick,
  onToggle,
  onSelect,
  id,
  testId,
  state = 'idle',
  traceId,
  disabled,
}: TreeTableNodeProps<T>) => {
  const level = node.level || 0;
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isExpanded = node.expanded ?? false;
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);

  return (
    <>
      <tr id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-tree-table-node ${selected ? 'tf-tree-table-node--selected' : ''}`} data-level={level} onClick={() => !disabled && onClick?.(node)} role="row" aria-selected={selected}>
        <td className="tf-tree-table-node__cell tf-tree-table-node__cell--tree" style={{ paddingLeft: `${level * 20 + 8}px` }} role="gridcell">
          {hasChildren && <button className="tf-tree-table-node__toggle" onClick={(e) => { e.stopPropagation(); onToggle?.(node.id); }} aria-expanded={isExpanded}>{isExpanded ? '▼' : '▶'}</button>}
          {!hasChildren && <span className="tf-tree-table-node__leaf">&#9679;</span>}
        </td>
        {selectable && <td className="tf-tree-table-node__cell tf-tree-table-node__cell--selection" role="gridcell"><input type="checkbox" checked={selected} onChange={() => onSelect?.(node.id, !selected)} disabled={disabled} /></td>}
        {visibleColumns.map((col) => <td key={col.key} className={`tf-tree-table-node__cell tf-tree-table-node__cell--${col.type || 'text'}`} role="gridcell">{col.formatter ? col.formatter(node.data[col.key as keyof T], node.data) : String(node.data[col.key as keyof T] ?? '')}</td>)}
      </tr>
      {isExpanded && node.children?.map((child) => (
        <TreeTableNode key={child.id} node={{ ...child, level: level + 1 }} columns={columns} selectable={selectable} onClick={onClick} onToggle={onToggle} onSelect={onSelect} />
      ))}
    </>
  );
};

TreeTableNode.displayName = 'TreeTableNode';
export default TreeTableNode;
