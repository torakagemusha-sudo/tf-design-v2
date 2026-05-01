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

export interface TreeNode<T = unknown> {
  id: string;
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
  level?: number;
}

export interface TreeTableProps<T = unknown> extends TorafirmaComponentBaseProps {
  columns: TableColumn<T>[];
  nodes: TreeNode<T>[];
  rowKey?: string;
  selectable?: boolean;
  density?: TableDensity;
  striped?: boolean;
  onRowClick?: (node: TreeNode<T>) => void;
  onToggle?: (nodeId: string) => void;
  onSelect?: (nodeId: string, selected: boolean) => void;
  selectedIds?: string[];
}

const TreeTable = <T extends Record<string, unknown>>({
  id,
  testId,
  columns,
  nodes,
  selectable = false,
  density = 'compact',
  striped = true,
  onRowClick,
  onToggle,
  onSelect,
  selectedIds = [],
  state = 'idle',
  traceId,
  disabled,
}: TreeTableProps<T>) => {
  const visibleColumns = React.useMemo(() => columns.filter((c) => !c.hidden), [columns]);

  const renderNode = (node: TreeNode<T>, index: number) => {
    const level = node.level || 0;
    const hasChildren = (node.children?.length ?? 0) > 0;
    const isExpanded = node.expanded ?? false;
    const isSelected = selectedIds.includes(node.id);
    return (
      <React.Fragment key={node.id}>
        <tr className={`tf-tree-table__row ${isSelected ? 'tf-tree-table__row--selected' : ''} ${index % 2 === 1 && striped ? 'tf-tree-table__row--alt' : ''}`} onClick={() => !disabled && onRowClick?.(node)} data-level={level} role="row" aria-selected={isSelected}>
          <td className="tf-tree-table__cell tf-tree-table__cell--tree" style={{ paddingLeft: `${level * 20 + 8}px` }} role="gridcell">
            {hasChildren && (
              <button className="tf-tree-table__toggle-btn" onClick={(e) => { e.stopPropagation(); onToggle?.(node.id); }} aria-expanded={isExpanded}>
                {isExpanded ? '▼' : '▶'}
              </button>
            )}
            {!hasChildren && <span className="tf-tree-table__leaf-spacer">&#9679;</span>}
          </td>
          {selectable && (
            <td className="tf-tree-table__cell tf-tree-table__cell--selection" role="gridcell">
              <input type="checkbox" className="tf-tree-table__row-checkbox" checked={isSelected} onChange={() => onSelect?.(node.id, !isSelected)} disabled={disabled} />
            </td>
          )}
          {visibleColumns.map((col) => (
            <td key={col.key} className={`tf-tree-table__cell tf-tree-table__cell--${col.type || 'text'}`} role="gridcell">
              {col.formatter ? col.formatter(node.data[col.key as keyof T], node.data) : String(node.data[col.key as keyof T] ?? '')}
            </td>
          ))}
        </tr>
        {isExpanded && node.children?.map((child, ci) => renderNode({ ...child, level: level + 1 }, ci))}
      </React.Fragment>
    );
  };

  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-tree-table tf-tree-table--density-${density} tf-tree-table--state-${state}`}>
      <table className="tf-tree-table__table" role="treegrid">
        <thead className="tf-tree-table__head">
          <tr className="tf-tree-table__header-row">
            <th className="tf-tree-table__header-cell tf-tree-table__header-cell--tree" scope="col" />
            {selectable && <th className="tf-tree-table__header-cell tf-tree-table__header-cell--selection" scope="col" />}
            {visibleColumns.map((col) => <th key={col.key} className="tf-tree-table__header-cell" scope="col">{col.label}</th>)}
          </tr>
        </thead>
        <tbody className="tf-tree-table__body">
          {nodes.map((node, index) => renderNode(node, index))}
        </tbody>
      </table>
    </div>
  );
};

TreeTable.displayName = 'TreeTable';
export default TreeTable;
