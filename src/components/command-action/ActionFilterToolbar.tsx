import React from 'react';
import { TorafirmaComponentBaseProps } from '../../types';

/**
 * A single filter option definition.
 */
export interface ActionFilter {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  value?: string;
}

/**
 * Props for the ActionFilterToolbar component.
 * Toolbar for filtering actions.
 */
export interface ActionFilterToolbarProps extends TorafirmaComponentBaseProps {
  /** Available filters */
  filters: ActionFilter[];
  /** Callback fired when a filter value changes */
  onFilterChange: (key: string, value: string) => void;
  /** Callback fired when all filters are cleared */
  onClearFilters?: () => void;
}

/**
 * ActionFilterToolbar — toolbar for filtering actions.
 *
 * Displays a horizontal toolbar of filter dropdowns for
 * narrowing the visible action set. Supports per-filter
 * selection and a clear-all action to reset the filter state.
 *
 * @example
 * ```tsx
 * <ActionFilterToolbar
 *   filters={[
 *     { key: 'class', label: 'Class', options: [{ value: 'execute', label: 'Execute' }, { value: 'deploy', label: 'Deploy' }] },
 *     { key: 'state', label: 'State', options: [{ value: 'available', label: 'Available' }, { value: 'running', label: 'Running' }] },
 *   ]}
 *   onFilterChange={(key, value) => console.log(key, value)}
 *   onClearFilters={() => console.log('Cleared')}
 * />
 * ```
 */
const ActionFilterToolbar: React.FC<ActionFilterToolbarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  className = '',
  'data-testid': testId,
  ...rest
}) => {
  const hasActiveFilters = filters.some((f) => f.value && f.value !== '');

  return (
    <div
      className={`tf-action-filter-toolbar ${className}`}
      role="toolbar"
      aria-label="Action filters"
      data-testid={testId}
      {...rest}
    >
      <span className="tf-action-filter-toolbar__label">Filter:</span>
      {filters.map((filter) => (
        <div key={filter.key} className="tf-action-filter-toolbar__filter">
          <label htmlFor={`filter-${filter.key}`} className="tf-action-filter-toolbar__filter-label">
            {filter.label}
          </label>
          <select
            id={`filter-${filter.key}`}
            className="tf-action-filter-toolbar__select"
            value={filter.value || ''}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
          >
            <option value="">All</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
      {hasActiveFilters && onClearFilters && (
        <button
          type="button"
          className="tf-action-filter-toolbar__clear"
          onClick={onClearFilters}
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default ActionFilterToolbar;
