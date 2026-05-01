import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Sort option definition.
 */
export interface SortOption {
  /** Option value/key. */
  value: string;
  /** Display label. */
  label: string;
  /** Optional icon. */
  icon?: React.ReactNode;
}

/**
 * Props for FieldSortSelector.
 */
export interface FieldSortSelectorProps {
  /** Available sort options. */
  options: SortOption[];
  /** Currently selected value. */
  value: string;
  /** Selection change handler. */
  onChange: (value: string) => void;
  /** Sort direction. */
  direction?: 'asc' | 'desc';
  /** Direction toggle handler. */
  onToggleDirection?: () => void;
  /** Label text. */
  label?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldSortSelector — mobile sort dropdown.
 *
 * Compact sort control with native select dropdown and direction toggle.
 * 48 px height fits inline with filter chips in the control bar.
 * Direction toggle rotates between ascending and descending.
 */
export const FieldSortSelector: React.FC<FieldSortSelectorProps> = ({
  options,
  value,
  onChange,
  direction = 'asc',
  onToggleDirection,
  label = 'Sort',
  className = '',
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={['tf-sort-selector', className].join(' ')}
    >
      <label className="tf-sort-selector__label" htmlFor="field-sort">
        {label}
      </label>

      {/* Select dropdown */}
      <div className="tf-sort-selector__control">
        <select
          id="field-sort"
          value={value}
          aria-label={`Sort by ${label}`}
          className="tf-sort-selector__select"
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Direction toggle */}
        {onToggleDirection && (
          <button
            type="button"
            className="tf-sort-selector__direction"
            onClick={onToggleDirection}
            aria-label={`Sort direction: ${direction === 'asc' ? 'ascending' : 'descending'}`}
          >
            {direction === 'asc' ? '↑' : '↓'}
          </button>
        )}
      </div>
    </div>
  );
};

FieldSortSelector.displayName = 'FieldSortSelector';

export default FieldSortSelector;
