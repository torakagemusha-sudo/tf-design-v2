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

export interface DatasetSchemaProps extends TorafirmaComponentBaseProps {
  fields: { name: string; type: string; nullable?: boolean; description?: string; primary?: boolean; indexed?: boolean; foreignKey?: string }[];
  density?: TableDensity;
  showTypes?: boolean;
  showConstraints?: boolean;
  onFieldClick?: (fieldName: string) => void;
}

const DatasetSchema: React.FC<DatasetSchemaProps> = ({
  id,
  testId,
  fields,
  density = 'compact',
  showTypes = true,
  showConstraints = true,
  onFieldClick,
  state = 'idle',
  traceId,
}) => {
  return (
    <div id={id} data-testid={testId} data-state={state} data-trace-id={traceId} className={`tf-dataset-schema tf-dataset-schema--density-${density}`}>
      <table className="tf-dataset-schema__table" role="table">
        <thead className="tf-dataset-schema__head">
          <tr className="tf-dataset-schema__header-row">
            <th className="tf-dataset-schema__header-cell" scope="col">Field</th>
            {showTypes && <th className="tf-dataset-schema__header-cell" scope="col">Type</th>}
            {showConstraints && <th className="tf-dataset-schema__header-cell" scope="col">Constraints</th>}
            <th className="tf-dataset-schema__header-cell" scope="col">Description</th>
          </tr>
        </thead>
        <tbody className="tf-dataset-schema__body">
          {fields.map((field) => (
            <tr key={field.name} className={`tf-dataset-schema__row ${field.primary ? 'tf-dataset-schema__row--primary' : ''}`} onClick={() => onFieldClick?.(field.name)}>
              <td className="tf-dataset-schema__cell tf-dataset-schema__cell--name">
                <span className="tf-dataset-schema__field-name">{field.name}</span>
                {field.primary && <span className="tf-dataset-schema__badge tf-dataset-schema__badge--primary" title="Primary key">PK</span>}
                {field.indexed && <span className="tf-dataset-schema__badge tf-dataset-schema__badge--indexed" title="Indexed">I</span>}
              </td>
              {showTypes && <td className="tf-dataset-schema__cell tf-dataset-schema__cell--type"><code className="tf-dataset-schema__type">{field.type}</code></td>}
              {showConstraints && (
                <td className="tf-dataset-schema__cell tf-dataset-schema__cell--constraints">
                  {!field.nullable && <span className="tf-dataset-schema__constraint tf-dataset-schema__constraint--required">NOT NULL</span>}
                  {field.foreignKey && <span className="tf-dataset-schema__constraint tf-dataset-schema__constraint--fk">FK &rarr; {field.foreignKey}</span>}
                </td>
              )}
              <td className="tf-dataset-schema__cell tf-dataset-schema__cell--description">{field.description || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DatasetSchema.displayName = 'DatasetSchema';
export default DatasetSchema;
